import {EventEmitter} from 'events'
import {createRandomizedAsteroidEntity} from './game/entities/createRandomizedAsteroidEntity'
import {createCameraEntity} from './game/entities/createCameraEntity'
import {createWorldEntity} from './game/entities/createWorldEntity'
import {CameraResizingRule} from './game/features/camera-resize/CameraResizingRule'
import {CameraZoomChangingRule} from './game/features/camera-zoom/CameraZoomChangingRule'
import {Game} from './game/Game'
import {initKeyboardShortcuts} from './game/initKeyboardShortcuts'
import {keyboardShortcuts} from './game/keyboardShortcuts'
import {RenderMessage} from './game/messages/RenderMessage'
import {UpdateMessage} from './game/messages/UpdateMessage'
import {PositionRandomizeRule} from './game/rules/PositionRandomizeRule'
import {CameraControlRule} from './game/rules/CameraControlRule'
import {CameraInitRule} from './game/rules/CameraInitRule'
import {CanvasInitRule} from './game/rules/CanvasInitRule'
import {LineRenderRule} from './game/rules/LineRenderRule'
import {RotationalMotionRule} from './game/rules/RotationalMotionRule'
import {ToroidRule} from './game/rules/ToroidRule'
import {TranslationalMotionRule} from './game/rules/TranslationalMotionRule'
import {IEntity} from './library/ecs/IEntity'
import {GameLoop} from './library/GameLoop'
import {MessageBroker} from './library/messages/MessageBroker'
import {MessageEmitter} from './library/messages/MessageEmitter'

const messageEmitter = new MessageEmitter(new EventEmitter)
const messageBroker = new MessageBroker(messageEmitter)
messageEmitter.on(UpdateMessage, () => messageBroker.emit())

const gameLoop = new GameLoop
gameLoop.eventEmitter.on('update', (deltaTime: number) => messageEmitter.emit(new UpdateMessage(deltaTime)))
gameLoop.eventEmitter.on('render', (deltaTime: number) => messageEmitter.emit(new RenderMessage(deltaTime)))

initKeyboardShortcuts(messageEmitter, keyboardShortcuts)

const entityList: IEntity[] = [
	createWorldEntity(),
	createCameraEntity(),
	...new Array(100).fill(null).map(() => createRandomizedAsteroidEntity())
]

const game = new Game(
	new CanvasInitRule,
	new PositionRandomizeRule('asteroid'),
	new CameraInitRule,
	new CameraControlRule,
	new ToroidRule,
	new TranslationalMotionRule,
	new RotationalMotionRule,
	new LineRenderRule,
	new CameraZoomChangingRule,
	new CameraResizingRule
)

window.addEventListener('load', () => {
	game.init({
		entityList,
		messageEmitter,
		messageBroker
	})

	gameLoop.start()
})


