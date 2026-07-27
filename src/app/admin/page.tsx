"use client";

import { useEffect, useState } from "react";

// --- Image Uploader Component for GridFS ---
function ImageUploader({
  value,
  onChange,
  label = "Image URL or Upload File",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/images/upload", {
        method: "POST",
        body: formData,
      }).then((r) => r.json());

      if (res.success && res.url) {
        onChange(res.url);
      } else {
        alert("Upload failed: " + (res.error || "Unknown error"));
      }
    } catch (err) {
      alert("Error uploading file to GridFS.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", fontSize: "0.85rem", color: "#a0aab2", marginBottom: "0.4rem" }}>
        {label}
      </label>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste URL or click upload →"
          style={{
            flex: 1,
            padding: "0.6rem",
            background: "#0b1319",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff",
            borderRadius: "4px",
          }}
        />
        <label
          style={{
            background: uploading ? "#555" : "#c5a059",
            color: "#0b1319",
            padding: "0.6rem 1rem",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: uploading ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            fontSize: "0.85rem",
          }}
        >
          {uploading ? "Uploading..." : "📁 Upload GridFS"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            style={{ display: "none" }}
          />
        </label>
      </div>
      {value && (
        <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <img
            src={value}
            alt="Preview"
            style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px", border: "1px solid #c5a059" }}
            onError={(e) => ((e.target as HTMLElement).style.display = "none")}
          />
          <span style={{ fontSize: "0.75rem", color: "#8899a6" }}>Preview: {value}</span>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<
    "home" | "treatments" | "doctor" | "transformations" | "testimonials" | "gallery" | "clinic" | "appointments"
  >("home");
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Data States
  const [homeData, setHomeData] = useState<any>(null);
  const [doctorData, setDoctorData] = useState<any>(null);
  const [treatmentsData, setTreatmentsData] = useState<any[]>([]);
  const [transformationsData, setTransformationsData] = useState<any[]>([]);
  const [testimonialsData, setTestimonialsData] = useState<any[]>([]);
  const [galleryData, setGalleryData] = useState<any[]>([]);
  const [clinicData, setClinicData] = useState<any>(null);
  const [appointmentsData, setAppointmentsData] = useState<any[]>([]);

  // Editing States
  const [editingTreatment, setEditingTreatment] = useState<any | null>(null);
  const [editingTransformation, setEditingTransformation] = useState<any | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);
  const [editingGallery, setEditingGallery] = useState<any | null>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [resHome, resDoc, resTreat, resTrans, resTest, resGal, resClin, resApp] = await Promise.all([
        fetch("/api/admin/home").then((r) => r.json()),
        fetch("/api/admin/doctor").then((r) => r.json()),
        fetch("/api/admin/treatments").then((r) => r.json()),
        fetch("/api/admin/transformations").then((r) => r.json()),
        fetch("/api/admin/testimonials").then((r) => r.json()),
        fetch("/api/admin/gallery").then((r) => r.json()),
        fetch("/api/admin/clinic").then((r) => r.json()),
        fetch("/api/appointments").then((r) => r.json()),
      ]);

      setHomeData(resHome);
      setDoctorData(resDoc);
      setTreatmentsData(resTreat || []);
      setTransformationsData(resTrans || []);
      setTestimonialsData(resTest || []);
      setGalleryData(resGal || []);
      setClinicData(resClin);
      setAppointmentsData(resApp.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const notify = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 4000);
  };

  const seedDatabase = async () => {
    if (!confirm("This will populate default initial data into MongoDB. Continue?")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" }).then((r) => r.json());
      if (res.success) {
        notify("Database seeded successfully!");
        fetchAll();
      } else {
        alert("Seed failed: " + res.error);
      }
    } catch (e) {
      alert("Error seeding data.");
    } finally {
      setLoading(false);
    }
  };

  // --- SAVE HANDLERS ---
  const saveHome = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(homeData),
      }).then((r) => r.json());
      if (res.success) notify("Home Page sections updated!");
      else alert("Save failed: " + res.error);
    } finally {
      setLoading(false);
    }
  };

  const saveDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/doctor", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctorData),
      }).then((r) => r.json());
      if (res.success) notify("Doctor profile updated!");
      else alert("Save failed: " + res.error);
    } finally {
      setLoading(false);
    }
  };

  const saveClinic = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/clinic", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clinicData),
      }).then((r) => r.json());
      if (res.success) notify("Clinic info updated!");
      else alert("Save failed: " + res.error);
    } finally {
      setLoading(false);
    }
  };

  const saveTreatment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTreatment) return;
    setLoading(true);
    try {
      const isNew = !editingTreatment._id;
      const url = isNew ? "/api/admin/treatments" : `/api/admin/treatments/${editingTreatment._id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTreatment),
      }).then((r) => r.json());

      if (res.success || res.data) {
        notify(`Treatment ${isNew ? "created" : "updated"}!`);
        setEditingTreatment(null);
        fetchAll();
      } else {
        alert("Failed to save treatment: " + (res.error || "Unknown error"));
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteTreatment = async (id: string) => {
    if (!confirm("Delete treatment?")) return;
    setLoading(true);
    try {
      await fetch(`/api/admin/treatments/${id}`, { method: "DELETE" });
      notify("Treatment deleted!");
      fetchAll();
    } finally {
      setLoading(false);
    }
  };

  const saveTransformation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTransformation) return;
    setLoading(true);
    try {
      const isNew = !editingTransformation._id;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch("/api/admin/transformations", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTransformation),
      }).then((r) => r.json());

      if (res.success) {
        notify(`Transformation ${isNew ? "created" : "updated"}!`);
        setEditingTransformation(null);
        fetchAll();
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteTransformation = async (id: string) => {
    if (!confirm("Delete transformation?")) return;
    setLoading(true);
    try {
      await fetch(`/api/admin/transformations?id=${id}`, { method: "DELETE" });
      notify("Transformation deleted!");
      fetchAll();
    } finally {
      setLoading(false);
    }
  };

  const saveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    setLoading(true);
    try {
      const isNew = !editingTestimonial._id;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch("/api/admin/testimonials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTestimonial),
      }).then((r) => r.json());

      if (res.success) {
        notify(`Testimonial ${isNew ? "created" : "updated"}!`);
        setEditingTestimonial(null);
        fetchAll();
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Delete testimonial?")) return;
    setLoading(true);
    try {
      await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
      notify("Testimonial deleted!");
      fetchAll();
    } finally {
      setLoading(false);
    }
  };

  const saveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery) return;
    setLoading(true);
    try {
      const isNew = !editingGallery._id;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch("/api/admin/gallery", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingGallery),
      }).then((r) => r.json());

      if (res.success) {
        notify(`Gallery photo ${isNew ? "added" : "updated"}!`);
        setEditingGallery(null);
        fetchAll();
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteGallery = async (id: string) => {
    if (!confirm("Delete photo?")) return;
    setLoading(true);
    try {
      await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      notify("Photo deleted!");
      fetchAll();
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: "home", icon: "🏠", label: "Home Page Sections" },
    { id: "treatments", icon: "✨", label: "Treatments Library", count: treatmentsData.length },
    { id: "doctor", icon: "👩‍⚕️", label: "Expert Doctor Profile" },
    { id: "transformations", icon: "🖼️", label: "Transformations", count: transformationsData.length },
    { id: "testimonials", icon: "⭐", label: "Testimonials", count: testimonialsData.length },
    { id: "gallery", icon: "📸", label: "Gallery Photos", count: galleryData.length },
    { id: "clinic", icon: "📍", label: "Clinic Info" },
    { id: "appointments", icon: "📅", label: "Bookings", count: appointmentsData.length },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0b1319", color: "#f7f5f0", fontFamily: "sans-serif" }}>
      {/* --- SIDEBAR NAVIGATION --- */}
      <aside
        style={{
          width: "280px",
          background: "#080e13",
          borderRight: "1px solid rgba(212,175,55,0.2)",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          padding: "1.5rem 1rem",
          boxSizing: "border-box",
        }}
      >
        <div style={{ paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", color: "#c5a059" }}>
            DermaDent Atelier
          </span>
          <h2 style={{ fontSize: "1.4rem", fontWeight: "300", margin: "0.3rem 0 0", color: "#fff" }}>
            Admin Console
          </h2>
        </div>

        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem", overflowY: "auto" }}>
          {menuItems.map((item) => {
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.8rem 1rem",
                  borderRadius: "6px",
                  border: isSelected ? "1px solid rgba(197,160,89,0.5)" : "1px solid transparent",
                  background: isSelected ? "rgba(197,160,89,0.12)" : "transparent",
                  color: isSelected ? "#c5a059" : "#a0aab2",
                  cursor: "pointer",
                  fontWeight: isSelected ? "bold" : "normal",
                  textAlign: "left",
                  fontSize: "0.95rem",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span
                    style={{
                      background: isSelected ? "#c5a059" : "rgba(255,255,255,0.1)",
                      color: isSelected ? "#0b1319" : "#fff",
                      fontSize: "0.75rem",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "10px",
                    }}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Actions */}
        <div style={{ paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          <button
            onClick={seedDatabase}
            style={{
              background: "transparent",
              border: "1px solid #c5a059",
              color: "#c5a059",
              padding: "0.6rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.85rem",
              textAlign: "center",
            }}
          >
            🌱 Seed Default Data
          </button>
          <a
            href="/"
            target="_blank"
            style={{
              background: "#c5a059",
              color: "#0b1319",
              padding: "0.6rem",
              borderRadius: "4px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "0.85rem",
              textAlign: "center",
            }}
          >
            👁️ View Live Website ↗
          </a>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main style={{ flex: 1, padding: "2rem 3rem", overflowY: "auto" }}>
        {/* Top Notification Status */}
        {saveStatus && (
          <div style={{ background: "#1c3227", border: "1px solid #2e7d32", color: "#a5d6a7", padding: "1rem", borderRadius: "6px", marginBottom: "1.5rem", fontWeight: "bold" }}>
            ✓ {saveStatus}
          </div>
        )}

        {loading && <div style={{ color: "#c5a059", marginBottom: "1rem" }}>Loading data from database...</div>}

        {/* TAB 1: HOME PAGE */}
        {activeTab === "home" && homeData && (
          <form onSubmit={saveHome} style={{ background: "#111c24", padding: "2rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <h2 style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem", marginBottom: "1.5rem", color: "#c5a059" }}>
              Hero Cinema Section
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#a0aab2" }}>Kicker Text</label>
                <input
                  type="text"
                  value={homeData.heroKicker || ""}
                  onChange={(e) => setHomeData({ ...homeData, heroKicker: e.target.value })}
                  style={{ width: "100%", padding: "0.8rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#a0aab2" }}>Primary Hero Heading</label>
                <input
                  type="text"
                  value={homeData.heroTitle || ""}
                  onChange={(e) => setHomeData({ ...homeData, heroTitle: e.target.value })}
                  style={{ width: "100%", padding: "0.8rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#a0aab2" }}>Subheading Paragraph</label>
                <textarea
                  rows={3}
                  value={homeData.heroSubheading || ""}
                  onChange={(e) => setHomeData({ ...homeData, heroSubheading: e.target.value })}
                  style={{ width: "100%", padding: "0.8rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                />
              </div>
            </div>

            <h2 style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem", margin: "2rem 0 1.5rem", color: "#c5a059" }}>
              Luxury Introduction Section
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#a0aab2" }}>Eyebrow</label>
                <input
                  type="text"
                  value={homeData.introEyebrow || ""}
                  onChange={(e) => setHomeData({ ...homeData, introEyebrow: e.target.value })}
                  style={{ width: "100%", padding: "0.8rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#a0aab2" }}>Heading</label>
                <input
                  type="text"
                  value={homeData.introHeading || ""}
                  onChange={(e) => setHomeData({ ...homeData, introHeading: e.target.value })}
                  style={{ width: "100%", padding: "0.8rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#a0aab2" }}>Description</label>
                <textarea
                  rows={2}
                  value={homeData.introDescription || ""}
                  onChange={(e) => setHomeData({ ...homeData, introDescription: e.target.value })}
                  style={{ width: "100%", padding: "0.8rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                />
              </div>
            </div>

            <button
              type="submit"
              style={{ background: "#c5a059", color: "#0b1319", border: "none", padding: "0.8rem 2rem", borderRadius: "4px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}
            >
              Save Home Page Content
            </button>
          </form>
        )}

        {/* TAB 2: TREATMENTS */}
        {activeTab === "treatments" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ margin: 0, color: "#c5a059" }}>Treatments Library ({treatmentsData.length})</h2>
              <button
                onClick={() =>
                  setEditingTreatment({
                    slug: "",
                    eyebrow: "Atelier",
                    title: "",
                    shortTitle: "",
                    description: "",
                    image: "/treatmentimages/Skinarchitecture.png",
                    secondaryImage: "/treatmentimages/Skinarchitecture.png",
                    portraitImage: "/treatmentimages/Skinarchitecture.png",
                    icon: "✦",
                    duration: "45 min",
                    recovery: "Minimal",
                    focus: "Skin",
                    benefits: ["Custom protocol"],
                    timeline: [{ phase: "01 · Consult", detail: "Assessment" }],
                    technology: "Standard lasers",
                    expectedResults: "Visible glow",
                    faqs: [{ question: "Is it safe?", answer: "Yes." }],
                  })
                }
                style={{ background: "#c5a059", color: "#0b1319", padding: "0.6rem 1.2rem", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}
              >
                + Add New Treatment
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {treatmentsData.map((t) => (
                <div key={t._id || t.slug} style={{ background: "#111c24", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "1.2rem" }}>
                  <img src={t.image} alt={t.title} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "4px", marginBottom: "1rem" }} />
                  <span style={{ fontSize: "0.8rem", color: "#c5a059", textTransform: "uppercase" }}>{t.eyebrow}</span>
                  <h3 style={{ margin: "0.4rem 0", fontSize: "1.2rem" }}>{t.title}</h3>
                  <p style={{ fontSize: "0.9rem", color: "#a0aab2", height: "45px", overflow: "hidden" }}>{t.description}</p>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                    <button onClick={() => setEditingTreatment(t)} style={{ flex: 1, background: "rgba(197,160,89,0.15)", border: "1px solid #c5a059", color: "#c5a059", padding: "0.5rem", borderRadius: "4px", cursor: "pointer" }}>
                      ✏️ Edit
                    </button>
                    {t._id && (
                      <button onClick={() => deleteTreatment(t._id)} style={{ background: "rgba(255,0,0,0.15)", border: "1px solid #ff4d4d", color: "#ff4d4d", padding: "0.5rem 0.8rem", borderRadius: "4px", cursor: "pointer" }}>
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Edit Modal */}
            {editingTreatment && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100, padding: "1rem" }}>
                <div style={{ background: "#111c24", width: "100%", maxWidth: "800px", maxHeight: "90vh", overflowY: "auto", padding: "2rem", borderRadius: "8px", border: "1px solid #c5a059" }}>
                  <h2 style={{ margin: "0 0 1.5rem", color: "#c5a059" }}>{editingTreatment._id ? "Edit Treatment" : "Add Treatment"}</h2>
                  <form onSubmit={saveTreatment}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "#a0aab2" }}>Title</label>
                        <input type="text" required value={editingTreatment.title || ""} onChange={(e) => setEditingTreatment({ ...editingTreatment, title: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "#a0aab2" }}>Slug</label>
                        <input type="text" required value={editingTreatment.slug || ""} onChange={(e) => setEditingTreatment({ ...editingTreatment, slug: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "#a0aab2" }}>Short Title</label>
                        <input type="text" required value={editingTreatment.shortTitle || ""} onChange={(e) => setEditingTreatment({ ...editingTreatment, shortTitle: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "#a0aab2" }}>Category Eyebrow</label>
                        <input type="text" required value={editingTreatment.eyebrow || ""} onChange={(e) => setEditingTreatment({ ...editingTreatment, eyebrow: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
                      </div>

                      <div style={{ gridColumn: "span 2" }}>
                        <ImageUploader
                          label="Main Cover Image (GridFS Supported)"
                          value={editingTreatment.image || ""}
                          onChange={(url) => setEditingTreatment({ ...editingTreatment, image: url, secondaryImage: url, portraitImage: url })}
                        />
                      </div>

                      <div style={{ gridColumn: "span 2" }}>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "#a0aab2" }}>Description</label>
                        <textarea rows={3} required value={editingTreatment.description || ""} onChange={(e) => setEditingTreatment({ ...editingTreatment, description: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "#a0aab2" }}>Duration</label>
                        <input type="text" value={editingTreatment.duration || ""} onChange={(e) => setEditingTreatment({ ...editingTreatment, duration: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "0.85rem", color: "#a0aab2" }}>Recovery</label>
                        <input type="text" value={editingTreatment.recovery || ""} onChange={(e) => setEditingTreatment({ ...editingTreatment, recovery: e.target.value })} style={{ width: "100%", padding: "0.6rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                      <button type="submit" style={{ flex: 1, background: "#c5a059", color: "#0b1319", padding: "0.8rem", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}>
                        Save Treatment
                      </button>
                      <button type="button" onClick={() => setEditingTreatment(null)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "0.8rem 1.5rem", borderRadius: "4px", cursor: "pointer" }}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DOCTOR PROFILE */}
        {activeTab === "doctor" && doctorData && (
          <form onSubmit={saveDoctor} style={{ background: "#111c24", padding: "2rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <h2 style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem", marginBottom: "1.5rem", color: "#c5a059" }}>
              Expert Doctor Profile
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#a0aab2" }}>Doctor Name</label>
                <input type="text" value={doctorData.name || ""} onChange={(e) => setDoctorData({ ...doctorData, name: e.target.value })} style={{ width: "100%", padding: "0.8rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#a0aab2" }}>Professional Title</label>
                <input type="text" value={doctorData.title || ""} onChange={(e) => setDoctorData({ ...doctorData, title: e.target.value })} style={{ width: "100%", padding: "0.8rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <ImageUploader
                  label="Doctor Portrait Image (GridFS Supported)"
                  value={doctorData.portrait || ""}
                  onChange={(url) => setDoctorData({ ...doctorData, portrait: url })}
                />
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#a0aab2" }}>Signature Text</label>
                <input type="text" value={doctorData.signature || ""} onChange={(e) => setDoctorData({ ...doctorData, signature: e.target.value })} style={{ width: "100%", padding: "0.8rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#a0aab2" }}>Biography</label>
                <textarea rows={4} value={doctorData.biography || ""} onChange={(e) => setDoctorData({ ...doctorData, biography: e.target.value })} style={{ width: "100%", padding: "0.8rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
              </div>
            </div>
            <button type="submit" style={{ background: "#c5a059", color: "#0b1319", border: "none", padding: "0.8rem 2rem", borderRadius: "4px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}>
              Save Doctor Profile
            </button>
          </form>
        )}

        {/* TAB 4: TRANSFORMATIONS */}
        {activeTab === "transformations" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ margin: 0, color: "#c5a059" }}>Before & After Transformations ({transformationsData.length})</h2>
              <button
                onClick={() =>
                  setEditingTransformation({
                    title: "",
                    concern: "Skin & Pigment",
                    timeline: "8 weeks",
                    result: "",
                    before: "https://images.unsplash.com/photo-1598300188904-6287d52746ad?auto=format&fit=crop&w=1000&q=85",
                    after: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=85",
                  })
                }
                style={{ background: "#c5a059", color: "#0b1319", padding: "0.6rem 1.2rem", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}
              >
                + Add Transformation Story
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {transformationsData.map((item) => (
                <div key={item._id || item.title} style={{ background: "#111c24", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "1.2rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                    <img src={item.before} alt="Before" style={{ width: "50%", height: "120px", objectFit: "cover", borderRadius: "4px" }} />
                    <img src={item.after} alt="After" style={{ width: "50%", height: "120px", objectFit: "cover", borderRadius: "4px" }} />
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "#c5a059", textTransform: "uppercase" }}>{item.concern} · {item.timeline}</span>
                  <h3 style={{ margin: "0.4rem 0", fontSize: "1.1rem" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#a0aab2" }}>{item.result}</p>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                    <button onClick={() => setEditingTransformation(item)} style={{ flex: 1, background: "rgba(197,160,89,0.15)", border: "1px solid #c5a059", color: "#c5a059", padding: "0.4rem", borderRadius: "4px", cursor: "pointer" }}>Edit</button>
                    {item._id && <button onClick={() => deleteTransformation(item._id)} style={{ background: "rgba(255,0,0,0.15)", border: "1px solid #ff4d4d", color: "#ff4d4d", padding: "0.4rem 0.8rem", borderRadius: "4px", cursor: "pointer" }}>Delete</button>}
                  </div>
                </div>
              ))}
            </div>

            {editingTransformation && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100, padding: "1rem" }}>
                <div style={{ background: "#111c24", width: "100%", maxWidth: "600px", padding: "2rem", borderRadius: "8px", border: "1px solid #c5a059" }}>
                  <h2 style={{ margin: "0 0 1.5rem", color: "#c5a059" }}>Save Transformation Story</h2>
                  <form onSubmit={saveTransformation} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input type="text" placeholder="Title" required value={editingTransformation.title || ""} onChange={(e) => setEditingTransformation({ ...editingTransformation, title: e.target.value })} style={{ padding: "0.6rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
                    <input type="text" placeholder="Concern" required value={editingTransformation.concern || ""} onChange={(e) => setEditingTransformation({ ...editingTransformation, concern: e.target.value })} style={{ padding: "0.6rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
                    <input type="text" placeholder="Timeline (e.g. 12 weeks)" required value={editingTransformation.timeline || ""} onChange={(e) => setEditingTransformation({ ...editingTransformation, timeline: e.target.value })} style={{ padding: "0.6rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
                    <textarea rows={2} placeholder="Result summary" required value={editingTransformation.result || ""} onChange={(e) => setEditingTransformation({ ...editingTransformation, result: e.target.value })} style={{ padding: "0.6rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />

                    <ImageUploader label="Before Image (GridFS)" value={editingTransformation.before || ""} onChange={(url) => setEditingTransformation({ ...editingTransformation, before: url })} />
                    <ImageUploader label="After Image (GridFS)" value={editingTransformation.after || ""} onChange={(url) => setEditingTransformation({ ...editingTransformation, after: url })} />

                    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                      <button type="submit" style={{ flex: 1, background: "#c5a059", color: "#0b1319", padding: "0.8rem", border: "none", borderRadius: "4px", fontWeight: "bold" }}>Save</button>
                      <button type="button" onClick={() => setEditingTransformation(null)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "0.8rem 1.5rem", borderRadius: "4px" }}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: TESTIMONIALS */}
        {activeTab === "testimonials" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ margin: 0, color: "#c5a059" }}>Patient Testimonials ({testimonialsData.length})</h2>
              <button
                onClick={() =>
                  setEditingTestimonial({
                    quote: "",
                    name: "",
                    detail: "Patient",
                    rating: "5.0",
                    portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85",
                  })
                }
                style={{ background: "#c5a059", color: "#0b1319", padding: "0.6rem 1.2rem", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}
              >
                + Add Testimonial
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
              {testimonialsData.map((t) => (
                <div key={t._id || t.name} style={{ background: "#111c24", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "1.2rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <img src={t.portrait} alt={t.name} style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} />
                    <div>
                      <strong style={{ display: "block" }}>{t.name}</strong>
                      <span style={{ fontSize: "0.8rem", color: "#c5a059" }}>★ {t.rating} · {t.detail}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.9rem", color: "#a0aab2", fontStyle: "italic" }}>"{t.quote}"</p>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                    <button onClick={() => setEditingTestimonial(t)} style={{ flex: 1, background: "rgba(197,160,89,0.15)", border: "1px solid #c5a059", color: "#c5a059", padding: "0.4rem", borderRadius: "4px", cursor: "pointer" }}>Edit</button>
                    {t._id && <button onClick={() => deleteTestimonial(t._id)} style={{ background: "rgba(255,0,0,0.15)", border: "1px solid #ff4d4d", color: "#ff4d4d", padding: "0.4rem 0.8rem", borderRadius: "4px", cursor: "pointer" }}>Delete</button>}
                  </div>
                </div>
              ))}
            </div>

            {editingTestimonial && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100, padding: "1rem" }}>
                <div style={{ background: "#111c24", width: "100%", maxWidth: "600px", padding: "2rem", borderRadius: "8px", border: "1px solid #c5a059" }}>
                  <h2 style={{ margin: "0 0 1.5rem", color: "#c5a059" }}>Save Patient Testimonial</h2>
                  <form onSubmit={saveTestimonial} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input type="text" placeholder="Patient Name" required value={editingTestimonial.name || ""} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })} style={{ padding: "0.6rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
                    <input type="text" placeholder="Patient Detail" required value={editingTestimonial.detail || ""} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, detail: e.target.value })} style={{ padding: "0.6rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
                    <input type="text" placeholder="Rating" required value={editingTestimonial.rating || ""} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: e.target.value })} style={{ padding: "0.6rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
                    <textarea rows={3} placeholder="Quote" required value={editingTestimonial.quote || ""} onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })} style={{ padding: "0.6rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />

                    <ImageUploader label="Portrait Image (GridFS)" value={editingTestimonial.portrait || ""} onChange={(url) => setEditingTestimonial({ ...editingTestimonial, portrait: url })} />

                    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                      <button type="submit" style={{ flex: 1, background: "#c5a059", color: "#0b1319", padding: "0.8rem", border: "none", borderRadius: "4px", fontWeight: "bold" }}>Save</button>
                      <button type="button" onClick={() => setEditingTestimonial(null)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "0.8rem 1.5rem", borderRadius: "4px" }}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: GALLERY */}
        {activeTab === "gallery" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ margin: 0, color: "#c5a059" }}>Gallery Photos ({galleryData.length})</h2>
              <button
                onClick={() => setEditingGallery({ src: "", title: "", category: "Interiors", size: "regular" })}
                style={{ background: "#c5a059", color: "#0b1319", padding: "0.6rem 1.2rem", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}
              >
                + Add Photo
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {galleryData.map((item) => (
                <div key={item._id || item.title} style={{ background: "#111c24", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "1rem" }}>
                  <img src={item.src} alt={item.title} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "4px", marginBottom: "0.8rem" }} />
                  <span style={{ fontSize: "0.75rem", color: "#c5a059", textTransform: "uppercase" }}>{item.category}</span>
                  <h4 style={{ margin: "0.2rem 0 0.8rem" }}>{item.title}</h4>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => setEditingGallery(item)} style={{ flex: 1, background: "rgba(197,160,89,0.15)", border: "1px solid #c5a059", color: "#c5a059", padding: "0.4rem", borderRadius: "4px", cursor: "pointer" }}>Edit</button>
                    {item._id && <button onClick={() => deleteGallery(item._id)} style={{ background: "rgba(255,0,0,0.15)", border: "1px solid #ff4d4d", color: "#ff4d4d", padding: "0.4rem 0.8rem", borderRadius: "4px", cursor: "pointer" }}>Delete</button>}
                  </div>
                </div>
              ))}
            </div>

            {editingGallery && (
              <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100, padding: "1rem" }}>
                <div style={{ background: "#111c24", width: "100%", maxWidth: "500px", padding: "2rem", borderRadius: "8px", border: "1px solid #c5a059" }}>
                  <h2 style={{ margin: "0 0 1.5rem", color: "#c5a059" }}>Save Gallery Photo</h2>
                  <form onSubmit={saveGallery} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input type="text" placeholder="Title" required value={editingGallery.title || ""} onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })} style={{ padding: "0.6rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
                    <input type="text" placeholder="Category" required value={editingGallery.category || ""} onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value })} style={{ padding: "0.6rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />

                    <ImageUploader label="Photo File (GridFS)" value={editingGallery.src || ""} onChange={(url) => setEditingGallery({ ...editingGallery, src: url })} />

                    <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                      <button type="submit" style={{ flex: 1, background: "#c5a059", color: "#0b1319", padding: "0.8rem", border: "none", borderRadius: "4px", fontWeight: "bold" }}>Save</button>
                      <button type="button" onClick={() => setEditingGallery(null)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "0.8rem 1.5rem", borderRadius: "4px" }}>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: CLINIC INFO */}
        {activeTab === "clinic" && clinicData && (
          <form onSubmit={saveClinic} style={{ background: "#111c24", padding: "2rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <h2 style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "0.5rem", marginBottom: "1.5rem", color: "#c5a059" }}>
              Clinic Details
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#a0aab2" }}>Clinic Name</label>
                <input type="text" value={clinicData.name || ""} onChange={(e) => setClinicData({ ...clinicData, name: e.target.value })} style={{ width: "100%", padding: "0.8rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#a0aab2" }}>Phone</label>
                <input type="text" value={clinicData.phone || ""} onChange={(e) => setClinicData({ ...clinicData, phone: e.target.value })} style={{ width: "100%", padding: "0.8rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#a0aab2" }}>Email</label>
                <input type="text" value={clinicData.email || ""} onChange={(e) => setClinicData({ ...clinicData, email: e.target.value })} style={{ width: "100%", padding: "0.8rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#a0aab2" }}>Hours</label>
                <input type="text" value={clinicData.hours || ""} onChange={(e) => setClinicData({ ...clinicData, hours: e.target.value })} style={{ width: "100%", padding: "0.8rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#a0aab2" }}>Address</label>
                <input type="text" value={clinicData.address || ""} onChange={(e) => setClinicData({ ...clinicData, address: e.target.value })} style={{ width: "100%", padding: "0.8rem", background: "#0b1319", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }} />
              </div>
            </div>
            <button type="submit" style={{ background: "#c5a059", color: "#0b1319", border: "none", padding: "0.8rem 2rem", borderRadius: "4px", fontWeight: "bold" }}>Save Clinic Details</button>
          </form>
        )}

        {/* TAB 8: APPOINTMENTS */}
        {activeTab === "appointments" && (
          <div>
            <h2 style={{ color: "#c5a059", marginBottom: "1.5rem" }}>Patient Booking Inquiries ({appointmentsData.length})</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {appointmentsData.map((app) => (
                <div key={app._id} style={{ background: "#111c24", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "1.2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <strong style={{ fontSize: "1.1rem", color: "#c5a059" }}>{app.name}</strong>
                    <span style={{ fontSize: "0.8rem", color: "#a0aab2" }}>{new Date(app.createdAt).toLocaleString()}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", fontSize: "0.9rem", color: "#d1d5db" }}>
                    <p><strong>Service:</strong> {app.service}</p>
                    <p><strong>Phone:</strong> {app.phone}</p>
                    <p><strong>Email:</strong> {app.email}</p>
                    <p><strong>Preferred Date:</strong> {app.preferredDate || "N/A"}</p>
                    <p><strong>Preferred Time:</strong> {app.preferredTime || "N/A"}</p>
                  </div>
                  {app.message && <p style={{ marginTop: "0.8rem", padding: "0.6rem", background: "#0b1319", borderRadius: "4px", fontSize: "0.85rem", fontStyle: "italic" }}>"{app.message}"</p>}
                </div>
              ))}
              {appointmentsData.length === 0 && <div style={{ color: "#a0aab2" }}>No patient appointments submitted yet.</div>}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
