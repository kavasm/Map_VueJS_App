import Vue from 'vue'
import VueRouter from 'vue-router'
import MapContainer from '../components/MapContainer.vue'
import PolygonMapContainer from '../components/PolygonMapContainer.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Map',
    component: MapContainer
  },
  {
    path: '/polygon-map',
    name: 'PolygonMap',
    component: PolygonMapContainer
  }
]

const router = new VueRouter({
  routes
})

export default router
