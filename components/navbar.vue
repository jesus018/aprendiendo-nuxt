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
          <b-button size="sm" class="my-2 my-sm-0" v-b-modal.login>Iniciar Sesion</b-button>
          <b-button variant="danger" size="sm" class="my-2 my-sm-0" v-b-modal.registro>Registrarse!</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
<b-form @submit.prevent="registro">
    <b-modal id="registro" ref="registro" centered title="Registro" ok-title="Enviar">
      
        <b-form-group
          id="label_user"
          label="Usuario"
          label-for="usuario"
        >
          <b-form-input
            id="user"
            type="text"
            v-model="form.user"
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
            v-model="form.correo"
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
            v-model="form.pass"
            required
            placeholder="Ingrese una contraseña"
          ></b-form-input>
        </b-form-group>
        <!--
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
        </b-form-group>-->
     
      <div slot="modal-footer">
        <b-button type="submit" variant="primary">Enviar</b-button>
        <b-button type="reset" variant="danger">Cancelar</b-button>
      </div>
       
    </b-modal>
</b-form>
<b-form>
    <b-modal id="login" ref="login" centered title="Iniciar Sesion" ok-title="Enviar">
      <b-form>

        <b-form-group
          id="label_email"
          label="Correo Electronico"
          label-for="email"
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
            placeholder="Ingrese su contraseña"
          ></b-form-input>
        </b-form-group>

     
      <div slot="modal-footer">
        <b-button type="submit" variant="primary">Enviar</b-button>
        <b-button type="reset" variant="danger">Cancelar</b-button>
      </div>
    </b-modal>
     </b-form>
  </b-navbar>
</template>

<script>

import { auth } from '../services/firebase'

export default {
  data(){
    return{
      form: {}
    }
  },
  methods: {
    registro(){
      auth.createUserWithEmailAndPassword(this.form.correo, this.form.pass).then(res => {
        alert('registro...')
      }).catch(error => {
        alert('Ha ocurrido un error' + error.message)
      })
    }
  }
};
</script>