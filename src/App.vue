<template>
  <div>
    <component :is="layout"><router-view /></component>
  </div>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
export default {
  name: "App",

  data: () => ({}),
  computed: {
    layout() {
      const { layout } = this.$route.meta;
      if (layout) {
        return layout + "-layout";
      }
      return "";
    },
  },
  async mounted() {
    await this.$store.dispatch("user");
    await this.$store.dispatch("getCollections");
  },
  components: {
    MainLayout,
  },
};
</script>

<style lang="scss" scoped>
.v-toolbar__content {
  padding: 4px 220px !important;
}
</style>
