import Scene from "./Scene";
import PassView from "../view/PassView";

class Fail extends Scene {
	constructor(options) {
		super()
		this.level = options.level
		this.view = new PassView(this, {
			nextLevel: this.nextLevel,
			buttonText: 'Заново',
			action: 'reset',
		})
		this.addChild(this.view)
	}

	btnHandler(name) {
		if (name === 'reset') app.scene.start('Level', { level: this.level })
	}
}

export default Fail
