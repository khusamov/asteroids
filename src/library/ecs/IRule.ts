import {IRuleContext} from './IRuleContext'

export interface IRule {
	init(context: IRuleContext): void
}