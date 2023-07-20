import {ILine} from '../../library/algebra/ILine'
import {ISize} from '../../library/algebra/ISize'
import {IVector} from '../../library/algebra/IVector'
import {translateLine} from '../../library/algebra/translateLine'
import {getData} from '../../library/ecs/getData'
import {getEntityByType} from '../ecs-helpers/getEntityByType'
import {has} from '../../library/ecs/has'
import {IEntity} from '../../library/ecs/IEntity'
import {IRenderer} from '../../library/ecs/IRenderer'
import {IDrawLineFunction} from '../../library/interfaces/IDrawLineFunction'
import {LineSpriteData} from '../data/LineSpriteData'
import {PositionData} from '../data/PositionData'
import {SizeData} from '../data/SizeData'

export class LineRenderer implements IRenderer {
	public constructor(
		private readonly drawLine: IDrawLineFunction,
		private readonly clear: () => void,
		private readonly screenSize: ISize
	) {}

	public render(entityList: IEntity[]): void {
		const cameraEntity = getEntityByType(entityList, 'camera')
		const cameraSizeData = getData(cameraEntity, SizeData)
		if (!cameraSizeData) {
			throw new Error('Не найдены данные о размере камеры')
		}
		const cameraPositionData = getData(cameraEntity, PositionData)

		if (cameraSizeData.size.width <= 0 || cameraSizeData.size.height <= 0) {
			throw new Error('Не настроены размеры камеры')
		}

		// Масштабирование точки из мира в экран.
		const scale: IVector = {
			x: this.screenSize.width / cameraSizeData.size.width,
			y: this.screenSize.height / cameraSizeData.size.height
		}

		// Конвертация точки из мировых координат в координаты экрана.
		const transformPoint = ({x, y}: IVector): IVector => ({
			x: (x - (cameraPositionData.position.x - cameraSizeData.size.width / 2)) * scale.x,
			y: (y - (cameraPositionData.position.y - cameraSizeData.size.height / 2)) * scale.y
		})
		const transformLine = (line: ILine): ILine => ({
			point1: transformPoint(line.point1),
			point2: transformPoint(line.point2)
		})

		this.clear()

		// TODO Требуется рисовать повторы со сторон, где камера пересекает край мира для реализации бублика

		const lineSpriteDataEntityList = entityList.filter(has(LineSpriteData))
		for (const entity of lineSpriteDataEntityList) {
			const {lines, color} = getData(entity, LineSpriteData)
			const {position} = getData(entity, PositionData)
			for (const line of lines) {
				// TODO Рисовать нужно только линии, которые внутри this.screenSize или пересекают края
				this.drawLine(transformLine(translateLine(line, position)), color)
			}
		}
	}
}

