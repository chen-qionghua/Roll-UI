<template>
  <button class="roll-ui" :class="`theme-${theme}`"><slot /></button>
</template>
<script lang="ts">
export default {
  props: {
    theme: {
      type: String,
      default: "button",
    },
  },
  setup() {},
};
</script>