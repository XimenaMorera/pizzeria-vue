<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Nuevo Tamaño de Pizza</h1>
      <div class="card">
        <div class="card-header fw-bold">Crear Tamaño de Pizza</div>
        <div class="card-body">
          <form @submit.prevent="crearTamaño">
            <div class="row mb-3">
              <label for="size" class="form-label">Tamaño:</label>
              <input
                type="text"
                class="form-control"
                v-model="pizzaSize.size"
                placeholder="Tamaño de la pizza"
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
                  placeholder="Precio"
                  min="0"
                  required
                />
              </div>
            </div>
  
            <button type="submit" class="btn btn-primary">Crear</button>
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
    name: "NewPizzaSize",
    data() {
      return {
        pizzaSize: {
          size: "",
          price: 0,
        },
      };
    },
    methods: {
      cancelar() {
        this.$router.push({ name: "PizzaSizes" });
      },
      async crearTamaño() {
        try {
          await axios.post("http://127.0.0.1:8000/api/pizza-sizes", this.pizzaSize);
          Swal.fire({
            icon: "success",
            title: "Tamaño de pizza creado con éxito",
            timer: 2000,
            showConfirmButton: false,
          });
          this.$router.push({ name: "PizzaSizes" });
        } catch {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo crear el tamaño de pizza",
          });
        }
      },
    },
  };
  </script>
  