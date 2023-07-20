import {getData} from '../../../library/ecs/getData'
import {IEntity} from '../../../library/ecs/IEntity'
import {IRule} from '../../../library/ecs/IRule'
import {AreaData} from '../../data/AreaData'
import {SizeData} from '../../data/SizeData'
import {getEntityByType} from '../../ecs-helpers/getEntityByType'
import {IGameRuleContext} from '../../IGameRuleContext'
import {CameraZoomChangingMessage} from './CameraZoomChangingMessage'

const baseZoomIncrement = 500000
const cameraAreaMinimum = 50000
const cameraAreaMaximum = (worldSizeData: SizeData) => worldSizeData.size.width * worldSizeData.size.height * 50

export class CameraZoomChangingRule implements IRule {
	private entityList: IEntity[] = []

	public init({messageEmitter, entityList}: IGameRuleContext): void {
		this.entityList = entityList
		messageEmitter.on(CameraZoomChangingMessage, this.onCameraZoomChangingMessage)
	}

	private onCameraZoomChangingMessage = ({direction}: CameraZoomChangingMessage) => {
		const worldEntity = getEntityByType(this.entityList, 'world')
		const worldSizeData = getData(worldEntity, SizeData)
		const cameraEntity = getEntityByType(this.entityList, 'camera')
		const cameraSizeData = getData(cameraEntity, SizeData)
		const cameraAreaData = getData(cameraEntity, AreaData)

		const cameraWorldAreaRatio = cameraAreaData.area / (worldSizeData.size.width * worldSizeData.size.height)
		const zoomIncrement = direction * baseZoomIncrement * cameraWorldAreaRatio
		const newCameraArea = cameraAreaData.area + zoomIncrement

		if (newCameraArea > cameraAreaMinimum && newCameraArea < cameraAreaMaximum(worldSizeData)) {
			cameraAreaData.area = newCameraArea
			const cameraAspectRatio = cameraSizeData.size.width / cameraSizeData.size.height
			cameraSizeData.size = {
				width: Math.sqrt(newCameraArea * cameraAspectRatio),
				height: Math.sqrt(newCameraArea / cameraAspectRatio)
			}

		}
	}
}