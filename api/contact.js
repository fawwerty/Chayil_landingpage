import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, message } = req.body;

  if (!email || !name || !message) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || process.env.ETHEREAL_USER,
        pass: process.env.SMTP_PASS || process.env.ETHEREAL_PASS,
      },
    });

    const siteEmail = process.env.SITE_EMAIL || 'info@chayilsecurex.com';

    // Mail to site
    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: siteEmail,
      subject: `Contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'N/A'}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
    });

    // Acknowledgement to user
    await transporter.sendMail({
      from: siteEmail,
      to: email,
      subject: 'We received your message',
      text: `Hi ${name},\n\nThank you for contacting Chayil SecureX. We have received your message and will get back to you shortly.\n\nBest regards,\nChayil SecureX`,
      html: `<p>Hi ${name},</p><p>Thank you for contacting Chayil SecureX. We have received your message and will get back to you shortly.</p><p>Best regards,<br>Chayil SecureX</p>`,
    });

    return res.status(200).json({ success: true, message: 'Messages sent' });
  } catch (err) {
    console.error('Contact email failed:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
