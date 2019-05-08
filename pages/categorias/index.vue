<template>
  <div class="row mt-3">
    <div class="col-sm-6">
      <h2>Lista de Categorias</h2>
    </div>

    <div class="col-sm-6">
      <b-button variant="primary" href="/categorias/crear">Nuevo</b-button>
    </div>

    <div class="row mt-2">
      <b-col cols="12" md="18" offset-md="11">
        <b-table
          id="categorias"
          responsive
          striped
          hover
          :fields="fields"
          :items="categorias"
          :current-page="currentPage"
          :per-page="perPage"
        >
          <template slot="acciones" slot-scope="data">
            <b-button
              variant="success"
              v-b-modal.modal-1
              @click="editarCategoria(data.item.id)"
            >Editar</b-button>

            <b-button
              variant="danger"
              type="button"
              @click="eliminarCategoria(data.item.id)"
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
          aria-controls="categorias"
          align="center"
        ></b-pagination>
      </b-col>
    </div>

    <b-form>
      <b-modal id="modal-1" title="Editar Categoria">
        <b-form-group id="input-group" label="Nombre:" label-for="input1">
          <b-form-input id="input-2" v-model="form.nombre" required placeholder="Ingrese un Nombre"></b-form-input>
        </b-form-group>
      </b-modal>
    </b-form>
  </div>
</template>

<script>
import { db } from "../../services/firebase";

export default {
  asyncData() {
    return db
      .collection("categorias")
      .get()
      .then(categoriasSnap => {
        let categorias = [];

        categoriasSnap.forEach(value => {
          categorias.push({
            id: value.id,
            ...value.data()
          });
        });

        return {
          categorias,
          currentPage: 1,
          perPage: 5
        };
      });
  },

  data() {
    return {
      fields: ["nombre", "acciones"],
      form: {
        nombre: "",
        datos: ""
      }
    };
  },
  computed: {
    rows() {
      return this.categorias.length;
    }
  },
  methods: {
    eliminarCategoria(id) {
      db.collection("categorias")
        .doc(id)
        .delete()
        .then(() => {
          let index;
          this.categorias.map((value, key) => {
            if (value.id == id) index = key;
          });
          this.categorias.splice(index, 1);
        });
    },

    editarCategoria(id) {
      db.collection("categorias")
        .get()
        .then(() => {
          let index;
          let datos;
          this.categorias.map((value, key) => {
            if (value.id == id) index = key, datos = value;
          });
          this.form.nombre = JSON.parse(JSON.stringify(vm.$datos))
        });
    }
  }
};
</script>