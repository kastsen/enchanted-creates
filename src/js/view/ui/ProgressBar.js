import { Timeline } from "gsap/gsap-core";
import {Sprite} from "pixi.js";

export default class ProgressBar extends PIXI.Container {
	constructor(options) {
		super()
		this.minW = options.minW
		this.minH = options.minH
		this.maxW = options.maxW
		this.maxH = options.maxH
		this.timeLine = new Timeline()
		this.progress = 0

		this.create()
		this.updatePosition()
		window.addEventListener('resize', this.updatePosition.bind(this))
	}

	create() {
		const back = new Sprite(app.visual.progressBg)
		this.back = back
		back.width = 428
		back.height = 6
		back.visible = false



		const lineBack = new Sprite(app.visual.progressLineBg)
		lineBack.width = back.width;
		lineBack.height = back.height;
		lineBack.position.set(1, 1)

		this.lineSprite = new Sprite(app.visual.progressLine)
		this.lineSprite.height = lineBack.height
		this.lineSprite.position.set(lineBack.x, lineBack.y)
		this.lineSprite.width = lineBack.width

		this.line = new PIXI.Graphics()
		this.line.beginFill(0x00ff00, 1)
		this.line.drawRect(0, 0, this.minW, this.lineSprite.height)
		this.line.position.set(this.lineSprite.x, this.lineSprite.y)
		this.line.width = 0

		this.lineSprite.mask = this.line

		this.addChild(back, lineBack, this.lineSprite, this.line)
	}

	updatePosition() {
		this.scale.x = app.size.width / this.back.width * 0.79
	}

	update(progress) {
		if (progress === this.progress)
			return

		this.progress = progress
		const newWidth = (this.maxW-2) / 100 * this.progress
		const speed = (newWidth - this.line.width) * 0.01

		this.timeLine.kill()
		this.timeLine.clear()
		this.timeLine.to(this.line,  speed, { width: newWidth })
	}
}
