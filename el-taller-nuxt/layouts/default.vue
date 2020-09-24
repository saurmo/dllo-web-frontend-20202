<template>
  <!-- Layout de barra de navegación para las páginas -->
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Menú </v-list-item-title>
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
    <v-app-bar dense>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>El Taller</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout()">
        Salir
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container> <nuxt /> </v-container>
    </v-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
  methods: {
    logout() {
      this.$router.push("/");
    },
  },
};
</script>
