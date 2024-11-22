<template>
    <div class="container text-start">
      <h1 class="text-primary fw-bold">Nuevo Cliente</h1>
      <div class="card">
        <div class="card-header fw-bold">
          Crear Cliente
        </div>
        <div class="card-body">
          <form @submit.prevent="crearCliente">
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
   
  