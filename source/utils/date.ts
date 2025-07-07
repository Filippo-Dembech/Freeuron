export function dateToString(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');        // dd
  const month = String(date.getMonth() + 1).padStart(2, '0'); // mm
  const year = date.getFullYear();                            // yyyy

  return `${day}/${month}/${year}`;
}

export function stringToDate(date: string): Date {
  const [day, month, year] = date.split('/').map(Number);

  // Basic validation
  if (!day || !month || !year) {
    throw new Error(`Invalid date format: "${date}". Expected format is "dd/mm/yyyy"`);
  }

  // Months in JS Date are 0-based, so subtract 1 from month
  return new Date(year, month - 1, day);
}

export function getPreviousDayDateString(date: string): string {
  const currentDate = stringToDate(date);

  currentDate.setDate(currentDate.getDate() - 1);

  return dateToString(currentDate);
}

export function getNextDayDateString(date: string): string {
  const currentDate = stringToDate(date);

  currentDate.setDate(currentDate.getDate() + 1);

  return dateToString(currentDate);
}

export function sameDate(firstDate: string, secondDate: string) {
  const normalize = (str: string) => str.trim(); // extend if needed later
  return normalize(firstDate) === normalize(secondDate);
}