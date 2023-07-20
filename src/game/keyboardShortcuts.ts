import {IMessage} from '../library/messages/IMessage'
import {CameraControlMessage} from './messages/CameraControlMessage'

export const keyboardShortcuts: Record<string, [IMessage, IMessage]> = {
	'KeyW': [new CameraControlMessage('up'), new CameraControlMessage('up', true)],
	'KeyS': [new CameraControlMessage('down'), new CameraControlMessage('down', true)],
	'KeyA': [new CameraControlMessage('left'), new CameraControlMessage('left', true)],
	'KeyD': [new CameraControlMessage('right'), new CameraControlMessage('right', true)]
}