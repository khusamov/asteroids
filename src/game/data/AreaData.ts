import {Data} from '../../library/ecs/Data'

// TODO Заменить на NumberData

export class AreaData extends Data {
	public constructor(public area: number) {
		super()
	}
}