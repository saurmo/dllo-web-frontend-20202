<template>
  <div>
    <h1>Users</h1>
    <v-form v-model="formUsers" ref="formUsers">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
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

          <v-col cols="12" md="6">
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
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.password"
              type="password"
              :rules="fieldRequired"
              label="Password"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
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
        <v-icon small @click="deleteUser(item)">
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
      formUsers: null,
      headers: [
        { text: "Identification", value: "id" },
        { text: "Firstname", value: "firstname" },
        { text: "Email", value: "email" },
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
      fieldRequired: [(v) => !!v || "Field is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      dialog: false,
      // Si esta editando o no
      editing: false,
    };
  },
  methods: {
    loadPage() {
      this.loadIdenticationTypes();
      this.loadUsers();
    },
    loadIdenticationTypes() {
      let url = "http://localhost:3001/identification_types";
      this.$axios.get(url).then((response) => {
        let data = response.data;
        this.identification_types = data;
      });
    },
    loadUsers() {
      let url = "http://localhost:3001/users";
      this.$axios.get(url).then((response) => {
        let data = response.data;
        this.users = data;
      });
    },
    save() {
      if (this.$refs.formUsers.validate() && this.formUsers) {
        //Save users
        let exist = this.users.find((x) => x.id == this.user.id);
        // Validación si la identificación de una persona ya existe en el array
        if (exist == undefined) {
          let url = "http://localhost:3001/users";
          this.$axios.post(url, this.user).then((response) => {
            this.loadUsers();
            this.user = {};
            this.$swal.fire(
              "Creado",
              "La persona ha sido creada correctamente.!",
              "success"
            );
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "La persona ya existe en la tabla.",
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
          let url = "http://localhost:3001/users/" + this.user.id;
          this.$axios.put(url, this.user).then((response) => {
            this.user = {};
            this.editing = false;
            this.$swal.fire(
              "Modificado.",
              "La persona ha sido modificada correctamente.!",
              "success"
            );
            this.loadUsers();
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
      console.log(user);
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
            console.log(result);
            if (result.value) {
              let url = "http://localhost:3001/users/" + user.id;
              this.$axios.delete(url).then((response) => {
                this.$swal.fire(
                  "Eliminado.",
                  "La persona ha sido eliminada correctamente.!",
                  "success"
                );
                this.loadUsers();
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
