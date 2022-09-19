<template>
    <h1>Toast 组件示例</h1>
    <Demo :component="Toast1Demo" />
    <h2>组件选项</h2>
    <div>
        <blockquote>
            <p>Toast 组件支持四个选项: <br/>message 用于设置 toast 的主体内容；<br/>autoClose 用于设置 toast 是否自动关闭和自动关闭的时长；<br/>position 用于设置 toast 出现的位置；<br/>closeButton 用于设置关闭 toast 的按钮文本内容和关闭 toast 后的回调函数</p>
        </blockquote>
        <h4>1.message</h4>
        <p>message 暂时只支持普通字符串内容，不支持 html 等复杂内容</p>
        <h4>2.autoClose</h4>
        <p>autoClose 默认为 [true,2] 即默认设置自动关闭及其时长为2s</p>
        <h4>3.position</h4>
        <p>position 默认为 top，可选的位置有top、bottom、center</p>
        <h4>4.closeButton</h4>
        <p>closeButton 默认为 {text: "关闭",callback:undefined} 即默认设置关闭文本为“关闭”，关闭后的回调函数为 undefined</p>
    </div>
  </template>
  <script lang="ts">
  import Demo from "./Demo.vue";
  import Toast1Demo from "./Toast1.demo.vue";
  export default {
    components: {
      Demo,
    },
    setup() {
      return {
        Toast1Demo,
      };
    },
  };
  </script>