<template>
  <v-container fluid>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="headline">
          Crear seguimiento
        </v-card-title>

        <v-card-text>
          <v-form v-model="formTracking" ref="formTracking">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="tracking.id_mecanico"
                    :rules="fieldRequired"
                    label="Id Mecánico"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="tracking.horas"
                    :rules="fieldRequired"
                    label="Horas"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="tracking.mano_obra"
                    :rules="fieldRequired"
                    label="Mano de obra"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="tracking.repuestos"
                    :rules="fieldRequired"
                    label="Repuestos"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            Cancelar
          </v-btn>

          <v-btn color="green darken-1" text @click="save()">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-iterator
      :items="items"
      :items-per-page.sync="itemsPerPage"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar class="mb-2" dark flat>
          <v-toolbar-title> Tracking - Motorcycle {{ id_motorcycle }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark @click.stop="dialog = true">
            Crear seguimiento
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card>
              <v-card-title class="subheading font-weight-bold">
                {{ item.nombre_mecanico }}
              </v-card-title>

              <v-divider></v-divider>

              <v-list dense>
                <v-list-item>
                  <v-list-item-content class="align-end">
                    {{ item.fecha | moment("DD/MM/YYYY HH:mm") }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Mano de obra:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.mano_obra }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Repuestos:</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ item.repuestos }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
import config from "../assets/config";
export default {
  beforeMount() {
    this.loadPage();
  },
  data() {
    return {
      itemsPerPage: 4,
      dialog: false,
      id_motorcycle: "",
      items: [],
      fieldRequired: [(v) => !!v || "Field is required"],
      tracking: {},
      formTracking: false,
    };
  },
  methods: {
    async loadPage() {
      try {
        let id_motorcycle = this.$cookies.get("id_motorcycle");
        this.id_motorcycle = id_motorcycle;
        if (id_motorcycle) {
          // load trackings
          let url = `${config.API_URL}tracking/${id_motorcycle}`;
          let { data } = await this.$axios.get(url);
          this.items = data.info;
        } else {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al consultar los seguimiento. (No se encontro la placa)",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    async save() {
      if (this.$refs.formTracking.validate() && this.formTracking) {
        try {
          let url = `${config.API_URL}tracking`;
          let payload = Object.assign({}, this.tracking);
          payload.placa = this.id_motorcycle;
          payload.fecha = Date.now();
          let { data } = await this.$axios.post(url, payload);
          this.loadPage();

          this.$swal.fire("Creado", "La moto ha sido creada correctamente.!", "success");
          this.dialog = false;
        } catch (error) {
          console.log(error);
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al crear la moto.",
          });
        }
      } else {
      }
    },
  },
};
</script>
