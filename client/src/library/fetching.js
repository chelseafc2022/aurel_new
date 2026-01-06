// import Swal from 'sweetalert2'
const Swal = require('sweetalert2')
var DataStore = require('../store');
var store = DataStore.default;
var storex =store.state


  const getMasterMenu = async ()=>{
    return new Promise(resolve=>{
      fetch(storex.url.URL_DM_KLP_USERS + "listAdd", {
          method: "GET",
          headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
          }
        })
          .then(res => res.json())
          .then(res_data => {
            // console.log(res_data)
            resolve(res_data)
  
      });
    })
  }
  
  // ini buat ambil menu pada saat edit data
  const postMasterMenu = async (id)=>{
    return new Promise(resolve=>{
      fetch(storex.url.URL_DM_KLP_USERS + "listEdit", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
            menu_klp_id: id,
          })
        })
          .then(res => res.json())
          .then(res_data => {
            // console.log(res_data)
            resolve(res_data)
  
      });
    })
  }
  
  
  const postMasterKlpMenu = async ()=>{
    return new Promise(resolve=>{
      fetch(storex.url.URL_DM_KLP_USERS + "list", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
            menu_klp_id: 'id',
          })
        })
          .then(res => res.json())
          .then(res_data => {
            // console.log(res_data)
            resolve(res_data)
  
      });
    })
  }
  
  
  const postMasterMenuGetSideBar = async (id)=>{
    return new Promise(resolve=>{
      fetch(storex.url.URL_DM_KLP_USERS + "listSidebar", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
            side_bar : true,
            menu_klp_id: id,
          })
        })
          .then(res => res.json())
          .then(res_data => {
            // console.log(res_data)
            resolve(res_data)
  
      });
    })
  }


  


  // ====================================== CONTOH AUTOCOMPLETE ====================================
  const getContohAtocomplete = (val)=>{

      fetch(storex.url.checkAuth + "autocomplete_db", {
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
            
            storex.list_contoh_autocomplete = res_data
      });
  }

  // ====================================== CONTOH AUTOCOMPLETE ====================================

  async function FETCH_POST (url, body){
    return new Promise(resolve =>{
      fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(res_data => {
          // console.log(res_data)
          resolve(res_data)
        });
    })
  }

  const getType = (val)=>{

    fetch(storex.url.checkAuth + "tipe_akses", {
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
          
          storex.list_master_type = res_data
    });
}

const getDir = (val)=>{

  fetch(storex.url.URL_direktori + "listdata", {
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
        
        storex.list_dir = res_data
  });
}

const getJabatan = (val)=>{

  fetch(storex.url.checkAuth + "jabatan", {
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
        
        storex.list_jabatan = res_data
  });
}

  

  


module.exports = {

    getMasterMenu : getMasterMenu,
    postMasterMenu : postMasterMenu,
    postMasterMenuGetSideBar : postMasterMenuGetSideBar,
    postMasterKlpMenu : postMasterKlpMenu,
    getContohAtocomplete : getContohAtocomplete,
    FETCH_POST : FETCH_POST,
    getType : getType,
    getDir : getDir,
    getJabatan : getJabatan,

}