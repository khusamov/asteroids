import {Bitmap, Font} from 'bdfparser/dist/types'
import {loadFont} from './loadFont'
import {TextStyle} from './TextStyle'

interface IFontInfo {
	font: Font
	encoding: string
}

interface IDecorateFunction {
	(bitmap: Bitmap): Bitmap
}

const identityFunction = (value: any) => value

/**
 * Загрузчик шрифтов и создатель сборщиков битовых карт строк.
 */
export class FontManager {
	private fontList: Record<string, IFontInfo> = {}

	/**
	 * Загрузить шрифт.
	 * @param {string} fontName Имя шрифта. Используется в createTextStyle().
	 * @param encoding Кодировка шрифта https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings
	 * @param {string} fileName Путь к файлу шрифта.
	 * @returns {Promise<void>}
	 */
	public async loadFont(fontName: string, encoding: string, fileName: string, ) {
		this.fontList[fontName] = {
			font: await loadFont(fileName),
			encoding
		}
	}

	/**
	 * Создать сборщик битовых карт для строк.
	 * @param {string} fontName Имя шрифта.
	 * @param {IDecorateFunction} decorateFunction Пользовательские преобразования текста.
	 * @returns {TextStyle}
	 */
	public createTextStyle(fontName: string, decorateFunction: IDecorateFunction = identityFunction) {
		const fontInfo = this.fontList[fontName]
		if (!fontInfo) {
			throw new Error(`Не найден шрифт '${fontName}'`)
		}
		const {font, encoding} = fontInfo
		return new TextStyle(font, encoding, decorateFunction)
	}
}