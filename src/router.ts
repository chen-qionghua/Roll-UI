import { createWebHashHistory, createRouter } from 'vue-router'
const history = createWebHashHistory();

import Home from './views/Home.vue'
import Doc from './views/Doc.vue'
import SwitchDemo from './components/SwitchDemo.vue'
import DocDemo from './components/DocDemo.vue'
import ButtonDemo from './components/ButtonDemo.vue'
import DialogDemo from './components/DialogDemo.vue'
import TabsDemo from './components/TabsDemo.vue'

import Markdown from './components/Markdown.vue'
import Intro from './markdown/intro.md'
import Install from './markdown/install.md'
import GetStart from './markdown/get-start.md'
import { h } from 'vue';
const md = String => h(Markdown, { content: String, key: String })

export const router = createRouter({
  history: history,
  routes: [
    { path: '/', component: Home },
    {
      path: '/doc', component: Doc, children: [
        { path: "", redirect: '/doc/intro' },//路径为空即二级组件的根展示Doc默认页面
        { path: "intro", component: md(Intro) },
        { path: "install", component: md(Install) },
        { path: "get-start", component: md(GetStart) },

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