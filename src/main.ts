import './index.scss'
import './libs/roll.scss'
import { createApp } from 'vue'
import App from './App.vue'
import Markdown from './components/Markdown.vue'
import { router } from './router'
import "github-markdown-css"
import Toast from './libs/toastPlugin'


const app = createApp(App).use(router)
app.use(Toast)
app.mount('#app')
app.component('Markdown', Markdown)