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
