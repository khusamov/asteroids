import {ILine} from '../../library/algebra/ILine'
import {IVector} from '../../library/algebra/IVector'
import {IEntity} from '../../library/ecs/IEntity'
import {generateRandomPolygon} from '../../library/functions/generateRandomPolygon'
import {getRandomIntegerInclusive} from '../../library/functions/getRandomIntegerInclusive'
import {AngularVelocityData} from '../data/AngularVelocityData'
import {LinearVelocityData} from '../data/LinearVelocityData'
import {LineSpriteData} from '../data/LineSpriteData'
import {PositionData} from '../data/PositionData'
import {RotationData} from '../data/RotationData'
import {TypeData} from '../data/TypeData'

const asteroidLinearVelocityExtremum = 200
const asteroidTypes: [number, number, number][] = [[5, 5, 25], [8, 20, 65]]

export function createRandomizedAsteroidEntity(): IEntity {
	return [
		new TypeData('asteroid'),
		new RotationData(0),
		new AngularVelocityData(
			getRandomIntegerInclusive(-Math.PI / 2, Math.PI / 2)
		),
		new PositionData, // При старте игры меняется на случайное значение (AsteroidRandomizeRule).
		new LinearVelocityData({
			x: getRandomIntegerInclusive(-asteroidLinearVelocityExtremum, asteroidLinearVelocityExtremum),
			y: getRandomIntegerInclusive(-asteroidLinearVelocityExtremum, asteroidLinearVelocityExtremum)
		}),
		new LineSpriteData(
			generateRandomPolygon(...asteroidTypes[getRandomIntegerInclusive(0, asteroidTypes.length - 1)] ?? [0, 0, 0])
				.reduce<ILine[]>(
					(result, point1, index, vertexes) => {
						const point2 = vertexes[(index + 1) % (vertexes.length)] as IVector
						return result.concat({point1, point2})
					},
					[]
				)
		)
	]
}