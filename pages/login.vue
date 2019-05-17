<template>
    <b-form>

        <div>
            <h1>Registrar</h1>
        </div>
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
</template>
