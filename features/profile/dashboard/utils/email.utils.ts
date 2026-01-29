/**
 * Open default email client with pre-filled recipient
 */
export function sendEmail(email: string): void {
  window.location.href = `mailto:${email}`;
}

/**
 * Open default email client with pre-filled subject and body
 */
export function sendEmailWithContent(
  email: string,
  subject: string,
  body: string,
): void {
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
}

/**
 * Generate birthday email content
 */
export function createBirthdayEmail(name: string): {
  subject: string;
  body: string;
} {
  return {
    subject: `Happy Birthday ${name}!`,
    body: `Dear ${name},\n\nWishing you a fantastic birthday!\n\nBest regards,\nThe Team`,
  };
}

/**
 * Send birthday wish email
 */
export function sendBirthdayWish(email: string, name: string): void {
  const { subject, body } = createBirthdayEmail(name);
  sendEmailWithContent(email, subject, body);
}
