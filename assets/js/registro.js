// JS Para la página de registro
console.log("-- registro persona --");

// Declaración del data con el array de personas
var data = {
  persons: [],
};

const methods = {
  /**
   * Asignar información a los campos del html
   */
  setInfoPerson() {
    document.getElementById("tipo_identificacion").value = "cc";
    document.getElementById("identificacion").value = "0001";
    document.getElementById("nombre").value = "Santiago";
    document.getElementById("apellido").value = "Urrego";
    document.getElementById("correo").value = "saurrego@udem.edu.co";
    document.getElementById("celular").value = "3216242003";
    document.getElementById("clave").value = "admin123";
    document.getElementById("rol").value = "admin";
    document.getElementById("terminos_condiciones").checked = true;
  },
  /**
   * Obtener la información del formulario
   */
  getInfoPerson() {
    let tipo_identificacion = document.getElementById("tipo_identificacion").value;
    let identificacion = document.getElementById("identificacion").value;
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let correo = document.getElementById("correo").value;
    let celular = document.getElementById("celular").value;
    let clave = document.getElementById("clave").value;
    let rol = document.getElementById("rol").value;
    let terminos_condiciones = document.getElementById("terminos_condiciones").checked;

    if (terminos_condiciones == true) {
      let person = {};
      person.tipo_identificacion = tipo_identificacion;
      person.identificacion = identificacion;
      person.nombre = nombre;
      person.apellido = apellido;
      person.correo = correo;
      person.celular = parseInt(celular);
      person.clave = clave;
      person.terminos_condiciones = terminos_condiciones;
      person.rol = rol;

      return person;
    } else {
      return null;
    }
  },
  /**
   * Guardar una persona en el array de personas
   */
  createPerson() {
    let person = this.getInfoPerson();
    if (person != null) {
      data.persons.push(person);
      this.listPersons();
      console.log(data.persons);
    } else {
      alert("Por favor validar el formulario.");
    }
  },
  /**
   * Listar las personas del array en la tabla
   */
  listPersons() {
    let tb_persons = document.getElementsByName("persons");
    let content = "";
    for (let index = 0; index < data.persons.length; index++) {
      let person = data.persons[index];
      content += "<tr>";
      content += "<th>" + person["tipo_identificacion"] + "</th>";
      content += "<th>" + person["identificacion"] + "</th>";
      content += "<th>" + person["nombre"] + "</th>";
      content += "<th>" + person["celular"] + "</th>";
      content += "<th>" + person["correo"] + "</th>";
      content += "</tr>";
    }
    tb_persons[0].innerHTML = content;
    console.log(content);
  },
};

methods.setInfoPerson();
