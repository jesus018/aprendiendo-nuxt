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
          <b-button variant="danger" size="sm" class="my-2 my-sm-0" v-b-modal.registro>Registrarse!</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>

    <b-modal id="registro" ref="registro" centered title="BootstrapVue">
      <b-form>
        <b-form-group
          id="label_user"
          label="Usuario"
          label-for="usuario"
        >
          <b-form-input
            id="user"
            type="text"
            required
            placeholder="Escribe tu nombre de Usuario"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="label_email"
          label="Correo Electronico"
          label-for="email"
          description="Nunca compartiremos su correo electrónico con nadie más."
        >
          <b-form-input
            id="email"
            type="email"
            required
            placeholder="Ingrese su Correo Electronico"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="lable_pass"
          label="Contraseña"
          label-for="contrasena"
        >
          <b-form-input
            id="pass"
            type="password"
            required
            placeholder="Ingrese una contraseña"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="lable_pass_vr"
          label="Confirmar la Contraseña"
          label-for="contrasena_vr"
        >
          <b-form-input
            id="pass_vr"
            type="password"
            required
            placeholder="Introduce de nuevo una contraseña"
          ></b-form-input>
        </b-form-group>
      </b-form>
      <div slot="modal-footer">
        <b-button type="submit" variant="primary">Enviar</b-button>
        <b-button type="reset" variant="danger">Cancelar</b-button>
      </div>
    </b-modal>
  </b-navbar>
</template>

<script>
export default {
};
</script>