<template>
  <div class="container mt-3">
    <div class="main-body">
      <div class="row gutters-sm">
        <div class="col-md-4 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center text-center">
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle"
                  width="150" />
                <div class="mt-3">
                  <h4>{{ usuario }}</h4>
                  <p class="text-secondary mb-1">Full Stack Developer</p>
                  <p class="text-muted font-size-sm">
                    Bay Area, San Francisco, CA
                  </p>
                  <!-- <button class="btn btn-primary mr-2">Seguir</button>
                  <button class="btn btn-outline-primary">Mensaje</button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card">
            <div class="card-body col-md-12">
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Nombre</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="nombre" placeholder="nombre" />
                </div>
                <div class="col-sm-3">
                  <h6 class="mb-0">Apellidos</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="apellido" placeholder="apellido" />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Correo</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="correo" placeholder="example@exam.com" />
                </div>
              </div>
              <!-- <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Teléfono</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input
                    type="text"
                    class="form-control"
                    value=""
                    placeholder="00-00-000"
                  />
                </div>
              </div> -->
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Celular</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="celular" placeholder="000-000-0000" />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-3">
                  <h6 class="mb-0">Dirección</h6>
                </div>
                <div class="col-sm-9 text-secondary">
                  <input type="text" class="form-control" v-model="direccion" placeholder="Cl 0 #0-0" />
                </div>
              </div>
              <div class="row mb-4">
                <div class=" text-secondary text-center d-flex flex-row-reverse">
                  <button class="btn btn-secondary px-4" @click="cancelar()">Cancelar</button>
                  <button class="btn btn-primary px-4 mr-4" @click="actualizar()">Guardar Cambios</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ConfirMensaje :mensaje="ConfirMensaje" :snackbar="ConfirShow" :close="cerrarMensaje"></ConfirMensaje>
        <MensajeError :mensaje="MensajeError" :snackbar="ErrorShow" :close="cerrarError"></MensajeError>
      </div>
    </div>
  </div>
</template>

<script>

import { getUsuario, updateUsuario} from "../services/Usuario.Service.js";
import ConfirMensaje from "../../src/components/ConfirMensaje.vue";
import MensajeError from "../../src/components/MensajeError.vue";

export default {
  components: {
    ConfirMensaje,
    MensajeError,
  },
  data() {
    return {
      idPersona: "",
      nombre: "",
      apellido: "",
      usuario: "",
      contraseña:"",
      tipoUsuario:"",
      correo: "",
      celular: 0,
      direccion: "",
      ConfirMensaje: "",
      ConfirShow: false,
      MensajeError: "",
      ErrorShow: false,
    };
  },
  mounted() {
    const usuario = sessionStorage.getItem("usuario");
    if (usuario != undefined) {
      getUsuario(usuario)
        .then((response) => {
          const usuario = response.data;
          for (let i = 0; i < usuario.length; i++) {
            this.idPersona = usuario[i].id;
            this.nombre = usuario[i].nombre;
            this.apellido = usuario[i].apellido;
            this.usuario = usuario[i].usuario;
            this.correo = usuario[i].correo;
            this.celular = usuario[i].celular;
            this.direccion = usuario[i].direccion;
            this.contraseña = usuario[i].contraseña;
            this.usuario = usuario[i].usuario;
            this.tipoUsuario = usuario[i].tipoUsuario;
            console.log(usuario);

          }

        })
        .catch(() => this.abrirError("Datos no encontrados"));
    }
  },
  methods: {
    actualizar() {
      const usuarioUpdate = {
        id: this.idPersona,
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.correo,
        celular: this.celular,
        direccion: this.direccion,
        usuario : this.usuario,
        contraseña: this.contraseña,
        tipoUsuario: this.tipoUsuario
      };
      updateUsuario(this.idPersona, usuarioUpdate)
        .then(() =>
          this.abrirMensaje("Se ha actualizado el Usuario: " + this.usuario)
        )
        .catch(() => this.abrirError("Error al actualizar el Usuario"));
    },
    abrirMensaje(mensaje) {
      this.ConfirMensaje = mensaje;
      this.ConfirShow = true;
    },
    cerrarMensaje() {
      this.ConfirShow = false;
      location.reload();
    },
    abrirError(mensaje) {
      this.MensajeError = mensaje;
      this.ErrorShow = true;
    },
    cerrarError() {
      this.ErrorShow = false;
    },
    reset() {
      this.$refs.form.reset();
    },
    cancelar() {
      this.$router.push("/productos");
    }
  },
};
</script>
<style>

</style>
