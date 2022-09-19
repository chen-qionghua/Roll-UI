<demo>一键打开 Toast</demo>
<template>
  <Button @click="showToast()">点击显示toast</Button>
</template>
<script lang="ts">
import { Button } from "../libs/index";
import { getCurrentInstance } from "vue";
export default {
  components: {
    Button,
  },
  setup() {
    //getCurrentInstance:可以获取到组件的实例
    const { proxy }: any = getCurrentInstance(); // 代替this

    const showToast = () => {
      proxy.$toast({
        message: "祝你平安喜乐",
        autoClose: [true,3],
        position: "center",
        closeButton: {
          text: "朕已阅",
          callback() {
            console.log("她说已经充值智商了");
          },
        },
      });
    };
    return {
      showToast,
    };
  },
};
</script>