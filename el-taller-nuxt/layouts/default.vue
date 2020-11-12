<template>
  <!-- Layout de barra de navegación para las páginas -->
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Menú Administrador</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <!-- Menu items -->
        <v-list-item v-for="item in items_menu" :key="item.id" :to="item.route">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="padding:5px;">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">El Taller</v-toolbar-title>
      <v-spacer></v-spacer>
      <span v-if="user" class="white--text mx-2">
        {{ user.nombre }} {{ user.apellido }}
      </span>

      <v-btn @click="logout()">
        Salir
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container> <nuxt /> </v-container>
    </v-main>
  </v-app>
</template>
<script>
import config from "../assets/config";
const url_api = config.API_URL;
export default {
  data() {
    return {
      user: null,
      drawer: null,
      items_menu: [
        { id: "01", title: "Home", icon: "mdi-home", route: "/home" },
        { id: "02", title: "Users", icon: "mdi-account-group", route: "/users" },
        {
          id: "03",
          title: "Motorcycles",
          icon: "mdi-motorbike-electric",
          route: "/motorcycles",
        },
      ],
    };
  },
  beforeMount() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      try {
        let token = localStorage.getItem("token");
        let url = url_api + "valid";
        this.$axios.setToken(token, "Bearer");
        let { data } = await this.$axios.get(url);
        this.user = data.info;
        localStorage.setItem("userIn", JSON.stringify(data.info));
      } catch (error) {
        this.$router.push("/");
      }
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userIn");
      this.$router.push("/");
    },
  },
};
</script>
