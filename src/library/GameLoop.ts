import {EventEmitter} from 'events'

/**
 * @link https://codeincomplete.com/articles/javascript-game-foundations-the-game-loop/
 */
function timestamp() {
	return (
		window.performance && window.performance.now
			? window.performance.now()
			: new Date().getTime()
	)
}

/**
 * @link https://codeincomplete.com/articles/javascript-game-foundations-the-game-loop/
 */
export class GameLoop {
	private fps = 60
	private now = 0
	private dt = 0
	private last = timestamp()
	private step = 1 / this.fps
	private slow = 1
	private slowStep = this.slow * this.step
	public readonly eventEmitter = new EventEmitter

	public constructor() {}

	private frame() {
		this.now = timestamp()
		this.dt = this.dt + Math.min(1, (this.now - this.last) / 1000)
		while(this.dt > this.slowStep) {
			this.dt = this.dt - this.slowStep
			this.update(this.step)
		}
		this.render(this.dt / this.slow)
		this.last = this.now
		requestAnimationFrame(this.frame.bind(this))
	}

	private update(step: number) {
		this.eventEmitter.emit('update', step)
	}

	private render(dt: number) {
		this.eventEmitter.emit('render', dt)
	}
	
	public start() {
		requestAnimationFrame(this.frame.bind(this))
	}
}


