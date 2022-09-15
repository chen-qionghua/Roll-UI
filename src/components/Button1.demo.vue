<demo>常规使用</demo>
<template>
  <div>
    <Button>你好</Button>
    <Button theme="link">你好</Button>
    <Button theme="text">你好</Button>
  </div>
</template>
<script lang="ts">
import { createApp } from 'vue'
import { Button } from "../libs/index";
import chai from 'chai'
export default {
  components: { Button },
};
{
    const test = createApp(Button)
    const ins =test.mount('#test')
}
</script>