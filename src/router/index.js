import Vue from 'vue';
import VueRouter from 'vue-router';

import Situation from '../views/Situation.vue';
import Navigation from '../views/Navigation.vue';
import Tactical from '../views/Tactical.vue';
import FlightOps from '../views/FlightOps.vue';
import Engineering from '../views/Engineering.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/game/sitrep',
        name: 'Situation',
        component: Situation,
    },
    {
        path: '/game/nav',
        name: 'Nav',
        component: Navigation,
    },
    {
        path: '/game/tactical',
        name: 'Tactical',
        component: Tactical,
    },
    {
        path: '/game/flight',
        name: 'Flight',
        component: FlightOps,
    },
    {
        path: '/game/engineering',
        name: 'Engineering',
        component: Engineering,
    },
    {
        path: '/',
        redirect: { name: 'Situation' },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
