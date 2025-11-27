import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, date, time, notes } = req.body;

  if (!email || !name || !date || !time) {
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

    const details = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nDate: ${date}\nTime: ${time}\nNotes: ${notes || ''}`;
    const detailsHtml = `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'N/A'}</p><p><strong>Date:</strong> ${date}</p><p><strong>Time:</strong> ${time}</p><p><strong>Notes:</strong> ${notes || 'N/A'}</p>`;

    // Email to site
    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: siteEmail,
      subject: `New appointment requested: ${name} - ${date} ${time}`,
      text: details,
      html: `<h3>New Appointment Request</h3>${detailsHtml}`,
    });

    // Confirmation to user
    await transporter.sendMail({
      from: siteEmail,
      to: email,
      subject: 'Your appointment request received',
      text: `Hi ${name},\n\nWe received your appointment request for ${date} at ${time}. We'll confirm shortly.\n\nThanks,\nChayil SecureX`,
      html: `<p>Hi ${name},</p><p>We received your appointment request for <strong>${date}</strong> at <strong>${time}</strong>. We'll confirm shortly.</p><p>Thanks,<br>Chayil SecureX</p>`,
    });

    return res.status(200).json({ success: true, message: 'Appointment requested' });
  } catch (err) {
    console.error('Appointment email failed:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
