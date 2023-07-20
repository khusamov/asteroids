import {IEntity} from './IEntity'

export interface IRenderer {
	render(entityList: IEntity[]): void
}