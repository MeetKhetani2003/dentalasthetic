"use client";

import { useMemo, useState } from "react";
import { treatments } from "@/lib/dermadent-data";

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  service: treatments[0]?.shortTitle ?? "Consultation",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

export function AppointmentForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const progress = useMemo(() => (step / 3) * 100, [step]);

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async () => {
    setStatus("loading");
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Unable to submit");
      setStatus("success");
      setForm(initialState);
      setStep(3);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="booking-card" data-reveal>
      <div className="booking-card__progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="booking-card__header">
        <p className="eyebrow">Consultation request</p>
        <h2>{status === "success" ? "Your private request has been received." : "Design your first visit."}</h2>
        <p>
          {status === "success"
            ? "Our concierge will contact you shortly with availability and preparation notes."
            : "A minimal, discreet form so our doctors can prepare a thoughtful first conversation."}
        </p>
      </div>

      {status === "success" ? (
        <div className="confirmation-orbit" aria-live="polite">
          <span>✓</span>
          <strong>Confirmed</strong>
          <button type="button" onClick={() => { setStatus("idle"); setStep(1); }}>Book another consultation</button>
        </div>
      ) : (
        <form onSubmit={(event) => { event.preventDefault(); void submit(); }}>
          {step === 1 ? (
            <div className="booking-step">
              <label>
                Full name
                <input required value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" />
              </label>
              <label>
                Email
                <input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="name@example.com" />
              </label>
              <label>
                Phone
                <input required value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="+91" />
              </label>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="booking-step booking-step--split">
              <label>
                Treatment interest
                <select value={form.service} onChange={(event) => update("service", event.target.value)}>
                  {treatments.map((treatment) => (
                    <option key={treatment.slug} value={treatment.shortTitle}>{treatment.shortTitle}</option>
                  ))}
                  <option>Not sure yet</option>
                </select>
              </label>
              <label>
                Preferred date
                <input type="date" value={form.preferredDate} onChange={(event) => update("preferredDate", event.target.value)} />
              </label>
              <label>
                Preferred time
                <select value={form.preferredTime} onChange={(event) => update("preferredTime", event.target.value)}>
                  <option value="">Flexible</option>
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>
              </label>
              <label className="booking-step__wide">
                What would you like to refine?
                <textarea value={form.message} onChange={(event) => update("message", event.target.value)} placeholder="Skin, smile, hair, laser, event date, or concerns..." />
              </label>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="booking-review">
              <p className="eyebrow">Review</p>
              <dl>
                <div><dt>Name</dt><dd>{form.name || "—"}</dd></div>
                <div><dt>Service</dt><dd>{form.service}</dd></div>
                <div><dt>Preferred</dt><dd>{form.preferredDate || "Flexible"} · {form.preferredTime || "Any time"}</dd></div>
              </dl>
              <p>By submitting, you request a private consultation. Medical suitability is confirmed by the doctor during your visit.</p>
              {status === "error" ? <strong className="form-error">Something went wrong. Please try again.</strong> : null}
            </div>
          ) : null}

          <div className="booking-actions">
            {step > 1 ? <button type="button" onClick={() => setStep((current) => current - 1)}>Back</button> : <span />}
            {step < 3 ? (
              <button type="button" onClick={() => setStep((current) => current + 1)}>Continue</button>
            ) : (
              <button type="submit" disabled={status === "loading"}>{status === "loading" ? "Sending..." : "Send request"}</button>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
