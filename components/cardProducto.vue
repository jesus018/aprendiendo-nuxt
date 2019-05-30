<template>
  <!--<b-card
    :title="'$' + precio"
    :img-src="imagen"
    img-alt="Image"
    img-left
    tag="article"
    style="max-width: 40rem;"
    class="mb-2"
  >
    <b-card-text>{{ nombre }}</b-card-text>

    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
  -->

  <b-card no-body class="overflow-hidden" style="max-width: 350px;">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="imagen" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body :title="'$' + precio">
          <b-card-text>{{ nombre }}</b-card-text>
          <b-button :href="'/busqueda/' + slug" variant="primary">Detalles</b-button>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  props: ["precio", "nombre", "imagen", 'slug']
};
</script>