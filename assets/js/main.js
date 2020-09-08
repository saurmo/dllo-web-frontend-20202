console.log("Desde un archivo.");

/**
 * Ejemplo de funcion
 */
function capturarDatos() {
  console.log("Inicio de funcion:Capturar datos");
  /**
   * Tipos de variables
   * var, let, const
   */
  let txtCorreo = document.getElementById("txtCorreo");
  let txtAsunto = document.getElementById("txtAsunto");
  let txtMensaje = document.getElementById("txtMensaje");
  console.log(txtAsunto.value, txtMensaje.value, txtCorreo.value);
}

const capturarDatos2 = () => {
  console.log("Inicio de funcion:Capturar datos");
  let txtCorreo = document.getElementById("txtCorreo");
  let txtAsunto = document.getElementById("txtAsunto");
  let txtMensaje = document.getElementById("txtMensaje");
  console.log(txtAsunto.value, txtMensaje.value, txtCorreo.value);
};

const metodos = {
  capturarDatos3: () => {
    let txtCorreo = document.getElementById("txtCorreo");
    let txtAsunto = document.getElementById("txtAsunto");
    let txtMensaje = document.getElementById("txtMensaje");
    console.log(txtAsunto.value, txtMensaje.value, txtCorreo.value);

    let validacion = validarInformacion(
      txtCorreo.value,
      txtAsunto.value,
      txtMensaje.value
    );

    console.log("Validación", validacion);
  },
};

const validarInformacion = (correo, asunto, mensaje) => {
  //Opcion if
  //   if (correo.length > 0 && asunto.length > 0 && mensaje.length > 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }

  //   Opcion ternario
  //   return correo.length > 0 && asunto.length > 0 && mensaje.length > 0 ? true : false;

  return correo.length > 0 && asunto.length > 0 && mensaje.length > 0;
};
