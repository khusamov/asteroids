import {IDrawPixelFunction} from '../interfaces/IDrawPixelFunction'
import {IPoint} from '../algebra/IPoint'
import {TBitmap} from '../types/TBitmap'

export function drawBitmap(data: TBitmap, offset: IPoint, colorPalette: string[], drawPixel: IDrawPixelFunction) {
	for (const line of data) {
		const y = data.indexOf(line)
		for (let x = 0; x < line.length; x++) {
			if (line[x] !== 0) {
				const point = {
					x: x + offset.x,
					y: y + offset.y
				}
				const colorIndex = (line[x] ?? 0) - 1
				drawPixel(point, colorPalette[colorIndex] ?? 'black')
			}
		}
	}
}