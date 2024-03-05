import Scaling from "./core/Scaling";
import SceneManager from "./core/SceneManager";
import {EventSystem} from "pixi.js";

class App {
	constructor(param) {
		this.elem     = param.elem || document.body

		this.renderer = new PIXI.Renderer({
			backgroundColor: 0xF2C78F,
			backgroundAlpha: 1,
			resolution: 2 || 2,
			powerPreference: 'high-performance',
		})

		const events = new EventSystem(this.renderer);
		events.domElement = this.renderer.view;



		this.stage    = new PIXI.Container()
		this.ticker   = new PIXI.Ticker()

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
		this.ticker.add(this.render.bind(this), PIXI.UPDATE_PRIORITY.HIGH)
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
