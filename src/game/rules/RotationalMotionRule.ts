import {rotateVector} from '../../library/algebra/rotateVector'
import {getData} from '../../library/ecs/getData'
import {has} from '../../library/ecs/has'
import {IEntity} from '../../library/ecs/IEntity'
import {IRule} from '../../library/ecs/IRule'
import {AngularVelocityData} from '../data/AngularVelocityData'
import {LineSpriteData} from '../data/LineSpriteData'
import {RotationData} from '../data/RotationData'
import {IGameRuleContext} from '../IGameRuleContext'
import {UpdateMessage} from '../messages/UpdateMessage'

export class RotationalMotionRule implements IRule {
	private entityList: IEntity[] = []

	public init({entityList, messageEmitter}: IGameRuleContext): void {
		this.entityList = entityList
		messageEmitter.on(UpdateMessage, this.onUpdateMessage.bind(this))
	}

	private onUpdateMessage({deltaTime}: UpdateMessage) {
		const linearVelocityEntityList = this.entityList.filter(has(AngularVelocityData))
		for (const entity of linearVelocityEntityList) {
			const rotationData = getData(entity, RotationData, 'Не найдены данные о вращении объекта')
			const angularVelocityData = getData(entity, AngularVelocityData, 'Не найдены данные о скорости вращения объекта')
			const lineSpriteData = getData(entity, LineSpriteData)

			const angle = angularVelocityData.angularVelocity * deltaTime
			rotationData.angle += angle
			for (const line of lineSpriteData.lines) {
				line.point1 = rotateVector(line.point1, angle)
				line.point2 = rotateVector(line.point2, angle)
			}
		}
	}
}