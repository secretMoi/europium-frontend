export const getCurrentTimestamp = (): number => {
	return new Date().getTime() / 1000;
}

export const dateAgo = (value: number | null): string => {
	if(!value) return '';

	const number = Number(value);

	if(number / (365 * 24 * 60 * 60) >= 1) return (number / (365 * 24 * 60 * 60)).toFixed(0) + ' ans';
	if(number / (30 * 24 * 60 * 60) >= 1) return (number / (30 * 24 * 60 * 60)).toFixed(0) + ' mois';
	if(number / (24 * 60 * 60) >= 1) return (number / (24 * 60 * 60)).toFixed(0) + ' jours';
	if(number / (60 * 60) >= 1) return (number / (60 * 60)).toFixed(0) + ' heures';
	if(number / 60 >= 1) return (number / 60).toFixed(0) + ' minutes';

	return value + ' secondes'
}
