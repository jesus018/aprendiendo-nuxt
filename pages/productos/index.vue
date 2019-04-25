<template>
  <div class="row mt-3">
    <div class="col-sm-6">
      <h2>Lista de Productos</h2>
    </div>

    <div class="col-sm-6">
      <b-button variant="primary" href="/productos/crear">Nuevo</b-button>
    </div>

    <div class="row mt-2">
      <b-col cols="12" md="18" offset-md="11">
      <b-table
        id="productos"
        responsive
        striped
        hover
        :fields="fields"
        :items="productos"
        :current-page="currentPage"
        :per-page="perPage"
        :bordered="bordered"
      >
        <template slot="acciones" slot-scope="data">
          <b-button variant="success">Editar</b-button>

          <b-button
            variant="danger"
            type="button"
            @click="eliminarProducto(data.item.id)"
          >Eliminar</b-button>
        </template>
      </b-table>

      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        first-text="Primera"
        prev-text="Anterior"
        next-text="Siguiente"
        last-text="Ultima"
        aria-controls="productos"
        align="center"
      ></b-pagination>
      </b-col>
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
        let productos = [];

        productosSnap.forEach(value => {
          productos.push({
            id: value.id,
            ...value.data()
          });
        });

        return {
          productos,
          currentPage: 1,
          perPage: 5
        };
      });
  },

  data() {
    return {
      fields: ["Imagen", "nombre", "precio", "cantidad", "acciones"]
    };
  },
  computed: {
    rows() {
      return this.productos.length;
    }
  },
  methods: {
    eliminarProducto(id) {
      db.collection("productos")
        .doc(id)
        .delete()
        .then(() => {
          let index
          this.productos.map((value,key) => {
            if(value.id == id) index = key
          })
          this.productos.splice(index, 1);
        });
    }
  }
};
</script>