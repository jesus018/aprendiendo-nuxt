<template>
  <b-form @submit.prevent="iniciarSesion">
    <b-form-group id="label_email" label="Correo Electronico" label-for="email">
      <b-form-input
        id="email"
        type="email"
        required
        v-model="form.correo"
        placeholder="Ingrese su Correo Electronico"
      ></b-form-input>
    </b-form-group>

    <b-form-group id="lable_pass" label="Contraseña" label-for="contrasena">
      <b-form-input
        id="pass"
        type="password"
        required
        v-model="form.pass"
        placeholder="Ingrese su contraseña"
      ></b-form-input>
    </b-form-group>

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
  methods: {
    iniciarSesion() {
      auth
        .signInWithEmailAndPassword(this.form.correo, this.form.pass)
        .then(res => {
          this.$router.push({
            path: "/"
          });
          console.log("Inicio sesion");
          resetModal();
        })
        .catch(err => {
          alert("Ha ocurrido un Error: " + message.err);
        });
    },
    resetModal() {
      (this.form.correo = ""), (this.form.pass = "");
    }
  }
};
</script>