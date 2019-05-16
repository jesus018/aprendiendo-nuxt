<template>
  <div class="row mt-3">
    <div class="col-sm-6">
      <h2>Lista de Productos</h2>
    </div>

    <div class="col-sm-6">
      <b-button variant="primary" href="/productos/crear">Nuevo</b-button>
    </div>

    <div class="row mt-2">
      <b-col cols="12" md="12" offset-md="1">
      <b-table
        id="productos"
        responsive
        striped
        hover
        :fields="fields"
        :items="productos"
        :current-page="currentPage"
        :per-page="perPage"
      >
      <div slot="table-busy" class="text-center my-2">
        <b-spinner variant="primary" class="align-middle" label="Loading..."></b-spinner>
        <strong>Cargando...</strong>
      </div>
        <template slot="acciones" slot-scope="data">
          <b-button variant="success">Editar</b-button>

          <b-button
            variant="danger"
            type="button"
            @click="mensaje(data.item.id,data.index)"
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
      isBusy: false,
      boxTwo: '',
      fields: [{key: "Imagen"}, {key: "nombre", sortable: true}, {key: "precio"}, {key: "cantidad"}, {key: "categoria", sortable: true}, {key: "acciones"}]
      //fields: ["Imagen", "nombre", "precio", "cantidad","categoria", "acciones"]
    };
  },
  computed: {
    rows() {
      return this.productos.length;
    }
  },
  methods: {
    /*eliminarProducto(id) {
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
    }*/
    mensaje(id, index) {
      this.boxTwo = ''
      this.$bvModal.msgBoxConfirm('¿Desea Eliminar Este Producto?', {
        title: 'Eliminar',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'SI',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          this.boxTwo = value
          if (this.boxTwo == true) {
             this.isBusy = true
              db.collection("productos").doc(id).delete().then(() => {
              let index;
              this.productos.map((value, key) => {
                if (value.id == id) index = key;
              });
              this.productos.splice(index, 1);
               this.isBusy = false
            });
          }
        })
        .catch(err => {
          // An error occurred
        })
    },

  }
};
</script>