import {drawLine} from './bresenhamsLineAlgorithm'

export function drawGrid(step: number, width: number, height: number, drawPixel: (x: number, y: number) => void) {
	for (let x = 0; x < width; x += step) {
		drawLine(x, 0, x, height, drawPixel)
	}
	for (let y = 0; y < height; y += step) {
		drawLine(0, y, width, y, drawPixel)
	}
}