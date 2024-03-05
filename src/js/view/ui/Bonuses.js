import Button from "./Button";
import {FONT_FAMILY} from "../View";

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
        this.shuffleButton.visible = false

        this.bombButton = this.createButton({
            text: 'BOMB',
            num: this.settings.task.bombs,
            x: 0,
            action: this.bombButtonOnClick.bind(this),
            textureName: app.visual.bombBtn,
        })
    }

    createButton(options = {}) {
        const button = new Button({
            texture: options.textureName ? options.textureName : app.visual.chanceBg,
            text: options.text,
            action: options.action,
        })
        button.scale.set(0.56)
        button.num = options.num
        button.numText = new PIXI.Text(button.num, {
            fontSize: 35,
            fill: '0x582910',
            fontWeight: 'bold',
            fontFamily: FONT_FAMILY,
        })
        button.numText.position.set(16, 6)
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
        console.log('!!!!!!!!!')
        if (this.settings.bombIsActive) return
        this.updateButtonNum(this.bombButton)
        this.settings.bombIsActive = true
    }
}
