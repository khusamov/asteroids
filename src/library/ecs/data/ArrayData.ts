import {Data} from '../Data'

export class ArrayData<T> extends Data {
	public constructor(public value: T[] = []) {
		super()
	}
}