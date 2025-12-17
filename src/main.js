import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"

import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

import { store } from './store/index'

// Router config
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// Create app instance first
const app = createApp(App)

// Use plugins BEFORE mounting
app.use(router)
app.use(store)

// Mount app
app.mount('#app')