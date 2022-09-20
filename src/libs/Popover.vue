<template>
  <div class="popover" ref="popoverRef">
    <Teleport to="body">
        <div
        ref="contentWrapperRef"
        class="content-wrapper"
        id="contentWrapper"
        v-if="visible"
        :class="`position-${position}`"
        >
            <slot name="content" :close="close"></slot>
        </div>
    </Teleport>
    <span ref="triggerWrapperRef" style="display: indline-block">
      <slot></slot>
    </span>
  </div>
</template>
<script>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  getCurrentInstance,
  nextTick,
} from "vue";
export default {
  props: {
    position: {
      type: String,
      default: "top",
      validator(val) {
        return ["top", "bottom", "left", "right"].includes(val);
      },
    },
    trigger: {
      type: String,
      default: "click",
      validator(val) {
        return ["click", "hover"].includes(val);
      },
    },
  },
  setup(props, context) {
    const { proxy } = getCurrentInstance(); // 代替this
    let visible = ref(false);
    const popoverRef = ref();
    const contentWrapperRef = ref();
    const triggerWrapperRef = ref();
    onMounted(() => {
      if (props.trigger === "click") {
        popoverRef.value.addEventListener("click", proxy.onClick);
      } else {
        popoverRef.value.addEventListener("mouseenter", proxy.open);
        popoverRef.value.addEventListener("mouseleave", proxy.close);
      }
    });
    onBeforeUnmount(() => {
      if (props.trigger === "click") {
        //onUnmounted拿不到popoverRef，故提前一点拿
        popoverRef.value.removeEventListener("click", proxy.onClick);
        const contentWrapper =document.querySelector('#contentWrapper') 
        //切换菜单到别的组件时，需要销毁现dom
        if(contentWrapper){
            document.body.removeChild(contentWrapper)
            // visible.value = false //打印为false 但dom节点无法销毁，思考原因？
            //此组件手动操作dom后vue内部虚拟dom不知道/结构不同无法辨认，故数据驱动不成功，只能通过手动操作dom的方法
        }
      } else {
        popoverRef.value.removeEventListener("mouseenter", proxy.open);
        popoverRef.value.removeEventListener("mouseleave", proxy.close);
      }
    });

    const positionContent = () => {
      const { width, height, top, left } =
        triggerWrapperRef.value.getBoundingClientRect();
      const { height: contentHeight } =
        contentWrapperRef.value.getBoundingClientRect();
      let positions = {
        top: { top: top + window.scrollY, left: left + window.scrollX },
        bottom: {
          top: top + height + window.scrollY,
          left: left + window.scrollX,
        },
        left: {
          top: top + window.scrollY + (height - contentHeight) / 2,
          left: left + window.scrollX,
        },
        right: {
          top: top + window.scrollY + (height - contentHeight) / 2,
          left: left + window.scrollX + width,
        },
      };
      contentWrapperRef.value.style.left =
        positions[props.position].left + "px";
      contentWrapperRef.value.style.top = positions[props.position].top + "px";
    };
    const onClickDocument = (e) => {
      if (
        popoverRef.value &&
        (popoverRef.value === e.target || popoverRef.value.contains(e.target))
      ) {
        return;
      }
      if (
        contentWrapperRef.value &&
        (contentWrapperRef.value === e.target ||
          contentWrapperRef.value.contains(e.target))
      ) {
        return;
      }
      close();
    };
    const open = () => {
      visible.value = true;
      nextTick(() => {
        positionContent();
        document.addEventListener("click", onClickDocument);
      });
    };
    const close = () => {
      visible.value = false;
      document.removeEventListener("click", proxy.onClickDocument);
    };
    const onClick = (e) => {
      if (triggerWrapperRef.value.contains(e.target)) {
        if (visible.value === true) {
          close();
        } else {
          open();
        }
      }
    };
    return {
      visible,
      popoverRef,
      contentWrapperRef,
      triggerWrapperRef,
      positionContent,
      onClickDocument,
      open,
      close,
      onClick,
    };
  },
};
</script>
<style lang="scss">
$border-color: #333;
$border-radius: 4px;
.popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
  padding-right: 12px;
}
.content-wrapper {
  position: absolute;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
  background: white;
  padding: 0.5em 1em;
  max-width: 20em;
  word-break: break-all;
  &::before,
  &::after {
    content: "";
    display: block;
    border: 10px solid transparent;
    width: 0;
    height: 0;
    position: absolute;
  }
  &.position-top {
    transform: translateY(-100%);
    margin-top: -10px;
    &::before,
    &::after {
      left: 10px;
    }
    &::before {
      border-top-color: black;
      border-bottom: none;
      top: 100%;
    }
    &::after {
      border-top-color: white;
      border-bottom: none;
      top: calc(100% - 1px);
    }
  }
  &.position-bottom {
    margin-top: 10px;
    &::before,
    &::after {
      left: 10px;
    }
    &::before {
      border-top: none;
      border-bottom-color: black;
      bottom: 100%;
    }
    &::after {
      border-top: none;
      border-bottom-color: white;
      bottom: calc(100% - 1px);
    }
  }
  &.position-left {
    transform: translateX(-100%);
    margin-left: -10px;
    &::before,
    &::after {
      transform: translateY(-50%);
      top: 50%;
    }
    &::before {
      border-left-color: black;
      border-right: none;
      left: 100%;
    }
    &::after {
      border-left-color: white;
      border-right: none;
      left: calc(100% - 1px);
    }
  }
  &.position-right {
    margin-left: 10px;
    &::before,
    &::after {
      transform: translateY(-50%);
      top: 50%;
    }
    &::before {
      border-right-color: black;
      border-left: none;
      right: 100%;
    }
    &::after {
      border-right-color: white;
      border-left: none;
      right: calc(100% - 1px);
    }
  }
}
</style>
