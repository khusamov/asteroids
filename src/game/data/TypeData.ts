import {Data} from '../../library/ecs/Data'

export class TypeData extends Data {
	public constructor(public type: string) {
		super()
	}
}