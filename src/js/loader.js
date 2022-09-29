import tileRed from '../assets/tiles/red.png'
import tileGreen from '../assets/tiles/green.png'
import tileBlue from '../assets/tiles/blue.png'
import tileYellow from '../assets/tiles/yellow.png'
import tilePurple from '../assets/tiles/purple.png'
import fieldBg from '../assets/field.png'
import movesBg from '../assets/moves.png'
import chanceBg from '../assets/chance_bg.png'
import progressBg from '../assets/progress-bg.png'
import progressLineBg from '../assets/progress-line-bg.png'
import progressLine from '../assets/progress-line.png'
import scoreBg from '../assets/score.png'
import pointsBg from '../assets/points.png'

export const Loader = () => {
	app.loader
		.add('red',            tileRed)
		.add('green',          tileGreen)
		.add('blue',           tileBlue)
		.add('yellow',         tileYellow)
		.add('purple',         tilePurple)
		.add('field', 	       fieldBg)
		.add('moves', 	       movesBg)
		.add('chanceBg', 	   chanceBg)
		.add('progressBg', 	   progressBg)
		.add('progressLineBg', progressLineBg)
		.add('progressLine',   progressLine)
		.add('scoreBg',        scoreBg)
		.add('pointsBg',       pointsBg)

	app.loader.onProgress.add((e) => {
		// console.log(e.progress)
	})

	app.loader.onError.add((e) => {
		console.error(e.message)
	})

	app.loader.onComplete.add(() => {
		const { resources } = app.loader

		app.visual = {
			tile_red       : resources.red.texture,
			tile_green     : resources.green.texture,
			tile_blue      : resources.blue.texture,
			tile_yellow    : resources.yellow.texture,
			tile_purple    : resources.purple.texture,
			field 		   : resources.field.texture,
			moves 		   : resources.moves.texture,
			chanceBg 	   : resources.chanceBg.texture,
			progressBg 	   : resources.progressBg.texture,
			progressLineBg : resources.progressLineBg.texture,
			progressLine   : resources.progressLine.texture,
			scoreBg   	   : resources.scoreBg.texture,
			pointsBg   	   : resources.pointsBg.texture,
		}
	})

	app.loader.load(() => app.scene.start('Main'))
}
