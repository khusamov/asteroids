import {Data} from '../Data'

export class StringData extends Data {
	public constructor(public value: string = '') {
		super()
	}
}