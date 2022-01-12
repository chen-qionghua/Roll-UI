<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <router-view />
</template>

<script lang="ts">
import { ref } from "vue";
import { provide } from "vue";

export default {
  name: "App",
  setup() {
    const menuVisible = ref(false);
    provide("menuVisible", menuVisible); //set
  },
};
</script>
