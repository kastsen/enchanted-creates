import Scaling from "./lib/Scaling";
import SceneManager from "./lib/SceneManager";

class App {
	constructor(param) {
		this.elem     = param.elem || document.body
		this.renderer = new PIXI.Renderer({
			backgroundColor: 0x000000,
			backgroundAlpha: 0.5,
			resolution: window.devicePixelRatio || 1,
			powerPreference: 'high-performance',
		})
		this.stage    = new PIXI.Container()
		this.ticker   = new PIXI.Ticker()
		this.loader   = new PIXI.Loader()
		this.scene    = new SceneManager(this.stage)
		this.scaling  = new Scaling()

		this.create()
		this.setScale()
		this.start()

		window.addEventListener('resize', this.setScale.bind(this))
	}

	get screen() {
		return this.renderer.screen
	}

	get size() {
		return {
			width: this.screen.width/this.stage.scale.x,
			height: this.screen.height/this.stage.scale.y
		}
	}

	create() {
		this.elem.appendChild(this.renderer.view)
	}

	render() {
		this.renderer.render(this.stage)
	}

	start() {
		this.ticker.add(this.render.bind(this), PIXI.UPDATE_PRIORITY.LOW)
		this.ticker.add(this.update.bind(this))
		this.ticker.start()
	}

	update(delta) {
		if (!this.scene.current || !this.scene.current.updates)
			return

		this.scene.current.updates.get.forEach(update => update(delta))
		this.scene.layers.forEach(layer => {
			if (layer.updates)
				layer.updates.get.forEach(update => update(delta))
		})
	}

	setScale() {
		const { clientWidth : W, clientHeight : H } = this.elem

		this.stage.scale.set(this.scaling.get(W))
		this.stage.position.set(W/2, H/2)
		this.renderer.resize(W, H)
	}
}

export default App
