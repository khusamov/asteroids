import {IEntity} from '../../library/ecs/IEntity'
import {findEntityByType} from './findEntityByType'

export function getEntityByType(entityList: IEntity[], type: string, notFoundMessage?: string): IEntity {
	const entity = findEntityByType(entityList, type)
	if (!entity) {
		throw new Error(notFoundMessage || `Не найден IEntity`)
	}
	return entity
}