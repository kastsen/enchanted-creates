import { Timeline } from "gsap/gsap-core";

export default class Tile extends PIXI.Container {
	constructor(options) {
		super()
		this.options = options
		this.info = options.info
		this.position.set(options.col * options.w, options.row * options.h)
		this.timeLine = new Timeline()
		this.speed = 0.0015
		this.interactive = true
		this.buttonMode = true

		this.create()
		this.animStart(options.cb)
	}

	create() {
		this.sp = new PIXI.Sprite(app.visual[this.info.skin])
		this.sp.anchor.set(0.5)
		this.sp.width = this.options.w;
		this.sp.height = this.options.h;
		this.sp.x = this.sp.width / 2
		this.sp.y = this.sp.height / 2
		this.addChild(this.sp)
	}

	animStart() {}

	animMove() {
		this.timeLine
			.from(this,  Math.abs(this.options.pivot.y) * this.speed, { y: this.y+this.options.pivot.y, ease: 'linear' })
			.to(this.sp, .05, { y: this.sp.y+5, height: this.sp.height-10, width: this.sp.width+5, ease: 'linear' })
			.to(this.sp, .15, { y: this.sp.y-5, height: this.sp.height+5,  width: this.sp.width-5, ease: 'linear' })
			.to(this.sp, .1,  { y: this.sp.y,   height: this.sp.height,    width: this.sp.width,   ease: 'linear' })
	}

	removeAnim() {
		this.timeLine.clear()
	}

	updatePosition(row, col, pivot) {
		this.removeAnim()
		this.options.pivot.y = pivot
		this.options.row = row
		this.options.col = col
		this.position.set(col*this.options.w, row*this.options.h)
		this.animMove()
	}
}
