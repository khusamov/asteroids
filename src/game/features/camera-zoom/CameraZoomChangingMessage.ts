import {IMessage} from '../../../library/messages/IMessage'

export enum ZoomDirection {
	Increase = +1,
	Decrease = -1
}

export class CameraZoomChangingMessage implements IMessage {
	public constructor(public readonly direction: ZoomDirection) {}
}