import {IMessage} from '../../library/messages/IMessage'

export class CanvasCreationMessage implements IMessage {
	public constructor(public readonly canvasElement: HTMLCanvasElement) {}
}