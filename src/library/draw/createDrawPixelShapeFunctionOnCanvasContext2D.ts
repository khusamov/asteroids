import {IDrawPixelShapeFunction} from '../interfaces/IDrawPixelShapeFunction'
import {ISize} from '../algebra/ISize'
import {IVector} from '../algebra/IVector'

export function createDrawRectangleCanvasContext2D(context: CanvasRenderingContext2D): IDrawPixelShapeFunction {
	return (
		(point: IVector, size: ISize, color: string) => {
			// point = roundVector(point)
			// size = roundSize(size)

			context.beginPath()
			context.fillStyle = color
			context.fillRect(point.x, point.y, size.width, size.height)
		}
	)
}

export function createDrawCircleCanvasContext2D(context: CanvasRenderingContext2D): IDrawPixelShapeFunction {
	return (
		(point: IVector, size: ISize, color: string) => {
			// point = roundVector(point)
			// size = roundSize(size)

			context.beginPath()
			context.fillStyle = color
			context.arc(point.x, point.y, size.width / 2, 0, Math.PI * 2)
			context.fill()
		}
	)
}
