import './scss/index.scss'
import './js/loader'
import Main from "./js/scene/Main";
import App from "./js/app";
import Pass from "./js/scene/Pass";
import Level from "./js/scene/Level";
import {Loader} from "./js/loader";

window.onload = () => {
    global.app = new App({
        elem : document.getElementById('app')
    })

    Loader()

    app.scene.add('Main', Main)
    app.scene.add('Pass', Pass)
    app.scene.add('Level', Level)
}
