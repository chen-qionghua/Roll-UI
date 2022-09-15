<demo>一键打开 Toast</demo>
<template>
    <Button @click="showToast()">点击显示toast</Button>
</template>
<script lang="ts">
import { Button } from "../libs/index";
import { getCurrentInstance } from "vue";
export default {
  components: {
    Button
  },
  setup(){
    //getCurrentInstance:可以获取到组件的实例
    const { proxy }: any = getCurrentInstance()// 代替this
    
    const showToast = ()=>{
        proxy.$toast({
            message:`你的智商目前为 ${parseInt(Math.random()*100)}。你的智商需要充值！`,
            duration:8000,
            position:'center',
            closeButton:{
                text:'已充值',
                callback(){
                    console.log('她说已经充值智商了')
                }
            },
        })
    }
    return{
        showToast
    }
  }
};
</script>