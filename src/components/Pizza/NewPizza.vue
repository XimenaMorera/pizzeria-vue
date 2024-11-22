<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Nueva Pizza</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Crear Pizza
        </div>
        <div class="card-body">
          <form @submit.prevent="crearPizza">
            <div class="row mb-3">
              <label for="pizza_name" class="form-label">Nombre:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="pizza-slice" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="pizza_name"
                  placeholder="Nombre de la pizza"
                  v-model="pizza.name"
                  required
                />
              </div>
            </div>
  
            <div class="row mb-3">
              <label for="size" class="form-label">Tamaño:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="arrows-alt" />
                </div>
                <select class="form-select" v-model="pizza.size" required>
                  <option value="pequeña">Pequeña</option>
                  <option value="mediana">Mediana</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
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
                  id="price"
                  placeholder="Precio"
                  v-model="pizza.price"
                  min="0"
                  required
                />
              </div>
            </div>
  
            <button class="btn btn-primary" type="submit">Crear</button>
            <button class="btn btn-secondary mx-2" @click="cancelar">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    name: "NewPizza",
    data() {
      return {
        pizza: {
          name: "",
          size: "mediana", // Valor predeterminado
          price: 0,
        },
      };
    },
    methods: {
      cancelar() {
        this.$router.push({ name: "Pizzas" });
      },
      async crearPizza() {
        try {
          const res = await axios.post("http://127.0.0.1:8000/api/pizzas", this.pizza);
  
          if (res.status === 201) {
            this.$router.push({ name: "Pizzas" });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Pizza creada con éxito",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo crear la pizza",
          });
        }
      },
    },
  };
  </script>
  