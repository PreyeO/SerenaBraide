/**
 * Format a date string or Date object to a localized date string
 */
export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString(undefined, options);
}

/**
 * Check if a date string matches today's date (month and day)
 */
export function isBirthdayToday(dobString: string | null): boolean {
  if (!dobString) return false;

  const dob = new Date(dobString);
  const today = new Date();

  return (
    dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth()
  );
}

/**
 * Check if a date is today
 */
export function isToday(date: string | Date): boolean {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const today = new Date();

  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

/**
 * Get relative time string (e.g., "2 days ago", "in 3 hours")
 */
export function getRelativeTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays === -1) return "Tomorrow";
  if (diffInDays > 0) return `${diffInDays} days ago`;
  return `In ${Math.abs(diffInDays)} days`;
}

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
