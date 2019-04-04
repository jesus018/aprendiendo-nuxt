<template>
  <div class="row mt-3">
    <div class="col-sm-6">
      <h2>Lista de Productos</h2>
    </div>

    <div class="col-sm-6">
      <b-button variant="primary" href="/productos/crear">Nuevo</b-button>
    </div>
    <!--
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col>Nombre</b-col>
        <b-col>Imagen</b-col>
        <b-col>Precio</b-col>
        <b-col>Cantidad</b-col>
        <b-col>Acciones</b-col>
      </b-row>
    </b-container>
    -->
    <div class="row mt-2">
      <div class="col-sm-12">
        <b-table responsive striped hover :fields="fields" :items="productos"/>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../services/firebase";

export default {
  asyncData() {
    return db
      .collection("productos")
      .get()
      .then(productosSnap => {
        let productos = []

        productosSnap.forEach(value => {
          productos.push(value.data());
        });

        return {
          productos
        };
      });
  },

  data() {
    return {
      fields: ["Imagen", "nombre", "precio", "cantidad", "Acciones"]
    };
  }
};
</script>