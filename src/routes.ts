import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/auth/Login.vue';
import ForgotPassword from '@/views/auth/ForgotPassword.vue';
import ResetPassword from '@/views/auth/ResetPassword.vue';
import Dashboard from '@/views/dashboard/Index.vue';
import ManageUser from '@/views/user/Index.vue';
import ManageAccount from '@/views/account/Index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      layout: 'auth',
    },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
    meta: {
      layout: 'auth',
    },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword,
    meta: {
      layout: 'auth',
    },
  },
  {
    path: '/manage-user',
    name: 'manage-user',
    component: ManageUser,
  },
  {
    path: '/manage-account',
    name: 'manage-account',
    component: ManageAccount,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
