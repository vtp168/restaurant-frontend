import { createRouter, createWebHistory } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';
import { useAuthStore } from '@/stores/auth'; // Import the store


const routes = [
  {
    path: '/admin',
    component: AdminLayout,
    // Add a meta field to indicate it's an admin route, useful for auth guards
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: 'dashboard', // /admin
        name: 'dashboard',
        component: () => import('@admin/Ecommerce.vue'),
      },
      {
        path: 'posts', // /admin
        name: 'posts',
        component: () => import('@admin/Posts/AllPost.vue'),
      },
      {
        path: 'posts/add', // /admin
        name: 'add-posts',
        component: () => import('@admin/Posts/AddPost.vue'),
      },
      {
        path: '/posts/:id/edit',
        name: 'PostEdit',
        component: () => import('@admin/Posts/UpdatePost.vue'),
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('@admin/Category/AllCategory.vue'),
        meta: {
          title: 'Calendar',
        },
      },
      {
        path: 'tags',
        name: 'Tags',
        component: () => import('@admin/Tags/AllTag.vue'),
        meta: {
          title: 'Tags',
        },
      },
      {
        path: '/calendar',
        name: 'Calendar',
        component: () => import('@admin/Others/Calendar.vue'),
        meta: {
          title: 'Calendar',
        },
      },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@admin/Users/UserProfile.vue'),
      meta: {
        title: 'Profile',
      },
    },
    {
      path: 'users',
      name: 'Users',
      component: () => import('@admin/Users/AllUsers.vue'),
      meta: {
        title: 'All Users',
      },
    },
    {
      path: '/form-elements',
      name: 'Form Elements',
      component: () => import('@admin/Forms/FormElements.vue'),
      meta: {
        title: 'Form Elements',
      },
    },
    {
      path: '/basic-tables',
      name: 'Basic Tables',
      component: () => import('@admin/Tables/BasicTables.vue'),
      meta: {
        title: 'Basic Tables',
      },
    },
    {
      path: '/line-chart',
      name: 'Line Chart',
      component: () => import('@admin/Chart/LineChart/LineChart.vue'),
    },
    {
      path: '/bar-chart',
      name: 'Bar Chart',
      component: () => import('@admin/Chart/BarChart/BarChart.vue'),
    },
    {
      path: '/alerts',
      name: 'Alerts',
      component: () => import('@admin/UiElements/Alerts.vue'),
      meta: {
        title: 'Alerts',
      },
    },
    {
      path: '/avatars',
      name: 'Avatars',
      component: () => import('@admin/UiElements/Avatars.vue'),
      meta: {
        title: 'Avatars',
      },
    },
    {
      path: '/badge',
      name: 'Badge',
      component: () => import('@admin/UiElements/Badges.vue'),
      meta: {
        title: 'Badge',
      },
    },

    {
      path: '/buttons',
      name: 'Buttons',
      component: () => import('@admin/UiElements/Buttons.vue'),
      meta: {
        title: 'Buttons',
      },
    },

    {
      path: '/images',
      name: 'Images',
      component: () => import('@admin/UiElements/Images.vue'),
      meta: {
        title: 'Images',
      },
    },
    {
      path: '/videos',
      name: 'Videos',
      component: () => import('@admin/UiElements/Videos.vue'),
      meta: {
        title: 'Videos',
      },
    },
    {
      path: '/blank',
      name: 'Blank',
      component: () => import('@admin/Pages/BlankPage.vue'),
      meta: {
        title: 'Blank',
      },
    },


      // Add other admin routes
    ],
  },

  {
      path: '/error-404',
      name: '404 Error',
      component: () => import('@admin/Errors/FourZeroFour.vue'),
      meta: {
        title: '404 Error',
      },
    },

    {
      path: '',
      name: 'Signin',
      component: () => import('@admin/Auth/Signin.vue'),
      meta: {
        title: 'Signin',
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@admin/Auth/Signup.vue'),
      meta: {
        title: 'Signup',
      },
    },
  //potentially a login route without any layout
//   {
//     path: '/login',
//     name: 'login',
//     component: () => import('@/views/auth/LoginView.vue'),
//   },


{ path: '/:pathMatch(.*)*',
   name: 'NotFound',
  component: () => import('@admin/Errors/FourZeroFour.vue')
 } // 404 page
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

//Navigation Guard for authentication and authorization
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore(); // Get the store instance

   const isAuthenticated =authStore.isAuthenticated /* check if user is logged in (e.g., from Pinia store) */;
   const isAdmin = authStore.user?.role === 'admin'; // assuming you have a role property


  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to login page
  // } else if (to.meta.requiresAdmin && !isAdmin) {
  //   next('/'); // Redirect to home or a 403 page
  } else {
    next();
  }
});

export default router;
