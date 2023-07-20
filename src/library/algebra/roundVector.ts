import {IVector} from './IVector'

export function roundVector(vector: IVector): IVector {
	return {
		x: Math.round(vector.x),
		y: Math.round(vector.y)
	}
}