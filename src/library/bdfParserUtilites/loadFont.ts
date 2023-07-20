import fetchline from 'fetchline'
import {$Font, Font} from 'bdfparser'

/**
 * Асинхронная загрузка шрифта.
 * @link https://font.tomchen.org/bdfparser_js
 * @param {string} filename Путь к файлу шрифта.
 * @returns {Promise<Font>}
 */
export async function loadFont(filename: string): Promise<Font> {
	const data = fetchline(filename)

	const font = await $Font(data)

	if (!font) {
		throw new Error(`Не удалось загрузить шрифт '${filename}'`)
	}

	return font
}