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

const history = createWebHashHistory()
export const router = createRouter({
  history: history,
  routes: [
    { path: '/', component: Home },
    {
      path: '/doc', component: Doc, children: [
        { path: "", component: DocDemo },//路径为空即二级组件的根展示Doc默认页面
        { path: "intro", component: Intro },
        { path: "install", component: Install },
        { path: "get-start", component: getStart },

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