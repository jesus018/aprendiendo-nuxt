<template>
  <b-form name="form_producto" @submit.prevent="guardarProducto">
    <h1>Crear Nuevo Producto</h1>
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col cols="12" md="4" offset-md="4">
          <div class="form-group">
            <label for="url">URL Imagen</label>
            <input
              type="text"
              class="form-control"
              name="url"
              placeholder="Ingresa la URL de la imagen"
            >
            <label for="nombre">Nombre</label>
            <input
              type="text"
              class="form-control"
              name="nombre"
              required
              v-model="form.nombre"
              placeholder="Ingresa el nombre"
            >
            <label for="precio">Precio</label>
            <input
              type="number"
              class="form-control"
              name="precio"
              required
              v-model="form.precio"
              placeholder="Ingresa el precio"
            >
            <label for="cantidad">Cantidad</label>
            <input
              type="number"
              class="form-control"
              name="cantidad"
              required
              v-model="form.cantidad"
              placeholder="Ingresa la cantidad"
            >
          </div>

          <div class="row" id="galeria"></div>
        </b-col>
      </b-row>
      <b-row class="text-center">
        <b-col lg="6" md="6" offset-md="3">
          <b-button variant="primary" type="submit">Guardar</b-button>
          <b-button style="background-color: #049E3A; color: white">Cancelar</b-button>
          <b-button variant="secondary" href="/productos">Volver</b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-form>
</template>

<script>
import { db } from '../../services/firebase'

export default {
  data() {
    return {
      form: {
        nombre: "",
        cantidad: "",
        precio: ""
      }
    };
  },
  methods: {
    guardarProducto() {
      db.collection("productos").add(this.form).then(res => {
        this.$router.push({
          path: "/productos"
        })
      })
    }
  }
};
</script>
