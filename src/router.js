import { createRouter, createWebHistory } from 'vue-router'
import Landing from './components/Landing.vue'
import Landing2a from './components/landing2a.vue'
const routes =[
    {
        path:'/',
        component:Landing
    },
    {
        path:'/index2',
        component:Landing2a
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
