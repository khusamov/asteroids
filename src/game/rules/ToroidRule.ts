import {getData} from '../../library/ecs/getData'
import {IEntity} from '../../library/ecs/IEntity'
import {getEntityByType} from '../ecs-helpers/getEntityByType'
import {IRule} from '../../library/ecs/IRule'
import {transformPositionForToroid} from '../../library/functions/transformPositionForToroid'
import {PositionData} from '../data/PositionData'
import {SizeData} from '../data/SizeData'
import {IGameRuleContext} from '../IGameRuleContext'
import {UpdateMessage} from '../messages/UpdateMessage'

/**
 * Координаты всех объектов, которые имеют PositionData, исправляются, если они вышли за пределы мира.
 * Размеры мира берутся из объекта TypeData.type === 'world'.
 */
export class ToroidRule implements IRule {
	private entityList: IEntity[] = []

	public init({entityList, messageEmitter}: IGameRuleContext): void {
		this.entityList = entityList
		messageEmitter.on(UpdateMessage, this.onUpdateMessage.bind(this))

	}

	private onUpdateMessage() {
		const worldEntity = getEntityByType(this.entityList, 'world', 'Не найден объект мира')
		const worldSizeData = getData(worldEntity, SizeData, 'Не заданы размеры мира')
		const positionEntityList = this.entityList.filter(entity => entity.find(data => data instanceof PositionData))
		for (const entity of positionEntityList) {
			const positionData = getData(entity, PositionData, 'Не найдены данные о позиции объекта')
			positionData.position = transformPositionForToroid(positionData.position, worldSizeData.size)
		}
	}
}