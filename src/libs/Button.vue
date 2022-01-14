import { provide } from 'vue';
<template>
  <button class="roll-button" :class="classes">
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
  },
  setup(props) {
    const { theme, size } = props;
    const classes = computed(() => {
      return {
        [`roll-theme-${theme}`]: theme,
        [`roll-size-${size}`]: size,
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
}
</style>