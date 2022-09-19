<template>
    <h1>Popover 组件示例</h1>
    <Demo :component="PopoverDemo" />
    <h2>组件选项</h2>
    <div>
        <blockquote>
            <p>Popover 组件支持两个选项:<br/> position 用于设置显示位置；<br/>trigger 用于设置触发的事件类型</p>
        </blockquote>
        <h4>1.position</h4>
        <p>position 默认为 top ，可选择的参数为 top , left , right , bottom ,分别设置 popover 显示的方位</p>
        <h4>2.trigger</h4>
        <p>trigger 默认为 click，用于设置触发 popover 显示的事件。 除此之外还支持 hover</p>
    </div>
</template>
<script lang="ts">
import Demo from "./Demo.vue";
import PopoverDemo from "./Popover1.demo.vue";
export default {
components: {
    Demo,
},
setup() {
    return {
    PopoverDemo,
    };
},
};
</script>
<style>
blockquote {
    font-size: 1rem;
    color: #999;
    border-left: 0.2rem solid #dfe2e5;
    margin: 1rem 0;
    padding: 0.25rem 0 0.25rem 1rem;
}
p{
    line-height:1.7;
    padding: 0.25rem 0 0.25rem 1rem;
    margin-bottom: 1rem;
}
</style>