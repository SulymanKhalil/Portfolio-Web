import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "sulymankhalil.dev@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "Entering Sulyman <onboarding@resend.dev>";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  device: string;
  timezone: string;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  let body: Partial<ContactPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { name, email, subject, message, timestamp, device, timezone } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set. Add it to your environment to enable the contact form."
    );
    return NextResponse.json(
      { error: "Contact channel is not configured yet." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const html = `
    <div style="font-family: -apple-system, sans-serif; background:#05070C; color:#f3f6fb; padding:32px; border-radius:16px;">
      <p style="color:#4de8d6; font-size:11px; letter-spacing:2px; text-transform:uppercase; margin:0 0 16px;">New transmission — Entering Sulyman</p>
      <h2 style="margin:0 0 20px; font-size:20px;">${escapeHtml(subject)}</h2>
      <p style="margin:0 0 6px;"><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
      <p style="margin:0 0 20px; white-space:pre-wrap; line-height:1.6;">${escapeHtml(message)}</p>
      <hr style="border:none; border-top:1px solid rgba(255,255,255,0.1); margin:20px 0;" />
      <p style="color:#8b93a7; font-size:11px; margin:0;">Sent: ${escapeHtml(timestamp ?? "")}</p>
      <p style="color:#8b93a7; font-size:11px; margin:4px 0 0;">Timezone: ${escapeHtml(timezone ?? "")}</p>
      <p style="color:#8b93a7; font-size:11px; margin:4px 0 0;">Device: ${escapeHtml(device ?? "")}</p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
