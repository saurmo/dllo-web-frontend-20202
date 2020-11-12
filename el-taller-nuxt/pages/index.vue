<template>
  <!-- Login -->
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-toolbar color="primary" flat>
              <v-toolbar-title>El Taller</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="formData">
                <v-text-field
                  label="Id"
                  prepend-icon="mdi-people"
                  v-model="id"
                ></v-text-field>

                <v-text-field
                  label="Clave"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="login()">Ingresar</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
import config from "../assets/config";
const url_api = config.API_URL;
export default {
  layout: "blank",
  data() {
    return {
      id: null,
      password: null,
    };
  },
  methods: {
    async login() {
      if (this.$refs.formData.validate()) {
        try {
          let payload = {};
          payload.id = this.id;
          payload.password = this.password;
          let url = url_api + "login";

          let { data } = await this.$axios.post(url, payload);
          if (data.ok) {
            let token = data.info.token;
            let rol = data.info.rol;
            localStorage.setItem("token", token);
            if (rol == 1 || rol == 3) {
              // Administradores
              this.$router.push("/home");
            } else if (rol == 2) {
              // Mecánico
              this.$router.push("/home-mechanic");
            } else {
              // Cliente
              this.$router.push("/home-client");
            }
          } else {
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: data.message,
            });
          }
        } catch (error) {
          if (error.response) {
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
            });
          } else {
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: error,
            });
          }
        }
      }
    },
  },
};
</script>
