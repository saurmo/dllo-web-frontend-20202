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
              v-model="user.identification"
              :rules="fieldRequired"
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
            <v-btn color="accent" @click="save()">Save</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>

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
  data() {
    return {
      formUsers: null,
      headers: [
        { text: "Identification", value: "identification" },
        { text: "Firstname", value: "firstname" },
        { text: "Email", value: "email" },
        { text: "Actions" },
      ],
      users: [],
      user: {
        identification_type: null,
        identification: null,
        firstname: null,
        lastname: null,
        email: null,
        password: null,
        accepted: null,
        rol: null,
      },
      identification_types: [
        { id: "01", name: "CC" },
        { id: "02", name: "CE" },
        { id: "03", name: "TI" },
        { id: "04", name: "Pasaporte" },
        { id: "05", name: "RC" },
      ],
      fieldRequired: [(v) => !!v || "Field is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      dialog: false,
    };
  },
  methods: {
    loadPage() {
      let users = localStorage.getItem("users");
      this.users = JSON.parse(users);
    },
    save() {
      if (this.$refs.formUsers.validate() && this.formUsers) {
        //Save users
        let exist = this.users.find((x) => x.identification == this.user.identification);
        // Validación si la identificación de una persona ya existe en el array
        if (exist == undefined) {
          this.users.push(this.user);
          localStorage.setItem("users", JSON.stringify(this.users));
          // this.listPersons();
          this.user = {};
          alert("La persona ha sido creada correctamente.");
        } else {
          alert("La persona ya existe en la tabla.");
        }
      } else {
        this.dialog = true;
      }
    },
  },
};
</script>
