import {Sprite} from "pixi.js";

export default class Points extends PIXI.Container {
    constructor(options) {
        super()
        this.progress = options.progress

        this.create()
    }

    create() {
        const pointsPanel = new PIXI.Container()
        pointsPanel.position.set(30, 145)
        const back = Sprite.from(app.visual.pointsBg)
        back.width = 190
        back.height = 85

        const title = new PIXI.Text('ОЧКИ:', {
            fontSize: 18,
            fill: 0xffffff,
            fontWeight: 'bold',
            fontFamily: 'Marvin',
        })
        title.x = back.width/2-title.width/2
        title.y = 16

        this.num = new PIXI.Text(this.progress, {
            fontSize: 24,
            fill: 0xffffff,
            fontWeight: 'bold',
            fontFamily: 'Marvin',
        })
        this.num.back = back
        this.num.title = title
        this.setNumPosition()

        pointsPanel.addChild(back, title, this.num)
        this.addChild(pointsPanel)
    }

    setNumPosition() {
        this.num.position.set(this.num.back.width/2-this.num.width/2, this.num.title.y+this.num.title.height+1)
    }

    update(progress) {
        if (progress === this.progress)
            return
        this.progress = Math.round(progress*4.5)
        this.num.text = this.progress
        this.setNumPosition()
    }
}
