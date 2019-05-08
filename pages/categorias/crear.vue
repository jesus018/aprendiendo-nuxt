<template>
    <b-form name="form_categoria" @submit.prevent="guardarCategoria">
    <h2>Crear Nueva Categoria</h2>
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col cols="12" md="4" offset-md="4">
          <div class="form-group">
            
            <label for="nombre">Nombre</label>
            <input
              type="text"
              class="form-control"
              name="nombre"
              required
              v-model="form.nombre"
              placeholder="Ingresa el nombre"
            >
            
          </div>

          <div class="row" id="galeria"></div>
        </b-col>
      </b-row>
      <b-row class="text-center">
        <b-col lg="6" md="6" offset-md="3">
          <b-spinner label="Loading..." variant="primary" v-if="guardando"></b-spinner>
          <b-button variant="primary" type="submit" :disabled="t">
            Guardar
          </b-button>
          <b-button style="background-color: #049E3A; color: white">Cancelar</b-button>
          <b-button variant="secondary" href="/categorias">Volver</b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-form>
</template>

<script>
import { db } from "../../services/firebase";

export default {
  data() {
    return {
      form: {
        nombre: "",
      },
      guardando: false,
      t: false
    };
  },
  methods: {
    guardarCategoria() {
      this.guardando = true;
      this.t = true;
      db.collection("categorias")
        .add(this.form)
        .then(res => {
          this.$router.push({
            path: "/categorias"
          });
        });
    }
  }
};
</script>

<style>
#app {
  background-color: black
}
</style>