import {IPoint} from '../algebra/IPoint'
import {convertPolarToCartesian} from './convertPolarToCartesian'
import {getRandomIntegerInclusive} from './getRandomIntegerInclusive'

/**
 * Генерация случайного полигона.
 * @param {number} vertexCount
 * @param {number} minRadius
 * @param {number} maxRadius
 * @returns {Array<IPoint>}
 */
export function generateRandomPolygon(vertexCount: number, minRadius: number, maxRadius: number): Array<IPoint> {
	const result = []
	const angleStep = Math.PI * 2 / vertexCount
	for (let angle = 0; angle < Math.PI * 2; angle += angleStep) {
		const radius = getRandomIntegerInclusive(minRadius, maxRadius)
		result.push(convertPolarToCartesian(radius, angle))
	}
	return result
}