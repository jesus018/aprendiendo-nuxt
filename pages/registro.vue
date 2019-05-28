<template>
  <b-form @submit.prevent="registro">
    <b-form-group id="label_user" label="Usuario" label-for="usuario">
      <b-form-input
        id="user"
        type="text"
        v-model="form.name"
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

    <b-form-group id="lable_pass" label="Contraseña" label-for="contrasena">
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
  </b-form>
</template>

<script>
import { auth } from "../services/firebase";

export default {
  data() {
    return {
      form: {}
    };
  },

  created(){
    auth.onAuthStateChanged(user => {
      this.user = user
    })
  },

  methods: {
    registro() {
      auth
        .createUserWithEmailAndPassword(this.form.correo, this.form.pass)
        .then(res => {
          //alert("registro...");
          res.user.updateProfile({
            displayName: this.form.name
            //photoURL: "htttp: "
          })

          this.$router.push({
            path: "/"
          })
        })
        .catch(error => {
          alert("Ha ocurrido un error" + error.message);
        });
    }
  }
};
</script>
