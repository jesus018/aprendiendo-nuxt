<template>
  <div>
    <h1>Crear Nuevo Producto</h1>
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col cols="12" md="4" offset-md="4">
          <form name="form_producto">
            <div class="form-group">
              <label for="url">URL Imagen</label>
              <input
                type="text"
                class="form-control"
                name="url"
                placeholder="Ingresa la URL de la imagen"
              >
              <label for="nombre">Nombre</label>
              <input type="text" class="form-control" name="nombre" placeholder="Ingresa el nombre">
              <label for="precio">Precio</label>
              <input type="text" class="form-control" name="precio" placeholder="Ingresa el precio">
              <label for="cantidad">Cantidad</label>
              <input
                type="text"
                class="form-control"
                name="cantidad"
                placeholder="Ingresa la cantidad"
              >
            </div>

            <div class="row" id="galeria"></div>
          </form>
        </b-col>
      </b-row>
      <b-row class="text-center">
        <b-col lg="6" md="6" offset-md="3">
          <b-button variant="primary">Guardar</b-button>
          <b-button style="background-color: red; color: blue">Cancelar</b-button>
          <b-button variant="secondary" href="/productos">Volver</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>