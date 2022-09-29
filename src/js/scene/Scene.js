import Update from "../lib/Update";

export default class Scene extends PIXI.Container {
	constructor() {
		super()
		this.updates = new Update()
	}
}