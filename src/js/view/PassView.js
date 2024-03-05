import View from "./View";
import Button from "./ui/Button";

export default class PassView extends View {
	constructor(scene, options) {
		super(scene)
		this.options = options
		this.create()
		this.resize()
		window.addEventListener('resize', this.resize.bind(this))
	}

	create() {
		console.log('QQQQ')
		this.overlay = this.createOverlay()
		this.btnPanel = new PIXI.Container()
		this.button = this.createButton(this.options.action)
		this.btnPanel.addChild(this.button)
		this.addChild(this.overlay, this.btnPanel)
	}

	createButton(action) {
		return new Button({
			name: 'next',
			text: this.options.buttonText,
			fontSize: 26,
			textColor: '0x8df200',
			action: () => this.scene.btnHandler(action),
		})
	}

	resize() {
		this.resizeBtnPanel()
		this.resizeBkg()
	}

	resizeBtnPanel() {
		this.btnPanel.position.set(-this.btnPanel.width/2, -this.btnPanel.height/2)
	}

	resizeBkg() {
		this.overlay.width = app.size.width
		this.overlay.height = app.size.height
		this.overlay.position.set(-this.overlay.width/2, -this.overlay.height/2)
	}

	createOverlay() {
		const overlay = new PIXI.Graphics()
		overlay.beginFill(0x000000, 0.8)
		overlay.drawRect(0, 0, app.size.width, app.size.height)
		return overlay
	}
}
