import {TConstructor} from '../types/TConstructor'
import {IData} from './IData'
import {IEntity} from './IEntity'
import {is} from './is'

export const has = <T extends IData>(DataClass: TConstructor<T>) => (entity: IEntity) => entity.find(is(DataClass))