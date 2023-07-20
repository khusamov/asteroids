import {Data} from '../../library/ecs/Data'

export class RotationData extends Data {
	public constructor(public angle: number) {
		super()
	}
}