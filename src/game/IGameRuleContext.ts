import {IEntity} from '../library/ecs/IEntity'
import {IRuleContext} from '../library/ecs/IRuleContext'
import {MessageBroker} from '../library/messages/MessageBroker'
import {MessageEmitter} from '../library/messages/MessageEmitter'

export interface IGameRuleContext extends IRuleContext {
	entityList: IEntity[]
	messageEmitter: MessageEmitter
	messageBroker: MessageBroker
}