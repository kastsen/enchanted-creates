import Task from "../../js/lib/Task";
import Tools from "../lib/Tools";
import TILES from "../lib/tiles";

export default class LevelModel {
	constructor(level) {
		this.level = level
		this.setting = JSON.parse(JSON.stringify(require(`../levels/${this.level}.json`)))
		this.field = this.setting.field.template
		this.rows = this.field.length
		this.cols = this.field[0].length
		this.task = new Task(this.setting.task)
	}

	get statusLevel() {
		return this.task.getStatus()
	}

	get numEmptyCells() {
		return this.field.reduce((acc, cur) => {
			return acc + cur.reduce((acc, cur) => {
				return cur === '0' ? acc + 1 : acc
			}, 0)
		}, 0)
	}

	getSimpleTilesIdDouble(num) {
		const number = (num) => Math.sign(num) > 0 ? num : 1
		return Tools.arrShuffle(
			Object
				.values(TILES.simple)
				.map(tile => tile.id)
				.reduce((acc, cur, i, arr) => acc.concat(Array(number(Math.floor(num/arr.length))).fill(cur)), [])
		)
	}

	getUpdateTask() {
		return {
			moves: this.task.getMoves(),
			tiles: this.task.getTiles(),
			progress: this.task.getProgress()
		}
	}

	addTile(id, pos) {
		this.field[pos.row][pos.col] = id
	}

	removeTile(pos) {
		this.task.setTile(this.field[pos.row][pos.col])
		this.field[pos.row][pos.col] = '0'
	}

	createTiles() {
		const tiles = []
		const arrIdTiles = this.getSimpleTilesIdDouble(this.numEmptyCells)
		let i = 0

		for (let row = 0; row < this.rows; row++) {
			for (let col = 0; col < this.cols; col++) {
				if (this.field[row][col] !== '0' || this.field[row][col] === 'X')
					continue

				const tile = { id: arrIdTiles[i], row, col }
				this.addTile(tile.id, { row, col })
				tiles.push(tile)

				i = (i < arrIdTiles.length - 1) ? i + 1 : 0
			}
		}
		return tiles
	}

	moveTiles() {
		const move = []

		for (let row = this.rows-1; row >= 0; row--) {
			for (let col = this.cols-1; col >= 0; col--) {
				if (this.field[row][col] !== '0')
					continue

				const b = Tools.getTileTop(this.field, row, col)
				if (b) {
					this.field[row][col] = this.field[b.row][b.col]
					this.field[b.row][b.col] = '0'

					move.push({
						old: { row:b.row, col:b.col },
						new: { row, col }
					})
				}
			}
		}

		return move
	}

	removeTiles(tiles) {
		tiles.forEach(tile => this.removeTile(tile))
	}

	handlerTile(tile) {
		const updates = {}

		if (tile && tile.type === 'simple') updates.remove = this.handlerTileSimple(tile)

		updates.move = this.moveTiles()
		updates.createSimple = this.createTiles()

		return updates
	}

	handlerTileSimple(tile) {
		const field = JSON.parse(JSON.stringify(this.field))
		const group = Tools.getGroup(field, tile.row, tile.col, field[tile.row][tile.col])

		if (group.length < this.setting.task.minGroup) return false

		this.task.setMoves()
		this.removeTiles(group)
		return group
	}
}
