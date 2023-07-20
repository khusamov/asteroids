import {ISize} from './ISize'

export function roundSize(size: ISize): ISize {
	return {
		width: Math.round(size.width),
		height: Math.round(size.height)
	}
}