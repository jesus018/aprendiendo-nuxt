<template>
  <div class="row mt-3">
    <div class="col-sm-6">
      <h2>Lista de Categorias</h2>
    </div>

    <div class="col-sm-6">
      <b-button variant="primary" href="/categorias/crear">Nuevo</b-button>
    </div>

    <div class="row mt-2">
      <b-col cols="12" md="12" offset-md="11">
        <b-table
          id="categorias"
          responsive
          striped
          hover
          :fields="fields"
          :items="categorias"
          :current-page="currentPage"
          :per-page="perPage"
          :busy="isBusy"
        >
          <div slot="table-busy" class="text-center my-2">
            <b-spinner variant="primary" class="align-middle" label="Loading..."></b-spinner>
            <strong>Cargando...</strong>
          </div>
          <template slot="acciones" slot-scope="data">
            <b-button
              variant="success"
              v-b-modal.modal_editar
              type="button"
              @click="editarCategoria(data.item.id,data.index)"
            >Editar</b-button>

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
          aria-controls="categorias"
          align="center"
        ></b-pagination>
      </b-col>

      <b-modal
        id="modal_editar"
        :title="tituloModal"
        v-model="show"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
        ref="modal"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            :state="nameState"
            label="Nombre"
            label-for="nombre"
            invalid-feedback="Nombre es requerido"
          >
            <b-form-input
              id="nombre"
              v-model="form.nombre"
              :state="nameState"
              required
            >{{form.nombre}}</b-form-input>
          </b-form-group>
        </form>

        <div slot="modal-footer">
          <b-button variant="secondary" @click="show=false">Cancelar</b-button>
          <b-button variant="primary" @click="handleOk">Guardar</b-button>
        </div>
      </b-modal>
    </div>
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
          perPage: 3
        };
      });
  },

  data() {
    return {
      show: false,
      isBusy: false,
      boxTwo: "",
      define: "",
      esteid: "",
      variable: false,
      nameState: null,
      tituloModal: "",
      fields: [{ key: "nombre", sortable: true }, { key: "acciones" }],
      //fields: ["nombre", "acciones"],
      form: {
        nombre: ""
      }
    };
  },
  computed: {
    rows() {
      return this.categorias.length;
    }
  },
  methods: {
    /*eliminarCategoria(id) { //Elimina sin confirmar
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
    },*/

    mensaje(id, index) {
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm("¿Desea Eliminar Esta Categoria?", {
          title: "Eliminar",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "SI",
          cancelTitle: "NO",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          this.boxTwo = value;
          if (this.boxTwo == true) {
            this.isBusy = true;
            db.collection("categorias")
              .doc(id)
              .delete()
              .then(() => {
                let index;
                this.categorias.map((value, key) => {
                  if (value.id == id) index = key;
                });
                this.categorias.splice(index, 1);
                this.isBusy = false;
              });
          }
        })
        .catch(err => {
          // An error occurred
        });
    },

    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid ? "valid" : "invalid";
      return valid;
    },

    resetModal() {
      if (this.define == "nuevo") {
        this.form = {
          nombre: ""
        };
      }
      this.nameState = null;
    },

    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },

    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.isBusy = true;
      if (this.define == "editar") {
        console.log("ingreso a editar");
        db.collection("categorias")
          .doc(this.esteid)
          .set(this.form)
          .then(res => {
            db.collection("categorias")
              .orderBy("nombre", "asc")
              .get()
              .then(categoriasSnap => {
                this.categorias = [];
                categoriasSnap.forEach(value => {
                  this.categorias.push({
                    id: value.id,
                    ...value.data()
                  });
                });
                this.isBusy = false;
              });
          });
      }

      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },

    editarCategoria(id, index) {
      this.variable = false;
      this.tituloModal = "Editar Categoria";
      this.define = "editar";
      this.esteid = id;
      this.categorias.map((value, key) => {
        if (value.id == id) {
          this.form = {
            nombre: value.nombre
          };
        }
      });
    }
  }
};
</script>