<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Gestión de Proveedores</h1>
      <div class="mb-3 text-end">
        <button class="btn btn-success" @click="navegarNuevoProveedor">
          <font-awesome-icon icon="plus" /> Nuevo Proveedor
        </button>
      </div>
      <div class="card">
        <div class="card-header fw-bold">Lista de Proveedores</div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Información de Contacto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="proveedor in proveedores" :key="proveedor.id">
                <td>{{ proveedor.id }}</td>
                <td>{{ proveedor.name }}</td>
                <td>{{ proveedor.contact_info }}</td>
                <td>
                  <button
                    class="btn btn-warning btn-sm"
                    @click="navegarEditarProveedor(proveedor.id)"
                  >
                    <font-awesome-icon icon="edit" /> Editar
                  </button>
                  <button
                    class="btn btn-danger btn-sm mx-2"
                    @click="eliminarProveedor(proveedor.id)"
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
    name: "Supplier",
    data() {
      return {
        proveedores: [],
      };
    },
    methods: {
      obtenerProveedores() {
        axios
          .get("http://127.0.0.1:8000/api/suppliers")
          .then((response) => {
            this.proveedores = response.data;
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudieron cargar los proveedores",
            });
          });
      },
      navegarNuevoProveedor() {
        this.$router.push({ name: "NewSupplier" });
      },
      navegarEditarProveedor(id) {
        this.$router.push({ name: "EditarSupplier", params: { id } });
      },
      eliminarProveedor(id) {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción eliminará al proveedor.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`http://127.0.0.1:8000/api/suppliers/${id}`)
              .then(() => {
                Swal.fire({
                  icon: "success",
                  title: "Proveedor eliminado",
                  showConfirmButton: false,
                  timer: 2000,
                });
                this.obtenerProveedores();
              })
              .catch(() => {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "No se pudo eliminar al proveedor",
                });
              });
          }
        });
      },
    },
    created() {
      this.obtenerProveedores();
    },
  };
  </script>
  