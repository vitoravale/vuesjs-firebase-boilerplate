import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

function load(component) {
  return () => System.import(`../components/${component}.vue`);
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: load('Dashboard'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: load('Login'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '*',
      name: 'Error',
      component: load('Error'),
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const auth = false;
    if (!auth) {
      next({ path: '/login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
