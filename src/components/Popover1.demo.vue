<demo>常规使用</demo>
<template>
    <div style="overflow: hidden;">
        <Popover position="bottom">
            <template v-slot:content>
                <div>很多内容很多内容很多内容很多内容很多内容很多内容很多内容很多内容很多内容很多内容</div>
            </template>
            <Button>点击显示内容于下方</Button>
        </Popover>
        <Popover >
            <template v-slot:content>
                <div>默认显示内容于上方</div>
            </template>
            <Button>点击显示内容于上方</Button>
        </Popover>
        <Popover position="bottom" trigger="hover">
            <template v-slot:content>
                <div>支持hover触发popover</div>
            </template>
            <Button>鼠标悬浮显示内容</Button>
        </Popover>
    </div>
</template>
<script lang="ts">
    
import { Button } from "../libs/index";
import  Popover from '../libs/Popover.vue'
export default {
  components: {
    Button,
    Popover
  },
};
</script>