import tileRed from '../assets/tiles/crocodile.png'
import tileGreen from '../assets/tiles/parrot.png'
import tileBlue from '../assets/tiles/cow.png'
import tileYellow from '../assets/tiles/chick.png'
import tileYellow2 from '../assets/tiles/narwhal.png'
import tilePurple from '../assets/tiles/pig.png'
import tilePurple2 from '../assets/tiles/penguin.png'
import fieldBg from '../assets/field.png'
import movesBg from '../assets/moves.png'
import chanceBg from '../assets/chance_bg.png'
import progressBg from '../assets/progress-bg.png'
import progressLineBg from '../assets/progress-line-bg.png'
import progressLine from '../assets/progress-line.png'
import scoreBg from '../assets/score.png'
import pointsBg from '../assets/points.png'
import bgImg from '../assets/bg.png'
import bombBtn from '../assets/bomb.png'
import topBarBg from '../assets/topBar-bg.png'
import levelBtn from '../assets/level-btn.png'
import logoImg from '../assets/avatar.png'
import btnBg from '../assets/btn.png'


export const Loader = async () => {
	app.visual = {
		tile_red       : await PIXI.Assets.load(tileRed),
		tile_green     : await PIXI.Assets.load(tileGreen),
		tile_blue      : await PIXI.Assets.load(tileBlue),
		tile_yellow    : await PIXI.Assets.load(tileYellow),
		tile_yellow_2  : await PIXI.Assets.load(tileYellow2),
		tile_purple    : await PIXI.Assets.load(tilePurple),
		tile_purple_2  : await PIXI.Assets.load(tilePurple2),
		field       : await PIXI.Assets.load(fieldBg),
		moves       : await PIXI.Assets.load(movesBg),
		chanceBg      : await PIXI.Assets.load(chanceBg),
		progressBg    : await PIXI.Assets.load(progressBg),
		progressLine  : await PIXI.Assets.load(progressLine),
		progressLineBg: await PIXI.Assets.load(progressLineBg),
		scoreBg       : await PIXI.Assets.load(scoreBg),
		pointsBg      : await PIXI.Assets.load(pointsBg),
		bgImg         : await PIXI.Assets.load(bgImg),
		bombBtn       : await PIXI.Assets.load(bombBtn),
		topBarBg      : await PIXI.Assets.load(topBarBg),
		levelBtn : await PIXI.Assets.load(levelBtn),
		logoImg : await PIXI.Assets.load(logoImg),
		btnBg : await PIXI.Assets.load(btnBg),
	}
}
