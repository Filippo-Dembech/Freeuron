export function areDatesEqual(dateStr1: string, dateStr2: string): boolean {
  const normalize = (str: string) => str.trim(); // extend if needed later
  return normalize(dateStr1) === normalize(dateStr2);
}
