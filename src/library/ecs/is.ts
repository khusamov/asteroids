import {TConstructor} from '../types/TConstructor'
import {IData} from './IData'

export const is = <T extends IData>(DataClass: TConstructor<T>) => (data: IData): data is T => data instanceof DataClass