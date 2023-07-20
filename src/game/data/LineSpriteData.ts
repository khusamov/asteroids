import {Data} from '../../library/ecs/Data'
import {ILine} from '../../library/algebra/ILine'

export class LineSpriteData extends Data {
	public constructor(public lines: ILine[], public color: string = 'blue') {
		super()
	}
}