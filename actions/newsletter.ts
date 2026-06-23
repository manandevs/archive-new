"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const NewsletterSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  workEmail: z.string().email("Please enter a valid work email"),
  companyName: z.string().min(1, "Company name is required"),
  companySize: z.string().min(1, "Please select company size"),
  industry: z.string().min(1, "Industry is required"),
});

export type State = {
  errors?: {
    firstName?: string[];
    lastName?: string[];
    workEmail?: string[];
    companyName?: string[];
    companySize?: string[];
    industry?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function sendNewsletter(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = NewsletterSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    workEmail: formData.get("workEmail"),
    companyName: formData.get("companyName"),
    companySize: formData.get("companySize"),
    industry: formData.get("industry"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the errors below.",
    };
  }

  const { firstName, lastName, workEmail, companyName, companySize, industry } = validatedFields.data;

  try {
    await resend.emails.send({
      from: "Arbiris <onboarding@resend.dev>",
      to: "inquiries@arbiris.uk",
      replyTo: workEmail,
      subject: `Whitepaper Request — ${firstName} ${lastName} · ${companyName}`,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>2026 AI Liability Whitepaper Request</title>
</head>
<body style="margin:0;padding:0;background-color:#08090A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#08090A;padding:48px 24px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;width:100%;background-color:#0D0E10;border:1px solid rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="padding:28px 40px;border-bottom:1px solid rgba(255,255,255,0.06);background-color:#0A0B0C;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td>
                    <span style="font-size:18px;font-weight:700;color:#F7F8F8;letter-spacing:-0.02em;">Arbiris</span>
                    <span style="margin-left:10px;font-size:11px;color:#FF9900;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;">AI Governance Platform</span>
                  </td>
                  <td align="right">
                    <span style="display:inline-block;padding:4px 10px;background-color:rgba(255,153,0,0.12);border:1px solid rgba(255,153,0,0.25);border-radius:4px;font-size:11px;font-weight:600;color:#FF9900;text-transform:uppercase;letter-spacing:0.08em;">Whitepaper Request</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Title block -->
          <tr>
            <td style="padding:32px 40px 24px;">
              <p style="margin:0 0 6px;font-size:11px;font-weight:600;color:#FF9900;text-transform:uppercase;letter-spacing:0.1em;">New Submission</p>
              <h1 style="margin:0;font-size:22px;font-weight:600;color:#F7F8F8;line-height:1.35;letter-spacing:-0.02em;">2026 AI Liability Whitepaper</h1>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:0 40px;"><div style="height:1px;background-color:rgba(255,255,255,0.06);"></div></td></tr>

          <!-- Contact -->
          <tr>
            <td style="padding:24px 40px 0;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:600;color:#8A8F98;text-transform:uppercase;letter-spacing:0.1em;">Contact Details</p>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="padding-bottom:16px;">
                    <p style="margin:0 0 2px;font-size:13px;color:#8A8F98;">Full Name</p>
                    <p style="margin:0;font-size:16px;font-weight:500;color:#F7F8F8;">${firstName} ${lastName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:16px;">
                    <p style="margin:0 0 2px;font-size:13px;color:#8A8F98;">Work Email</p>
                    <a href="mailto:${workEmail}" style="font-size:16px;font-weight:500;color:#FF9900;text-decoration:none;">${workEmail}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Divider -->
          <tr><td style="padding:8px 40px 0;"><div style="height:1px;background-color:rgba(255,255,255,0.06);"></div></td></tr>

          <!-- Organisation -->
          <tr>
            <td style="padding:24px 40px 0;">
              <p style="margin:0 0 12px;font-size:11px;font-weight:600;color:#8A8F98;text-transform:uppercase;letter-spacing:0.1em;">Organisation</p>
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="padding-bottom:16px;">
                    <p style="margin:0 0 2px;font-size:13px;color:#8A8F98;">Company</p>
                    <p style="margin:0;font-size:16px;font-weight:500;color:#F7F8F8;">${companyName}</p>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding-bottom:16px;padding-right:16px;">
                    <p style="margin:0 0 2px;font-size:13px;color:#8A8F98;">Company Size</p>
                    <p style="margin:0;font-size:16px;font-weight:500;color:#F7F8F8;">${companySize}</p>
                  </td>
                  <td width="50%" style="padding-bottom:16px;">
                    <p style="margin:0 0 2px;font-size:13px;color:#8A8F98;">Industry</p>
                    <p style="margin:0;font-size:16px;font-weight:500;color:#F7F8F8;">${industry}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.06);margin-top:8px;">
              <p style="margin:0;font-size:12px;color:#8A8F98;line-height:1.6;">
                Submitted via <a href="https://arbiris.uk" style="color:#FF9900;text-decoration:none;">arbiris.uk</a> ·
                Reply to this email to contact ${firstName} directly at
                <a href="mailto:${workEmail}" style="color:#FF9900;text-decoration:none;">${workEmail}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    });

    return {
      success: true,
      message: "Request received. We'll send the whitepaper to your inbox shortly.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again or email us directly.",
    };
  }
}
