const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'sofoniyastekalegn@gmail.com';

function normalizeEnv(value) {
  if (!value) return '';
  return String(value).trim().replace(/^["']|["']$/g, '');
}

function normalizePassword(value) {
  return normalizeEnv(value).replace(/\s/g, '');
}

function mapDeliveryError(error) {
  const raw = error instanceof Error ? error.message : String(error);
  const lower = raw.toLowerCase();

  if (lower.includes('invalid login') || lower.includes('authentication') || lower.includes('535')) {
    return 'Email login failed on the server. Use a Gmail App Password with no spaces, or switch to WEB3FORMS_ACCESS_KEY in Hostinger env vars.';
  }

  if (lower.includes('web3forms')) {
    return raw;
  }

  if (lower.includes('not configured')) {
    return raw;
  }

  return 'Could not send your message right now. Please try again in a moment.';
}

async function sendViaWeb3Forms({ name, email, subject, message }) {
  const accessKey = normalizeEnv(process.env.WEB3FORMS_ACCESS_KEY);
  if (!accessKey) {
    throw new Error('Email service is not configured yet. Please try again later.');
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `[Portfolio] ${subject}`,
      from_name: name,
      name,
      email,
      message: [
        `Sender: ${name}`,
        `Reply-To: ${email}`,
        '',
        'Message:',
        message,
        '',
        '---',
        'Sent via Sofoniyas Secure Terminal Portfolio Engine',
      ].join('\n'),
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Web3Forms delivery failed.');
  }
}

async function sendViaSmtp({ name, email, subject, message }) {
  const nodemailer = await import('nodemailer');

  const user = normalizeEnv(process.env.SMTP_USER);
  const pass = normalizePassword(process.env.SMTP_PASS);

  if (!user || !pass) {
    throw new Error('Email service is not configured yet. Please try again later.');
  }

  const configuredPort = normalizeEnv(process.env.SMTP_PORT);
  const port = configuredPort ? Number(configuredPort) : 465;
  const secure = port === 465;

  const transporter = nodemailer.default.createTransport({
    host: normalizeEnv(process.env.SMTP_HOST) || 'smtp.gmail.com',
    port,
    secure,
    auth: { user, pass },
    tls: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true,
    },
  });

  const textBody = [
    `Sender: ${name}`,
    email ? `Reply-To: ${email}` : null,
    '',
    'Message:',
    message,
    '',
    '---',
    'Sent via Sofoniyas Secure Terminal Portfolio Engine',
  ]
    .filter(Boolean)
    .join('\n');

  await transporter.sendMail({
    from: `"Portfolio Contact" <${user}>`,
    to: CONTACT_EMAIL,
    replyTo: email || undefined,
    subject: `[Portfolio] ${subject}`,
    text: textBody,
    html: `
      <p><strong>Sender:</strong> ${escapeHtml(name)}</p>
      ${email ? `<p><strong>Reply-To:</strong> ${escapeHtml(email)}</p>` : ''}
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <hr />
      <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      <hr />
      <p><em>Sent via Sofoniyas Secure Terminal Portfolio Engine</em></p>
    `,
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

  if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    throw new Error('Please enter a valid email address.');
  }

  const payload = {
    name: trimmedName,
    email: trimmedEmail,
    subject: trimmedSubject,
    message: trimmedMessage,
  };

  try {
    if (normalizeEnv(process.env.WEB3FORMS_ACCESS_KEY)) {
      await sendViaWeb3Forms(payload);
      return;
    }

    await sendViaSmtp(payload);
  } catch (error) {
    throw new Error(mapDeliveryError(error));
  }
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
