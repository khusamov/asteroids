import {IMessage} from '../../library/messages/IMessage'

export class UpdateMessage implements IMessage {
	public constructor(public readonly deltaTime: number) {}
}