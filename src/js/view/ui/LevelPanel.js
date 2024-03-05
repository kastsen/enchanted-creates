export default class LevelPanel extends PIXI.Container {
    constructor() {
        super()
        this.num = '01'
        this.create()
    }

    create() {
        this.bg = new PIXI.Sprite(app.visual.btnBg)
        this.bg.width = this.bg.height = 80

        this.text = new PIXI.Text(this.num, {
            fontSize: 32,
            fill: 0xF9CDA4,
        })

        this.text.position.set(this.bg.width/2 - this.text.width/2, 26)

        this.addChild(this.bg, this.text)
    }
}
