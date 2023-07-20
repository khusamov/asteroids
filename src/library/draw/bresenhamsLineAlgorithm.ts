export interface IDrawPixelFunction {
	(x: number, y: number): void
}

/**
 * Алгоритм Брезенхе́ма для рисования линии.
 * @link https://bit.ly/3CDfLoo
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @param {IDrawPixelFunction} drawPixel
 */
export function drawLine(x1: number, y1: number, x2: number, y2: number, drawPixel: IDrawPixelFunction) {
	if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
		throw new Error('Ожидаются числа')
	}
	x1 = Math.round(x1)
	y1 = Math.round(y1)
	x2 = Math.round(x2)
	y2 = Math.round(y2)
	let deltaX = Math.abs(x2 - x1)
	let deltaY = Math.abs(y2 - y1)
	let signX = x1 < x2 ? 1 : -1
	let signY = y1 < y2 ? 1 : -1
	let error = deltaX - deltaY
	drawPixel(x2, y2)
	while (x1 !== x2 || y1 !== y2) {
		drawPixel(x1, y1)
		let error2 = error * 2
		if (error2 > -deltaY) {
			error -= deltaY
			x1 += signX
		}
		if (error2 < deltaX) {
			error += deltaX
			y1 += signY
		}
	}
	// const deltax = Math.abs(x1 - x0)
	// const deltay = Math.abs(y1 - y0)
	// let error = 0
	// let deltaerr = deltay + 1
	// let y = y0
	// let diry = y1 - y0
	// if (diry > 0) diry = 1
	// if (diry < 0) diry = -1
	// for (let x = x0; x <= x1; x++) {
	// 	drawPixel(x, y)
	// 	error += deltaerr
	// 	if (error >= deltax + 1) {
	// 		y += diry
	// 		error -= deltax + 1
	// 	}
	// }
}

/**
 * Алгоритм Брезенхе́ма для рисования окружности.
 * Этот алгоритм рисует смежные пиксели.
 * @link https://bit.ly/3CDfLoo
 * @param {number} x1
 * @param {number} y1
 * @param {number} r
 * @param {IDrawPixelFunction} drawPixel
 */
export function drawCircle(x1: number, y1: number, r: number, drawPixel: IDrawPixelFunction) {
	let x = 0
	let y = r
	let delta = 1 - 2 * r
	let error = 0
	while (y > x) {
		drawPixel(x1 + x, y1 + y)
		drawPixel(x1 + x, y1 - y)
		drawPixel(x1 - x, y1 + y)
		drawPixel(x1 - x, y1 - y)
		drawPixel(x1 + y, y1 + x)
		drawPixel(x1 + y, y1 - x)
		drawPixel(x1 - y, y1 + x)
		drawPixel(x1 - y, y1 - x)
		error = 2 * (delta + y) - 1
		if (delta < 0 && error <= 0) {
			delta += 2 * ++x + 1
			continue
		}
		if (delta > 0 && error > 0) {
			delta -= 2 * --y + 1
			continue
		}
		delta += 2 * (++x - --y)
	}
}

/**
 * Алгоритм Брезенхе́ма для рисования окружности.
 * Этот алгоритм не рисует смежные пиксели.
 * @link https://bit.ly/3CDfLoo
 * @param {number} x1
 * @param {number} y1
 * @param {number} r
 * @param {IDrawPixelFunction} drawPixel
 */
export function drawCircle2(x1: number, y1: number, r: number, drawPixel: IDrawPixelFunction) {
	let x = 0
	let y = r
	let delta = 3 - 2 * r
	while (x <= y) {
		drawPixel(x1 + x, y1 + y)
		drawPixel(x1 + x, y1 - y)
		drawPixel(x1 - x, y1 + y)
		drawPixel(x1 - x, y1 - y)
		drawPixel(x1 + y, y1 + x)
		drawPixel(x1 + y, y1 - x)
		drawPixel(x1 - y, y1 + x)
		drawPixel(x1 - y, y1 - x)
		delta += delta < 0 ? 4 * x + 6 : 4 * (x - y--) + 10
		++x
	}
}