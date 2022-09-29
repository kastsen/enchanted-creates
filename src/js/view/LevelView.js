import View from "./View";
import Field from "./level/Field";
import TaskBar from "./level/TaskBar";
import Bonuses from "./entities/Bonuses";

export default class LevelView extends View {
	constructor(scene) {
		super(scene)
		this.settings = scene.settings
		this.particles = []
		this.field = new Field(this, scene.settings.field)

		this.taskBar = new TaskBar(this.scene.level, scene.settings.task)
		this.bonuses = new Bonuses({view: this, settings: this.settings})
		this.addChild(this.field, this.taskBar, this.taskBar.scorePanel, this.bonuses)
		this.updatePosition()

		window.addEventListener('resize', this.updatePosition.bind(this))
		this.scene.updates.add(this.update.bind(this))
	}

	tileHandler(tile) {
		this.scene.handlerTile(tile)
	}

	setUpdates(updates) {
		this.field.update(updates.field)
		this.taskBar.updateMoves(updates.task.moves)
		this.taskBar.updateProgress(updates.task.progress)
	}

	createTiles(tiles) {
		this.field.createTiles(tiles)
	}

	addParticles(tile) {
		const taskTile = this.taskBar.checkTask(tile)
		const particles = tile.createParticles()

		taskTile.cb()

		this.particles.push(...particles)
		this.addChild(...particles)
	}

	end() {
		this.interactiveChildren = false
	}

	updatePosition() {
		// @todo full responsive
		this.taskBar.position.set(-this.taskBar.width/2, -app.size.height/2+10)
		this.field.position.set(-this.field.width/2-110, -this.field.height/2)
	}

	cleanParticles() {
		this.particles = this.particles.filter(particle => {
			if (particle.destroyed) {
				this.removeChild(particle)
				return false
			}
			return true
		})
	}

	update() {
		this.cleanParticles()
	}
}
