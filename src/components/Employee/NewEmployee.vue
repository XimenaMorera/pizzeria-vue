<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Nuevo Empleado</h1>
      <div class="card">
        <div class="card-header fw-bold">Crear Empleado</div>
        <div class="card-body">
          <form @submit.prevent="crearEmpleado">
            <div class="row mb-3">
              <label for="name" class="form-label">Nombre:</label>
              <input
                type="text"
                class="form-control"
                v-model="empleado.name"
                placeholder="Nombre del empleado"
                required
              />
            </div>
  
            <div class="row mb-3">
              <label for="position" class="form-label">Puesto:</label>
              <select class="form-select" v-model="empleado.position" required>
                <option value="cajero">Cajero</option>
                <option value="administrador">Administrador</option>
                <option value="cocinero">Cocinero</option>
                <option value="mensajero">Mensajero</option>
              </select>
            </div>
  
            <div class="row mb-3">
              <label for="hire_date" class="form-label">Fecha de Contratación:</label>
              <input
                type="date"
                class="form-control"
                v-model="empleado.hire_date"
                required
              />
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
    name: "NewEmployee",
    data() {
      return {
        empleado: {
          name: "",
          position: "cajero",
          hire_date: "",
        },
      };
    },
    methods: {
      cancelar() {
        this.$router.push({ name: "Employees" });
      },
      async crearEmpleado() {
        try {
          await axios.post("http://127.0.0.1:8000/api/employees", this.empleado);
          Swal.fire({
            icon: "success",
            title: "Empleado creado con éxito",
            timer: 2000,
            showConfirmButton: false,
          });
          this.$router.push({ name: "Employees" });
        } catch {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo crear al empleado",
          });
        }
      },
    },
  };
  </script>
  