<template>
  <div class="roll-tabs">
    <div class="roll-tabs-nav">
      <div
        class="roll-tabs-nav-item"
        @click="select(t)"
        :class="{ selected: t === selected }"
        v-for="(t, index) in titles"
        :key="index"
      >
        {{ t }}
      </div>
      <div class="roll-tabs-nav-indicator"></div>
    </div>
    <div class="roll-tabs-content">
      <component
        class="roll-tabs-content-item"
        :class="{ selected: c.props.title === selected }"
        v-for="(c, index) in defaults"
        :key="index"
        :is="c"
      ></component>
    </div>
  </div>
</template>
<script lang="ts">
import { computed } from "vue";
import Tab from "./Tab.vue";
export default {
  components: { Tab },
  props: {
    selected: {
      type: String,
    },
  },
  setup(props, context) {
    const defaults = context.slots.default();

    defaults.map((tag) => {
      if (tag.type !== Tab) {
        throw new Error("Tabs子标签必须是Tab");
      }
    });

    const titles = defaults.map((tag) => {
      return tag.props.title;
    });

    const current = computed(() => {
      return defaults.find((tag) => {
        tag.props.title === props.selected;
      });
    });

    const select = (title: String) => {
      context.emit("update:selected", title);
    };

    return { defaults, titles, current, select };
  },
};
</script>
<style lang="scss">
$blue: #40a9ff;
$color: #333;
$border-color: #d9d9d9;
.roll-tabs {
  &-nav {
    display: flex;
    color: $color;
    border-bottom: 1px solid $border-color;
    position: relative;

    &-item {
      padding: 8px 0;
      margin: 0 16px;
      cursor: pointer;

      &:first-child {
        margin-left: 0;
      }
      &.selected {
        color: $blue;
      }
    }
    &-indicator {
      position: absolute;
      height: 3px;
      background: $blue;
      left: 0;
      bottom: -1px;
      width: 100px;
    }
  }
  &-content {
    padding: 8px 0;
    &-item {
      display: none;
      &.selected {
        display: block;
      }
    }
  }
}
</style>