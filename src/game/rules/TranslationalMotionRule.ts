import {translateVector} from '../../library/algebra/translateVector'
import {getData} from '../../library/ecs/getData'
import {has} from '../../library/ecs/has'
import {IEntity} from '../../library/ecs/IEntity'
import {IRule} from '../../library/ecs/IRule'
import {LinearVelocityData} from '../data/LinearVelocityData'
import {PositionData} from '../data/PositionData'
import {IGameRuleContext} from '../IGameRuleContext'
import {UpdateMessage} from '../messages/UpdateMessage'

/**
 * Все объекты, которые имееют координаты и линейную скорость на каждом кадре перемещаются.
 */
export class TranslationalMotionRule implements IRule {
	private entityList: IEntity[] = []

	public init({entityList, messageEmitter}: IGameRuleContext): void {
		this.entityList = entityList
		messageEmitter.on(UpdateMessage, this.onUpdateMessage.bind(this))
	}

	private onUpdateMessage({deltaTime}: UpdateMessage) {
		const linearVelocityEntityList = this.entityList.filter(has(LinearVelocityData))
		for (const entity of linearVelocityEntityList) {
			const positionData = getData(entity, PositionData, 'Не найдены данные о позиции объекта')
			const linearVelocityData = getData(entity, LinearVelocityData, 'Не найдены данные о скорости объекта')
			positionData.position = (
				translateVector(positionData.position, {
					x: linearVelocityData.linearVelocity.x * deltaTime,
					y: linearVelocityData.linearVelocity.y * deltaTime
				})
			)
		}
	}
}