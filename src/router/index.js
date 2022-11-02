import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/productos',
    name: 'Productos',
    component: () => import(/* webpackChunkName: "about" */ '../views/Productos.vue'),
  },
  {
    path: '/ingreso',
    name: 'Ingreso',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ingreso.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registro.vue')
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: () => import(/* webpackChunkName: "about" */ '../views/Perfil.vue')
  },
  {
    path: '/detalles',
    name: 'Detalles',
    component: () => import(/* webpackChunkName: "about" */ '../views/DetallesProducto.vue')
  },
  {
    path: '/busqueda/:id',
    name: 'Producto Buscado',
    component: () => import(/* webpackChunkName: "about" */ '../views/DetallesProducto.vue')
  },
  {
    path: '/productonuevo',
    name: 'Producto Nuevo',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductoNuevo.vue')
  },
  {
    path: '/editarproducto/:id',
    name: 'Editar Producto',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductoNuevo.vue')
  },
  {
    path: '/carrito',
    name: 'Carrito de Compras',
    component: () => import(/* webpackChunkName: "about" */ '../views/Carrito.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
