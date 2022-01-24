<demo>常规使用</demo>
<template>
  <div>
    <Button @click="toggle">打开对话框</Button>
    <Dialog
      v-model:visible="x"
      :closeOnClickOverlay="false"
      :ok="f1"
      :cancel="f2"
    >
      <template v-slot:content>
        <strong>hi</strong>
        <div>npc</div>
      </template>
      <template>
        <strong>加粗的标题</strong>
      </template>
    </Dialog>
  </div>
</template>
<script lang="ts">
import Button from "../libs/Button.vue";
import Dialog from "../libs/Dialog.vue";
import { ref } from "vue";
export default {
  components: { Button, Dialog },
  setup() {
    const x = ref(false);
    const toggle = () => {
      x.value = !x.value;
    };
    const f1 = () => {
      return true;
    };
    const f2 = () => {};
    return {
      x,
      toggle,
      f1,
      f2,
    };
  },
};
</script>