<template>
  <div class="layout">
    <Topnav :toggleMenuButtonVisible="true" class="nav" />
    <div class="content">
      <aside v-if="menuVisible">
        <h2>文档目录</h2>

        <ol>
          <li><router-link to="/doc/intro">介绍</router-link></li>

          <li><router-link to="/doc/install">安装</router-link></li>

          <li><router-link to="/doc/get-start">开始</router-link></li>
        </ol>

        <h2>组件列表</h2>
        <ol>
          <li>
            <router-link to="/doc/switch">Switch 组件</router-link>
          </li>
          <li>
            <router-link to="/doc/button">Button 组件</router-link>
          </li>
          <li>
            <router-link to="/doc/dialog">Dialog 组件</router-link>
          </li>
          <li>
            <router-link to="/doc/tabs">Tabs 组件</router-link>
          </li>
          <li>
            <router-link to="/doc/toast">Toast 组件</router-link>
          </li>
          <li>
            <router-link to="/doc/popover">Popover 组件</router-link>
          </li>
          <li>
            <router-link to="/doc/grid">Grid 组件</router-link>
          </li>
        </ol>
      </aside>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>
<script lang="ts">
import { inject, Ref } from "vue";
import Topnav from "../components/Topnav.vue";

export default {
  components: { Topnav },
  setup() {
    const menuVisible = inject<Ref<boolean>>("menuVisible"); //get
    return { menuVisible };
  },
};
</script>
<style  lang="scss" scoped>
aside {
  background: #d8e0ec;
  width: 150px;
  position: fixed;
  padding: 16px 0;
  top: 0;
  left: 0;
  padding-top: 70px;
  height: 100%;
  z-index: 10;
  > h2 {
    margin-bottom: 4px;
    padding: 0 16px;
  }
  > ol {
    > li {
      > a {
        display: block;
        padding: 4px 16px;
        text-decoration: none;
      }
      .router-link-active {
        display: block;
        background: white;
        padding: 4px 16px;
      }
    }
  }
}
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  > .nav {
    flex-shrink: 0;
  }
  > .content {
    flex-grow: 1;
    padding-top: 60px;
    padding-left: 156px;
    @media (max-width: 500px) {
      padding-left: 0;
    }
  }
}
.content {
  display: flex;
  > aside {
    flex-shrink: 0;
  }
  > main {
    flex-grow: 1;
    padding: 16px;
    background: white;
  }
}
main {
  overflow: hidden;
}
</style>