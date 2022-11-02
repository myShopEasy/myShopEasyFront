<template>
  <v-dialog transition="dialog-top-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <a
        class="nav-link1 active"
        id="acercaDe"
        v-bind="attrs"
        v-on="on"
      >
        Acerca de</a
      >
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="bg-dark" dark class="text-h4">Acerca de</v-toolbar>
        <v-card-text>
          <div class="text-h5 pa-6">
            Proyecto desarrollado Por: <br />
            Maria Paula Useche<br />
            Maria Jose Villalba Lozano<br />
            Jorge Eliecer Rojas Quiñones<br />            
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="primary" @click="dialog.value = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {};
</script>

<style>
.nav-link1 {
  display: block;
  padding: 8px;
  color: white !important;
  text-decoration: none;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out;
}
</style>
