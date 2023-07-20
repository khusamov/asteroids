import {getData} from '../../library/ecs/getData'
import {IRule} from '../../library/ecs/IRule'
import {getRandomIntegerInclusive} from '../../library/functions/getRandomIntegerInclusive'
import {PositionData} from '../data/PositionData'
import {SizeData} from '../data/SizeData'
import {filterEntityByType} from '../ecs-helpers/filterEntityByType'
import {getEntityByType} from '../ecs-helpers/getEntityByType'
import {IGameRuleContext} from '../IGameRuleContext'

/**
 * Изменить в начале игры координаты случайным образом у объектов с определенном типом.
 */
export class PositionRandomizeRule implements IRule {
	public constructor(private type: string) {}

	public init({entityList}: IGameRuleContext): void {
		const worldEntity = getEntityByType(entityList, 'world', 'Не найден объект мира')
		const worldSizeData = getData(worldEntity, SizeData, 'Не заданы размеры мира')

		const typedEntityList = filterEntityByType(entityList, this.type)
		for (const entity of typedEntityList) {
			const positionData = getData(entity, PositionData)
			positionData.position = {
				x: getRandomIntegerInclusive(0, worldSizeData.size.width),
				y: getRandomIntegerInclusive(0, worldSizeData.size.height)
			}
		}
	}
}