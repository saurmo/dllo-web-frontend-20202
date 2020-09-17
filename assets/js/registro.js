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
  setInfoPerson(person) {
    // Validando que person != undefined, != null, != false, !=""
    if (person) {
      document.getElementById("tipo_identificacion").value = person.tipo_identificacion;
      document.getElementById("identificacion").value = person.identificacion;
      document.getElementById("nombre").value = person.nombre;
      document.getElementById("apellido").value = person.apellido;
      document.getElementById("correo").value = person.correo;
      document.getElementById("celular").value = person.celular;
      document.getElementById("clave").value = person.clave;
      document.getElementById("rol").value = person.rol;
      document.getElementById("terminos_condiciones").checked =
        person.terminos_condiciones;

      document.getElementById("identificacion").style.display = "none";
      document.getElementById("btnCreate").style.display = "none";
      document.getElementById("btnUpdate").style.display = "";
    } else {
      // document.getElementById("tipo_identificacion").value = "cc";
      // document.getElementById("identificacion").value = "0001";
      // document.getElementById("nombre").value = "Santiago";
      // document.getElementById("apellido").value = "Urrego";
      // document.getElementById("correo").value = "saurrego@udem.edu.co";
      // document.getElementById("celular").value = "3216242003";
      // document.getElementById("clave").value = "admin123";
      // document.getElementById("rol").value = "admin";
      // document.getElementById("terminos_condiciones").checked = true;

      document.getElementById("tipo_identificacion").value = "";
      document.getElementById("identificacion").value = "";
      document.getElementById("nombre").value = "";
      document.getElementById("apellido").value = "";
      document.getElementById("correo").value = "";
      document.getElementById("celular").value = "";
      document.getElementById("clave").value = "";
      document.getElementById("rol").value = "";
      document.getElementById("terminos_condiciones").checked = false;

      document.getElementById("btnCreate").style.display = "";
      document.getElementById("btnUpdate").style.display = "none";
    }
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
      // Creación del objeto
      let person = {
        tipo_identificacion: tipo_identificacion,
        identificacion: identificacion,
      };
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
      let exist = data.persons.find((x) => x.identificacion == person.identificacion);
      // Validación si la identificación de una persona ya existe en el array
      console.log("La persona existe", exist);
      if (exist == undefined) {
        data.persons.push(person);
        this.listPersons();
        this.setInfoPerson();
        console.log(data.persons);
        alert("La persona ha sido creada correctamente.");
      } else {
        alert("La persona ya existe en la tabla.");
      }
    } else {
      alert("Por favor validar el formulario.");
    }
  },
  /**
   * Listar las personas del array en la tabla
   */
  listPersons() {
    let tb_persons = document.getElementById("persons");
    let content = "";
    for (let index = 0; index < data.persons.length; index++) {
      let person = data.persons[index];
      content += "<tr>";
      content += "<td>" + person["tipo_identificacion"] + "</td>";
      content += "<td>" + person["identificacion"] + "</td>";
      content += "<td>" + person["nombre"] + "</td>";
      content += "<td>" + person["celular"] + "</td>";
      content += "<td>" + person["correo"] + "</td>";
      content +=
        "<td><button          class='btn' onclick='methods.loadPerson(" +
        person.identificacion +
        ")'>Editar</button></td>";
      content +=
        "<td ><button class='btn' onclick='methods.deletePerson(" +
        person.identificacion +
        ")'>Eliminar</button></td>";
      content += "</tr>";
    }
    tb_persons.innerHTML = content;
  },

  loadPerson(identificacion) {
    console.log(" -- cargar persona -- ", identificacion);
    // Buscar la persona en el array con la identificación enviada por parametro
    let exist = data.persons.find((x) => x.identificacion == identificacion);
    methods.setInfoPerson(exist);
  },

  updatePerson() {
    console.log(" -- modificar la persona con los datos cargados -- ");
    let person = this.getInfoPerson();
    if (person != null) {
      let existIndex = data.persons.findIndex(
        (x) => x.identificacion == person.identificacion
      );
      // Validación si la identificación de una persona ya existe en el array
      if (existIndex > -1) {
        console.log("La persona existe y esta en la posición del array", existIndex);
        //Modificar la persona del array
        data.persons.splice(existIndex, 1, person);
        this.listPersons();
        this.setInfoPerson();

        alert("La persona ha sido modificada correctamente.");
      } else {
        alert("La persona NO existe en la tabla.");
      }
    } else {
      alert("Por favor validar el formulario.");
    }
  },

  deletePerson(identificacion) {
    let existIndex = data.persons.findIndex((x) => x.identificacion == identificacion);
    if (existIndex > -1) {
      let confirmacion = confirm("Desea eliminar el usuario?");
      if (confirmacion) {
        data.persons.splice(existIndex, 1);
        this.listPersons();
        alert("Persona eliminada");
      }
    } else {
      alert("La persona NO existe en la tabla.");
    }
  },
};

methods.setInfoPerson();
