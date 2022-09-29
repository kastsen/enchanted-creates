import Tools from "../../lib/Tools";
import TileParticle from "./TileParticle";

export default class TileParticleSimple extends TileParticle {
	constructor(options) {
		super(options)
		this.force = options.force || 0.15
		this.skewX = 0
		this.skewY = 0
		this.stepSkewX = (2 * Math.random() - 1) / 10
		this.stepSkewY = (2 * Math.random() - 1) / 10
		this.stepX = Tools.randomInteger(-70, 70) * this.force
		this.stepY = Tools.randomInteger(-70, 20) * this.force
		this.texture.frame = new PIXI.Rectangle(options.x2, options.y2, options.w, options.h)
		this.animate()
	}

	animate() {
		this.timeLine.to(this, 3, {
			onUpdate: () => {
				this.stepY += 0.5
				this.stepX -= this.stepX * 0.01
				this.skewX += this.stepSkewX
				this.skewY += this.stepSkewY
				this.skew.set(this.skewX, this.skewY)
				this.position.set(this.x + this.stepX, this.y + this.stepY)
			},
			onComplete: () => {
				this.destroy()
			}
		})
	}
}
