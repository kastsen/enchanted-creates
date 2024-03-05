import './scss/index.scss'
import './js/Loader'
import Main from "./js/scenes/Main";
import App from "./js/App";
import Pass from "./js/scenes/Pass";
import Level from "./js/scenes/Level";
import {Loader} from "./js/Loader";

global.app = new App({
    elem : document.getElementById('app')
})

await Loader()

app.scene.add('Main', Main)
app.scene.add('Pass', Pass)
app.scene.add('Level', Level)

app.scene.start('Main')