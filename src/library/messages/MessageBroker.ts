import {IMessage} from './IMessage'
import {MessageEmitter} from './MessageEmitter'
import {TMessageConstructor} from './types'

export class MessageBroker {
	private _messageQueue: IMessage[] = []

	private clearMessageQueue() {
		this._messageQueue = []
	}

	public get messageQueue() {
		return this._messageQueue
	}

	public constructor(private messageEmitter: MessageEmitter) {}

	public publish(...message: IMessage[]) {
		this.messageQueue.push(...message)
	}

	public emit() {
		for (const message of this.messageQueue) {
			this.messageEmitter.emit(message)
		}
		this.clearMessageQueue()
	}

	/**
	 * Получить сообщение из очереди или дождаться его первого появления в очереди.
	 * @param {TMessageConstructor} MessageClass
	 * @returns {Promise<IMessage>}
	 */
	public async awaitMessage<M extends IMessage>(MessageClass: TMessageConstructor<M>): Promise<M> {
		const message = this.messageQueue.find((message): message is M => message instanceof MessageClass)
		return (
			message
				? message
				: await new Promise<M>(resolve => this.messageEmitter.once(MessageClass, resolve))
		)
	}
}