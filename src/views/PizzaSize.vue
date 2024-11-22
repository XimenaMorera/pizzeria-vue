<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Gestión de Tamaños de Pizza</h1>
      <div class="mb-3 text-end">
        <button class="btn btn-success" @click="navegarNuevoTamaño">
          <font-awesome-icon icon="plus" /> Nuevo Tamaño
        </button>
      </div>
      <div class="card">
        <div class="card-header fw-bold">Lista de Tamaños de Pizza</div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tamaño</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tamano in tamanos" :key="tamano.id">
                <td>{{ tamano.id }}</td>
                <td>{{ tamano.size }}</td>
                <td>${{ tamano.price }}</td>
                <td>
                  <button
                    class="btn btn-warning btn-sm"
                    @click="navegarEditarTamaño(tamano.id)"
                  >
                    <font-awesome-icon icon="edit" /> Editar
                  </button>
                  <button
                    class="btn btn-danger btn-sm mx-2"
                    @click="eliminarTamaño(tamano.id)"
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
    name: "PizzaSize",
    data() {
      return {
        tamanos: [],
      };
    },
    methods: {
      obtenerTamanos() {
        axios
          .get("http://127.0.0.1:8000/api/pizza-sizes")
          .then((response) => {
            this.tamanos = response.data;
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudieron cargar los tamaños de pizza",
            });
          });
      },
      navegarNuevoTamaño() {
        this.$router.push({ name: "NewPizzaSize" });
      },
      navegarEditarTamaño(id) {
        this.$router.push({ name: "EditarPizzaSize", params: { id } });
      },
      eliminarTamaño(id) {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción eliminará el tamaño de pizza.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`http://127.0.0.1:8000/api/pizza-sizes/${id}`)
              .then(() => {
                Swal.fire({
                  icon: "success",
                  title: "Tamaño de pizza eliminado",
                  showConfirmButton: false,
                  timer: 2000,
                });
                this.obtenerTamanos();
              })
              .catch(() => {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "No se pudo eliminar el tamaño de pizza",
                });
              });
          }
        });
      },
    },
    created() {
      this.obtenerTamanos();
    },
  };
  </script>
  