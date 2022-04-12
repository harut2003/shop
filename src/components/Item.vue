<template>
  <div>
    <img :src="img" alt="img" width="200" />
    <div class="prices">
      <span>{{ currentPrice }} ₽</span>
      <span>{{ oldPrice }} ₽</span>
    </div>
    <span>{{ dram }} dram</span>
    <div class="brandColl">
      <span>{{ brand }} / </span>
      <span>{{ collection }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["img", "brand", "collection", "currentPrice", "oldPrice"],
  data() {
    return {};
  },
  computed: {
    dram() {
      return this.currentPrice;
    },
  },
};
</script>

<style lang="scss" scoped>
.prices,
.brandColl {
  display: flex;
}
</style>
