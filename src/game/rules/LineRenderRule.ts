import {ILine} from '../../library/algebra/ILine'
import {drawLine} from '../../library/draw/bresenhamsLineAlgorithm'
import {createDrawRectangleCanvasContext2D} from '../../library/draw/createDrawPixelShapeFunctionOnCanvasContext2D'
import {createDrawVirtualPixelFunction} from '../../library/draw/createDrawVirtualPixelFunction'
import {IEntity} from '../../library/ecs/IEntity'
import {IRenderer} from '../../library/ecs/IRenderer'
import {IRule} from '../../library/ecs/IRule'
import {CameraResizingMessage} from '../features/camera-resize/CameraResizingMessage'
import {IGameRuleContext} from '../IGameRuleContext'
import {RenderMessage} from '../messages/RenderMessage'
import {LineRenderer} from '../renderers/LineRenderer'

const virtualScreen = {
	pixel: {
		size: {
			width: 5,
			height: 5
		},
		gap: 1
	}
}

export class LineRenderRule implements IRule {
	private entityList: IEntity[] = []
	private renderer: IRenderer = {render() {}}

	public init({entityList, messageEmitter}: IGameRuleContext): void {
		this.entityList = entityList
		messageEmitter.on(RenderMessage, this.onRenderMessage.bind(this))

		const {canvasElement, context} = getCanvasInfo()
		const drawVirtualPixel = createDrawVirtualPixelFunction(
			virtualScreen.pixel.size,
			virtualScreen.pixel.gap,
			createDrawRectangleCanvasContext2D(context)
		)

		const setRenderer = () => {
			this.renderer = (
				new LineRenderer(
					(line: ILine, color: string) => {
						drawLine(
							line.point1.x,
							line.point1.y,
							line.point2.x,
							line.point2.y,
							(x: number, y: number) => drawVirtualPixel({x, y}, color)
						)
					},
					() => context.clearRect(0, 0, canvasElement.width, canvasElement.height),
					{
						// Размеры должны пересчитываться после изменения размеров canvas
						// поэтому подписываемся на CameraResizingMessage.
						width: Math.round(canvasElement.width / (virtualScreen.pixel.size.width + virtualScreen.pixel.gap)),
						height: Math.round(canvasElement.height / (virtualScreen.pixel.size.height + virtualScreen.pixel.gap))
					}
				)
			)
		}

		setRenderer()
		messageEmitter.on(CameraResizingMessage, setRenderer)
	}

	private onRenderMessage() {
		this.renderer.render(this.entityList)
	}
}

function getCanvasInfo() {
	const canvasElement = document.getElementById('canvas') as HTMLCanvasElement
	if (!(canvasElement && canvasElement instanceof HTMLCanvasElement)) {
		throw new Error('Не найден canvasElement')
	}
	const context = canvasElement.getContext('2d', {})
	if (!context) {
		throw new Error('Не найден context')
	}
	return {canvasElement, context}
}