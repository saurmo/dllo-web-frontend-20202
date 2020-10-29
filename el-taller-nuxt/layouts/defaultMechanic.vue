<template>
  <!-- Layout de barra de navegación para las páginas -->
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Menú Mecánico</v-list-item-title>
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
export default {
  data() {
    return {
      user: null,
      drawer: null,
      items_menu: [
        { id: "01", title: "Home", icon: "mdi-home", route: "/home-mechanic" },
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
        let url = "http://localhost:3001/api/v1/valid";
        this.$axios.setToken(token, "Bearer");
        let { data } = await this.$axios.get(url);
        this.user = data.info;
      } catch (error) {
        this.$router.push("/");
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>
