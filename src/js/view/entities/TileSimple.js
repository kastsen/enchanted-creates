import Tile from "./Tile";
import TileParticleSimple from "./TileParticleSimple";

export default class TileSimple extends Tile {
	constructor(options) {
		super(options)
	}

	animStart() {
		this.animMove()
	}

	createParticles() {
		const particles = []
		const num = 5
		const x = this.parent.x + this.x
		const y = this.parent.y + this.y

		for (let i = 0; i < num; i++) {
			for (let j = 0; j < num; j++) {
				particles.push(new TileParticleSimple({
					w: 10,
					h: 10,
					x: x + 10 * j,
					y: y + 10 * i,
					x2: 10 * j,
					y2: 10 * i,
					skin: app.visual[this.info.skin]
				}))
			}
		}

		return particles
	}
}
