export function deleteLastWord(str: string): string {
	return str.trimEnd().split(' ').slice(0, -1).join(' ');
}

export function removeLastLetter(str: string): string {
	return str.slice(0, -1);
}
