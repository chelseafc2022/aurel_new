<template>
    <div class="about" style="padding:15px">
      <q-card bordered class="my-card">
        <q-card-section class="main1 text-white">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="text-h6 h_titleHead">Urusan</div>
              <div class="text-subtitle2">Data Master</div>
            </div>
            <div class="col-12 col-md-2"></div>
            <div class="col-12 col-md-4">
              <div class="row">
                <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:90%"/>
                <q-btn glossy class="bg-light-blue-10" @click="mdl_add = true" dense flat icon="add" style="width:10%">
                    <q-tooltip content-class="bg-light-blue-10" content-style="font-size: 13px">
                      Click untuk menambah data
                    </q-tooltip>
                </q-btn>
              </div>
  
            </div>
          </div>
        </q-card-section>
  
        <q-separator dark inset />
  
  
        <q-card-section>
  
  
          <hr class="hrpagin2">
  
  
          <div class="tbl_responsive">
            <!-- =================================================== KONTENT =========================================================== -->
              <table width="100%">
                <tr class="h_table_head main1x_1">
                  <th width="5%" class="text-center">No</th>
                  <th class="text-center" width="10%">Kode</th>
                  <th width="45%">Uraian</th>
                  <th width="30%">Keterangan</th>
                  <th width="10%"></th>
                </tr>
                <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                  <td class="text-center">{{indexing(index+1)}}.</td>
                  <td class="text-center">{{data.kode}}</td>
                  <td>{{data.uraian}}</td>
                  <td>{{data.keterangan}}</td>
                  <td class="text-center">
                    <q-btn-group>
                      <q-btn @click="mdl_edit = true, selectData(data)" glossy color="blue" icon="place" class="tbl_btn">
                        <q-tooltip content-class="bg-blue-9" content-style="font-size: 13px">
                          Click untuk melihat Maps
                        </q-tooltip>
                      </q-btn>
                      <q-btn @click="mdl_edit = true, selectData(data)" glossy color="orange" icon="create" class="tbl_btn">
                        <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                          Click untuk mengubah data ini
                        </q-tooltip>
                      </q-btn>
                      <q-btn @click="mdl_hapus = true, selectData(data)" glossy color="negative" icon="delete_forever" class="tbl_btn">
                        <q-tooltip content-class="bg-red" content-style="font-size: 13px">
                          Click untuk menghapus data ini
                        </q-tooltip>
                      </q-btn>
                    </q-btn-group>
                   
  
                  </td>
                </tr>
  
              </table>
  
            <!-- =================================================== KONTENT =========================================================== -->
          </div>
          <hr class="hrpagin">
          <br>
          <div class="flex flex-center">
            <q-pagination
                @click="getView()"
                v-model="page_first"
                :max="page_last"
                :max-pages="4"
                color="grey-6"

                :direction-links="true"
                :boundary-links="true"
                icon-first="skip_previous"
                icon-last="skip_next"
                icon-prev="fast_rewind"
                icon-next="fast_forward"
            >
            </q-pagination>
          </div>
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
          <br>
        </q-card-section>
      </q-card>
  
  
  
  
  
            <!-- =================================================== MODAL =========================================================== -->
  
  
              <!-- ================================================= MODAL TAMBAH ================================================ -->
                <q-dialog v-model="mdl_add" persistent>
                  <q-card class="mdl-md">
                    <q-card-section class="main1">
                      <div class="text-h6 h_modalhead">Simpan Data</div>
                    </q-card-section>
  
                    <form @submit.prevent="addData()">
                      <q-card-section class="q-pt-none">
                          <br>
  
                          <div class="row">
                            

                            <div class="col-12 col-md-12 frame_cari frame_cari">
                              <span class="h_lable ">Kode</span>
                              <q-input v-model="form.kode" outlined square :dense="true" class="bg-white margin_btn" /> 
                            </div>
  
                            <div class="col-12 col-md-12 frame_cari frame_cari">
                              <span class="h_lable ">Uraian</span>
                              <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                            </div>
  
 
                            <div class="col-12 col-md-12 frame_cari">
                              <span class="h_lable ">Keterangan</span>
                              <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>
                            </div>
  
                          </div>
  
  
                          
  
                      </q-card-section>
  
                      <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                          <q-btn :loading="btn_add" color="primary" @click="addData()" label="Simpan" />
                          <q-btn label="Batal" color="negative" v-close-popup />
                      </q-card-actions>
  
                    </form>
                  </q-card>
                </q-dialog>
              <!-- ================================================= MODAL TAMBAH ================================================ -->
  
  
              <!-- ================================================= MODAL EDIT ================================================ -->
                 <q-dialog v-model="mdl_edit" persistent>
                  <q-card class="mdl-md">
                    <q-card-section class="bg-orange">
                      <div class="text-h6 h_modalhead">Edit Data</div>
                    </q-card-section>
  
                    <q-card-section class="q-pt-none">
                          <br>
                          <div class="row">

                            <div class="col-12 col-md-12 frame_cari frame_cari">
                              <span class="h_lable ">Kode</span>
                              <q-input v-model="form.kode" outlined square :dense="true" class="bg-white margin_btn" /> 
                            </div>

                            <div class="col-12 col-md-12 frame_cari frame_cari">
                              <span class="h_lable ">Uraian</span>
                              <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                            </div>


                            <div class="col-12 col-md-12 frame_cari">
                              <span class="h_lable ">Keterangan</span>
                              <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>
                            </div>

                          </div>
                    </q-card-section>
  
                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                      
                        <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" />
                        <q-btn label="Batal" color="negative" v-close-popup />
               
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              <!-- ================================================= MODAL EDIT ================================================ -->
  
              <!-- ================================================ MODAL HAPUS ================================================ -->
                    <q-dialog v-model="mdl_hapus" persistent>
                      <q-card class="mdl-sm ">
                        <q-card-section class="q-pt-none text-center orageGrad">
                            <form @submit.prevent="removeData">
                                <br>
                                <img src="img/alert.png" alt="" width="75"> <br>
                                <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MENGHAPUS DATA INI??</span>
                                <input type="submit" style="position: absolute; left: -9999px"/>
                                <br>
                                <br>
  
                              <q-btn label="Batal" size="sm" color="negative"  v-close-popup/>
                              &nbsp;
                              <q-btn type="submit" label="Hapus" size="sm" color="primary" v-close-popup/>
  
                            </form>
                        </q-card-section>
                      </q-card>
                    </q-dialog>
  
              <!-- ================================================ MODAL HAPUS ================================================ -->
  
  
  
  
            <!-- =================================================== MODAL =========================================================== -->
  
  
  
  
    </div>
