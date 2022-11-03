<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-card elevation="15">
        <v-row class="mt-4 mx-auto">
          <legend class="mb-3 mt-5">
            <h2>Registro Nuevo Usuario</h2>
          </legend>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="nombre"
              append-icon="mdi-form-textbox"
              :counter="40"
              :rules="nameRules"
              label="Nombres"
              placeholder="Ingrese nombres"
              filled
              required
            ></v-text-field>
            <v-text-field
              v-model="apellido"
              append-icon="mdi-form-textbox"
              :counter="40"
              :rules="lastnameRules"
              label="Apellidos"
              placeholder="Ingrese appellidos"
              filled
              required
            ></v-text-field>
            <v-text-field
              v-model="usuario"
              append-icon="mdi-account"
              :rules="nicknameRules"
              label="Nickname"
              placeholder="Ingrese un nickname"
              filled
              required
            ></v-text-field>
            <v-checkbox
              class="mt-0 px-3"
              v-model="checkbox"
              :rules="[(v) => !!v || 'Aceptar para continuar!']"
              label="Acepta terminos y condiciones"
              required
            ></v-checkbox>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="correo"
              append-icon="mdi-email"
              :rules="emailRules"
              label="E-mail"
              placeholder="Ingrese un correo"
              filled
              required
            ></v-text-field>
            <v-text-field
              v-model="contraseña"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required1, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="password"
              label="Contraseña"
              hint="Ingrese al menos 8 caracteres"
              class="input-group--focused"
              counter
              @click:append="show1 = !show1"
              filled
            ></v-text-field>
            <v-text-field
              v-model="confirPass"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required2, rules.min, passConfirmation()]"
              :type="show1 ? 'text' : 'password'"
              name="confirpass"
              label="Confirme Contraseña"
              hint="Ingrese al menos 8 caracteres"
              class="input-group--focused"
              counter
              @click:append="show1 = !show1"
              filled
            ></v-text-field>
            <div class="text-right">
              <v-card-text class="mb-0"
                >Ya tiene cuenta? <a href="/Ingreso">Ingrese</a>.</v-card-text
              >
            </div>
          </v-col>
        </v-row>
        <v-row class="mt-auto justify-center">
          <v-col cols="12" sm="6" md="2">
            <v-btn color="success" class="mr-4" @click="validate()">
              Confirmar
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-btn color="error" class="mx-3" @click="reset">
              Limpiar
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-btn color="warning" @click="resetValidation">
              Limpiar Validación
            </v-btn>
          </v-col>
          <ConfirMensaje
            :mensaje="ConfirMensaje"
            :snackbar="ConfirShow"
            :close="cerrarMensaje"
            v-if="ConfirShow"
          ></ConfirMensaje>
          <MensajeError
            :mensaje="MensajeError"
            :snackbar="ErrorShow"
            :close="cerrarError"
          ></MensajeError>
        </v-row>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
import { insertUsuario } from "../services/Usuario.Service";
import ConfirMensaje from "../../src/components/ConfirMensaje.vue";
import MensajeError from "../../src/components/MensajeError.vue";
export default {
  components: {
    ConfirMensaje,
    MensajeError,
  },
  data() {
    return {
      nombre: "",
      nameRules: [
        (v) => !!v || "Nombre es requerido",
        (v) =>
          (v && v.length <= 40) || "Nombre debe ser menor que 40 caractares",
      ],
      apellido: "",
      lastnameRules: [
        (v) => !!v || "Apellido es requerido",
        (v) =>
          (v && v.length <= 40) || "Apellido debe ser menor que 40 caractares",
      ],
      usuario: "",
      nicknameRules: [(v) => !!v || "Nickname es requerido"],
      correo: "",
      emailRules: [
        (v) => !!v || "E-mail es requerido",
        (v) => /.+@.+\..+/.test(v) || "E-mail debe ser válido",
      ],
      show1: false,
      contraseña: "",
      confirPass: "",
      rules: {
        min: (v) => v.length >= 8 || "Mínimo 8 caracteres",
      },
      ConfirMensaje: "",
      ConfirShow: false,
      MensajeError: "",
      ErrorShow: false,
    };
  },
  methods: {
    validate() {
      if (
        this.nombre == undefined ||
        this.nombre == "" ||
        this.apellido == undefined ||
        this.apellido == "" ||
        this.usuario == undefined ||
        this.usuario == "" ||
        this.correo == undefined ||
        this.correo == "" ||
        this.contraseña == undefined ||
        this.contraseña == ""
      ) {
        this.abrirError("Ingrese los campos requeridos");
        return;
      }
      const usuario = {
        nombre: this.nombre,
        apellido: this.apellido,
        usuario: this.usuario,
        correo: this.correo,
        contraseña: this.contraseña,
      };
      insertUsuario(usuario)
        .then((response) =>
          this.abrirMensaje(
            "Se ha agregado el usuario: " + response.data.usuario
          )
        )
        .catch(() => this.abrirError("Error al guardar el usuario"));
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    passConfirmation() {
      return () =>
        this.contraseña === this.confirPass ||
        "Las contraseñas deben coincidir";
    },
    abrirMensaje(mensaje) {
      this.ConfirMensaje = mensaje;
      this.ConfirShow = true;
    },
    cerrarMensaje() {
      this.ConfirShow = false;
      this.$router.push({ name: "Ingreso" });
    },
    abrirError(mensaje) {
      this.MensajeError = mensaje;
      this.ErrorShow = true;
    },
    cerrarError() {
      this.ErrorShow = false;
    },
  },
};
</script>

<style></style>
