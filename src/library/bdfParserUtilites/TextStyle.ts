import {Font, Bitmap} from 'bdfparser' // https://font.tomchen.org/bdfparser_js
import {encode} from 'iconv-lite'
import {ICreateStringBitmapFunction} from '../interfaces/ICreateStringBitmapFunction'

/**
 * Тип выходных данных для метода Bitmap.todata()
 * @link https://font.tomchen.org/bdfparser_js/bitmap#todata
 * @type {number}
 */
const arrayOfArraysOfNumbersDataType = 2

/**
 * Класс для создания битовых карт строки с текстом с определенными эффектами и параметрами.
 * Отдельно создавать экземпляры этого класса не требуется. Создаются при помощи FontManager.createTextStyle().
 */
export class TextStyle {
	/**
	 * @param {} font
	 * @param {string} encoding https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings
	 * @param {(bitmap: ) => } decorateFunction https://font.tomchen.org/bdfparser_js/bitmap/#clone
	 */
	public constructor(
		private font: Font,
		private encoding: string = 'koi8-r',
		private decorateFunction: (bitmap: Bitmap) => Bitmap = bitmap => bitmap
	) {}

	/**
	 * Создать битовую карту для строки.
	 * @type {ICreateStringBitmapFunction}
	 */
	public createTextBitmap: ICreateStringBitmapFunction = (
		text => {
			// Кодируем текст из UTF-8 в кодировку шрифта this.font.
			// https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings
			const encodedTextBuffer = encode(text, this.encoding)

			// Создаем битовую карту строки.
			let bitmap = this.font.drawcps(Array.from(encodedTextBuffer))

			// Применяем пользовательские преобразования к строке.
			// Пользовательские преобразования можно см. на странице:
			// https://font.tomchen.org/bdfparser_js/bitmap/#clone
			bitmap = this.decorateFunction(bitmap)

			// Преобразуем битовую карту в массив массивов чисел.
			// Где числа кодируют следующее: 0 - пусто, 1 - основной цвет, 2 - цвет обводки и т.п.
			// Коды цветов зависят от применямых преобразований.
			const data = bitmap.todata(arrayOfArraysOfNumbersDataType)

			return {
				data,
				width: bitmap.width(),
				height: bitmap.height()
			}
		}
	)
}