</template>
  
  
<script>
  
  
  import FETCHING from '../../library/fetching'
  
  export default {
    data() {
      return {
  
        form : {
          id : '',
          kode : '',
          uraian : '',
          keterangan : '',
        },
  
        // ====================================== CONTOH AUTOCOMPLETE ====================================
        autocomplete_db : '',
        // ====================================== CONTOH AUTOCOMPLETE ====================================
        
  
  
      
        list_data : [],
  
        page_first: 1,
        page_last: 0,
        page_limit : 8,
        cari_value: "",
        cek_load_data : true,
  
  
        mdl_add: false,
        mdl_edit: false,
        mdl_hapus : false,
        btn_add: false,
  
  
        FETCHING : FETCHING,
      }
    },
    methods: {
  
  
      getView : function(){
        this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_DM_URUSAN + "view", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                data_ke: this.page_first,
                cari_value: this.cari_value,
                page_limit : this.page_limit,
            })
        })
            .then(res => res.json())
            .then(res_data => {
                this.list_data = res_data.data;
                this.page_last = res_data.jml_data;
                this.$store.commit("hideLoading");
                // console.log(res_data);
        });
      },
  
  
      addData : function(number) {
        fetch(this.$store.state.url.URL_DM_URUSAN + "addData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.form)
        }).then(res_data => {
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
            this.getView();
        });
      },
  
      editData : function(){
        fetch(this.$store.state.url.URL_DM_URUSAN + "editData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.form)
        }).then(res_data => {
            this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
            this.getView();
        });
      },
  
      removeData : function(E){
        fetch(this.$store.state.url.URL_DM_URUSAN + "removeData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.form)
        }).then(res_data => {
            this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
            this.getView();
        });
  
      },
  
      selectData : function(data){
          this.form.id = data.id;
          this.form.kode = data.kode;
          this.form.uraian = data.uraian;
          this.form.keterangan = data.keterangan;
      },
  
  
      // ====================================== CONTOH eDOC ====================================
      onClickx(data){
        alert(data)
      },
      // ====================================== CONTOH eDOC ====================================
  
    // ====================================== CONTOH AUTOCOMPLETE ====================================
      autocomplete_db_filter : function (val, update) {
          update(() => {
            if (val === '') {}
            else {FETCHING.getContohAtocomplete(val)}
          })
      },
  
      // ====================================== CONTOH AUTOCOMPLETE ====================================
  
  
  
  
  
  
  
  
      // ====================================== PAGINATE ====================================
          Notify : function(message, positive, icon){
            this.$q.notify({
              message: message,
              color: positive,
              icon: icon,
              position : 'top',
              timeout: 500,
            })
          },
          btn_prev : function(){
              this.cek_load_data = true;
              if(this.page_first>1){
                  this.page_first--
              }else{
                  this.page_first = 1;
              }
              this.getView();
          },
  
          btn_next : function(){
              if(this.page_first >= this.page_last){
                  this.page_first == this.page_last
              }else{
                  this.page_first++;
              }
              this.getView();
          },
  
          cari_data : function(){
              this.page_first = 1;
              this.getView();
          },

            indexing : function(index){
                var idx = ((this.page_first-1)*this.page_limit)+index
                return idx
            },
  
  
      // ====================================== PAGINATE ====================================
  
  
  
  
  
  
  
    },
  
    mounted () {
      FETCHING.getContohAtocomplete('')
      this.getView();
    },
  }
</script>
  
  
  
  
   