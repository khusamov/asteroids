import {IPoint} from '../algebra/IPoint'

/**
 * Конвертация полярных координат в декартовы.
 * @param {number} radius
 * @param {number} angle
 * @returns {IPoint}
 */
export function convertPolarToCartesian(radius: number, angle: number): IPoint {
	return {
		x: radius * Math.cos(angle),
		y: radius * Math.sin(angle)
	}
}