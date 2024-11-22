<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Editar Cliente</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Información del Cliente
        </div>
        <div class="card-body">
          <form @submit.prevent="updateCliente">
            <div class="row mb-3">
              <label for="cliente_id" class="form-label">ID:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="id-card" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="cliente_id"
                  placeholder="ID del Cliente"
                  disabled
                  v-model="cliente.id"
                />
              </div>
            </div>
  
            <div class="row mb-3">
              <label for="name" class="form-label">Nombre:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="user" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Nombre del cliente"
                  v-model="cliente.name"
                  required
                />
              </div>
            </div>
  
            <div class="row mb-3">
              <label for="email" class="form-label">Correo Electrónico:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="envelope" />
                </div>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Correo Electrónico"
                  v-model="cliente.email"
                  required
                />
              </div>
            </div>
  
            <div class="row mb-3">
              <label for="address" class="form-label">Dirección:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="map-marker-alt" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  placeholder="Dirección"
                  v-model="cliente.address"
                />
              </div>
            </div>
  
            <div class="row mb-3">
              <label for="phone" class="form-label">Teléfono:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="phone" />
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="phone"
                  placeholder="Teléfono"
                  v-model="cliente.phone"
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
    name: "EditarCliente",
    data() {
      return {
        cliente: {
          id: 0,
          name: "",
          email: "",
          address: "",
          phone: "",
        },
      };
    },
    methods: {
      cancelar() {
        this.$router.push({ name: "Clientes" });
      },
      async updateCliente() {
        try {
          const res = await axios.put(
            `http://127.0.0.1:8000/api/clients/${this.cliente.id}`,
            this.cliente
          );
  
          if (res.status === 200) {
            this.$router.push({ name: "Clientes" });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Cliente actualizado con éxito",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo actualizar el cliente",
          });
        }
      },
    },
    mounted() {
      this.cliente.id = this.$route.params.id;
      axios
        .get(`http://127.0.0.1:8000/api/clients/${this.cliente.id}`)
        .then((response)
  