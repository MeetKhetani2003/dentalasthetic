import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { GridFSBucket, ObjectId } from "mongodb";
import { connectDB } from "@/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id || !ObjectId.isValid(id)) {
      return new NextResponse("Invalid image ID", { status: 400 });
    }

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection unavailable");
    }

    const bucket = new GridFSBucket(db, { bucketName: "uploads" });
    const objectId = new ObjectId(id);

    const files = await bucket.find({ _id: objectId }).toArray();
    if (!files || files.length === 0) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const file = files[0];
    const contentType = (file as any).metadata?.contentType || (file as any).contentType || "image/jpeg";
    const downloadStream = bucket.openDownloadStream(objectId);

    const webStream = new ReadableStream({
      start(controller) {
        downloadStream.on("data", (chunk) => controller.enqueue(chunk));
        downloadStream.on("end", () => controller.close());
        downloadStream.on("error", (err) => controller.error(err));
      },
    });

    return new Response(webStream, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("GridFS Fetch Error:", error);
    return new NextResponse("Error fetching image", { status: 500 });
  }
}
