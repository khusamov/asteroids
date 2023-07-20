import {nullVector} from '../../library/algebra/nullVector'
import {named} from '../../library/ecs/named'
import {IEntity} from '../../library/ecs/IEntity'
import {IVector} from '../../library/algebra/IVector'
import {AreaData} from '../data/AreaData'
import {LinearVelocityData} from '../data/LinearVelocityData'
import {NumberData} from '../../library/ecs/data/NumberData'
import {PositionData} from '../data/PositionData'
import {SizeData} from '../data/SizeData'
import {TypeData} from '../data/TypeData'

export function createCameraEntity(area: number = 0, position: IVector = nullVector): IEntity {
	return [
		new TypeData('camera'),
		new SizeData,
		new PositionData(position),
		new LinearVelocityData,
		new AreaData(area),
		named('previus-viewport-width', new NumberData),
		named('previus-viewport-height', new NumberData),
	]
}