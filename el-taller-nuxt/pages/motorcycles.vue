<template>
  <div>
    <h1>Motorcycles</h1>
    <v-form v-model="formBikes" ref="formBikes">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              :items="states"
              item-value="id"
              item-text="name"
              :rules="fieldRequired"
              required
              v-model="bike.estado"
              label="Estado"
            ></v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="bike.placa"
              :rules="fieldRequired"
              :disabled="editing"
              label="Placa"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="bike.id_propietario"
              :rules="fieldRequired"
              :disabled="editing"
              label="Id Propietario"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="bike.modelo"
              :rules="fieldRequired"
              label="Modelo"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="bike.marca"
              :rules="fieldRequired"
              label="Marca"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="bike.color"
              :rules="fieldRequired"
              label="Color"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="bike.cilindraje"
              :rules="fieldRequired"
              label="Cilindraje"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="bike.nro_tecnomecanica"
              label="Nro tecnomecánica"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="bike.nro_tecnomecanica"
              label="Nro Matricula"
            ></v-text-field>
          </v-col>
          <!-- :rules="fieldRequired"
                required -->
          <v-col cols="12" md="4">
            <v-file-input
              v-model="bike.imagen"
              label="Imagen"
              @change="loadImage"
              truncate-length="15"
            ></v-file-input>
          </v-col>

          <v-col cols="12" md="4">
            <v-btn color="accent" @click="save()" v-if="!editing">Guardar</v-btn>
            <v-btn color="accent" @click="editBike()" v-else>Editar moto</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-data-table
      :headers="headers"
      :items="bikes"
      :items-per-page="5"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="loadBike(item)">
          mdi-pencil
        </v-icon>
        <v-btn
          small
          color="blue-grey"
          class="ma-2 white--text text-none"
          @click="loadTracking(item)"
        >
          Seguimiento
          <v-icon right dark>
            mdi-clipboard-list
          </v-icon>
        </v-btn>
        <v-icon small @click="deleteBike(item)" v-if="userIn == 1">
          mdi-delete
        </v-icon>
      </template>
      <template slot="item.imagen" slot-scope="{ item }">
        <a :href="item.imagen" target="blank">Abrir imagen</a>
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
import config from "../assets/config";
const url_api = config.API_URL;
export default {
  name: "MotorcyclePage",
  beforeMount() {
    this.loadPage();
  },
  beforeUpdate() {
    try {
      this.$refs.formBikes.validate();
    } catch (error) {}
  },
  data() {
    return {
      userIn: null,
      formBikes: null,
      headers: [
        { text: "Placa", value: "placa" },
        { text: "Propietario", value: "nombre_propietario" },
        { text: "Marca", value: "marca" },
        { text: "Cilindraje", value: "cilindraje" },
        { text: "Imagen", value: "imagen", sortable: false },
        { text: "Actions", value: "actions" },
      ],
      bikes: [],
      bike: {
        placa: null,
        id_propietario: null,
        modelo: null,
        marca: null,
        color: null,
        cilindraje: null,
        nro_tecnomecanica: null,
        vencimiento_tecnomecanica: null,
        nro_soat: null,
        vencimiento_soat: null,
        nro_matricula: null,
        estado: null,
        imagen: null,
      },
      states: [],
      fieldRequired: [(v) => !!v || "Field is required"],
      dialog: false,
      // Si esta editando o no
      editing: false,
    };
  },
  methods: {
    loadPage() {
      this.loadExternalInfo();
      this.loadBikes();
    },
    /**
     * Carga los tipos de identificación y los roles desde base de datos
     */
    async loadExternalInfo() {
      this.userIn = JSON.parse(localStorage.getItem("userIn"));

      this.states = [
        {
          id: "01",
          name: "En mantenimiento",
        },
        {
          id: "02",
          name: "Pendiente de revisión",
        },
        {
          id: "03",
          name: "Pendiente de entrega",
        },
      ];
    },
    loadTracking(item) {
      this.$cookies.set("id_motorcycle", item.placa);
      this.$router.push("/tracking");
    },
    loadBikes() {
      this.$axios
        .get(url_api + "motorcycles")
        .then((response) => {
          let data = response.data;
          this.bikes = data.info;
        })
        .catch((error) => {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al consultar las motos.",
          });
        });
    },
    async loadImage(image) {
      try {
        console.log("Carga de imagen");
        console.log(data);
        let payload = new FormData();
        payload.append("imagen", image);
        let { data } = await this.$axios.post(url_api + "motorcycles/image", payload);
        this.bike.imagen = data.info;
      } catch (error) {}
    },
    async save() {
      if (this.$refs.formBikes.validate() && this.formBikes) {
        try {
          let exist = this.bikes.find((x) => x.placa == this.bike.placa);
          // Validación si la identificación de una persona ya existe en el array
          if (exist == undefined) {
            let { data } = await this.$axios.post(url_api + "motorcycles", this.bike);
            this.loadBikes();
            this.bike = {};
            this.$swal.fire(
              "Creado",
              "La moto ha sido creada correctamente.!",
              "success"
            );
          } else {
            this.$swal.fire({
              icon: "error",
              title: "Oops...",
              text: "La moto ya existe en la tabla.",
            });
          }
        } catch (error) {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al crear la moto.",
          });
        }
      } else {
        this.dialog = true;
      }
    },
    loadBike(bike) {
      this.bike = Object.assign({}, bike);
      this.editing = true;
    },
    editBike() {
      if (this.$refs.formBikes.validate() && this.formBikes) {
        let existIndex = this.bikes.findIndex((x) => x.placa == this.bike.placa);
        if (existIndex > -1) {
          let path = "motorcycles/" + this.bike.placa;
          this.$axios
            .put(url_api + path, this.bike)
            .then((response) => {
              this.bike = {};
              this.editing = false;
              this.$swal.fire(
                "Modificado.",
                "La moto ha sido modificada correctamente.!",
                "success"
              );
              this.loadBikes();
            })
            .catch((error) => {
              this.$swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al modificar la moto.",
              });
            });
        } else {
          this.$swal.fire({
            icon: "error",
            title: "Oops...",
            text: "La moto NO existe en la tabla.",
          });
        }
      } else {
        this.dialog = true;
      }
    },
    deleteBike(bike) {
      let existIndex = this.bikes.findIndex((x) => x.placa == bike.placa);
      if (existIndex > -1) {
        this.$swal
          .fire({
            title: "Desea eliminar la moto?",
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
              let path = "motorcycles/" + bike.id;
              this.$axios
                .delete(url_api + path)
                .then((response) => {
                  this.$swal.fire(
                    "Eliminado.",
                    "La moto ha sido eliminada correctamente.!",
                    "success"
                  );
                  this.loadBikes();
                })
                .catch((error) => {
                  this.$swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Error eliminando la moto",
                  });
                });
            }
          });
      } else {
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: "La moto NO existe en la tabla.",
        });
      }
    },
  },
};
</script>
