import {IMessage} from './IMessage'

export type TMessageConstructor<M extends IMessage = IMessage> = new(...params: any[]) => M
export type TMessageListener<M extends IMessage> = (message: M) => void