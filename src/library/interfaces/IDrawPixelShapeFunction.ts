import {ISize} from '../algebra/ISize'
import {IVector} from '../algebra/IVector'

export interface IDrawPixelShapeFunction {
	(point: IVector, size: ISize, color: string): void
}