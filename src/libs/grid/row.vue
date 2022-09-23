<template>
    <div class="row" :class="rowClass">
        <slot></slot>
    </div>
</template>
<script>
import { computed , onMounted ,getCurrentInstance } from 'vue';

    export default{
        props:{
            gutter:{
                type:[Number,String]
            },
            align:{
                type:String,
                validator(val){
                    return ['left','right','center'].includes(val)
                }
            }
        },
        setup(props,context){
            const { proxy } = getCurrentInstance(); // 代替this
            const rowStyle = computed(()=>{
                const {gutter} = props
                return {marginLeft:-gutter/2 + 'px',marginRight: -gutter/2 + 'px'}
            })
            const rowClass = ()=>{
                const {align} = props
                return [align && `align-${align}`]
            }
            onMounted(()=>{
                //获取slot并 遍历，将slot上的gutter属性放到本组件实例上
                console.log(context.slots)
                console.log('aaaaaaaaaaaaa');
            })
            return {
                rowClass,
                rowStyle
            }
        }
    }
</script>
<style  lang="scss">
    .row{
      display: flex;
      flex-wrap: wrap;
      &.align-left {
        justify-content: flex-start;
      }
      &.align-right {
        justify-content: flex-end;
      }
      &.align-center {
        justify-content: center;
      }
    }
  </style>
