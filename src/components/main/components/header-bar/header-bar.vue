<template>
  <div class="header-bar">
    <sider-trigger
      :collapsed="collapsed"
      v-if="!isMobile"
      icon="md-menu"
      @on-change="handleCollpasedChange"
    ></sider-trigger>
    <sider-trigger-drawer :drawer="drawer" v-else icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger-drawer>
    <custom-bread-crumb
      v-if="!isMobile"
      show-icon
      style="margin-left: 30px;"
      :list="breadCrumbList"
    ></custom-bread-crumb>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import siderTrigger from "./sider-trigger";
import siderTriggerDrawer from "./sider-trigger-drawer";
import customBreadCrumb from "./custom-bread-crumb";
import "./header-bar.less";
export default {
  name: "HeaderBar",
  components: {
    siderTrigger,
    siderTriggerDrawer,
    customBreadCrumb,
  },
  props: {
    collapsed: Boolean,
    isMobile: Boolean,
    drawer: Boolean,
  },
  computed: {
    breadCrumbList() {
      return this.$store.state.app.breadCrumbList;
    },
  },
  methods: {
    handleCollpasedChange(state) {
      this.$emit("on-coll-change", state);
    },
  },
};
</script>
