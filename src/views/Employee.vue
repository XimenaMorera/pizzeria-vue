<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Gestión de Empleados</h1>
      <div class="mb-3 text-end">
        <button class="btn btn-success" @click="navegarNuevoEmpleado">
          <font-awesome-icon icon="plus" /> Nuevo Empleado
        </button>
      </div>
      <div class="card">
        <div class="card-header fw-bold">Lista de Empleados</div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Puesto</th>
                <th>Fecha Contratación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="empleado in empleados" :key="empleado.id">
                <td>{{ empleado.id }}</td>
                <td>{{ empleado.name }}</td>
                <td>{{ empleado.position }}</td>
                <td>{{ empleado.hire_date }}</td>
                <td>
                  <button
                    class="btn btn-warning btn-sm"
                    @click="navegarEditarEmpleado(empleado.id)"
                  >
                    <font-awesome-icon icon="edit" /> Editar
                  </button>
                  <button
                    class="btn btn-danger btn-sm mx-2"
                    @click="eliminarEmpleado(empleado.id)"
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
    name: "Employee",
    data() {
      return {
        empleados: [],
      };
    },
    methods: {
      obtenerEmpleados() {
        axios
          .get("http://127.0.0.1:8000/api/employees")
          .then((response) => {
            this.empleados = response.data;
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudieron cargar los empleados",
            });
          });
      },
      navegarNuevoEmpleado() {
        this.$router.push({ name: "NewEmployee" });
      },
      navegarEditarEmpleado(id) {
        this.$router.push({ name: "EditarEmployee", params: { id } });
      },
      eliminarEmpleado(id) {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción eliminará al empleado.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .delete(`http://127.0.0.1:8000/api/employees/${id}`)
              .then(() => {
                Swal.fire({
                  icon: "success",
                  title: "Empleado eliminado",
                  showConfirmButton: false,
                  timer: 2000,
                });
                this.obtenerEmpleados();
              })
              .catch(() => {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "No se pudo eliminar al empleado",
                });
              });
          }
        });
      },
    },
    created() {
      this.obtenerEmpleados();
    },
  };
  </script>
  