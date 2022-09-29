import ProgressBar from "./ProgressBar";
import TaskTile from "./TaskTile";
import {Sprite} from "pixi.js";
import Points from "./Points";

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
		this.scorePanel = this.createScorePanel()
		this.scorePanel.addChild(this.movePanel, this.pointsPanel)
		this.taskPanel = this.createTaskPanel()
		this.addChild(this.progressPanel)
	}

	createScorePanel() {
		const size = 252
		const scorePanel = new PIXI.Container()

		const back = Sprite.from(app.visual.scoreBg)
		back.width = size
		back.height = size
		scorePanel.addChild(back)
		scorePanel.position.set(135, -250)

		return scorePanel
	}

	createMovePanel() {
		const size = this.h-this.padding*2
		const movePanel = new PIXI.Container()
		movePanel.x = 60
		movePanel.y = 8

		const back = Sprite.from(app.visual.moves)
		back.width = size;
		back.height = size;

		const num = new PIXI.Text(this.options.moves, {
			fontSize: 48,
			fill: 0xffffff,
			fontFamily: 'Marvin'
		})
		num.name = 'num'
		num.position.set(back.width/2-num.width/2, back.height/2-num.height/2-5)

		movePanel.addChild(back, num)
		return movePanel
	}

	createProgressPanel() {
		const progressPanel = new PIXI.Container()

		const title = new PIXI.Text('ПРОГРЕСС', {
			fontSize: 18,
			fill: 0xffffff,
			fontFamily: 'Marvin'
		})

		this.progressBar = new ProgressBar({
			minW: 1,
			minH: 6,
			maxW: this.w-this.h-title.width-this.padding*3-5,
			maxH: 6
		})
		this.progressBar.position.set(12, -10)

		title.position.set(this.progressBar.width/2-title.width/2+this.progressBar.x, -5)
		progressPanel.addChild(this.progressBar, title)

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
