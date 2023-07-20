import {IVector} from './IVector'

export function translateVector(vector1: IVector, vector2: IVector): IVector {
	return {
		x: vector1.x + vector2.x,
		y: vector1.y + vector2.y
	}
}