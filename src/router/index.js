import Vue from 'vue';
import VueRouter from 'vue-router';

import HelmControl from '../components/HelmControl.vue';

import Situation from '../views/Situation.vue';
import Navigation from '../views/Navigation.vue';
import Helm from '../views/Helm.vue';
import Combat from '../views/Combat.vue';
import Sensors from '../views/Sensors.vue';
import FlightOps from '../views/FlightOps.vue';
import Engineering from '../views/Engineering.vue';
import Debug from '../views/Debug.vue';

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
        components: {
            default: Navigation,
            footer: HelmControl,
        },
    },
    {
        path: '/game/helm',
        name: 'Helm',
        components: {
            default: Helm,
            footer: HelmControl,
        },
    },
    {
        path: '/game/sensors',
        name: 'Sensors',
        component: Sensors,
    },
    {
        path: '/game/combat',
        name: 'Combat',
        components: {
            default: Combat,
            footer: HelmControl,
        },
    },
    {
        path: '/game/debug',
        name: 'Debug',
        components: {
            default: Debug,
            footer: HelmControl,
        },
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
