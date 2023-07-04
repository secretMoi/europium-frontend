export const removeAllTextAfter = (text: string, textToSearch: string): string => {
	let index = text.toUpperCase().indexOf(textToSearch);
	if (index !== -1)
		text = text.substring(0, index);

	return text;
}

export const removeAllTextBetween = (text: string, start: string, end: string): string => {
	let startIndex = text.toUpperCase().indexOf(start);
	if (startIndex === -1) return text;
	let endIndex = text.toUpperCase().indexOf(end);
	if (endIndex === -1) return text;

	let textToKeep = text.substring(0, startIndex);
	textToKeep = textToKeep + text.substring(endIndex + 1, text.length);

	return textToKeep;
}
