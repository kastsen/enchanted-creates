import {Sprite} from "pixi.js";
import {FONT_FAMILY} from "../View";

export default class Points extends PIXI.Container {
    constructor(options) {
        super()
        this.progress = options.progress

        this.create()
    }

    create() {
        const pointsPanel = new PIXI.Container()
        const back = new Sprite(app.visual.pointsBg)
        this.bg = back
        back.width = 140
        back.height = 64

        this.title = new PIXI.Text('Score:', {
            fontSize: 18,
            fill: 0xffffff,
            fontWeight: 'bold',
            fontFamily: FONT_FAMILY,
        })
        this.title.x = 20
        this.title.y = 20

        this.num = new PIXI.Text(this.progress, {
            fontSize: 24,
            fill: 0xffffff,
            fontWeight: 'bold',
            fontFamily: FONT_FAMILY,
        })
        this.num.back = back
        this.num.title = this.title
        this.setNumPosition()

        pointsPanel.addChild(this.title, this.num)
        this.addChild(pointsPanel)
    }

    setNumPosition() {
        this.num.position.set(
            this.title.width + 30,
            this.title.y - 6
        )
    }

    update(progress) {
        if (progress === this.progress)
            return
        this.progress = Math.round(progress*4.5)
        this.num.text = this.progress
        this.setNumPosition()
    }
}
