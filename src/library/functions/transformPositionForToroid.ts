import {modVector} from '../algebra/modVector'
import {translateVector} from '../algebra/translateVector'
import {ISize} from '../algebra/ISize'
import {IVector} from '../algebra/IVector'

/**
 * Специальная функция для корректировки координат движущихся объектов
 * с целью создания замкнутого пространства типа бублик.
 * @link https://github.com/khusamov/solid-futurio-ru-game/blob/main/packages/khusamov-mechanical-motion/src/functions/transformPositionForToroid.ts
 */
export function transformPositionForToroid(position: IVector, {width, height}: ISize): IVector {
	// Ограничить по положительной полуоси.
	const result = modVector(position, {x: width, y: height})
	// Ограничить по отрицательной полуоси.
	return translateVector(result, {
		x: result.x < 0 ? width : 0,
		y: result.y < 0 ? height : 0
	})
}
