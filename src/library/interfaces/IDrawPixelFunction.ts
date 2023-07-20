import {IVector} from '../algebra/IVector'

/**
 * Функция, которая закрашивает пиксель определенным цветом.
 */
export interface IDrawPixelFunction {
	(point: IVector, color: string): void
}