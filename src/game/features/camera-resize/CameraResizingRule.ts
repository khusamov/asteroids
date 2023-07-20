import {getData, getNamedData} from '../../../library/ecs/getData'
import {IEntity} from '../../../library/ecs/IEntity'
import {IRule} from '../../../library/ecs/IRule'
import {NumberData} from '../../../library/ecs/data/NumberData'
import {AreaData} from '../../data/AreaData'
import {SizeData} from '../../data/SizeData'
import {getEntityByType} from '../../ecs-helpers/getEntityByType'
import {IGameRuleContext} from '../../IGameRuleContext'
import {CameraResizingMessage} from './CameraResizingMessage'

export class CameraResizingRule implements IRule {
	private entityList: IEntity[] = []

	public init({messageEmitter, entityList}: IGameRuleContext): void {
		this.entityList = entityList
		messageEmitter.on(CameraResizingMessage, this.onCameraResizingMessage)
	}

	private onCameraResizingMessage = ({canvasElement}: CameraResizingMessage) => {
		const cameraEntity = getEntityByType(this.entityList, 'camera')
		const cameraSizeData = getData(cameraEntity, SizeData)
		const cameraAreaData = getData(cameraEntity, AreaData, 'Нет данных о площади камеры')
		const cameraPreviusViewportWidth = getNamedData(cameraEntity, NumberData, 'previus-viewport-width')
		const cameraPreviusViewportHeight = getNamedData(cameraEntity, NumberData, 'previus-viewport-height')

		canvasElement.width = window.innerWidth
		canvasElement.height = window.innerHeight

		cameraSizeData.size = {
			width: cameraSizeData.size.width * canvasElement.width / cameraPreviusViewportWidth.value,
			height: cameraSizeData.size.height * canvasElement.height / cameraPreviusViewportHeight.value
		}

		cameraPreviusViewportWidth.value = canvasElement.width
		cameraPreviusViewportHeight.value = canvasElement.height


		cameraAreaData.area = cameraSizeData.size.width * cameraSizeData.size.height

	}
}