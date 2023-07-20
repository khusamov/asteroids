import {IData} from './IData'
import {IEntity} from './IEntity'

type TConstructor<T> = new (...args: any[]) => T;

export function filterData<D extends IData>(entity: IEntity, DataClass: TConstructor<D>): D[] {
	return entity.filter((data): data is D => data instanceof DataClass)
}