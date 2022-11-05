<template>
  <v-container>
    <v-btn color="success" absolute fixed fab left to="/productos">
      <v-icon>mdi-keyboard-backspace</v-icon>
    </v-btn>
    <v-card max-width="850" height="400" class="mx-auto my-6">
      <v-row class="ma-auto" align="center" align-content="center">
        <v-col cols="12" sm="6" md="6">
          <v-hover v-slot="{ hover }">
            <div>
              <v-img
                v-if="!noFound"
                :aspect-ratio="4 / 3"
                height="360"
                width="100%"
                :src="producto.foto"
                class="ma-auto"
                ><v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out green darken-2 v-card--reveal text-h2 white--text"
                    style="height: 100%;"
                  >
                    ${{ producto.precio }}
                  </div>
                </v-expand-transition>
              </v-img>
              <v-img
                v-if="noFound"
                :aspect-ratio="4 / 3"
                height="360"
                width="100%"
                src="../Images/no_image.jpg"
                class="ma-auto"
                ><v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out green darken-2 v-card--reveal text-h2 white--text"
                    style="height: 100%;"
                  >
                    {{ precio }}
                  </div>
                </v-expand-transition>
              </v-img>
            </div>
          </v-hover>
        </v-col>

        <v-col cols="12" sm="6" md="6">
          <v-card-title
            ><h1>{{ producto.nombre }}</h1>
            <v-rating
              class="pl-6"
              v-model="rating"
              background-color="grey"
              color="yellow accent-4"
              dense
              half-increments
              hover
              size="18"
            ></v-rating>
          </v-card-title>
          <v-card-text>
            <h5>Codigo: {{ producto.id }}</h5>
          </v-card-text>
          <v-card-title v-if="noFound"
            ><h1>{{ title }}</h1>
          </v-card-title>
          <v-card-text>
            <div class="my-4 text-subtitle-1">
              {{ producto.especificacion }}
            </div>
          </v-card-text>
          <v-card-title class="justify-center">
            <v-card-actions class="d-flex">
              <v-chip
                v-if="!noFound"
                color="success"
                x-large
                @click="
                  reserve(
                    producto.id,
                    producto.nombre,
                    producto.precio,
                    producto.foto,
                    producto.especificacion
                  )
                "
                >COMPRAR YA!! ${{ producto.precio }}
              </v-chip>
              <v-chip v-if="noFound" color="success" x-large @click="reserve"
                >COMPRAR YA!! {{ precio }}
              </v-chip>
            </v-card-actions>
          </v-card-title>
        </v-col>
      </v-row>
      <MensajeError
        :mensaje="MensajeError"
        :snackbar="ErrorShow"
        :close="cerrarError"
      ></MensajeError>
    </v-card>
  </v-container>
</template>

<script>
import { getProducto } from "../services/Productos.Service";
import MensajeError from "../../src/components/MensajeError.vue";

export default {
  components: {
    MensajeError,
  },
  data() {
    return {
      min: 0,
      max: 100,
      slider: 100,
      rating: 0,
      MensajeError: "",
      ErrorShow: false,
      noFound: false,
      title: "No encontrado",
      precio: "$0.00",
      productos: [],
      producto: {
        id: this.id,
        nombre: this.nombre,
        precio: this.precio,
        foto: this.foto,
        especificacion: this.especificacion,
      },
      productosCarrito: [],
    };
  },
  methods: {
    reserve(id, nombre, precio, foto, especificacion) {
      if (!localStorage.getItem("carritoCompra")) {
        localStorage.setItem("carritoCompra", JSON.stringify([]));
      }
      var carritoStorage = JSON.parse(localStorage.getItem("carritoCompra"));
      var productoCarrito = {
        id: id,
        nombre: nombre,
        precio: precio,
        foto: foto,
        especificacion: especificacion,
      };
      if (productoCarrito == undefined) {
        // this.abrirError("Error al agregar el producto al carrito");
        console.log("Error al agregar el producto al carrito");
      }
      if (carritoStorage == null) {
        carritoStorage = [];
      }
      if (Object.keys(carritoStorage).length === 0) {
        carritoStorage.push(productoCarrito);
        this.$router.push("/carrito");
      } else if (Object.keys(carritoStorage).length !== 0) {
        var validator = true;
        Object.keys(carritoStorage).forEach((key) => {
          if (carritoStorage[key].id === id) {
            validator = false;
          }
        });
        if (validator === true) {
          carritoStorage.push(productoCarrito);
          this.$router.push("/carrito");
        } else {
          this.abrirError("El producto ya está en el carrito");
        }
      }
      localStorage.setItem("carritoCompra", JSON.stringify(carritoStorage));
    },
    abrirError(mensaje) {
      this.MensajeError = mensaje;
      this.ErrorShow = true;
    },
    cerrarError() {
      this.ErrorShow = false;
      this.$router.push("/productos");
    },
  },
  mounted() {
    const name= this.$route.params.name;
    if (name != undefined) {
      getProducto(name)
        .then((response) => {
          this.producto = response.data;
          console.log(this.producto)
        })
        .catch(() => {
          this.producto = {};
          this.noFound = true;
          this.abrirError("Producto no encontrado");
        });
    } else {
      this.producto = JSON.parse(localStorage.getItem("detallesProducto"));
    }
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Abel|Aguafina+Script|Artifika|Athiti|Condiment|Dosis|Droid+Serif|Farsan|Gurajada|Josefin+Sans|Lato|Lora|Merriweather|Noto+Serif|Open+Sans+Condensed:300|Playfair+Display|Rasa|Sahitya|Share+Tech|Text+Me+One|Titillium+Web");

@media only screen and (max-width: 700px) {
  #rt-main,
  #rt-header,
  .rt-container,
  .rt-container .rt-grid-8,
  .rt-container .rt-grid-8,
  .rt-container .rt-grid-9,
  .footer-container,
  .rt-container .rt-grid-3,
  .rt-container .rt-grid-6 {
    width: 99%;
  }

  body {
    min-width: 100%;
  }

  .rt-container .rt-grid-4 {
    display: none;
  }
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>
