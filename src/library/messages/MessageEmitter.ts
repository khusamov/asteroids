import {EventEmitter} from 'events'
import {IMessage} from './IMessage'
import {InvalidMessageError} from './InvalidMessageError'
import {TMessageConstructor, TMessageListener} from './types'

export class MessageEmitter {
	public constructor(
		private readonly eventEmitter: EventEmitter
	) {}

	public on<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>) {
		this.addListener('on', MessageClass, listener)
	}

	public once<M extends IMessage>(MessageClass: TMessageConstructor<M>, listener: TMessageListener<M>) {
		this.addListener('once', MessageClass, listener)
	}

	public emit(message: IMessage) {
		if (message.constructor.name === 'Function') {
			throw new InvalidMessageError
		}
		this.eventEmitter.emit(message.constructor.name, message)
	}

	private addListener<M extends IMessage>(
		method: 'on' | 'once',
		MessageClass: TMessageConstructor<M>,
		listener: TMessageListener<M>
	) {
		this.eventEmitter[method](MessageClass.name, listener)
	}
}
