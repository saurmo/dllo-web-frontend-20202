<template>
  <div>
    <v-app-bar color="primary" dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
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
  methods: {
    logout() {
      this.$router.push("/");
    }
  }
};
</script>
