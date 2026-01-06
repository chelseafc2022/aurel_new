import Vue from 'vue'



import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './quasar'

import VueGeolocation from 'vue-browser-geolocation';
Vue.use(VueGeolocation);





import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyA4Q_DJMnn-MOg1xPAQz0ALWAajEr6Cyqk',
    v: '3.26',
    libraries: 'places, drawing, visualization',  // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  autobindAllEvents: true,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then set installComponents to 'false'.
  //// If you want to automatically install all the components this property must be set to 'true':
  installComponents: true
})

  // import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  // Vue.component('GmapMarker', GmapMarker)


import sideBar from './components/sideBar.vue'
Vue.component('SideBar', sideBar);

import topBar from './components/topBar.vue'
Vue.component('topBar', topBar);

import ProgressLoading from './components/ProgressLoading.vue'
Vue.component('ProgressLoading', ProgressLoading);

import mDatePicker from 'vue-multi-date-picker'
Vue.use(mDatePicker)

import pdfViewKu from './components/pdfView.vue'
Vue.component('pdfViewKu', pdfViewKu);

import rincianKegiatanTemp from './components/rincianKegiatanTemp.vue'
Vue.component('rincianKegiatanTemp', rincianKegiatanTemp);


import kk_adm from './components/kertas_kerja/kk_adm.vue'
Vue.component('Kk_adm', kk_adm);
import kk_hibah from './components/kertas_kerja/kk_hibah.vue'
Vue.component('Kk_hibah', kk_hibah);
import kk_kontrak from './components/kertas_kerja/kk_kontrak.vue'
Vue.component('Kk_kontrak', kk_kontrak);
import kk_sppd from './components/kertas_kerja/kk_sppd.vue'
Vue.component('Kk_sppd', kk_sppd);

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    './css/kiken.css',
    './css/bg.css',
    './css/huruf.css',
    './css/modal.css',
    './css/input.css',
    './css/huruf.css',
    'https://cdn.jsdelivr.net/npm/quasar@2.10.1/dist/quasar.prod.css',
    
  ]
}

import VueHtmlToPaper from 'vue-html-to-paper';
Vue.use(VueHtmlToPaper, options);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
