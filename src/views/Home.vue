<template>
  <v-container>
    <v-card color="#ccc" class="text-center mx-auto">
      <h1>Bienvenidos!</h1>
      <v-img height="435" src="../Images/cyber-monday-retail-sales.jpg"></v-img>
      <a href="/productos">
        <v-img class="imagen" src="../Images/ecoPlatform.png"></v-img>
      </a>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Home",

  components: {},
};
</script>

<style scoped>
.imagen{
  position: absolute;
  top: 80px;
  left: 50px;
  width: 350px;
}
</style>
