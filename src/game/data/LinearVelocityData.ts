import {Data} from '../../library/ecs/Data'
import {IVector} from '../../library/algebra/IVector'

const nullVector: IVector = {
	x: 0,
	y: 0
}

export class LinearVelocityData extends Data {
	public constructor(public linearVelocity: IVector = nullVector) {
		super()
	}
}