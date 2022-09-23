<template>
    <div class="col" :class="colClass">
        <slot></slot>
    </div>
</template>
<script>
import { ref ,computed } from 'vue'
const validator = (val)=>{
    const keys = Object.keys(val)
    const valid = true
    keys.forEach((key) => {
        if(!['span','offset'].includes(key)){
            valid = false
        }
    })
    return valid
}
export default {
    props:{
        span:{
            type:[Number,String]
        },
        offset:{
            type:[Number,String]
        },
        ipad:{
            type:Object,
            validator
        },
        narrowPc:{
            type:Object,
            validator
        },
        pc:{
            type:Object,
            validator
        },
        widePc:{
            type:Object,
            validator
        }
    },
    setup(props,context){
        const gutter = ref(0)
        const createClasses = (obj,str = '')=>{
            if(!obj){
                return []
            }
            let array = []
            if(obj.span){
                array.push(`col-${str}${obj.span}`)
            }
            if(obj.offset){
                array.push(`offset-${str}${obj.offset}`)
            }
            return array
        }
        const colClass = computed(()=>{
            const { span ,offset,ipad ,narrowPc,pc,widePc} = props
            const createClasses = props.createClasses
            return [
                ...createClasses({span,offset}),
                ...createClasses(ipad,'ipad-'),
                ...createClasses(narrowPc,'narrowPc-'),
                ...createClasses(pc,'pc-'),
                ...createClasses(widePc,'wide-pc-'),
            ]
        })
        const colStyle = computed(()=>{
            return {
                paddingLeft:gutter.value / 2 + 'px',
                paddingRight:gutter.value / 2 + 'px',
            }
        })
        return {
            gutter,
            createClasses,
            colClass,
            colStyle
        }
    }
}
</script>
<style  lang="scss">
    .col {
      $class-prefix: col-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          width: ($n / 24) * 100%;
        }
      }
      $class-prefix: offset-;
      @for $n from 1 through 24 {
        &.#{$class-prefix}#{$n} {
          margin-left: ($n / 24) * 100%;
        }
      }
      @media (min-width: 577px) {
        $class-prefix: col-ipad-;
        @for $n from 1 through 24 {
          &.#{$class-prefix}#{$n} {
            width: ($n / 24) * 100%;
          }
        }
        $class-prefix: offset-ipad-;
        @for $n from 1 through 24 {
          &.#{$class-prefix}#{$n} {
            margin-left: ($n / 24) * 100%;
          }
        }
      }
      @media (min-width: 769px){ // 770
        $class-prefix: col-narrow-pc-;
        @for $n from 1 through 24 {
          &.#{$class-prefix}#{$n} {
            width: ($n / 24) * 100%;
          }
        }
        $class-prefix: offset-narrow-pc-;
        @for $n from 1 through 24 {
          &.#{$class-prefix}#{$n} {
            margin-left: ($n / 24) * 100%;
          }
        }
      }
      @media (min-width: 993px) {
        $class-prefix: col-pc-;
        @for $n from 1 through 24 {
          &.#{$class-prefix}#{$n} {
            width: ($n / 24) * 100%;
          }
        }
        $class-prefix: offset-pc-;
        @for $n from 1 through 24 {
          &.#{$class-prefix}#{$n} {
            margin-left: ($n / 24) * 100%;
          }
        }
      }
      @media (min-width: 1201px) {
        $class-prefix: col-wide-pc-;
        @for $n from 1 through 24 {
          &.#{$class-prefix}#{$n} {
            width: ($n / 24) * 100%;
          }
        }
        $class-prefix: offset-wide-pc-;
        @for $n from 1 through 24 {
          &.#{$class-prefix}#{$n} {
            margin-left: ($n / 24) * 100%;
          }
        }
      }
    }
  </style>