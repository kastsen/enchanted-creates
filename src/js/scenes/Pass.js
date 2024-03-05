import PassView from "../view/PassView";
import Scene from "./Scene";

class Pass extends Scene {
	constructor(options) {
		super()
		this.nextLevel = options.nextLevel || false
		this.view = new PassView(this, {
			nextLevel: this.nextLevel,
			buttonText: options.buttonText,
			action: 'next',
		})
		this.addChild(this.view)
	}

	btnHandler(name) {
		if (name === 'next') app.scene.start('Level', { level: this.nextLevel })
	}
}

export default Pass
