import {ILine} from './ILine'
import {IVector} from './IVector'
import {translateVector} from './translateVector'

export function translateLine(line: ILine, vector: IVector): ILine {
	return {
		point1: translateVector(line.point1, vector),
		point2: translateVector(line.point2, vector)
	}
}