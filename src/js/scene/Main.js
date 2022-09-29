import Scene from "./Scene";

class Main extends Scene {
	constructor() {
		super()
		app.scene.addLayer('Pass', { nextLevel: 1 || false, buttonText: 'СТАРТ' })
		// app.scene.start('Level', { level: 1 })
	}

	btnHandler(name) {
		if (name === 'start') app.scene.start('Levels')
	}
}

export default Main
