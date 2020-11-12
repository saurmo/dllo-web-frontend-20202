export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s - El taller",
    title: "Inicio",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
  },
  modules: ["nuxt-sweetalert2", "@nuxtjs/axios"],

  plugins: ["~/plugins/vue-cookie.js", "~/plugins/vue-moment.js"],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Configuración del vuetify
  vuetify: {
    theme: {
      light: true,
      themes: {
        light: {
          primary: "#009688",
          "dark-primary": "#00796B",
          "light-primary": "#B2DFDB",
          secondary: "#757575",
          text: "#212121",
          "primary-text": "#212121",
          accent: "#607D8B",
        },
      },
    },
  },
  server: {
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
  },
};
