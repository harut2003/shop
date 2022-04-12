<template>
  <div data-app>
    <div class="items-container">
      <div v-for="item in items" :key="item.id" class="item">
        <div @click="itemPreview(item.id)">
          <Item
            :img="item.img"
            :brand="item.brand"
            :collection="item.collection"
            :currentPrice="item.currentPrice"
            :oldPrice="item.oldPrice"
          />
        </div>

        <v-btn color="red" class="trash-btn" icon @click="deleteItem(item.id)"
          ><v-icon>mdi-delete</v-icon></v-btn
        >
        <v-btn class="edit-btn" icon @click="openEdit = true"
          ><v-icon>mdi-pencil</v-icon></v-btn
        >
      </div>
    </div>
    <v-form @submit.prevent="handleSubmit">
      <v-select
        v-model="form.collection"
        :items="collections"
        item-text="name"
        item-value="value"
        label="Collection"
      ></v-select>
      <v-text-field v-model="form.brand" label="Brand"> </v-text-field>
      <v-text-field v-model="form.currentPrice" label="Price"> </v-text-field>
      <div>
        <input
          type="file"
          accept="image/*"
          label="Add image"
          @change="onFileChange"
        />
        <img :src="form.img" alt="preview" v-if="form.img" />
      </div>
      <v-btn class="add-btn" type="submit">Add</v-btn>
    </v-form>
    <EditModal :openEdit="openEdit" @closeModal="openEdit = false" />
  </div>
</template>

<script>
import Item from "@/components/Item.vue";
import EditModal from "@/components/EditModal.vue";

export default {
  data() {
    return {
      openEdit: false,
      form: {
        collection: null,
        brand: "",
        currentPrice: "",
        img: null,
      },
      collections: [
        { name: "Huddy", value: "huddy" },
        { name: "Shoes", value: "shoes" },
        { name: "T-shirt", value: "t-shirt" },
        { name: "Costume", value: "costume" },
      ],
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.form.img = fileReader.result;
      });
      fileReader.readAsDataURL(file);
    },
    handleSubmit() {
      for (const data in this.form) {
        if (!data) return;
      }
      this.$store.dispatch("addItem", this.form);
    },
    deleteItem(id) {
      this.$store.dispatch("deleteItem", id);
    },
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
    EditModal,
  },
};
</script>

<style lang="scss" scoped>
.add-btn {
  margin-top: 20px;
  background-color: green !important;
}
.trash-btn {
  background-color: red !important;
}
.edit-btn {
  background-color: blue !important;
  margin-left: 10px;
}
</style>
