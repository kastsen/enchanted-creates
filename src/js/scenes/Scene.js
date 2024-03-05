import Update from "../core/Update";

export default class Scene extends PIXI.Container {
	constructor() {
		super()
		this.updates = new Update()
	}
}