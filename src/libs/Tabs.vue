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
    </div>
    <div class="roll-tabs-content">
      <component class="roll-tabs-content-item" :is="current"></component>
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
      return defaults.filter((tag) => {
        return tag.props.title === props.selected;
      })[0];
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
  }
  &-content {
    padding: 8px 0;
  }
}
</style>