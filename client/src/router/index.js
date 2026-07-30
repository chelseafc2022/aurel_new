import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);





function loggedInRedirectDashboard(to, from, next) {
  if (localStorage.token) {
    next('/');
  } else {
    next();
  }
}

function isLoggedIn(to, from, next) {
  if (localStorage.token) {
    next();
  } else {
    next('/login');
  }
}




function isApprovalAdmin(to, from, next) {
  if (localStorage.token) {
    try {
      const profilex = JSON.parse(localStorage.profile);
      const profile = profilex.profile;
      const menuKlpId = parseInt(profile.aurel_new);
      if (menuKlpId === 4 || menuKlpId === 16) {
        next();
        return;
      }
    } catch (e) {
      console.error(e);
    }
    next('/');
  } else {
    next('/login');
  }
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/login.vue'),
    beforeEnter: loggedInRedirectDashboard,
  },



  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: isLoggedIn,
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('../views/dataMaster/masterProgram.vue'),
  //   beforeEnter: isLoggedIn,
  // },


  {
    path: '/menuList',
    name: 'menuList',
    component: () => import('../views/dataMaster/menuList.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/klpUsers',
    name: 'klpUsers',
    component: () => import('../views/dataMaster/klpUsers.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/registrasi',
    name: 'registrasi',
    component: () => import('../views/dataMaster/registrasi.vue'),
    beforeEnter: isLoggedIn,
  },




  // ================ REVIU ========================



  {
    path: '/rekeningKoran',
    name: 'REKENING KORAN',
    component: () => import('../views/rekeningKoran.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/dpa',
    name: 'DPA',
    component: () => import('../views/dpa.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/lra',
    name: 'LRA',
    component: () => import('../views/lra.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/lpj',
    name: 'LPJ',
    component: () => import('../views/lpj.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/bku_new',
    name: 'BKU',
    component: () => import('../views/bku_new.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/rekonPajak',
    name: 'rekonPajak',
    component: () => import('../views/rekonPajak.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/approvalDokumen',
    name: 'approvalDokumen',
    component: () => import('../views/approvalDokumen.vue'),
    beforeEnter: isApprovalAdmin,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    beforeEnter: isLoggedIn,
  },


]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
