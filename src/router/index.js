import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'

Vue.use(VueRouter)

import Layout from '@/components/Layout.vue'

const routes = [{
		path: '/',
		name: 'Login',
		component: () => import('@/views/Login.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Register.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/admin',
		name: 'Admin',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'AdmineList',
				component: () => import('@/views/Admin/List.vue')
			},
			{
				path: 'role',
				name: 'AdmineRole',
				component: () => import('@/views/Admin/Role.vue')
			},
			{
				path: 'goods',
				name: 'AdmineGoods',
				component: () => import('@/views/Admin/Goods.vue')
			},
			{
				path: 'edit/:id',
				name: 'AdmineEdit',
				component: () => import('@/views/Admin/Edit.vue'),
				props:true
			}
		]
	},
	{
		path: '/user',
		name: 'User',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'UserList',
			component: () => import('@/views/User/List.vue')
		},
		{
			path: 'edit',
			name: 'UserEdit',
			component: () => import('@/views/User/Edit.vue')
		}]
	},
	{
		path: '/role',
		name: 'Role',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'RoleList',
			component: () => import('@/views/Role/List.vue')
		}]
	},
	{
		path: '/order',
		name: 'Order',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'OrderList',
			component: () => import('@/views/Order/List.vue')
		}]
	},
	{
		path: '/menu',
		name: 'Menu',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'MenuList',
			component: () => import('@/views/Menu/List.vue')
		}]
	}

]

const router = new VueRouter({
	routes
})
// 全局守卫
router.beforeEach((to, from, next) => {
	// 根据meta元信息,校验路由是否需要登录授权
	let isRequireAuth = to.matched.some((path) => path.meta.requiresAuth);
	// 不需要登录
	if(!isRequireAuth){
		next();
		return;
	}
	// 需要登录
	//校验token
	let token = sessionStorage.token;
	// 有token,放行
	if (token) {
		next();
		return;
	}
	// 无token强制跳转登录
	Message.error('无效的token，请重新登录!');
	setTimeout(() => {
		next(`/login?redirect=${to.path}`);
	}, 2000);
});

export default router
