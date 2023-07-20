import {IPoint} from './IPoint'

export function rotateVector(point: IPoint, angle: number): IPoint {
	const sin = Math.sin(angle), cos = Math.cos(angle)
	const {x, y} = point
	return {
		x: x * cos - y * sin,
		y: x * sin + y * cos
	}
}