import {IData} from './IData'
import {IEntity} from './IEntity'

type TConstructor<T> = new (...args: any[]) => T;

export function findData<D extends IData>(entity: IEntity, DataClass: TConstructor<D>): D | undefined {
	return entity.find((data): data is D => data instanceof DataClass)
}