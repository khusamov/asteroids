import {TypeData} from '../data/TypeData'
import {IEntity} from '../../library/ecs/IEntity'

export function findEntityByType(entityList: IEntity[], type: string) {
	return entityList.find(entity => entity.find(data => data instanceof TypeData && data.type === type))
}