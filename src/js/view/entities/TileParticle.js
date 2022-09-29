import { Timeline } from "gsap/gsap-core";

export default class TileParticle extends PIXI.Sprite {
	constructor(options) {
		super(new PIXI.Texture(options.skin))
		this.options = options
		this.position.set(options.x, options.y)
		this.timeLine = new Timeline()
	}
}
