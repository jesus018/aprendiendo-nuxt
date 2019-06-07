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
            <b-button
              variant="success"
              type="button"
              @click="editarProducto(data.item.id,data.index)"
              v-b-modal.editar
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
          aria-controls="productos"
          align="center"
        ></b-pagination>
      </b-col>
    </div>

    <b-modal
      header-bg-variant="dark"
      header-text-variant="light"
      v-model="show"
      id="editar"
      ref="modal"
      :title="tituloModal"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
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
        <b-form-group
          :state="nameState"
          label="Precio"
          label-for="precio"
          invalid-feedback="precio es requerido"
        >
          <b-form-input type="number" id="precio" v-model="form.precio" :state="nameState" required></b-form-input>
        </b-form-group>
        <b-form-group
          :state="nameState"
          label="Cantidad"
          label-for="cantidad"
          invalid-feedback="Cantidad es requerida"
        >
          <b-form-input
            type="number"
            id="cantidad"
            v-model="form.cantidad"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
      <!-- style="background-color: lightslategray"  -->
      <div slot="modal-footer">
        <b-button variant="secondary" @click="show=false">Cancelar</b-button>
        <b-button variant="dark" @click="handleOk">Guardar</b-button>
      </div>
    </b-modal>
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
      boxTwo: "",
      variable: false,
      define: "",
      esteid: "",
      nameState: null,
      form: {
        nombre: "",
        cantidad: "",
        precio: ""
      },
      fields: [
        { key: "Imagen" },
        { key: "nombre", sortable: true },
        { key: "precio" },
        { key: "cantidad" },
        { key: "categoria", sortable: true },
        { key: "acciones" }
      ]
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
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm("¿Desea Eliminar Este Producto?", {
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
            db.collection("productos")
              .doc(id)
              .delete()
              .then(() => {
                let index;
                this.productos.map((value, key) => {
                  if (value.id == id) index = key;
                });
                this.productos.splice(index, 1);
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
          nombre: "",
          cantidad: "",
          precio: ""
        };
      }

      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },

    editarProducto(id, index) {
      this.variable = false;
      this.tituloModal = "Editar producto";
      this.define = "editar";
      this.esteid = id;
      this.productos.map((value, key) => {
        if (value.id == id) {
          this.form = {
            nombre: value.nombre,
            cantidad: value.cantidad,
            precio: value.precio
          };
        }
      });
    },

    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      this.isBusy = true;
      if (this.define == "editar") {
        console.log("ingreso a editar");
        db.collection("productos")
          .doc(this.esteid)
          .set(this.form)
          .then(res => {
            db.collection("productos")
              .orderBy("nombre", "asc")
              .get()
              .then(productosSnap => {
                this.productos = [];
                productosSnap.forEach(value => {
                  this.productos.push({
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
    }
  }
};
</script>