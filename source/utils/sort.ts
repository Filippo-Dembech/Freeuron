export function alphabetically(a?: string, b?: string): number {
	return a?.toLowerCase().localeCompare(b?.toLowerCase() || '') || 0;
}
