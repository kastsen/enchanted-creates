import { Timeline } from "gsap/gsap-core";

export default class Button extends PIXI.Container {
	constructor(options = {}) {
		super()
		this.w          = options.w         || 0
		this.h          = options.h         || 0
		this.size       = options.size      || 135
		this.state      = options.state     || 'enabled'
		this.name       = options.name      || 'button'
		this.text       = options.text      || 'button'
		this.textColor  = options.textColor || '0xffffff'
		this.color      = options.color     || 'purple'
		this.fontSize   = options.fontSize  || 13
		this.paramScale = options.scale     || 1
		this.padding    = options.padding   || { x: 50, y: 25 }
		this.action     = options.action    || this.noAction
		this.texture    = options.texture   || null

		this.timeLine = new Timeline()

		this.create()
		this.setEvent()
	}

	create() {
		const text = new PIXI.Text(this.text, {
			fontSize: this.fontSize,
			fill: this.textColor,
			fontFamily: 'Marvin',
		})

		this.w = (this.w > text.width + this.padding.x * 2) ? this.w : text.width + this.padding.x * 2
		this.h = (this.h > text.height + this.padding.y * 2) ? this.h : text.height + this.padding.y * 2

		text.position.set(this.size/2 - text.width/2, 34)

		const back = new PIXI.Sprite(this.texture)
		back.width = this.size
		back.height = this.size

		this.addChild(back, text)
		this.scale.set(this.paramScale)
	}

	setEvent() {
		if (this.state === 'enabled')  this.enable()
		if (this.state === 'disabled') this.disable()

		this.buttonMode = true
		this.on('click', this.action)
		this.on('tap', this.action)
		this.on('pointerover', this.pointerOver)
		this.on('pointerout', this.pointerOut)
	}

	enable() {
		this.state = 'enabled'
		this.interactive = true
		this.removeChild(this.getChildByName('disabledMask'))
	}

	disable() {
		this.state = 'disabled'
		this.interactive = false
		this.alpha = 0.5
	}

	pointerOver() {

	}

	pointerOut() {

	}

	noAction() {
		console.log('no action')
	}
}
