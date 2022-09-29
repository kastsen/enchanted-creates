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
	}

	create() {
		const back = Sprite.from(app.visual.progressBg)
		back.width = 370;
		back.height = 75;

		const lineBack = Sprite.from(app.visual.progressLineBg)
		lineBack.width = 350;
		lineBack.height = 30;
		lineBack.position.set(10, 35)

		const linePadding = 6;

		this.lineSprite = Sprite.from(app.visual.progressLine)
		this.lineSprite.height = lineBack.height-linePadding
		this.lineSprite.position.set(lineBack.x+linePadding/2-1, lineBack.y+linePadding/2)
		this.lineSprite.width = lineBack.width-linePadding+2

		this.line = new PIXI.Graphics()
		this.line.beginFill(0x00ff00, 1)
		this.line.drawRect(0, 0, this.minW, this.lineSprite.height)
		this.line.position.set(this.lineSprite.x, this.lineSprite.y)
		this.line.width = 0

		this.lineSprite.mask = this.line

		this.addChild(back, lineBack, this.lineSprite, this.line)
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
