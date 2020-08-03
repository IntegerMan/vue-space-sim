import Vue from 'vue';
import VueRouter from 'vue-router';

import Situation from '../views/Situation.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/situation',
    name: 'Situation',
    component: Situation,
  },
  {
    path: '/',
    redirectTo: '/situation',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
