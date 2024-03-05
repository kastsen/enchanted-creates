import Scene from "./Scene";
import LevelsModel from "../model/LevelModel";
import LevelView from "../view/LevelView";
import Fail from "./Fail";

class Level extends Scene {
	constructor(options) {
		super()
		this.level = options.level
		this.model = new LevelsModel(this.level)
		this.settings = this.model.setting
		this.view = new LevelView(this)
		this.addChild(this.view)

		this.init()
	}

	init() {
		const tiles = this.model.createTiles()
		this.view.createTiles(tiles)
	}

	handlerTile(tile) {
		const updatesField = this.model.handlerTile(tile)
		const updatesTask = this.model.getUpdateTask()
		this.view.setUpdates({
			field: updatesField,
			task: updatesTask
		})
		this.checkStatusLevel(updatesField)
	}

	checkStatusLevel(updatesField) {
		const status = this.model.statusLevel

		if (status ===  1) this.pass()
		if (status === -1) this.fail()
	}

	pass() {
		this.view.end()
		app.scene.addLayer('Pass', { nextLevel: this.settings.nextLevel || false, buttonText: 'СЛЕДУЮЩИЙ УРОВЕНЬ' })
	}

	fail() {
		this.view.end()
		app.scene.add('Fail', Fail)
		app.scene.addLayer('Fail', { level: this.level })
	}
}

export default Level
