<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Editar Ingrediente</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Información del Ingrediente
        </div>
        <div class="card-body">
          <form @submit.prevent="updateIngrediente">
            <div class="row mb-3">
              <label for="name" class="form-label">Nombre:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="carrot" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Nombre del ingrediente"
                  v-model="ingrediente.name"
                  required
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
    name: "EditarIngredient",
    data() {
      return {
        ingrediente: {
          id: 0,
          name: "",
        },
      };
    },
    methods: {
      cancelar() {
        this.$router.push({ name: "Ingredients" });
      },
      async updateIngrediente() {
        try {
          const res = await axios.put(
            `http://127.0.0.1:8000/api/ingredients/${this.ingrediente.id}`,
            this.ingrediente
          );
  
          if (res.status === 200) {
            this.$router.push({ name: "Ingredients" });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Ingrediente actualizado con éxito",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo actualizar el ingrediente",
          });
        }
      },
    },
    mounted() {
      this.ingrediente.id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/ingredients/${this.ingrediente.id}`)
        .then((response) => {
          this.ingrediente = response.data;
        })
        .catch((error) => console.error(error));
    },
  };
  </script>
  