import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '../views/TodoView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'todos',
			component: TodoView,
		},
		{
			path: '/about',
			name: 'about',
			component: AboutView,
		},
	],
})

export default router
