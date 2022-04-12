<template>
  <div>
    <div>
      <img :src="singleItem.img" alt="img" />
      <div class="prices">
        <span>{{ singleItem.currentPrice }} ₽</span>
        <span>{{ singleItem.oldPrice }} ₽</span>
      </div>
      <span>{{ singleItem.dram }} dram</span>
      <div class="brandColl">
        <span>{{ singleItem.brand }} / </span>
        <span>{{ singleItem.collection }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    singleItem() {
      return this.$store.getters.singleItem;
    },
  },
  mounted() {
    this.$store.dispatch("getSingleItem", this.$route.params.id);
  },
  beforeDestroy() {
    this.$store.commit("clearSingleItem");
  },
};
</script>
