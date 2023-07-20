/**
 * Случайное целое число из диапазона.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function getRandomIntegerInclusive(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
}