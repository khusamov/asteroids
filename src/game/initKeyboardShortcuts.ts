import {IMessage} from '../library/messages/IMessage'
import {MessageEmitter} from '../library/messages/MessageEmitter'
import {createOnResizeHandler} from './features/camera-resize/onResize'
import {createOnWheelHandler} from './features/camera-zoom/onWheel'

export function initKeyboardShortcuts(messageEmitter: MessageEmitter, keyboardShortcuts: Record<string, [IMessage, IMessage]>) {
	window.addEventListener('keydown', onKeyDown)
	window.addEventListener('keyup', onKeyUp)
	window.addEventListener('wheel', createOnWheelHandler(messageEmitter))
	window.addEventListener('resize', createOnResizeHandler(messageEmitter))

	function onKeyDown(event: KeyboardEvent) {
		if (event.repeat) {
			return
		}

		const messages = keyboardShortcuts[event.code]
		if (messages) {
			messageEmitter.emit(messages[0])
		}
	}

	function onKeyUp(event: KeyboardEvent) {
		if (event.repeat) {
			return
		}

		const messages = keyboardShortcuts[event.code]
		if (messages) {
			messageEmitter.emit(messages[1])
		}
	}
}