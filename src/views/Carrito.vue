<template>
  <v-row>
    <v-col>
      <v-card max-width="650" class="ml-6" elevation="15">
        <v-list>
          <v-subheader v-show="vacio"
            ><h4>{{ carritoVacio }}</h4></v-subheader
          >
          <v-subheader v-show="!vacio"
            ><h5>{{ carritoLleno }}</h5></v-subheader
          >
          <template v-for="producto in listaProductos">
            <v-list-item :key="producto.id">
              <v-list-item-avatar size="100">
                <v-img :src="producto.foto"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-group>
                  <v-list-item-title
                    v-html="'Nombre: ' + producto.nombre"
                    class="my-2"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="'Precio: <h6>$' + producto.precio + '</h6>'"
                  ></v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-html="'Total: $' + producto.slider * producto.precio"
                  ></v-list-item-subtitle>
                  <v-list-item-subtitle
                    v-html="'Detalles : ' + producto.especificacion"
                    class="my-2"
                  ></v-list-item-subtitle>
                </v-list-item-group>
                <div>
                  <v-chip
                    class="chipR"
                    color="red"
                    @click="eliminarItem(producto.id)"
                  >
                    <v-icon color="white"> mdi-close-circle</v-icon>
                  </v-chip>
                  <v-slider
                    v-model="producto.slider"
                    class="align-center control2"
                    :max="max"
                    :min="min"
                    hide-details
                  >
                    <template v-slot:append>
                      <v-text-field
                        v-model.number="producto.slider"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        solo
                        type="number"
                        style="width: 60px"
                        max="50"
                        min="1"
                      ></v-text-field>
                    </template>
                  </v-slider>
                </div>
                <v-divider></v-divider>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
        <ConfirMensaje
          :mensaje="ConfirMensaje"
          :snackbar="ConfirShow"
          :close="cerrarMensaje"
        ></ConfirMensaje>
        <MensajeError
          :mensaje="MensajeError"
          :snackbar="ErrorShow"
          :close="cerrarError"
        ></MensajeError>
      </v-card>
    </v-col>
    <v-col>
      <v-card elevation="15">
        <v-container class="pa-6">
          <div class="totals">
            <div class="totals-item">
              <label>SubTotal de todos los Productos:</label>
              <div class="totals-value" id="cart-subtotal">
                ${{ subTotal }} COP
              </div>
            </div>
            <div class="totals-item">
              <label>Envio:</label>
              <div class="totals-value" id="cart-shipping">
                ${{ envio }} COP
              </div>
            </div>
            <v-divider></v-divider>
            <div class="totals-item">
              <label>Total a Pagar:</label>
              <div class="totals-value" id="cart-total">
                ${{ totalFinal }} COP
              </div>
            </div>
            <div class="text-center">
              <button class="checkout" @click="pedido">
                REALIZAR PEDIDO!!
              </button>
            </div>
          </div>
        </v-container>
      </v-card>
      <v-btn color="success" absolute fixed fab right to="/productos">
        <v-icon>mdi-keyboard-backspace</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import ConfirMensaje from "../../src/components/ConfirMensaje.vue";
import MensajeError from "../../src/components/MensajeError.vue";
export default {
  components: {
    ConfirMensaje,
    MensajeError,
  },
  data() {
    return {
      min: 1,
      max: 50,
      ConfirMensaje: "",
      ConfirShow: false,
      MensajeError: "",
      ErrorShow: false,
      vacio: false,
      listaProductos: [],
      carritoVacio: "Carrito de Compras: VACÍO!!",
      carritoLleno: "Carrito de Compras",
      inc: 0.05,
    };
  },
  mounted() {
    var carritoStorage = JSON.parse(localStorage.getItem("carritoCompra"));
    if (carritoStorage == null || carritoStorage == "") {
      carritoStorage = [];
      this.vacio = true;
    }
    this.listaProductos = carritoStorage;
  },
  methods: {
    eliminarItem(id) {
      if (id == undefined) {
        this.abrirError("Error al eliminar el producto");
      }
      var carrito = localStorage.getItem("carritoCompra");
      var arr = JSON.parse(carrito);
      arr = arr.filter((item) => item.id !== id);
      localStorage.setItem("carritoCompra", JSON.stringify(arr));
      this.abrirMensaje("Se ha elimidado el producto");
      this.listaProductos = this.listaProductos.filter((item) => item.id != id);
    },
    abrirMensaje(mensaje) {
      this.ConfirMensaje = mensaje;
      this.ConfirShow = true;
    },
    cerrarMensaje() {
      this.ConfirShow = false;
      window.location.reload();
    },
    abrirError(mensaje) {
      this.MensajeError = mensaje;
      this.ErrorShow = true;
    },
    cerrarError() {
      this.ErrorShow = false;
    },
    pedido() {
      if (this.listaProductos=="") {
        this.abrirError("No hay productos en el carrito");
      } else {
        this.abrirError("Su pedido se ha realizado con exito!!");
        }
    },
  },
  computed: {
    subTotal() {
      let sum = 0;
      this.listaProductos.forEach((item) => {
        sum += parseFloat(item.precio) * parseFloat(item.slider);
      });
      return sum;
    },
    envio() {
      return this.subTotal * this.inc;
    },
    totalFinal() {
      return this.subTotal + this.envio;
    },
  },
};
</script>

<style>
.chipR {
  bottom: 70px;
  float: right;
  position: absolute;
  right: 10%;
}
.control2 {
  padding-left: 20px;
  padding-right: 40%;
}

.totals {
  clear: both;
  width: 100%;
  text-align: left;
}

.totals-item {
  margin-bottom: 10px;
}

label {
  float: left;
  width: 70%;
}

.checkout {
  /* float: left; */
  border: 0;
  margin-top: 20px;
  padding: 6px 100px;
  background-color: #6b6;
  color: #fff;
  font-size: 25px;
  border-radius: 3px;
}

.checkout:hover {
  background-color: #494;
}
</style>
