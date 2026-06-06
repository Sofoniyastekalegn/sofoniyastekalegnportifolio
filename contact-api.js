import nodemailer from 'nodemailer';

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'sofoniyastekalegn@gmail.com';

function createTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });
}

export async function sendContactEmail({ name, email, subject, message }) {
  const trimmedName = String(name || '').trim();
  const trimmedEmail = String(email || '').trim();
  const trimmedSubject = String(subject || '').trim();
  const trimmedMessage = String(message || '').trim();

  if (!trimmedName || !trimmedSubject || !trimmedMessage) {
    throw new Error('Name, subject, and message are required.');
  }

  if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    throw new Error('Please enter a valid email address.');
  }

  const transporter = createTransporter();
  if (!transporter) {
    throw new Error('Email service is not configured yet. Please try again later.');
  }

  const textBody = [
    `Sender: ${trimmedName}`,
    trimmedEmail ? `Reply-To: ${trimmedEmail}` : null,
    '',
    'Message:',
    trimmedMessage,
    '',
    '---',
    'Sent via Sofoniyas Secure Terminal Portfolio Engine',
  ]
    .filter(Boolean)
    .join('\n');

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: CONTACT_EMAIL,
    replyTo: trimmedEmail || undefined,
    subject: `[Portfolio] ${trimmedSubject}`,
    text: textBody,
    html: `
      <p><strong>Sender:</strong> ${escapeHtml(trimmedName)}</p>
      ${trimmedEmail ? `<p><strong>Reply-To:</strong> ${escapeHtml(trimmedEmail)}</p>` : ''}
      <p><strong>Subject:</strong> ${escapeHtml(trimmedSubject)}</p>
      <hr />
      <p>${escapeHtml(trimmedMessage).replace(/\n/g, '<br />')}</p>
      <hr />
      <p><em>Sent via Sofoniyas Secure Terminal Portfolio Engine</em></p>
    `,
  });
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function mountContactRoute(app) {
  app.post('/api/contact', async (req, res) => {
    try {
      await sendContactEmail(req.body);
      res.json({ success: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send message.';
      const status = message.includes('not configured') ? 503 : 400;
      res.status(status).json({ error: message });
    }
  });
}

export function createContactDevMiddleware() {
  return (req, res, next) => {
    if (req.url !== '/api/contact' || req.method !== 'POST') {
      next();
      return;
    }

    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        await sendContactEmail(payload);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true }));
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to send message.';
        const status = message.includes('not configured') ? 503 : 400;
        res.statusCode = status;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: message }));
      }
    });
  };
}
