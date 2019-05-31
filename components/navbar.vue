<template>
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
        <b-nav-item href="/carrito">Carrito de Compras</b-nav-item>
        <b-nav-form>
          <b-button size="sm" class="my-2 my-sm-0" v-b-modal.login v-if="!user">Iniciar Sesion</b-button>
          <b-button
            variant="danger"
            size="sm"
            class="my-2 my-sm-0"
            v-b-modal.registro
            v-if="!user"
          >Registrarse!</b-button>

          <b-dropdown v-if="user" :text="user.displayName">
            <b-dropdown-item @click="cerrarSesion" v-b-modal.login>Cerrar Sesion</b-dropdown-item>
          </b-dropdown>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
    <!-- Pagina a modal -->
    <b-modal id="registro" title="Registro" centered cancel-disabled ok-disabled>
      <registro></registro>
    </b-modal>

    <b-modal id="login" title="Inicio de Sesion" centered cancel-disabled ok-disabled>
      <login></login>
    </b-modal>

    <!-- fin -->
  </b-navbar>
</template>

<script>
import registro from "../pages/registro";
import login from "../pages/login";
import { auth } from "../services/firebase";

export default {
  components: { registro, login },
  data() {
    return {
      user: false
    };
  },

  created() {
    auth.onAuthStateChanged(user => {
      this.user = user;
    });
  },

  methods: {
    cerrarSesion() {
      auth.signOut();
    }
  }
};
</script>