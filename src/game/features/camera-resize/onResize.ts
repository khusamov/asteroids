import {MessageEmitter} from '../../../library/messages/MessageEmitter'
import {CameraResizingMessage} from './CameraResizingMessage'

export function createOnResizeHandler(messageEmitter: MessageEmitter) {
	return function onResize() {
		const canvasElement = document.getElementById('canvas') as HTMLCanvasElement
		messageEmitter.emit(new CameraResizingMessage(canvasElement))
	}
}