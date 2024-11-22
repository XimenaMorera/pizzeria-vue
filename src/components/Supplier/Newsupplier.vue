<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Nuevo Proveedor</h1>
      <div class="card">
        <div class="card-header fw-bold">Crear Proveedor</div>
        <div class="card-body">
          <form @submit.prevent="crearProveedor">
            <div class="row mb-3">
              <label for="name" class="form-label">Nombre:</label>
              <input
                type="text"
                class="form-control"
                v-model="proveedor.name"
                placeholder="Nombre del proveedor"
                required
              />
            </div>
  
            <div class="row mb-3">
              <label for="contact_info" class="form-label">Información de Contacto:</label>
              <input
                type="text"
                class="form-control"
                v-model="proveedor.contact_info"
                placeholder="Información de contacto"
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
    name: "NewSupplier",
    data() {
      return {
        proveedor: {
          name: "",
          contact_info: "",
        },
      };
    },
    methods: {
      cancelar() {
        this.$router.push({ name: "Suppliers" });
      },
      async crearProveedor() {
        try {
          await axios.post("http://127.0.0.1:8000/api/suppliers", this.proveedor);
          Swal.fire({
            icon: "success",
            title: "Proveedor creado con éxito",
            timer: 2000,
            showConfirmButton: false,
          });
          this.$router.push({ name: "Suppliers" });
        } catch {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo crear al proveedor",
          });
        }
      },
    },
  };
  </script>
  