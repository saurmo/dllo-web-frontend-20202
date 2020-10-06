# JSON SERVER

Json server es una librería de nodejs que nos permite crear un API Restfull con la estructura de un json.
[https://www.npmjs.com/package/json-server]

## Pasos para ejecutar.

1. En la terminal, instalar la dependencia `npm install -g json-server`. Puede instalarlo de forma global una sola vez para que le quede guardado para futuras creaciones.
2. Crear un archivo json con los arrays que se necesitan. Por ejemplo:

   ```json
   {
     "posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
     "comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
     "profile": { "name": "typicode" }
   }
   ```

3. En la terminal, ejecutar json server. `json-server --watch db.json`: db.json es el nombre del archivo creado en el punto 2.
4. Hay otras configuraciones extras que se pueden encontrar en la documentación. Por ejemplo cambiar el puerto que es con el comnado: `json-server --watch db.json --port 3001`
