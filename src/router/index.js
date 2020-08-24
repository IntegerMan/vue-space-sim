import Vue from 'vue';
import VueRouter from 'vue-router';

import HelmControl from '../components/footers/HelmControl.vue';
import SensorControl from '../components/footers/SensorControl.vue';
import SituationControl from '../components/footers/SituationControl.vue';
import CombatControl from '../components/footers/CombatControl.vue';

import Situation from '../views/Situation.vue';
import Navigation from '../views/Navigation.vue';
import Helm from '../views/Helm.vue';
import Combat from '../views/Combat.vue';
import Sensors from '../views/Sensors.vue';
import FlightOps from '../views/FlightOps.vue';
import Operations from '../views/Operations.vue';
import Debug from '../views/Debug.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/game/situation',
        name: 'Situation',
        components: {
            default: Situation,
            footer: SituationControl,
        },
    },
    {
        path: '/game/nav',
        name: 'Nav',
        components: {
            default: Navigation,
            footer: null,
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
        components: {
            default: Sensors,
            footer: SensorControl,
        },
    },
    {
        path: '/game/combat',
        name: 'Combat',
        components: {
            default: Combat,
            footer: CombatControl,
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
        path: '/game/ops',
        name: 'Operations',
        component: Operations,
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
