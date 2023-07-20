import {IMessage} from '../../library/messages/IMessage'

export class CameraControlMessage implements IMessage {
	public constructor(
		public readonly direction: 'up' | 'down' | 'left' | 'right',
		public readonly cancel: boolean = false
	) {}
}