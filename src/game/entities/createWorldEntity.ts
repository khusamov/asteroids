import {IEntity} from '../../library/ecs/IEntity'
import {ISize} from '../../library/algebra/ISize'
import {SizeData} from '../data/SizeData'
import {TypeData} from '../data/TypeData'

const worldDefaultSize: ISize = {
	width: 2000,
	height: 2000
}

export function createWorldEntity(size: ISize = worldDefaultSize): IEntity {
	return [
		new TypeData('world'),
		new SizeData(size)
	]
}