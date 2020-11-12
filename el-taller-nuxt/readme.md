# DESPLIEGUE HEROKU

1. login `heroku login`
2. Conectar repositorio `heroku git:remote -a NOMBRE-PROYECTO-HEROKU`
3. Crear el script de start en el package json `"start": "MODE=production node api"`
4. Verificar process.env
5. Agregar configuración de puerto y host en el nuxt.js

   ```js
   server: {
       port: process.env.PORT || 3000,
       host: "0.0.0.0",
   },
   ```

6. Eliminar la linea de código `import colors from "vuetify/es5/util/colors";` del archivo nuxt.js que no se utiliza
7. Subir cambios a heroku `git push heroku master`
