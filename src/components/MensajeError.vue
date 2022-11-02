<template>
  <v-snackbar v-model="snackbar">
    {{ mensaje }}

    <template v-slot:action="{ attrs }">
      <v-btn color="green" text v-bind="attrs" @click="close()">
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
    props : ["mensaje","snackbar","close"],
  data: () => ({
    
  }),
};
</script>
