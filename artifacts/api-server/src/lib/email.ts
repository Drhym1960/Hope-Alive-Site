import nodemailer from "nodemailer";
import { logger } from "./logger";

const ADMIN_EMAIL = "hacs1960@gmail.com";
const FOUNDATION_EMAIL = "hacsfoundation10@gmail.com";

function createTransport() {
  const smtpHost = process.env["SMTP_HOST"];
  const smtpUser = process.env["SMTP_USER"];
  const smtpPass = process.env["SMTP_PASS"];
  const smtpPort = Number(process.env["SMTP_PORT"] || "587");

  if (!smtpHost || !smtpUser || !smtpPass) {
    return null;
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });
}

export async function sendAdminDonationNotification(donation: {
  id: number;
  donorName?: string | null;
  donorEmail?: string | null;
  amount: string | number;
  currency: string;
  paymentMethod: string;
  purpose?: string | null;
  isAnonymous: boolean;
}) {
  const transporter = createTransport();
  if (!transporter) {
    logger.info("SMTP not configured — skipping admin notification");
    return;
  }

  const name = donation.isAnonymous ? "Anonymous" : (donation.donorName || "Unknown");
  const amtFormatted = `${donation.currency} ${Number(donation.amount).toLocaleString()}`;

  try {
    await transporter.sendMail({
      from: `"HACS Foundation" <${FOUNDATION_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `New Donation Received — ${amtFormatted}`,
      html: `
        <h2>New Donation Received</h2>
        <table cellpadding="8" style="border-collapse:collapse;">
          <tr><td><strong>Donor Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${donation.donorEmail || "Not provided"}</td></tr>
          <tr><td><strong>Amount</strong></td><td>${amtFormatted}</td></tr>
          <tr><td><strong>Payment Method</strong></td><td>${donation.paymentMethod}</td></tr>
          <tr><td><strong>Purpose</strong></td><td>${donation.purpose || "General donation"}</td></tr>
          <tr><td><strong>Donation ID</strong></td><td>#${donation.id}</td></tr>
        </table>
        <p>Visit the admin dashboard to view all donations.</p>
        <p><em>Hope Alive Children Spring Foundation — Giving Love a Chance</em></p>
      `,
    });
    logger.info({ donationId: donation.id }, "Admin notification email sent");
  } catch (err) {
    logger.error({ err }, "Failed to send admin notification email");
  }
}

export async function sendDonorReceipt(donation: {
  id: number;
  donorName?: string | null;
  donorEmail?: string | null;
  amount: string | number;
  currency: string;
  paymentMethod: string;
  purpose?: string | null;
}) {
  if (!donation.donorEmail) return;

  const transporter = createTransport();
  if (!transporter) {
    logger.info("SMTP not configured — skipping donor receipt");
    return;
  }

  const name = donation.donorName || "Valued Donor";
  const amtFormatted = `${donation.currency} ${Number(donation.amount).toLocaleString()}`;

  try {
    await transporter.sendMail({
      from: `"Hope Alive Children Spring Foundation" <${FOUNDATION_EMAIL}>`,
      to: donation.donorEmail,
      subject: `Thank You for Your Donation — ${amtFormatted}`,
      html: `
        <div style="font-family:Georgia,serif;max-width:600px;margin:auto;">
          <h1 style="color:#2d6a4f;">Thank You, ${name}!</h1>
          <p>Your generous donation of <strong>${amtFormatted}</strong> has been received and will go directly toward supporting orphans and vulnerable children in Makurdi, Benue State, Nigeria.</p>
          <h3>Donation Details</h3>
          <table cellpadding="8">
            <tr><td><strong>Amount</strong></td><td>${amtFormatted}</td></tr>
            <tr><td><strong>Payment Method</strong></td><td>${donation.paymentMethod}</td></tr>
            <tr><td><strong>Purpose</strong></td><td>${donation.purpose || "General donation"}</td></tr>
            <tr><td><strong>Reference</strong></td><td>#${donation.id}</td></tr>
          </table>
          <p>Your support means the world to these children. Through your generosity, we are able to provide food, shelter, education, and love to those who need it most.</p>
          <p>For questions or concerns, please contact us at <a href="mailto:hacsfoundation10@gmail.com">hacsfoundation10@gmail.com</a></p>
          <p style="color:#555;font-style:italic;">With deep gratitude,<br/>Hope Alive Children Spring Foundation<br/>"Giving Love a Chance"</p>
        </div>
      `,
    });
    logger.info({ donationId: donation.id }, "Donor receipt email sent");
  } catch (err) {
    logger.error({ err }, "Failed to send donor receipt");
  }
}
