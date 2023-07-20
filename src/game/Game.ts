import {IRule} from '../library/ecs/IRule'
import {IGameRuleContext} from './IGameRuleContext'

export class Game implements IRule {
	private readonly ruleList: IRule[]

	public constructor(...ruleList: IRule[]) {
		this.ruleList = ruleList
	}

	public init(ruleContext: IGameRuleContext) {
		for (const rule of this.ruleList) {
			if (rule.init) {
				rule.init(ruleContext)
			}
		}
	}
}