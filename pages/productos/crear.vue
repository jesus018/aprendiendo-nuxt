<template>
  <b-form name="form_producto" @submit.prevent="guardarProducto">
    <h2>Crear Nuevo Producto</h2>
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col cols="12" md="4" offset-md="4">
          <div class="form-group">
            <b-form-group label="Imagen: " label-for="imagen">
              <b-form-file placeholder="Cargar imagen" accept="imagen/*" v-model="imagenProduct"/>
            </b-form-group>
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
            <b-form-group label="Categoria" label-for='categoria'>
              <b-form-select id="categoria" v-model="form.categoria" :options="categorias"></b-form-select>
            </b-form-group>
          </div>

          <div class="row" id="galeria"></div>
        </b-col>
      </b-row>
      <b-row class="text-center">
        <b-col lg="6" md="6" offset-md="3">
          <b-spinner label="Loading..." variant="primary" v-if="guardando"></b-spinner>
          <b-button variant="primary" type="submit" :disabled="t">Guardar</b-button>
          <b-button style="background-color: #049E3A; color: white">Cancelar</b-button>
          <b-button variant="secondary" href="/productos">Volver</b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-form>
</template>

<script>
import { db, storage } from "../../services/firebase";

export default {
  asyncData() {
    return db
      .collection("categorias")
      .get()
      .then(categoriasSnap => {
        let categorias = [];

        categoriasSnap.forEach(value => {
          categorias.push(value.data().nombre);
        });
        return { categorias };
      });
  },

  data() {
    return {
      form: {
        nombre: "",
        cantidad: "",
        precio: ""
      },
      guardando: false,
      imagenProduct: "",
      t: false
    };
  },
  methods: {
    guardarProducto() {
      this.guardando = true;
      this.t = true;
      let imagenRef = storage.child(this.imagenProduct.name);

      imagenRef.put(this.imagenProduct).then(async imageRes => {
        this.form.imagen = await imageRes.ref.getDownloadURL(); //se obtiene la UL de la imagen
        db.collection("productos")
          .add(this.form)
          .then(res => {
            this.$router.push({
              path: "/productos"
            });
          });
      });
    }
  }
};
</script>
