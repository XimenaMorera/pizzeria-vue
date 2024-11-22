<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Editar Empleado</h1>
      <div class="card">
        <div class="card-header fw-bold">Información del Empleado</div>
        <div class="card-body">
          <form @submit.prevent="actualizarEmpleado">
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
                  placeholder="Nombre del empleado"
                  v-model="empleado.name"
                  required
                />
              </div>
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
              <label for="salary" class="form-label">Salario:</label>
              <div class="input-group">
                <div class="input-group-text">
                  <font-awesome-icon icon="dollar-sign" />
                </div>
                <input
                  type="number"
                  class="form-control"
                  id="salary"
                  placeholder="Salario"
                  v-model="empleado.salary"
                  min="0"
                  required
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
    name: "EditarEmployee",
    data() {
      return {
        empleado: {
          id: 0,
          name: "",
          position
  