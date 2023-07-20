import {Data} from '../../library/ecs/Data'

export class AngularVelocityData extends Data {
	public constructor(public angularVelocity: number) {
		super()
	}
}