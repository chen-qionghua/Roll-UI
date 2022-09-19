<template>
  <div class="wrapper" :class="toastClasses">
    <div class="toast" ref="toastRef">
      <div class="message">
        {{ message }}
      </div>
      <div class="line" ref="lineRef"></div>
      <span class="close" v-if="closeButton" @click="onClickClose">
        {{ closeButton.text }}
      </span>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, nextTick } from "vue";
import { getCurrentInstance, computed } from "vue";

export default {
  name: "RollToast",
  props: {
    message: {
      type: String,
      default: "",
    },
    autoClose: {
      type: [Boolean, Number],
      default: [true,2],
      validator(val) {
        return typeof val[0] === "boolean" || typeof val[1] === "number";
      },
    },
    closeButton: {
      type: Object,
      default: () => {
        return {
          text: "关闭",
          callback: undefined,
        };
      },
    },
    position: {
      type: String,
      default: "top",
      validator(val) {
        return ["top", "bottom", "center"].includes(val);
      },
    },
  },
  setup(props, context) {
    const { proxy } = getCurrentInstance(); // 代替this
    const toastRef = ref();
    const lineRef = ref();
    onMounted(() => {
      updateStyles();
      execAutoClose()
    });
    const toastClasses = computed(() => {
      return {
        [`position-${proxy.position}`]: true,
      };
    });
    const updateStyles = () => {
      nextTick(() => {
        lineRef.value.style.height = `${
          toastRef.value.getBoundingClientRect().height
        }px`;
      });
    };
    const execAutoClose = () => {
      if (props.autoClose) {
        setTimeout(() => {
          close();
        }, props.autoClose[1] * 1000);
      }
    };
    const close = () => {
      const container = document.querySelector("#toastWrapper");
      proxy.$el.remove();
      document.body.removeChild(container);
    };
    const onClickClose = () => {
      close();
      if (
        props.closeButton &&
        typeof props.closeButton.callback === "function"
      ) {
        props.closeButton.callback(proxy); //this === toast 实例
      }
    };

    return {
      toastRef,
      lineRef,
      updateStyles,
      execAutoClose,
      close,
      onClickClose,
      toastClasses,
    };
  },
};
</script>
<style lang="scss">
$font-size: 14px;
$toast-min-height: 40px;
$toast-bg: rgba(0, 0, 0, 0.75);
@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}
@keyframes slide-down {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.wrapper {
  z-index: 99;
  position: fixed;
  // position:relative;
  left: 50%;
  transform: translateX(-50%);
  $animation-duration: 300ms;
  &.position-top {
    top: 0;
    .toast {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      animation: slide-down $animation-duration;
    }
  }
  &.position-bottom {
    bottom: 0;
    .toast {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      animation: slide-up $animation-duration;
    }
  }
  &.position-center {
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    .toast {
      animation: fade-in $animation-duration;
    }
  }
}
.toast {
  font-size: $font-size;
  min-height: $toast-min-height;
  line-height: 1.8;
  display: flex;
  color: white;
  align-items: center;
  background: $toast-bg;
  border-radius: 4px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  padding: 0 16px;
  .message {
    padding: 8px 0;
  }
  .close {
    padding-left: 16px;
    flex-shrink: 0;
    cursor: pointer;
  }
  .line {
    height: 100%;
    border-left: 1px solid #666;
    margin-left: 16px;
  }
}
</style>
