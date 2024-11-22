<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Gestión de Ingredientes</h1>
      <div class="mb-3 text-end">
        <button class="btn btn-success" @click="navegarNuevoIngrediente">
          <font-awesome-icon icon="plus" /> Nuevo Ingrediente
        </button>
      </div>
      <div class="card">
        <div class="card-header fw-bold">Lista de Ingredientes</div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ingrediente in ingredientes" :key="ingrediente.id">
                <td>{{ ingrediente.id }}</td>
                <td>{{ ingrediente.name }}</td>
                <td>
                  <button
                    class="btn btn-warning btn-sm"
                    @click="navegarEditarIngrediente(ingrediente.id)"
                  >
                    <font-awesome-icon icon="edit" /> Editar
                  </button>
                  <button
                    class="btn btn-danger btn-sm mx-2"
                    @click="eliminarIngrediente(ingrediente.id)"
                  >
                    <font-awesome-icon icon="trash" /> Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    name: "Ingredient",
    data() {
      return {
        ingredientes: [],
      };
    },
    methods: {
      obtenerIngredientes() {
        axios
          .get("http://127.0.0.1:8000/api/ingredients")
          .then((response) => {
            this.ingredientes = response.data;
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudieron cargar los ingredientes",
            });
          });
      },
      navegarNuevoIngrediente() {
        this.$router.push({ name: "NewIngredient" });
      },
      navegarEditarIngrediente(id) {
        this.$router.push({ name: "EditarIngredient", params: { id } });
      },
      eliminarIngrediente(id) {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción eliminará el ingrediente.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`http://127.0.0.1:8000/api/ingredients/${id}`)
              .then(() => {
                Swal.fire({
                  icon: "success",
                  title: "Ingrediente eliminado",
                  showConfirmButton: false,
                  timer: 2000,
                });
                this.obtenerIngredientes();
              })
              .catch((error) => {
                console.error(error);
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "No se pudo eliminar el ingrediente",
                });
              });
          }
        });
      },
    },
    created() {
      this.obtenerIngredientes();
    },
  };
  </script>
  