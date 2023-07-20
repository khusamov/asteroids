import {IEntity} from '../../library/ecs/IEntity'
import {TypeData} from '../data/TypeData'

export function filterEntityByType(entityList: IEntity[], type: string) {
	return entityList.filter(entity => entity.find(data => data instanceof TypeData && data.type === type))
}