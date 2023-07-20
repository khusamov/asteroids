import {IMessage} from '../../library/messages/IMessage'

export class RenderMessage implements IMessage {
	public constructor(public readonly deltaTime: number) {}
}