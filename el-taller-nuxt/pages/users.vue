<template>
  <div>
    <h1>Users</h1>
    <v-form v-model="formUsers" ref="formUsers">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              :items="identification_types"
              item-value="id"
              item-text="name"
              :rules="fieldRequired"
              required
              v-model="user.identification_type"
              label="Identification type"
            ></v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-select
              :items="roles"
              item-value="id"
              item-text="nombre"
              :rules="fieldRequired"
              required
              v-model="user.rol"
              label="Rol"
            ></v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.id"
              :rules="fieldRequired"
              :disabled="editing"
              label="Identification"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.firstname"
              :rules="fieldRequired"
              label="First name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.lastname"
              :rules="fieldRequired"
              label="Last name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.email"
              :rules="emailRules"
              label="Email"
              type="email"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" v-if="!editing">
            <v-text-field
              v-model="user.password"
              type="password"
              :rules="fieldRequired"
              label="Password"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" v-if="!editing">
            <v-checkbox
              required
              :rules="fieldRequired"
              v-model="user.accepted"
              :label="`Accept policies?`"
            ></v-checkbox>
          </v-col>
          <v-col cols="12" md="4">
            <v-btn color="accent" @click="save()" v-if="!editing">Save</v-btn>
            <v-btn color="accent" @click="editUser()" v-else>Edit user</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="loadUser(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteUser(item)" v-if="userIn == 1">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <!-- Dialogo de alerta cuando el formulario no es valido -->
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">
          Error
        </v-card-title>

        <v-card-text>
          Form required some fields
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="accent" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
const url_api = "http://localhost:3001/api/v1/";
export default {
  name: "UsersPage",
  beforeMount() {
    this.loadPage();
  },
  beforeUpdate() {
    try {
      this.$refs.formUsers.validate();
    } catch (error) {}
  },
  data() {
    return {
      userIn: null,
      formUsers: null,
      headers: [
        { text: "Identification", value: "id" },
        { text: "Firstname", value: "firstname" },
        { text: "Email", value: "email" },
        { text: "Rol", value: "nombre_rol" },
        { text: "Actions", value: "actions" },
      ],
      users: [],
      user: {
        identification_type: null,
        id: null,
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        accepted: null,
        rol: null,
      },
      identification_types: [],
      roles: [],
      fieldRequired: [(v) => !!v || "Field is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) =>
          /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i.test(
            v
          ) || "E-mail must be valid",
      ],
      dialog: false,
      // Si esta editando o no
      editing: false,
    };
  },
  methods: {
    loadPage() {
      this.loadExternalInfo();
      this.loadUsers();
    },
    /**
     * Carga los tipos de identificación y los roles desde base de datos
     */
    async loadExternalInfo() {
      let { data } = await this.$axios.get(url_api + "roles");
      this.userIn = JSON.parse(localStorage.getItem("userIn"));
      this.roles = data.info;
      this.identification_types = [
        {
          id: "01",
          name: "CC",
        },
        {
          id: "02",
          name: "CE",
        },
        {
          id: "03",
          name: "TI",
        },
        {
          id: "04",
          name: "Pasaporte",
        },
        {
          id: "05",
          name: "RC",
        },
      ];
    },
    loadUsers() {
      this.$axios
        .get(url_api + "users")
        .then((response) => {
          let data = response.data;
          this.users = data.info;
        })
        .catch((error) => {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al consultar los usuarios",
          });
        });
    },
    async save() {
      if (this.$refs.formUsers.validate() && this.formUsers) {
        try {
          //Save users
          let exist = this.users.find((x) => x.id == this.user.id);
          // Validación si la identificación de una persona ya existe en el array
          if (exist == undefined) {
            let { data } = await this.$axios.post(url_api + "users", this.user);
            this.loadUsers();
            this.user = {};
            this.$swal.fire(
              "Creado",
              "La persona ha sido creada correctamente.!",
              "success"
            );
          } else {
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: "La persona ya existe en la tabla.",
            });
          }
        } catch (error) {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al crear la persona.",
          });
        }
      } else {
        this.dialog = true;
      }
    },
    loadUser(user) {
      this.user = Object.assign({}, user);
      this.editing = true;
    },
    editUser() {
      console.log(" -- modificar la persona con los datos cargados -- ");
      if (this.$refs.formUsers.validate() && this.formUsers) {
        // Encontrar la posición que esta el usuario en el array
        let existIndex = this.users.findIndex((x) => x.id == this.user.id);
        // Validación si la identificación de una persona ya existe en el array
        if (existIndex > -1) {
          console.log("La persona existe y esta en la posición del array", existIndex);
          //Modificar la persona del array
          let path = "users/" + this.user.id;
          this.$axios
            .put(url_api + path, this.user)
            .then((response) => {
              this.user = {};
              this.editing = false;
              this.$swal.fire(
                "Modificado.",
                "La persona ha sido modificada correctamente.!",
                "success"
              );
              this.loadUsers();
            })
            .catch((error) => {
              this.$swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al modificar la persona.",
              });
            });
        } else {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "La persona NO existe en la tabla.",
          });
        }
      } else {
        this.dialog = true;
      }
    },
    deleteUser(user) {
      let existIndex = this.users.findIndex((x) => x.id == user.id);
      if (existIndex > -1) {
        this.$swal
          .fire({
            title: "Desea eliminar el usuario?",
            text: "Este cambio no se puede revertir.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminalo!",
            cancelButtonText: "Cancelar",
          })
          .then((result) => {
            if (result.value) {
              let path = "users/" + user.id;
              this.$axios
                .delete(url_api + path)
                .then((response) => {
                  this.$swal.fire(
                    "Eliminado.",
                    "La persona ha sido eliminada correctamente.!",
                    "success"
                  );
                  this.loadUsers();
                })
                .catch((error) => {
                  this.$swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error eliminando la persona",
                  });
                });
            }
          });
      } else {
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: "La persona NO existe en la tabla.",
        });
      }
    },
  },
};
</script>
