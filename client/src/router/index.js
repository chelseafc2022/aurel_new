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




  const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/login.vue'),
    beforeEnter: loggedInRedirectDashboard,
  },



  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  //   beforeEnter: isLoggedIn,
  // },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/dataMaster/masterProgram.vue'),
    beforeEnter: isLoggedIn,
  },


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
  {
    path: '/urusan',
    name: 'urusan',
    component: () => import('../views/dataMaster/urusan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/bidangUrusan',
    name: 'bidangUrusan',
    component: () => import('../views/dataMaster/bidangUrusan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/unitKerja',
    name: 'unitKerja',
    component: () => import('../views/dataMaster/unitKerja.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/unitKerjaKode',
    name: 'unitKerjaKode',
    component: () => import('../views/dataMaster/unitKerjaKode.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/masterProgram',
    name: 'masterProgram',
    component: () => import('../views/dataMaster/masterProgram.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/masterKegiatan',
    name: 'masterKegiatan',
    component: () => import('../views/dataMaster/masterKegiatan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/masterSubKegiatan',
    name: 'masterSubKegiatan',
    component: () => import('../views/dataMaster/masterSubKegiatan.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/program',
    name: 'program',
    component: () => import('../views/program_kegiatan/program.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/kegiatan',
    name: 'kegiatan',
    component: () => import('../views/program_kegiatan/kegiatan.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/realisasi_keuangan',
    name: 'realisasi_keuangan',
    component: () => import('../views/realisasi/realisasi_keuangan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/realisasi_fisik',
    name: 'realisasi_fisik',
    component: () => import('../views/realisasi/realisasi_fisik.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/target_keuangan',
    name: 'target_keuangan',
    component: () => import('../views/target/target_keuangan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/target_fisik',
    name: 'target_fisik',
    component: () => import('../views/target/target_fisik.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/target_pembangunan',
    name: 'target_pembangunan',
    component: () => import('../views/pembangunan/target_pembangunan.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/realisasi_pembangunan',
    name: 'realisasi_pembangunan',
    component: () => import('../views/pembangunan/realisasi_pembangunan.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/lap_realisasi',
    name: 'lap_realisasi',
    component: () => import('../views/laporan/lap_realisasi.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/rekening_koran',
    name: 'rekening_koran',
    component: () => import('../views/kertasKerja/rekening_koran.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/bku',
    name: 'bku',
    component: () => import('../views/kertasKerja/bku.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/kka_hibah',
    name: 'kka_hibah',
    component: () => import('../views/kertasKerja/kka_hibah.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/kka_kontrak',
    name: 'kka_kontrak',
    component: () => import('../views/kertasKerja/kka_kontrak.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/kka_adm',
    name: 'kka_adm',
    component: () => import('../views/kertasKerja/kka_adm.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/kka_sppd',
    name: 'kka_sppd',
    component: () => import('../views/kertasKerja/kka_sppd.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/saldo_kas',
    name: 'saldo_kas',
    component: () => import('../views/kertasKerja/saldo_kas.vue'),
    beforeEnter: isLoggedIn,
  },

  // ================ REVIU ========================


  {
    path: '/usulanDokumenreviu',
    name: 'usulanDokumenreviu',
    component: () => import('../views/reviu/usulanDokumenreviu.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/aproveReviu',
    name: 'aproveReviu',
    component: () => import('../views/reviu/aproveReviu.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/kkr',
    name: 'kkr',
    component: () => import('../views/reviu/kkr.vue'),
    beforeEnter: isLoggedIn,
  },

  {
    path: '/reviuLhr',
    name: 'reviuLhr',
    component: () => import('../views/reviu/reviuLhr.vue'),
    beforeEnter: isLoggedIn,
  },
  {
    path: '/publishLhr',
    name: 'publishLhr',
    component: () => import('../views/reviu/publishLhr.vue'),
    beforeEnter: isLoggedIn,
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
