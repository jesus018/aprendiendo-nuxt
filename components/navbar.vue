<template>
  <!--<div>
        <a href="/">Inicio</a>
        <a href="/contacto">Contacto</a>
  </div>-->

  <b-navbar variant="info" type="dark" toggleable="lg">
    <b-navbar-brand href="/">BootstrapVue</b-navbar-brand>

    <b-navbar-toggle target="menu"></b-navbar-toggle>

    <b-collapse is-nav id="menu">
      <b-navbar-nav>
        <b-nav-item href="/productos">Productos</b-nav-item>

        <b-nav-item href="/categorias">Categorias</b-nav-item>

        <b-nav-item href="/contacto">Contacto</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button size="sm" class="my-2 my-sm-0" v-b-toggle="'collapse-2'">Iniciar Sesion</b-button>
          <b-collapse id="collapse-2">
    <b-card>I am collapsible content!</b-card>
  </b-collapse>
          <b-button variant="danger" size="sm" class="my-2 my-sm-0">Registrarse!</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {};
</script>