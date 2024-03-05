import TileSimple from "../entities/TileSimple";
import Tile from "../entities/Tile";
import { Sprite } from "pixi.js";
import Tools from "../../core/Tools";
import {TILES} from "../../model/LevelModel";

export default class Field extends PIXI.Container {
	constructor(view, options) {
		super()
		this.view = view
		this.options = options
		this.model = view.scene.model
		this.rows = options.template.length
		this.cols = options.template[0].length
		this.cell = options.cell
		this.task = this.model.setting.task
		this.eventMode = 'static'
		this.on('click', (e) => this.fieldHandler(e))
		this.on('tap', (e) => this.fieldHandler(e))
		this.tiles = []
		this.create()
	}

	create() {
		const back = new Sprite(app.visual.field);
		back.alpha = 0;
		back.width = app.size.width;
		back.height = this.rows*this.cell.h + 118;
		back.position.set(-42, -42)
		this.addChild(back)
	}

	fieldHandler(e) {
		const tile = e.target

		if (e.target instanceof Tile) {

			if (this.getBomb(tile)) return;

			for (let i = 0; i < this.tiles.length; i++) {
				if (this.tiles[i].timeLine?.isActive())
					return
			}

			this.view.tileHandler({
				id: tile.options.info.id,
				row: tile.options.row,
				col: tile.options.col,
				type: tile.options.info.type
			})
		}
	}

	createBombModel(model, tile, losses) {
		const info = tile.info
		losses.forEach((hurt) => {
			if (tile.options.row === hurt.row && tile.options.col === hurt.col) {
				model.push({
					id: info.id,
					info: info,
					row: hurt.row,
					col: hurt.col,
				})
			}
		})
	}

	getBomb(tile) {
		const bombIsActive = this.model.setting.bombIsActive
		if (bombIsActive) {
			const radius = this.task.bombRadius
			const options = tile.options
			const losses = Tools.getBomb(this.options.template, options.row, options.col, tile.info.id, radius)
			const model = []
			this.tiles.forEach((fieldTile) => this.createBombModel(model, fieldTile, losses))
			this.update({
				remove: model,
				move: this.model.moveTiles(),
				createSimple: this.model.createTiles(),
			})
			this.model.setting.bombIsActive = false
			return true
		}
	}

	createTile(row, col, pivot, type, Class) {
		return new Class({
			row: row,
			col: col,
			w: this.cell.w,
			h: this.cell.h,
			pivot: { x:0, y:pivot },
			info: type
		})
	}

	addTile(tile) {
		this.tiles.push(tile)
		this.addChild(tile)
	}

	removeTile(tile, index) {
		this.tiles.splice(index, 1)
		this.removeChild(tile)
	}

	createTiles(tiles) {
		const pivot = [...Array(this.cols)].map(() => Tools.randomInteger(0, 200))
		const arrTilesType = Object.values(TILES.simple)

		tiles.forEach(tile => {
			const r = tiles.reduce((acc, cur) => cur.row > acc.row && cur.col === tile.col ? cur : acc)
			const Y = (r.row*50+50) + pivot[tile.col] + (50*(r.row-tile.row))
			const type = arrTilesType.find(el => Number(el.id) === Number(tile.id))

			const newTile = this.createTile(tile.row, tile.col, -Y, type, TileSimple)
			this.addTile(newTile)
		})
	}

	removeTiles(tiles, hideParticles= false) {
		tiles.forEach(pos => {
			const index = this.getTileIndex(pos)
			if (index !== -1) {
				const tile = this.tiles[index]
				if (!hideParticles) this.view.addParticles(tile)
				this.removeTile(tile, index)
			}
		})
	}

	getTile(pos) {
		return this.tiles.find(tile => tile.options.row === pos.row && tile.options.col === pos.col)
	}

	getTileIndex(pos) {
		return this.tiles.findIndex(tile => tile.options.row === pos.row && tile.options.col === pos.col)
	}

	moveTiles(tiles) {
		tiles.forEach(pos => {
			const tile = this.getTile(pos.old)
			tile.updatePosition(pos.new.row, pos.new.col, -((pos.new.row-pos.old.row)*50))
		})
	}

	createTilesTemplate(field, arrIdTiles) {
		const tiles = []
		let i = 0
		for (let row = 0; row < field.rows; row++) {
			for (let col = 0; col < field.cols; col++) {
				const tile = { id: arrIdTiles[i], row, col }
				this.model.field[row][col] = arrIdTiles[i]
				tiles.push(tile)
				i = (i < arrIdTiles.length - 1) ? i + 1 : 0
			}
		}
		return tiles
	}

	shuffleTiles() {
		const model = []
		const tiles = []

		this.tiles.forEach((tile, i) => {
			model[i] = {id: tile.info.id, row: tile.options.row, col: tile.options.col, info: tile.info}
		})

		this.options.template.forEach((row, i) => {
			row.forEach((id) => {
				tiles.push(id)
			})
		})

		const tilesTemplate = this.createTilesTemplate(this, Tools.arrShuffle(tiles))

		this.update({remove: model, createSimple: tilesTemplate}, true)
	}

	update(updates, hideParticles= false) {
		if (updates.remove) this.removeTiles(updates.remove, hideParticles)
		if (updates.move) this.moveTiles(updates.move)
		if (updates.createSimple) this.createTiles(updates.createSimple)
		if (updates.shuffle) this.shuffleTiles()
	}
}
