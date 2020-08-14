<template>
  <a @click="handleChange" type="text" :class="['sider-trigger-a', drawer ? 'collapsed' : '']">
    <Icon :type="icon" :size="size" />
  </a>
</template>
<script>
export default {
  name: "siderTrigger",
  props: {
    drawer: Boolean,
    icon: {
      type: String,
      default: "navicon-round",
    },
    size: {
      type: Number,
      default: 26,
    },
  },
  methods: {
    handleChange() {
      this.$emit("on-change", !this.drawer);
    },
  },
};
</script>
<style lang="less">
@import "./sider-trigger.less";
</style>
