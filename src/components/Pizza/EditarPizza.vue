<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Editar Pizza</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Información de la Pizza
        </div>
        <div class="card-body">
          <form @submit.prevent="updatePizza">
            <div class="row mb-3">
              <label for="pizza_id" class="form-label">ID</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="tag" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="pizza_id"
                  placeholder="ID Pizza"
                  disabled
                  v-model="pizza.id"
                />
              </div>
            </div>
  
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
                />
              </div>
            </div>
  
            <div class="row mb-3">
              <label for="size" class="form-label">Tamaño:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="arrows-alt" />
                </div>
                <select class="form-select" v-model="pizza.size">
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
                />
              </div>
            </div>
  
            <button class="btn btn-primary" type="submit">Actualizar</button>
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
    name: "EditarPizza",
    data() {
      return {
        pizza: {
          id: 0,
          name: "",
          size: "mediana", // Default value
          price: 0,
        },
      };
    },
    methods: {
      cancelar() {
        this.$router.push({ name: "Pizzas" });
      },
      async updatePizza() {
        try {
          const res = await axios.put(
            `http://127.0.0.1:8000/api/pizzas/${this.pizza.id}`,
            this.pizza
          );
  
          if (res.status === 200) {
            this.$router.push({ name: "Pizzas" });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "La pizza ha sido actualizada",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo actualizar la pizza",
          });
        }
      },
    },
    mounted() {
      this.pizza.id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/pizzas/${this.pizza.id}`)
        .then((response) => {
          this.pizza = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  };
  </script>
  