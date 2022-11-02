<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/productos"
        ><img id="logo" src="../Images/logo2.png" alt="" /> EcoPlatform</a
      >
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
        role="navigation"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-if="isLogged" class="nav-item">
            <a
              class="nav-link active"
              aria-current="true"
              @click="cerrarSesion()"
              href="/productos"
              >Cerrar Sesión</a
            >
          </li>
          <li v-if="!isLogged" class="nav-item">
            <a class="nav-link active" aria-current="true" href="/ingreso"
              >Ingresar</a
            >
          </li>
          <li class="nav-item" v-if="!isLogged">
            <a class="nav-link active" aria-current="true" href="/registro"
              >Registrarse</a
            >
          </li>
          <li class="nav-item">
            <Modal></Modal>
          </li>
        </ul>

        <form class="d-flex menu">
          <div class="mr-3" v-if="isLogged">
            <h5>¡Bienvenido!</h5>
          </div>
          <div v-if="isLogged">
            <h5>{{ usuario }}</h5>
          </div>
          <div v-if="isLogged" class="pt-1 px-3">
            <a href="/perfil"><em class="fa fa-user-circle iconos"></em></a>
          </div>
          <div class="pt-1 px-6">
            <a href="/carrito"
              ><em class="fa fa-shopping-cart iconos"
                ><span v-show="!conta">({{ carrito() }})</span></em
              ></a
            >
          </div>

          <input
            class="form-control me-2"
            type="search"
            placeholder="Buscar producto"
            aria-label="Buscar"
            v-model="id"
          />
          <button class="btn btn-outline-success" @click="buscar()">
            Buscar
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import Modal from "./Modal.vue";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      id: null,
      usuario: sessionStorage.getItem("usuario"),
      conta: false,
    };
  },
  methods: {
    cerrarSesion() {
      sessionStorage.removeItem("usuario");
      sessionStorage.removeItem("sesion");
      window.location.reload();
    },
    buscar() {
      this.$router.push(`/busqueda/${this.id}`);
    },
    carrito(){
      var carritoStorage = JSON.parse(localStorage.getItem("carritoCompra"));
      if(carritoStorage != undefined && carritoStorage != null){
        if ( Object.keys(carritoStorage).length === 0  ||
            Object.keys(carritoStorage).length === null) {
          this.conta = true;
        }
        return this.contador;
      }
    }
  },
  computed: {
    isLogged() {
      return sessionStorage.getItem("sesion") != undefined;
    },
    contador() {
      var carritoStorage = JSON.parse(localStorage.getItem("carritoCompra"));
      return Object.keys(carritoStorage).length;
    },
  },
};
</script>

<style>
#logo {
  height: 50px;
}
.iconos {
  color: white;
  font-size: 25px;
}

.iconos span {
  font-family: Arial, Helvetica, sans-serif;
  padding-left: 10px;
}

.btn {
  color: white;
}

.menu h5 {
  color: white;
  margin-top: 5px;
}
</style>
