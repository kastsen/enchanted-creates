import Button from "./Button";

export default class Bonuses extends PIXI.Container {
    constructor(options = {}) {
        super()
        this.view = options.view || false
        this.settings = options.settings || false
        this.create()
    }

    create() {
        this.shuffleButton = this.createButton({
            text: 'ПЕРЕМЕШАТЬ',
            num: this.settings.task.shuffles,
            x: 130,
            action: this.shuffleButtonOnClick.bind(this),
        })
        this.bombButton = this.createButton({
            text: 'БОМБА',
            num: this.settings.task.bombs,
            x: 260,
            action: this.bombButtonOnClick.bind(this),
        })
    }

    createButton(options = {}) {
        const button = new Button({
            texture: app.visual.chanceBg,
            text: options.text,
            action: options.action,
        })
        button.num = options.num
        button.numText = new PIXI.Text(button.num, {
            fontSize: 20,
            fill: '0xffffff',
            fontWeight: 'bold',
            fontFamily: 'Marvin',
        })
        button.numText.position.set(button.width/2-20, button.height-button.numText.height-30)
        button.x = options.x
        button.addChild(button.numText)
        this.addChild(button)
        return button
    }

    updateButtonNum(button) {
        button.num--
        button.numText.text = button.num
        if (button.num <= 0) button.disable()
    }

    shuffleButtonOnClick() {
        this.updateButtonNum(this.shuffleButton)
        if (this.shuffleButton.num > -1) this.view.field.update({shuffle: true})
    }

    bombButtonOnClick() {
        if (this.settings.bombIsActive) return
        this.updateButtonNum(this.bombButton)
        this.settings.bombIsActive = true
    }
}
