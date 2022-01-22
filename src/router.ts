import { createWebHashHistory, createRouter } from 'vue-router'
import Home from './views/Home.vue'
import Doc from './views/Doc.vue'
import SwitchDemo from './components/SwitchDemo.vue'
import DocDemo from './components/DocDemo.vue'
import ButtonDemo from './components/ButtonDemo.vue'
import DialogDemo from './components/DialogDemo.vue'
import TabsDemo from './components/TabsDemo.vue'
import Intro from "./views/Intro.vue"
import Install from "./views/Install.vue"
import getStart from "./views/getStart.vue"
import Markdown from './components/Markdown.vue'
import { h } from 'vue';
const history = createWebHashHistory();
const md = filename => h(Markdown, { path: `../markdown/${filename}.md`, key: filename })

export const router = createRouter({
  history: history,
  routes: [
    { path: '/', component: Home },
    {
      path: '/doc', component: Doc, children: [
        { path: "", component: DocDemo },//路径为空即二级组件的根展示Doc默认页面
        { path: "intro", component: md('intro') },
        { path: "install", component: md('install') },
        { path: "get-start", component: md('get-start') },

        { path: "switch", component: SwitchDemo },
        { path: "button", component: ButtonDemo },
        { path: 'dialog', component: DialogDemo },
        { path: 'tabs', component: TabsDemo }

      ]
    }
  ]
})
router.afterEach(() => {
  console.log('路由切换了')
})