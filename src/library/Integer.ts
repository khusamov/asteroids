export class Integer {
	private readonly _value: number

	public constructor(value: number) {
		this._value = Math.round(value)
	}

	public toNumber(): number {
		return this._value
	}
}