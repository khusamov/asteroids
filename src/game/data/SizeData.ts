import {Data} from '../../library/ecs/Data'
import {ISize} from '../../library/algebra/ISize'

const nullSize: ISize = {
	width: 0,
	height: 0
}

export class SizeData extends Data {
	public constructor(public size: ISize = nullSize) {
		super()
	}
}