<template>
  <div class="container-loader">
    <v-progress-circular
      indeterminate
      color="primary"
      :size="100"
    ></v-progress-circular>
  </div>
</template>

<style lang="scss">
.container-loader {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
