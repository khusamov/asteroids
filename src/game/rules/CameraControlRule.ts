import {IVector} from '../../library/algebra/IVector'
import {translateVector} from '../../library/algebra/translateVector'
import {getData} from '../../library/ecs/getData'
import {getEntityByType} from '../ecs-helpers/getEntityByType'
import {IEntity} from '../../library/ecs/IEntity'
import {IRule} from '../../library/ecs/IRule'
import {LinearVelocityData} from '../data/LinearVelocityData'
import {CameraControlMessage} from '../messages/CameraControlMessage'
import {IGameRuleContext} from '../IGameRuleContext'

/**
 * Правило управления перемещением камеры.
 */
export class CameraControlRule implements IRule {
	private entityList: IEntity[] = []

	public constructor(private linearVelocityIncrement: number = 1000) {}

	public init({messageEmitter, entityList}: IGameRuleContext) {
		this.entityList = entityList
		messageEmitter.on(CameraControlMessage, this.onCameraControlMessage.bind(this))
	}

	private get linearVelocityData(): LinearVelocityData {
		const cameraEntity = getEntityByType(this.entityList, 'camera', 'Не найдена камера')
		return getData(cameraEntity, LinearVelocityData, 'Не найдены данные о скорости камеры')
	}

	private onCameraControlMessage(message: CameraControlMessage) {
		const cancel = message.cancel ? -1 : 1
		const increment = this.linearVelocityIncrement

		let translate: IVector = {x: 0, y: 0}
		switch (message.direction) {
			case 'up': translate = {x: 0, y: -increment * cancel}; break
			case 'down': translate = {x: 0, y: +increment * cancel}; break
			case 'right': translate = {y: 0, x: +increment * cancel}; break
			case 'left': translate = {y: 0, x: -increment * cancel}; break
			default: throw new Error(`Не известное направление '${message.direction}'`)
		}
		this.linearVelocityData.linearVelocity = translateVector(this.linearVelocityData.linearVelocity, translate)
	}
}