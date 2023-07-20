import {MessageEmitter} from '../../../library/messages/MessageEmitter'
import {CameraZoomChangingMessage, ZoomDirection} from './CameraZoomChangingMessage'

export function createOnWheelHandler(messageEmitter: MessageEmitter) {
	return function onWheel(wheelEvent: WheelEvent) {
		messageEmitter.emit(
			new CameraZoomChangingMessage(
				wheelEvent.deltaY > 0
					? ZoomDirection.Increase
					: ZoomDirection.Decrease
			)
		)
	}
}