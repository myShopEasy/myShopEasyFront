<template>
  <!-- Aquí aparecen los compones en la app -->
  <v-app>
    <!-- Aquí se muestra el Nav Bar -->
    <navbar :key="isLogged">
      <Navbar></Navbar>
    </navbar>

    <!-- Auí está el contenido principal -->
    <v-main>
      <v-container fluid>
        <!-- Aquí se muestran las vistas -->
        <transition name="slide" mode="out-in">
          <router-view @isLogged="isLogged = true" />
        </transition>
      </v-container>
    </v-main>
    <!-- Aquí se añade el pie de página -->
    <v-footer color="grey lighten-1" padless>
      <Footer></Footer>
    </v-footer>
  </v-app>
</template>

<script>
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  data: () => ({
    isLogged: false,
  }),
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}

.slide-enter,
.slide-leave {
  opacity: 0;
  transform: translateY(30%);
}
</style>
