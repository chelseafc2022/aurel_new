// import {store1} from '../store/index's

var DataStore = require('../store');
var store = DataStore.default

const fetchPOST = () => {
  return store.state.kamio
}




const getInstansi = (kabupaten_id) => {
  // console.log(kecamatan)
  fetch(store.state.url.URL_simpeg_instansi + "list", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    },
    body: JSON.stringify({
      kabupaten_id: 'kabupaten_id'
    })
  })
      .then(res => res.json())
      .then(res_data => {
      // console.log(res_data)
      store.state.list_instansi = res_data
  });
}

const getInstansiAsync = () => {

  return new Promise((resolve, reject) => {
    
    fetch(store.state.url.URL_simpeg_instansi + "list", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "kikensbatara " + localStorage.token
      },
      body: JSON.stringify({
        kabupaten_id: 'kabupaten_id'
      })
    })
        .then(res => res.json())
        .then(res_data => {

        store.state.list_instansi = res_data
        resolve(res_data)
    });

  })


  // console.log(kecamatan)
}



const getUnitKerja = (instansi) => {
  // console.log(kecamatan)
  fetch(store.state.url.URL_simpeg_unit_kerja + "list", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    },
    body: JSON.stringify({
      instansi: instansi
    })
  })
      .then(res => res.json())
      .then(res_data => {
      store.state.list_unit_kerja = res_data
      // console.log(res_data)
  });
}
const getUnitKerjaAsync = (instansi) => {


  return new Promise((resolve, reject) => {
    fetch(store.state.url.URL_simpeg_unit_kerja + "list", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: "kikensbatara " + localStorage.token
      },
      body: JSON.stringify({
        instansi: instansi
      })
    })
        .then(res => res.json())
        .then(res_data => {
        store.state.list_unit_kerja = res_data
        resolve(res_data)
        console.log(res_data)
    });
    
  })

  // console.log(kecamatan)
}


const getBiodata = (sub_unit_kerja) => {
  // console.log(kecamatan)
  fetch(store.state.url.URL_simpeg_biodata + "list", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    },
    body: JSON.stringify({
      unit_kerja: sub_unit_kerja
    })
  })
      .then(res => res.json())
      .then(res_data => {
      store.state.list_biodata = res_data
      // console.log(res_data)
  });
}


const postMasterUrusan = async (value)=>{
  return new Promise(resolve=>{
    fetch(store.state.url.URL_DM_URUSAN + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          value : value,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          // console.log(res_data)
          store.state.list_urusan = res_data
          resolve("");

    });
  })
}

const postMasterUrusanBidang = async (urusan_kode)=>{
  return new Promise(resolve=>{
    fetch(store.state.url.URL_DM_URUSAN_BIDANG + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          urusan_kode : urusan_kode,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          // console.log(res_data)
          store.state.list_urusan_bidang = res_data
          resolve("");

    });
  })
}

const postMasterProgram = async (urusan_kode, urusan_bidang_kode)=>{
  return new Promise(resolve=>{
    fetch(store.state.url.RL_DM_PROGRAM + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          urusan_kode : urusan_kode,
          urusan_bidang_kode : urusan_bidang_kode,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          // console.log(res_data)
          store.state.list_master_program = res_data
          resolve("");

    });
  })
}

const postMasterkegiatan = async (program_kode)=>{
  return new Promise(resolve=>{
    fetch(store.state.url.RL_DM_KEGIATAN + "list2", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          program_kode : program_kode,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          store.state.list_master_kegiatan = res_data
          resolve("");

    });
  })
}

const postMasterkegiatanSub = async (kegiatan_kode)=>{
  return new Promise(resolve=>{
    fetch(store.state.url.RL_DM_KEGIATAN_SUB + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          kegiatan_kode : kegiatan_kode,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          console.log("===================")
          console.log(res_data)
          console.log("===================")
          store.state.list_master_kegiatan_sub = res_data
          resolve("");

    });
  })
}

const postMasterProgramAutoComplete = async (val, unit_kerja_id)=>{
  return new Promise(resolve=>{
    fetch(store.state.url.RL_DM_PROGRAM + "list_autocomplete", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          val : val,
          unit_kerja_id : unit_kerja_id
        })
      })
        .then(res => res.json())
        .then(res_data => {
          // console.log(res_data)
          store.state.list_master_program = res_data
          resolve("");

    });
  })
}


const postMasterSumberDanaAutoComplete = async (val)=>{
  return new Promise(resolve=>{
    fetch(store.state.url.RL_DM_SUMBER_DANA + "list_autocomplete", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          val : val,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          // console.log(res_data)
          store.state.list_master_sumber_dana = res_data
          resolve("");

    });
  })
}

const getTahun = () => {
  // console.log(kecamatan)
  fetch(store.state.url.URL_tahun + "list", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    }
  })
      .then(res => res.json())
      .then(res_data => {
      store.state.list_tahun = res_data
      // console.log(res_data)
  });
}

const getMasterPermintaan = () => {
  // console.log(kecamatan)
  fetch(store.state.url.RL_DM_MASTER_PERMINTAAN + "list", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    }
  })
      .then(res => res.json())
      .then(res_data => {
      store.state.list_master_permintaan = res_data
      // console.log(res_data)
  });
}



const postProgram = async (unit_kerja)=>{
  return new Promise(resolve=>{
    fetch(store.state.url.CT_PROGRAM + "list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          unit_kerja : unit_kerja,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          store.state.list_program = res_data
          resolve("");

    });
  })
}


const getMasterPPH = () => {
  // console.log(kecamatan)
  fetch(store.state.url.ARL_DM_masterPPH + "list", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    }
  })
      .then(res => res.json())
      .then(res_data => {
      store.state.list_master_pph = res_data
      // console.log(res_data)
  });
}

const getMasterPJ = () => {
  // console.log(kecamatan)
  fetch(store.state.url.ARL_DM_masterPJ + "list", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    }
  })
      .then(res => res.json())
      .then(res_data => {
        console.log(res_data);
      store.state.list_master_pj = res_data
      // console.log(res_data)
  });
}




const viewByRincianKegiatan = async (rincian_id)=>{
  return new Promise(resolve=>{
    fetch(store.state.url.CT_REALISASI_KEUANGAN_SERAPAN + "viewByRincianKegiatan", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          rincian_id : rincian_id,
        })
      })
        .then(res => res.json())
        .then(res_data => {
          console.log('+++++++');
          console.log(res_data);
          store.state.list_rincian_keuangan_serapan = res_data
          resolve("");

    });
  })
}


module.exports = {
  fetchPOST: fetchPOST,

  postMasterUrusan : postMasterUrusan,
  postMasterUrusanBidang : postMasterUrusanBidang,
  postMasterProgram : postMasterProgram,
  postMasterkegiatan : postMasterkegiatan,
  postMasterkegiatanSub : postMasterkegiatanSub,
  postMasterProgramAutoComplete : postMasterProgramAutoComplete,
  postMasterSumberDanaAutoComplete : postMasterSumberDanaAutoComplete,

  getInstansi : getInstansi,
  getInstansiAsync : getInstansiAsync,
  getUnitKerja : getUnitKerja,
  getUnitKerjaAsync : getUnitKerjaAsync,
  getBiodata : getBiodata,

  getTahun : getTahun,
  getMasterPermintaan : getMasterPermintaan,

  postProgram : postProgram,



  getMasterPPH : getMasterPPH,
  getMasterPJ : getMasterPJ,


  viewByRincianKegiatan : viewByRincianKegiatan,


}