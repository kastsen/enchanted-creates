import ProgressBar from "./ProgressBar";
import TaskTile from "../level/TaskTile";
import Points from "./Points";
import {FONT_FAMILY} from "../View";

export default class TaskBar extends PIXI.Container {
	constructor(level, options) {
		super()
		this.level = level
		this.options = options
		this.w = 1000
		this.h = 150
		this.padding = 10
		this.tiles = []
		this.tilesPanel = new PIXI.Container()
		this.progressPanel = this.createProgressPanel()
		this.movePanel = this.createMovePanel()
		this.pointsPanel = new Points(this.progressBar)
		this.scorePanel = new PIXI.Container()
		this.scorePanel.addChild(this.movePanel, this.pointsPanel)
		this.taskPanel = this.createTaskPanel()
		this.addChild(this.progressPanel)
	}

	createMovePanel() {
		const size = this.h-this.padding*2
		const movePanel = new PIXI.Container()
		movePanel.x = 60
		movePanel.y = 8

		const back = new PIXI.Sprite(app.visual.moves)
		back.width = size;
		back.height = size;

		const num = new PIXI.Text(this.options.moves, {
			fontSize: 48,
			fill: 0xffffff,
			fontFamily: FONT_FAMILY
		})
		num.name = 'num'
		num.position.set(back.width/2-num.width/2, back.height/2-num.height/2-5)

		movePanel.addChild(back, num)
		return movePanel
	}

	createProgressPanel() {
		const progressPanel = new PIXI.Container()

		this.progressBar = new ProgressBar({
			minW: 1,
			minH: 6,
			maxW: this.w-this.h-this.padding*3-5,
			maxH: 6
		})

		progressPanel.addChild(this.progressBar)

		return progressPanel
	}

	createTaskPanel() {
		const taskPanel = new PIXI.Container()

		this.options.tiles.forEach((elem, i) => {
			const tile = new TaskTile({
				num: elem.num,
				type: 'simple'
			})
			tile.position.set(i*60, 0)
			this.tilesPanel.addChild(tile)
			this.tiles.push(tile)
		})

		taskPanel.position.set(140, 40)
		taskPanel.addChild(this.tilesPanel)

		return taskPanel
	}

	updateMoves(num) {
		const textMove = this.movePanel.getChildByName('num')
		textMove.text = num
		textMove.position.set(this.movePanel.width/2-textMove.width/2, this.movePanel.height/2-textMove.height/2-5)
	}

	updateProgress(progress) {
		this.progressBar.update(progress)
		this.pointsPanel.update(progress)
	}

	checkTask(tile) {
		const taskTile = this.tiles.find(el => el.type === tile.info.type)

		if (!taskTile || !taskTile.getNum()) return false

		taskTile.setNum()

		return {
			position: {
				x: this.x+this.taskPanel.x+this.tilesPanel.x+taskTile.x+taskTile.width/2,
				y: this.y+this.taskPanel.y+this.tilesPanel.y+taskTile.y+taskTile.height/2
			},
			cb: taskTile.update.bind(taskTile),
		}
	}
}
