export const last = <T>(array: T[]): T => {
	return array[array.length - 1];
};

export const sortByProperty = <T>(array: T[], property: keyof T, reverse: boolean = false): T[] => {
	let reverseValue: number = reverse ? -1 : 1;

	return array.sort((a, b) => {
		if (a[property] == null)
			return reverseValue;

		if (b[property] == null)
			return -1 * reverseValue;

		return (a[property] < b[property] ? -1 : 1) * reverseValue;
	});
}

export const dynamicSort = <T>(array: T[], property: string, reverse: boolean = false): T[] => {
	let order = 1;
	if (reverse) order = -1;

	return array.sort(function (a: any, b: any) {
		// works with strings and numbers
		let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * order;
	});
}

export const removeElement = <T>(array: T[], elementToRemove: T): T[] => {
	let indexOfElement = array.indexOf(elementToRemove);

	if (indexOfElement > -1)
		array.splice(indexOfElement, 1);

	return array;
}

export const getDistinctValuesByProperty = <T>(inputArray: T[], propertyName: keyof T): T[] => {
	const uniqueValuesMap: Map<T[keyof T], T> = new Map();

	for (const item of inputArray) {
		const propertyValue = item[propertyName];
		uniqueValuesMap.set(propertyValue, item);
	}

	return Array.from(uniqueValuesMap.values());
}
