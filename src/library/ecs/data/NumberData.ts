import {Data} from '../Data'

export class NumberData extends Data {
	public constructor(public value: number = 0) {
		super()
	}
}