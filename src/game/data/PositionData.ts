import {nullVector} from '../../library/algebra/nullVector'
import {Data} from '../../library/ecs/Data'
import {IVector} from '../../library/algebra/IVector'

export class PositionData extends Data {
	public constructor(public position: IVector = nullVector) {
		super()
	}
}