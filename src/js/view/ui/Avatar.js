export default class Avatar extends PIXI.Container {
    constructor() {
        super()
        this.create()
    }

    create() {
        this.img = new PIXI.Sprite(app.visual.logoImg)
        this.img.anchor.set(0)
        this.img.width = 122
        this.img.height = 132
        // this.visible = false

            // this.text = new PIXI.Text(this.num, {
        //     fontSize: 32,
        //     fill: 0xF9CDA4,
        // })

        // this.text.position.set(this.bg.width/2 - this.text.width/2, 26)

        this.addChild(this.img)
    }
}
