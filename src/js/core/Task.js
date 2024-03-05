export default class Task {
	constructor(param) {
		this.origin = JSON.parse(JSON.stringify(param))
		this.current = JSON.parse(JSON.stringify(param))
		this.progress = 0
	}

	getProgress() {
		return this.progress
	}

	setProgress() {
		const originSum = this.origin.tiles.reduce((acc, cur) => acc + cur.num, 0)
		const currentSum = this.current.tiles.reduce((acc, cur) => acc + cur.num, 0)
		this.progress = (originSum - currentSum) * 100 / originSum
	}

	getTiles() {
		return this.current.tiles
	}

	setTile() {
		const tile = this.current.tiles.find(tile => tile.type === "simple")

		if (!tile) return

		tile.task = true
		tile.num -= tile.num > 0 ? 1 : 0
		this.setProgress()
	}

	getMoves() {
		return this.current.moves
	}

	setMoves() {
		this.current.moves -= this.current.moves > 0 ? 1 : 0
	}

	getStatus() {
		console.log(`Current progress: ${this.getProgress()}`)

		if (!this.getMoves() && this.getProgress() !== 50)
			return -1

		if (this.getProgress() >= 50)
			return 1

		return 0
	}
}
