import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import { connectDB } from "@/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection unavailable");
    }

    const bucket = new GridFSBucket(db, { bucketName: "uploads" });
    const uploadStream = bucket.openUploadStream(file.name, {
      metadata: { contentType: file.type || "image/jpeg" },
    });

    await new Promise((resolve, reject) => {
      uploadStream.on("finish", resolve);
      uploadStream.on("error", reject);
      uploadStream.end(buffer);
    });

    const fileId = uploadStream.id.toString();
    const imageUrl = `/api/images/${fileId}`;

    return NextResponse.json({
      success: true,
      url: imageUrl,
      id: fileId,
      filename: file.name,
    });
  } catch (error) {
    console.error("GridFS Upload Error:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
