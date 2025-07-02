export function dateToString(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');        // dd
  const month = String(date.getMonth() + 1).padStart(2, '0'); // mm
  const year = date.getFullYear();                            // yyyy

  return `${day}/${month}/${year}`;
}
