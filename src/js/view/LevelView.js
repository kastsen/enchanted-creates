import View from "./View";
import Field from "./level/Field";
import TaskBar from "./ui/TaskBar";
import Bonuses from "./ui/Bonuses";
import LevelPanel from "./ui/LevelPanel";
import Avatar from "./ui/Avatar";

export default class LevelView extends View {
	constructor(scene) {
		super(scene)
		this.settings = scene.settings
		this.particles = []

		this.bg = new PIXI.Sprite(app.visual.bgImg);
		this.bg.anchor.set(0.5)

		this.topBarBg = new PIXI.Sprite(app.visual.topBarBg);
		this.topBarBg.height = 200

		this.field = new Field(this, scene.settings.field)
		this.taskBar = new TaskBar(this.scene.level, scene.settings.task)
		this.bonuses = new Bonuses({view: this, settings: this.settings})
		this.levelPanel = new LevelPanel();

		this.avatar = new Avatar()

		this.addChild(
			this.bg,
			this.field,
			this.topBarBg,
			this.taskBar,
			this.taskBar.scorePanel,
			this.bonuses,
			this.levelPanel,
			this.taskBar.pointsPanel,
			this.taskBar.progressPanel,
			this.avatar
		)
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

	end() {}

	updatePosition() {
		this.taskBar.position.set(-this.taskBar.width/2 - 10, -app.size.height/2+10)
		this.field.position.set(-249, -this.field.height/2 + 144)
		this.bonuses.position.set(-app.size.width/2 + 30, -app.size.height/2 + 30)
		this.topBarBg.width = app.size.width
		this.topBarBg.position.set(-app.size.width/2, -app.size.height/2)
		this.levelPanel.position.set(-app.size.width/2 + 30, -app.size.height/2 + 30)

		this.taskBar.pointsPanel.position.set(
			app.size.width/5,
			-app.size.height/2 + 25
		)

		this.taskBar.progressPanel.position.set(
			-app.size.width/2.5,
			-app.size.height/2 + 168
		)

		this.avatar.position.set(-this.avatar.img.width/2, -app.size.height/2 + 20)

		this.bg.width = app.size.height
		this.bg.height = app.size.height
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
