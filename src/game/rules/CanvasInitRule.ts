import {IRule} from '../../library/ecs/IRule'
import {IGameRuleContext} from '../IGameRuleContext'
import {CanvasCreationMessage} from '../messages/CanvasCreationMessage'

export class CanvasInitRule implements IRule {
	public init({messageBroker}: IGameRuleContext): void {
		const canvasElement = createCanvas()
		messageBroker.publish(new CanvasCreationMessage(canvasElement))
	}
}

function createCanvas() {
	const canvasElement = document.createElement('canvas')
	canvasElement.id = 'canvas'
	const bodyElement = document.getElementsByTagName('body').item(0)
	if (!bodyElement) {
		throw new Error('Не найден элемент <body>')
	}
	bodyElement.appendChild(canvasElement)
	canvasElement.height = window.innerHeight
	canvasElement.width = window.innerWidth
	return canvasElement
}