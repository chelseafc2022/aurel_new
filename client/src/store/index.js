import Vue from 'vue'
import Vuex from 'vuex'

import { Loading,  QSpinnerFacebook,  } from 'quasar'
import { Notify } from 'quasar'

Vue.use(Vuex)

var URL = 'http://localhost:5071/'
// var URL = 'http://localhost:5035/'
// var URL = 'http://192.168.1.8:5028/'
// var URL = 'https://servermonev.konaweselatankab.go.id/'
// var URL = 'https://server.aurel.konaweselatankab.go.id/'

export default new Vuex.Store({
  state: {
    namaApp : 'Aurel - Elektronik Audit dan Review Laporan',
    // namaApp : 'Monitoring - Evaluasi Pembangunan',
    colorx : {
      satu : '#191A32',
      dua : '#FDDDE1',
      tiga : '#FFEDD2',
      empat : '#CFD5F8',
    },
    btn : {
      add : false,
      edit : false,
      remove : false,
    },
    url : {
      URL_APP : URL,


      URL_tahun : URL+'api/v1/dm_tahun/', 
      URL_simpeg_biodata : URL+'api/v1/dm_biodata/',
      URL_simpeg_unit_kerja: URL+'api/v1/dm_unitKerja/',
      URL_simpeg_unit_kerja_kode: URL+'api/v1/unitKerjaKode/',
      URL_simpeg_instansi : URL+'api/v1/dm_instansi/',

      URL_DM_REGISTER : URL+'api/v1/dm_registrasi/',
      URL_DM_MENU : URL+'api/v1/dm_menuList/',
      URL_DM_KLP_USERS : URL+'api/v1/dm_kelompokUsers/',
      checkAuth : URL + 'api/v1/checkAuth/',

      URL_DM_URUSAN : URL+'api/v1/dm_urusan/',
      URL_DM_URUSAN_BIDANG : URL+'api/v1/dm_urusan_bidang/',

      RL_DM_PROGRAM : URL+'api/v1/dm_program/',
      RL_DM_KEGIATAN : URL+'api/v1/dm_kegiatan/',
      RL_DM_KEGIATAN_SUB : URL+'api/v1/kegiatan_sub/',

      RL_DM_SUMBER_DANA : URL+'api/v1/dm_sumber_dana/',
      RL_DM_MASTER_PERMINTAAN : URL+'api/v1/dm_master_permintaan/',


      CT_PROGRAM : URL+'api/v1/ct_program/',
      CT_KEGIATAN : URL+'api/v1/ct_kegiatan/',
      CT_KEGIATAN_SUB : URL+'api/v1/ct_kegiatan_sub/',
      CT_KEGIATAN_SUB_TAG : URL+'api/v1/ct_kegiatan_sub_tag/',
      CT_KEGIATAN_SUB_LABEL : URL+'api/v1/ct_kegiatan_sub_label/',
      CT_KEGIATAN_SUB_RINCIAN : URL+'api/v1/ct_kegiatan_sub_rincian/',
      CT_KEGIATAN_SUB_RINCIAN_NEW : URL+'api/v1/ct_kegiatan_sub_rincian_new/',
      CT_TARGET_KEUANGAN : URL+'api/v1/ct_target_keuangan/',
      CT_TARGET_FISIK : URL+'api/v1/ct_target_fisik/',
      CT_REALISASI_FISIK : URL+'api/v1/ct_realiasi_fisik/',
      CT_REALISASI_KEUANGAN : URL+'api/v1/ct_realiasi_keuangan/',
      CT_REALISASI_KEUANGAN_SERAPAN : URL+'api/v1/ct_realiasi_keuangan_serapan/',

      CT_TARGET_PEMBANGUNAN : URL+'api/v1/ct_target_pembangunan/',
      CT_REALISASI_PEMBANGUNAN : URL+'api/v1/ct_realisasi_pembangunan/',


      // ======================== AUREL ========================

      URL_direktorireviu: URL + 'api/v1/direktorireviu/',
      URL_filereviu: URL + 'api/v1/filereviu/', 
      URL_kkr: URL + 'api/v1/kkr/',
      URL_lhr: URL + 'api/v1/reviuLhr/',
      URL_publish: URL + 'api/v1/publishLhr/',
      checkAuth : URL + 'api/v1/checkAuth/',

      ARL_DM_masterPPH : URL+'api/v1/masterPPH/',
      ARL_DM_masterPJ : URL+'api/v1/masterPJ/',

      // ======================== AUREL ========================

      CT_LAMPIRAN : URL+'api/v1/ct_lampiran/',

      URL_rek: URL + 'api/v1/rekening/',
      URL_bku: URL + 'api/v1/bku/',
      URL_kkr: URL + 'api/v1/kkr/',
      URL_kkr: URL + 'api/v1/kkr/',
      URL_saldo: URL + 'api/v1/saldo/',

 // ======================== NEW AUREL ========================
      DATA_DPA: URL + 'api/v1/dpa/',
      DATA_LRA: URL + 'api/v1/lra/',
      DATA_LPJ: URL + 'api/v1/lpj/',
      DATA_BKU: URL + 'api/v1/bku_new/',
      DATA_REK: URL + 'api/v1/rek_koran/',


      
    },

    kk : [
      {id : 1, uraian : 'Kontrak'},
      {id : 2, uraian : 'SPPD'},
      {id : 3, uraian : 'ADM'},
      {id : 4, uraian : 'Hibah'},
    
    ],

    // ====================================== CONTOH AUTOCOMPLETE ====================================
    list_tahun : [2020,2021,2022,2023,2024,2025,2026],
    BULAN: [
      { id: 1, uraian: 'Januari' },
      { id: 2, uraian: 'Februari' },
      { id: 3, uraian: 'Maret' },
      { id: 4, uraian: 'April' },
      { id: 5, uraian: 'Mei' },
      { id: 6, uraian: 'Juni' },
      { id: 7, uraian: 'Juli' },
      { id: 8, uraian: 'Agustus' },
      { id: 9, uraian: 'September' },
      { id: 10, uraian: 'Oktober' },
      { id: 11, uraian: 'November' },
      { id: 12, uraian: 'Desember' },

    ],
   
    list_contoh_autocomplete : [],
    list_unit_kerja: [],
    list_instansi: [],

    list_program : [],
    list_rincian_keuangan_serapan : [],




    list_master_pph : [],
    list_master_pj : [],
    listOPD: [],
    list_master_type : [],
    // ====================================== CONTOH AUTOCOMPLETE ====================================

    list_menu : null,
    aksesMenu : {},

    page_first: 1,
    page_last: 0,
    cari_value: "",
    cek_load_data : true,

    type : [
      {id : 0, uraian : 'Single Menu'},
      {id : 1, uraian : 'Multy Menu'}
    ],

    color : {
      color1 : '',
      color2 : '',
      color3 : '',
      color4 : '',
      color5 : '',

      color_delete : '',
      color_edite : '',
      color_add : '',
    },

    
  },
  mutations: {
    SET_RINCIAN_KEUANGAN_SERAPAN(state, payload) {
      state.list_rincian_keuangan_serapan = payload
    },

    listJeniskategorilokasi(state){

      fetch(state.url.URL_MasterKategoriLokasi, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        }
      })
        .then(res => res.json())
        .then(res_data => {
          state.list_MasterKategoriLokasi = res_data;
      });

    },

    listApelJenis(state){

      fetch(state.url.URL_apelJenis, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        }
      })
        .then(res => res.json())
        .then(res_data => {
          // console.log(res_data)
          state.list_ApleJenis = res_data;
      });

    },

    getStorage(state){
      var get_profile = JSON.parse(localStorage.profile);
      state.unit_kerja = get_profile.profile.unit_kerja; 
    },
    shoWLoading(){
      const spinner = typeof QSpinnerFacebook !== 'undefined'
        ? QSpinnerFacebook // Non-UMD, imported above
        : Quasar.components.QSpinnerFacebook // eslint-disable-line


      Loading.show({
        spinner,
        spinnerColor: 'yellow',
        spinnerSize: 140,
        backgroundColor: 'purple',
        // message: 'Loading... Tunggu beberapa saat, system sedang menyesuaikan akun anda..!',
        // messageColor: 'white'
      })
    },
    hideLoading(){
      Loading.hide()
    },
    shoWNotify(state, message, color, icon){
      Notify.create({
        message: message,
        color: color,
        position : 'top-right',
        icon:icon
      })
    },
  },
  actions: {
  async getRincianKeuanganSerapan({ commit, state }, rincian_id) {
    const res = await fetch(
      state.url.CT_REALISASI_KEUANGAN_SERAPAN + 'viewByRincianKegiatan',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: 'kikensbatara ' + localStorage.token
        },
        body: JSON.stringify({ rincian_id })
      }
    )

    const data = await res.json()
    commit('SET_RINCIAN_KEUANGAN_SERAPAN', data)
  }
},

  modules: {
  }
})
