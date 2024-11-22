<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Gestión de Órdenes</h1>
      <div class="mb-3 text-end">
        <button class="btn btn-success" @click="navegarNuevaOrden">
          <font-awesome-icon icon="plus" /> Nueva Orden
        </button>
      </div>
      <div class="card">
        <div class="card-header fw-bold">Lista de Órdenes</div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Sucursal</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="orden in ordenes" :key="orden.id">
                <td>{{ orden.id }}</td>
                <td>{{ orden.client_name }}</td>
                <td>{{ orden.branch_name }}</td>
                <td>${{ orden.total_price }}</td>
                <td>{{ orden.status }}</td>
                <td>
                  <button
                    class="btn btn-warning btn-sm"
                    @click="navegarEditarOrden(orden.id)"
                  >
                    <font-awesome-icon icon="edit" /> Editar
                  </button>
                  <button
                    class="btn btn-danger btn-sm mx-2"
                    @click="eliminarOrden(orden.id)"
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
    name: "Order",
    data() {
      return {
        ordenes: [],
      };
    },
    methods: {
      obtenerOrdenes() {
        axios
          .get("http://127.0.0.1:8000/api/orders")
          .then((response) => {
            this.ordenes = response.data;
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudieron cargar las órdenes",
            });
          });
      },
      navegarNuevaOrden() {
        this.$router.push({ name: "NewOrder" });
      },
      navegarEditarOrden(id) {
        this.$router.push({ name: "EditarOrder", params: { id } });
      },
      eliminarOrden(id) {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción eliminará la orden.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`http://127.0.0.1:8000/api/orders/${id}`)
              .then(() => {
                Swal.fire({
                  icon: "success",
                  title: "Orden eliminada",
                  showConfirmButton: false,
                  timer: 2000,
                });
                this.obtenerOrdenes();
              })
              .catch((error) => {
                console.error(error);
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "No se pudo eliminar la orden",
                });
              });
          }
        });
      },
    },
    created() {
      this.obtenerOrdenes();
    },
  };
  </script>
  