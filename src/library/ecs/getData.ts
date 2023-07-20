import {filterData} from './filterData'
import {findData} from './findData'
import {IData} from './IData'
import {IEntity} from './IEntity'

type TConstructor<T> = new (...args: any[]) => T;

export function getData<D extends IData>(entity: IEntity, DataClass: TConstructor<D>, notFoundMessage?: string): D {
	const data = findData(entity, DataClass)
	if (!data) {
		throw new Error(notFoundMessage || `Не найден ${DataClass.name}`)
	}
	return data
}

export function getNamedData<D extends IData>(entity: IEntity, DataClass: TConstructor<D>, name: string, notFoundMessage?: string): D {
	const data = filterData(entity, DataClass).find(data => data.name === name)
	if (!data) {
		throw new Error(notFoundMessage || `Не найден ${DataClass.name}`)
	}
	return data
}