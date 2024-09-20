import './assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import EventEmitter from 'events'

class Emitter extends EventEmitter{
    constructor(){
        super()
    }
}

let app = createApp(App)
app.config.globalProperties.$event = new Emitter();
window.test = app.config.globalProperties.$event;
app.use(store).use(router).mount('#app')
