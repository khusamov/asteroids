import {getData, getNamedData} from '../../library/ecs/getData'
import {IMessage} from '../../library/messages/IMessage'
import {NumberData} from '../../library/ecs/data/NumberData'
import {getEntityByType} from '../ecs-helpers/getEntityByType'
import {IRule} from '../../library/ecs/IRule'
import {AreaData} from '../data/AreaData'
import {PositionData} from '../data/PositionData'
import {SizeData} from '../data/SizeData'
import {IGameRuleContext} from '../IGameRuleContext'
import {CanvasCreationMessage} from '../messages/CanvasCreationMessage'

const isCanvasCreationMessage = (message: IMessage): message is CanvasCreationMessage => message instanceof CanvasCreationMessage

export class CameraInitRule implements IRule {
	public init({entityList, messageBroker, messageEmitter}: IGameRuleContext): void {
		const worldEntity = getEntityByType(entityList, 'world', 'Не найден объект мира')
		const cameraEntity = getEntityByType(entityList, 'camera', 'Не найден объект камеры')

		const worldSizeData = getData(worldEntity, SizeData, 'Не заданы размеры мира')
		const cameraAreaData = getData(cameraEntity, AreaData, 'Нет данных о площади камеры')
		const cameraPositionData = getData(cameraEntity, PositionData, 'Нет данных о позиции камеры')
		const cameraSizeData = getData(cameraEntity, SizeData, 'Нет данных о размере камеры')
		const cameraPreviusViewportWidth = getNamedData(cameraEntity, NumberData, 'previus-viewport-width')
		const cameraPreviusViewportHeight = getNamedData(cameraEntity, NumberData, 'previus-viewport-height')

		// Настройка площади камеры.
		cameraAreaData.area = worldSizeData.size.width * worldSizeData.size.height / 5

		// Настройка позиции камеры.
		cameraPositionData.position = {
			x: worldSizeData.size.width / 2,
			y: worldSizeData.size.height / 2
		}

		// Настройка размеров камеры.
		const updateSizeAndAspectRatio = (
			(canvasElement: HTMLCanvasElement) => {
				const viewportAspectRatio = canvasElement.width / canvasElement.height
				cameraSizeData.size.width = Math.sqrt(cameraAreaData.area * viewportAspectRatio)
				cameraSizeData.size.height = Math.sqrt(cameraAreaData.area / viewportAspectRatio)
				cameraPreviusViewportWidth.value = canvasElement.width
				cameraPreviusViewportHeight.value = canvasElement.height
			}
		)
		const canvasCreationMessage = messageBroker.messageQueue.find(isCanvasCreationMessage)
		if (canvasCreationMessage) {
			updateSizeAndAspectRatio(canvasCreationMessage.canvasElement)
		} else {
			messageEmitter.once(CanvasCreationMessage, ({canvasElement}) => {
				updateSizeAndAspectRatio(canvasElement)
			})
		}
	}
}