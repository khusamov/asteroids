import {IDrawPixelFunction} from '../interfaces/IDrawPixelFunction'
import {IDrawPixelShapeFunction} from '../interfaces/IDrawPixelShapeFunction'
import {ISize} from '../algebra/ISize'
import {IVector} from '../algebra/IVector'

/**
 * Создать функцию закрашивания виртуального пикселя.
 * @param {ISize} size Размер пикселя.
 * @param {number} gap Расстояние между пикселями.
 * @param {IDrawPixelShapeFunction} drawPixelShape
 * @returns {IDrawPixelFunction}
 */
export function createDrawVirtualPixelFunction(size: ISize, gap: number, drawPixelShape: IDrawPixelShapeFunction): IDrawPixelFunction {
	return (point: IVector, color: string) => drawVirtualPixel(point, size, gap, color, drawPixelShape)
}

/**
 * Закрасить виртуальный пиксель определенным цветом.
 * @param {IVector} point
 * @param {ISize} size Размер пикселя.
 * @param {number} gap Расстояние между пикселями.
 * @param {string} color
 * @param {IDrawPixelShapeFunction} drawPixelShape Функция, рисующая форму пикселя на настоящем экране.
 */
function drawVirtualPixel(point: IVector, size: ISize, gap: number, color: string, drawPixelShape: IDrawPixelShapeFunction) {
	drawPixelShape(
		{
			x: point.x * (size.width + gap),
			y: point.y * (size.height + gap)
		},
		size,
		color
	)
}