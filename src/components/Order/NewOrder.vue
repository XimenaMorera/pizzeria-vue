<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Nueva Orden</h1>
      <div class="card">
        <div class="card-header fw-bold">Crear Orden</div>
        <div class="card-body">
          <form @submit.prevent="crearOrden">
            <div class="row mb-3">
              <label for="client_id" class="form-label">Cliente:</label>
              <select class="form-select" v-model="orden.client_id" required>
                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                  {{ cliente.name }}
                </option>
              </select>
            </div>
  
            <div class="row mb-3">
              <label for="branch_id" class="form-label">Sucursal:</label>
              <select class="form-select" v-model="orden.branch_id" required>
                <option v-for="sucursal in sucursales" :key="sucursal.id" :value="sucursal.id">
                  {{ sucursal.name }}
                </option>
              </select>
            </div>
  
            <div class="row mb-3">
              <label for="total_price" class="form-label">Precio Total:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="dollar-sign" />
                </div>
                <input
                  type="number"
                  class="form-control"
                  id="total_price"
                  placeholder="Precio total"
                  v-model="orden.total_price"
                  min="0"
                  required
                />
              </div>
            </div>
  
            <div class="row mb-3">
              <label for="status" class="form-label">Estado:</label>
              <select class="form-select" v-model="orden.status" required>
                <option value="pendiente">Pendiente</option>
                <option value="en_preparacion">En preparación</option>
                <option value="listo">Listo</option>
                <option value="entregado">Entregado</option>
              </select>
            </div>
  
            <button class="btn btn-primary" type="submit">Crear</button>
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
    name: "NewOrder",
    data() {
      return {
        orden: {
          client_id: "",
          branch_id: "",
          total_price: 0,
          status: "pendiente",
        },
        clientes: [],
        sucursales: [],
      };
    },
    methods: {
      cancelar() {
        this.$router.push({ name: "Orders" });
      },
      async crearOrden() {
        try {
          const res = await axios.post("http://127.0.0.1:8000/api/orders", this.orden);
  
          if (res.status === 201) {
            this.$router.push({ name: "Orders" });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Orden creada con éxito",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo crear la orden",
          });
        }
      },
    },
    mounted() {
      axios.get("http://127.0.0.1:8000/api/clients").then((response) => {
        this.clientes = response.data;
      });
  
      axios.get("http://127.0.0.1:8000/api/branches").then((response) => {
        this.sucursales = response.data;
      });
    },
  };
  </script>
  