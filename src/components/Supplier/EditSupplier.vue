<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Editar Proveedor</h1>
      <div class="card">
        <div class="card-header fw-bold">Editar Información</div>
        <div class="card-body">
          <form @submit.prevent="actualizarProveedor">
            <div class="row mb-3">
              <label for="name" class="form-label">Nombre:</label>
              <input
                type="text"
                class="form-control"
                v-model="proveedor.name"
                required
              />
            </div>
  
            <div class="row mb-3">
              <label for="contact_info" class="form-label">Información de Contacto:</label>
              <input
                type="text"
                class="form-control"
                v-model="proveedor.contact_info"
                required
              />
            </div>
  
            <button type="submit" class="btn btn-primary">Actualizar</button>
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
    name: "EditarSupplier",
    data() {
      return {
        proveedor: {
          id: "",
          name: "",
          contact_info: "",
        },
      };
    },
    methods: {
      cancelar() {
        this.$router.push({ name: "Suppliers" });
      },
      async actualizarProveedor() {
        try {
          await axios.put(
            `http://127.0.0.1:8000/api/suppliers/${this.proveedor.id}`,
            this.proveedor
          );
          Swal.fire({
            icon: "success",
            title: "Proveedor actualizado con éxito",
            timer: 2000,
            showConfirmButton: false,
          });
          this.$router.push({ name: "Suppliers" });
        } catch {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo actualizar al proveedor",
          });
        }
      },
    },
    mounted() {
      this.proveedor.id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/suppliers/${this.proveedor.id}`)
        .then((response) => {
          this.proveedor = response.data;
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo cargar los datos del proveedor",
          });
        });
    },
  };
  </script>
  