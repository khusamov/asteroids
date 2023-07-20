import {IMessage} from '../../../library/messages/IMessage'

export class CameraResizingMessage implements IMessage {
	public constructor(public readonly canvasElement: HTMLCanvasElement) {}
}