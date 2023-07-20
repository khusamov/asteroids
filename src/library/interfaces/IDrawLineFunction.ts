import {ILine} from '../algebra/ILine'

export interface IDrawLineFunction {
	(line: ILine, color: string): void
}