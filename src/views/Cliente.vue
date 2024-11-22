<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Gestión de Clientes</h1>
      <div class="mb-3 text-end">
        <button class="btn btn-success" @click="navegarNuevoCliente">
          <font-awesome-icon icon="plus" /> Nuevo Cliente
        </button>
      </div>
      <div class="card">
        <div class="card-header fw-bold">Lista de Clientes</div>
        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente in clientes" :key="cliente.id">
                <td>{{ cliente.id }}</td>
                <td>{{ cliente.name }}</td>
                <td>{{ cliente.email }}</td>
                <td>{{ cliente.phone }}</td>
                <td>
                  <button
                    class="btn btn-warning btn-sm"
                    @click="navegarEditarCliente(cliente.id)"
                  >
                    <font-awesome-icon icon="edit" /> Editar
                  </button>
                  <button
                    class="btn btn-danger btn-sm mx-2"
                    @click="eliminarCliente(cliente.id)"
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
    name: "Cliente",
    data() {
      return {
        clientes: [],
      };
    },
    methods: {
      obtenerClientes() {
        axios
          .get("http://127.0.0.1:8000/api/clients")
          .then((response) => {
            this.clientes = response.data;
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "No se pudieron cargar los clientes",
            });
          });
      },
      navegarNuevoCliente() {
        this.$router.push({ name: "NewCliente" });
      },
      navegarEditarCliente(id) {
       
  