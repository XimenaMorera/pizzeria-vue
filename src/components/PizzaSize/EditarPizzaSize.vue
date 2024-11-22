<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Editar Tamaño de Pizza</h1>
      <div class="card">
        <div class="card-header fw-bold">Editar Tamaño de Pizza</div>
        <div class="card-body">
          <form @submit.prevent="actualizarTamaño">
            <div class="row mb-3">
              <label for="size" class="form-label">Tamaño:</label>
              <input
                type="text"
                class="form-control"
                v-model="pizzaSize.size"
                required
              />
            </div>
  
            <div class="row mb-3">
              <label for="price" class="form-label">Precio:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="dollar-sign" />
                </div>
                <input
                  type="number"
                  class="form-control"
                  v-model="pizzaSize.price"
                  required
                />
              </div>
            </div>
  
            <button type="submit" class="btn btn-primary">Actualizar</button>
            <button @click="cancelar" class="btn btn-secondary mx-2">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    name: "EditarPizzaSize",
    data() {
      return {
        pizzaSize: {
          id: "",
          size: "",
          price: 0,
        },
      };
    },
    methods: {
      cancelar() {
        this.$router.push({ name: "PizzaSizes" });
      },
      async actualizarTamaño() {
        try {
          await axios.put(
            `http://127.0.0.1:8000/api/pizza-sizes/${this.pizzaSize.id}`,
            this.pizzaSize
          );
          Swal.fire({
            icon: "success",
            title: "Tamaño de pizza actualizado con éxito",
            timer: 2000,
            showConfirmButton: false,
          });
          this.$router.push({ name: "PizzaSizes" });
        } catch {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo actualizar el tamaño de pizza",
          });
        }
      },
    },
    mounted() {
      this.pizzaSize.id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/pizza-sizes/${this.pizzaSize.id}`)
        .then((response) => {
          this.pizzaSize = response.data;
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo cargar los datos del tamaño de pizza",
          });
        });
    },
  };
  </script>
  