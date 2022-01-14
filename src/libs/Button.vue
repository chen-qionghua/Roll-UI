import { provide } from 'vue';
<template>
  <button class="roll-button" :class="classes" :disabled="disabled">
    <span class="roll-loadingIndicator" v-if="loading"></span>
    <slot />
  </button>
</template>
<script lang="ts">
import { computed } from "vue";
export default {
  props: {
    theme: {
      type: String,
      default: "button",
    },
    size: {
      type: String,
      default: "normal",
    },
    level: {
      type: String,
      default: "normal",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const { theme, size, level } = props;
    const classes = computed(() => {
      return {
        [`roll-theme-${theme}`]: theme,
        [`roll-size-${size}`]: size,
        [`roll-level-${level}`]: level,
      };
    });

    return { classes };
  },
};
</script>
<style lang="scss" >
$h: 32px;
$border-color: #d9d9d9;
$color: #333;
$blue: #40a9ff;
$radius: 4px;
$red: red;
$grey: grey;
.roll-button {
  box-sizing: border-box;
  height: $h;
  padding: 0 12px;
  cursor: pointer;
  display: inline-block;
  justify-content: center;
  align-content: center;
  white-space: nowrap;
  background: white;
  color: $color;
  border: 1px solid $border-color;
  border-radius: $radius;
  box-shadow: 0px 1.5px 0px fade-out(black, 0.9);
  & + & {
    margin-left: 8px;
  }
  &:hover,
  &:focus {
    color: $blue;
    border-color: $blue;
  }
  &:focus {
    outline: none;
  }
  &::-moz-focus-inner {
    //适配火狐浏览器的outline为none
    border: 0;
  }
  &.roll-theme-link {
    border-color: transparent;
    box-shadow: none;
    color: $blue;
    &:hover,
    &:focus {
      color: lighten($blue, 10%);
    }
  }
  &.roll-theme-text {
    border-color: transparent;
    box-shadow: none;
    color: inherit;
    &:hover,
    &:focus {
      background: darken(white, 5%);
    }
  }
  &.roll-size-big {
    font-size: 24px;
    height: 48px;
    padding: 0 16px;
  }
  &.roll-size-small {
    font-size: 12px;
    height: 20px;
    padding: 0 4px;
  }
  &.roll-theme-button {
    &.roll-level-main {
      background: $blue;
      color: white;
      border-color: $blue;
      &:hover,
      &:focus {
        background: darken($color: $blue, $amount: 10%);
        border-color: darken($color: $blue, $amount: 10%);
      }
    }
    &.roll-level-danger {
      background: $red;
      border-color: $red;
      color: white;
      &:hover,
      &:focus {
        background: darken($color: $red, $amount: 10%);
        border-color: darken($color: $red, $amount: 10%);
      }
    }
  }
  &.roll-theme-link {
    &.roll-level-danger {
      color: $red;
      &:hover,
      &:focus {
        color: darken($color: $red, $amount: 10%);
      }
    }
  }
  &.roll-theme-text {
    &.roll-level-main {
      color: $blue;
      &:hover,
      &:focus {
        color: darken($color: $blue, $amount: 10%);
      }
    }
    &.roll-level-danger {
      color: $red;
      &:hover,
      &:focus {
        color: darken($color: $red, $amount: 10%);
      }
    }
  }
  &.roll-theme-button {
    &[disabled] {
      cursor: not-allowed;
      color: $grey;
      &:hover {
        border-color: $grey;
      }
    }
  }
  &.roll-theme-link,
  &.roll-theme-text {
    &[disabled] {
      cursor: not-allowed;
      color: $grey;
    }
  }
  > .roll-loadingIndicator {
    width: 14px;
    height: 14px;
    display: inline-block;
    margin-right: 4px;
    border-radius: 8px;
    border-color: $blue $blue $blue transparent;
    border-style: solid;
    border-width: 2px;
    animation: roll-spin 1s infinite linear;
  }
}
@keyframes roll-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>