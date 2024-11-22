import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Pizza from '@/views/Pizza.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  { path: '/pizzas', component: Pizza },
  { path: '/pizzas/:id/edit', 
    name: 'EditarPizza',
     component: EditarPizza },
     { path: '/pizzas/new',
       name: 'NewPizza', 
       component: NewPizza },
       { path: "/ingredients", name: "Ingredients", component: Ingredient },
       { path: "/ingredients/new", name: "NewIngredient", component: NewIngredient },
       { path: "/ingredients/:id/edit", name: "EditarIngredient", component: EditarIngredient },

       { path: "/pizza-sizes", name: "PizzaSizes", component: PizzaSize },
       { path: "/pizza-sizes/new", name: "NewPizzaSize", component: NewPizzaSize },
       { path: "/pizza-sizes/:id/edit", name: "EditarPizzaSize", component: EditarPizzaSize },

       { path: "/suppliers", name: "Suppliers", component: Supplier },
       { path: "/suppliers/new", name: "NewSupplier", component: NewSupplier },
       { path: "/suppliers/:id/edit", name: "EditarSupplier", component: EditarSupplier },


  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
