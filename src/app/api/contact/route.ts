import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, location, message } = body;

    // Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const submissionTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    let strapiSaved = false;
    let emailSent = false;

    // 1. Save to Strapi Database
    const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://ceaibackend.elroiitsolutions.com';
    const strapiEndpoint = `${strapiBaseUrl.replace(/\/+$/, '')}/api/inquiries`;

    try {
      const strapiHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (process.env.STRAPI_API_TOKEN) {
        strapiHeaders['Authorization'] = `Bearer ${process.env.STRAPI_API_TOKEN}`;
      }

      const strapiRes = await fetch(strapiEndpoint, {
        method: 'POST',
        headers: strapiHeaders,
        body: JSON.stringify({
          data: {
            name,
            email,
            phone: phone || '',
            location: location || '',
            message,
            status: 'New',
          },
        }),
      });

      if (strapiRes.ok) {
        strapiSaved = true;
        console.log(`[Contact Form] Successfully saved inquiry to Strapi at ${strapiEndpoint}`);
      } else {
        const errText = await strapiRes.text().catch(() => '');
        console.warn(`[Contact Form] Strapi inquiry creation returned ${strapiRes.status}: ${errText}`);
      }
    } catch (strapiErr) {
      console.error('[Contact Form] Error saving to Strapi:', strapiErr);
    }

    // 2. Send Email Alert via Nodemailer
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    const recipientEmails = process.env.CONTACT_EMAIL_TO || 'rajesh@zilei.com.tw, info@itbca.org';

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const htmlTemplate = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
            <div style="background-color: #0b1e3b; padding: 24px; text-align: center;">
              <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px;">FCIEAC Website Inquiry</h2>
              <p style="color: #cbd5e1; margin: 6px 0 0 0; font-size: 13px;">New message received from Contact Us form</p>
            </div>
            
            <div style="padding: 24px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569; width: 30%;">Name:</td>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Email:</td>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><a href="mailto:${email}" style="color: #F97316; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Phone:</td>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Location:</td>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${location || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #475569;">Received:</td>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px;">${submissionTime} (IST)</td>
                </tr>
              </table>

              <div style="margin-top: 16px;">
                <h4 style="margin: 0 0 8px 0; color: #334155; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Message:</h4>
                <div style="background-color: #f8fafc; border-left: 4px solid #F97316; padding: 16px; border-radius: 4px; color: #1e293b; line-height: 1.6; white-space: pre-wrap; font-size: 14px;">${message}</div>
              </div>
            </div>

            <div style="background-color: #f1f5f9; padding: 14px 24px; text-align: center; font-size: 12px; color: #64748b;">
              FCIEAC - Formosa Cultural & Information Exchange Association Chennai
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: `"FCIEAC Website" <${smtpUser}>`,
          to: recipientEmails,
          replyTo: email,
          subject: `[New Inquiry] ${name} - ${location || 'Website Contact'}`,
          html: htmlTemplate,
          text: `New inquiry from ${name} (${email}, Phone: ${phone || 'N/A'}, Location: ${location || 'N/A'}):\n\n${message}`,
        });

        emailSent = true;
        console.log(`[Contact Form] Email successfully dispatched to: ${recipientEmails}`);
      } catch (emailErr) {
        console.error('[Contact Form] Error sending email notification:', emailErr);
      }
    } else {
      console.log('[Contact Form] SMTP credentials not set in environment variables. Inquiry received:');
      console.log({ name, email, phone, location, message, time: submissionTime });
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully.',
      strapiSaved,
      emailSent,
    });
  } catch (error: any) {
    console.error('[Contact Form] Submission error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
