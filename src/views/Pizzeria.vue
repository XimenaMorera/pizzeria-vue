<template>
    <div>
      <h1>Gestión de Pizzas</h1>
      <button @click="abrirFormulario">Nueva Pizza</button>
      <ul>
        <li v-for="pizza in pizzas" :key="pizza.id">
          {{ pizza.name }}
          <button @click="editarPizza(pizza)">Editar</button>
          <button @click="eliminarPizza(pizza.id)">Eliminar</button>
        </li>
      </ul>
  
      <!-- Formulario -->
      <div v-if="mostrarFormulario">
        <input v-model="formPizza.name" placeholder="Nombre de la pizza" />
        <button @click="guardarPizza">Guardar</button>
        <button @click="cerrarFormulario">Cancelar</button>
      </div>
    </div>
  </template>
  
  <script>
  import api from '@/services/api';
  
  export default {
    data() {
      return {
        pizzas: [],
        formPizza: { name: '' },
        mostrarFormulario: false,
        editando: false,
      };
    },
    methods: {
      obtenerPizzas() {
        api.get('/pizzas').then(response => {
          this.pizzas = response.data;
        });
      },
      abrirFormulario(pizza = null) {
        this.mostrarFormulario = true;
        this.editando = !!pizza;
        this.formPizza = pizza ? { ...pizza } : { name: '' };
      },
      cerrarFormulario() {
        this.mostrarFormulario = false;
        this.formPizza = { name: '' };
      },
      guardarPizza() {
        if (this.editando) {
          api.put(`/pizzas/${this.formPizza.id}`, this.formPizza).then(() => {
            this.obtenerPizzas();
            this.cerrarFormulario();
          });
        } else {
          api.post('/pizzas', this.formPizza).then(() => {
            this.obtenerPizzas();
            this.cerrarFormulario();
          });
        }
      },
      eliminarPizza(id) {
        api.delete(`/pizzas/${id}`).then(() => this.obtenerPizzas());
      },
    },
    created() {
      this.obtenerPizzas();
    },
  };
  </script>
  