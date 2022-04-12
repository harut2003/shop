<template>
  <div>
    <div>
      <v-carousel>
        <v-carousel-item
          v-for="(item, i) in slides"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
      <div>
        <h3>Collection</h3>
        <div class="items-container">
          <div
            v-for="item in items"
            :key="item.id"
            class="item"
            @click="itemPreview(item.id)"
          >
            <Item
              :img="item.img"
              :brand="item.brand"
              :collection="item.collection"
              :currentPrice="item.currentPrice"
              :oldPrice="item.oldPrice"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "@/components/Item.vue";
export default {
  name: "HomeView",
  data: () => ({
    slides: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
      },
    ],
  }),
  methods: {
    itemPreview(id) {
      this.$router.push("items/" + id);
    },
  },
  computed: {
    items() {
      return this.$store.getters.collections;
    },
  },
  components: {
    Item,
  },
};
</script>

<style lang="scss">
.v-window__next {
  margin-left: 95% !important;
}
.items-container {
  display: flex;
  justify-content: start;
}
.item {
  margin-right: 30px;
  cursor: pointer;
}
</style>
