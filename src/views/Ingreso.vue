<template>
  <v-form ref="loginForm" v-model="valid" lazy-validation>
    <v-container>
      <v-card elevation="15" width="75%" class="mx-auto">
        <v-row class="mt-4 ma-auto" align="center" align-content="center">
          <v-col cols="12" sm="6" md="6">
            <legend class="mb-3 mt-5">
              <h2>Ingreso:</h2>
            </legend>
            <v-text-field
              v-model="user"
              append-icon="mdi-account"
              :rules="userRules"
              label="Usuario"
              placeholder="Ingrese el Usuario"
              required
              filled
            ></v-text-field>
            <v-text-field
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              :rules="[rules.required]"
              name="password"
              label="Contraseña"
              hint="Ingrese al menos 8 caracteres"
              counter
              @click:append="show = !show"
              filled
            ></v-text-field>
            <p class="mb-0">
              No tiene cuenta? <a href="/registro">Registrese</a>.
            </p>
          </v-col>
          <v-col cols="6" sm="6" md="6">
            <v-img src="../Images/cuenta.png"></v-img>
          </v-col>
          <v-col align-self="center" cols="12" sm="12" md="10">
            <v-alert dense prominent type="error" v-model="ErrorShow">
              <v-row align="center">
                <v-col class="grow">
                  {{ MensajeError }}
                </v-col>
                <v-col class="shrink">
                  <v-btn @click="cerrarError()">Cerrar</v-btn>
                </v-col>
              </v-row>
            </v-alert>
            <v-btn
              :disabled="!valid"
              class="mr-4"
              color="primary"
              @click="validar()"
            >
              Ingresar
            </v-btn>
            <v-btn @click="clear" color="#616161" dark>
              Limpiar
            </v-btn>
            <ConfirMensaje
              :mensaje="ConfirMensaje"
              :snackbar="ConfirShow"
              :close="cerrarMensaje"
            ></ConfirMensaje>
            <!-- <MensajeError
              :mensaje="MensajeError"
              :snackbar="ErrorShow"
              :close="cerrarError"
            ></MensajeError> -->
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import { validateUser } from "../services/Usuario.Service";
import ConfirMensaje from "../../src/components/ConfirMensaje.vue";
// import MensajeError from "../../src/components/MensajeError.vue";
export default {
  components: {
    ConfirMensaje,
    // MensajeError,
  },
  data: () => ({
    valid: true,
    ConfirMensaje: "",
    ConfirShow: false,
    MensajeError: "",
    ErrorShow: false,
    user: "",
    userRules: [(v) => !!v || "El usuario es requerido"],
    show: false,
    password: "",
    rules: {
      required: (value) => !!value || "Requerido.",
    },
  }),

  methods: {
    validar() {
      validateUser(this.user, this.password)
        .then((response) => {
          let user = response.data;
          sessionStorage.setItem("usuario", user.usuario);
          sessionStorage.setItem("sesion", true);
          this.abrirMensaje("Se ha iniciado sesión");
        })
        .catch((err) => {
          // this.abrirError("Error con el ingreso de usuario"
          // console.log("error: ", err.response);
          this.ErrorShow = true;
          this.MensajeError = err.response.data.mensaje;
        });
    },
    clear() {
      this.email = "";
      this.select = null;
      this.checkbox = null;
      this.$refs.loginForm.reset();
    },
    abrirMensaje(mensaje) {
      this.ConfirMensaje = mensaje;
      this.ConfirShow = true;
    },
    cerrarMensaje() {
      this.ConfirShow = false;
      this.$router.push({ name: "Productos" });
      this.$emit("isLogged");
    },
    abrirError(mensaje) {
      this.MensajeError = mensaje;
      this.ErrorShow = true;
    },
    cerrarError() {
      this.ErrorShow = false;
      this.clear();
    },
  },
};
</script>

<style></style>
