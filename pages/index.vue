<template>
  <div>
    <h1>Hola {{ msg }}</h1>
    <input type="text" v-model="msg">
    <button @click="guardar" class="btn btn-primary">Guardar</button>
    <b-button variant='primary'>Guardar</b-button> <!-- Boton hecho mediante componentes-->
    <table>
      <tr>
        <th>Nombre</th>
      </tr>

      <tr v-for="(mun, index) in municipio" :key="index">
        <td>{{mun}}</td>
      </tr>
    </table>
  </div>
</template>

<script>

import navbar from '../components/navbar'
//import contacto from './contacto'

export default {
  components: {navbar},
  data() {
    return {
      msg: "Jesus Agreda",
      municipio: ["Mocoa", "VillaGarzon", "Pto Asis"]
    };
  },
  methods: {
    guardar(){
      this.municipio.push(this.msg)
      this.msg = ''
    }
  }
};
</script>