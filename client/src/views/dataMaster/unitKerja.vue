<template>
    <div class="about" style="padding:15px">
      <q-card bordered class="my-card">
        <q-card-section class="main1 text-white">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="text-h6 h_titleHead">Master Unit Kerja</div>
              <div class="text-subtitle2">Data Master</div>
            </div>
            <div class="col-12 col-md-2"></div>
            <div class="col-12 col-md-4">
              <div class="row">
                <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:100%"/>
                <!-- <q-btn glossy class="bg-light-blue-10" @click="mdl_add = true" dense flat icon="add" style="width:10%">
                    <q-tooltip content-class="bg-light-blue-10" content-style="font-size: 13px">
                      Click untuk menambah data
                    </q-tooltip>
                </q-btn> -->
              </div>
  
            </div>
          </div>
        </q-card-section>
  
        <q-separator dark inset />
  
  
        <q-card-section>
  
            <hr class="hrpagin">

  
          <div class="row">
            <div class="col-12 col-md-6 rowLeft">
                <span class="h_lable ">Filter Urusan</span>
                <select v-model="filterku.urusan_kode" @change="filterku.urusan_bidang_kode = '', asyncFetchUrusanBidang(filterku.urusan_kode), cari_data()" class="bg-white">
                    <option value="">-- SEMUA URUSAN --</option>
                    <option v-for="data in $store.state.list_urusan" :key="data.id" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
                </select>
            </div>
            <div class="col-12 col-md-6 rowRight">
                <span class="h_lable ">Filter Bidang Urusan</span>
                <select v-model="filterku.urusan_bidang_kode" @change="cari_data()" class="bg-white">
                    <option value="">-- SEMUA BIDANG URUSAN --</option>
                    <option v-for="data in $store.state.list_urusan_bidang" :key="data.id" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
                </select>
            </div>
  
          </div>
  
  
          <hr class="hrpagin2">
  
  
          <div class="tbl_responsive">
            <!-- =================================================== KONTENT =========================================================== -->
              <table width="100%">
                <tr class="h_table_head main1x_1">
                  <th width="5%" class="text-center">No</th>
                  <th width="5%" class="text-center">Kode</th>
                  <th width="45%">Unit Kerja</th>
                  <th width="40%">Bidang Urusan</th>
                  <th width="5%"></th>
                </tr>
                <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                    <td class="text-center">{{indexing(index+1)}}.</td>
                    <td>{{data.kode}}</td>
                    <td>
                      {{data.unit_kerja}}
                        <div class="h_nip">{{ data.nama_instansi }}</div>
                    </td>
                    <td>
                      <ul>
                        <li v-for="data1 in data.urusan_bidang" :key="data1.id" :class="UMUM.checkTextUtama(data1.utama)">
                          [{{data1.kode_full}}] {{data1.uraian}}
                          <a href="javascript:void(0);" @click="mdl_hapus=true, selectDataRelasi(data1)">
                            <q-icon name="warning" color="warning" size="1rem" />
                          </a>
                        </li>
                      </ul>
                    </td>
                    <td class="text-center">
                        <q-btn-group>
                          <q-btn @click="mdl_add = true, selectData(data)" glossy :color="UMUM.indikatorNull(data.jml_bidang_urusan)" class="tbl_btn">
                            {{data.jml_bidang_urusan}}
                              <q-tooltip content-class="bg-blue-9" content-style="font-size: 13px">
                              Click untuk menabah data bidang urusan
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

          <div class="row">
            <div class="col-md-2 col-12">
              
            </div>
            <div class="col-md-8 col-12">
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
              
            </div>
            <div class="col-md-2 col-12">
              <select v-model="page_limit" @change="getView()">
                <option value="10">- Data Tampil 10 -</option>
                <option value="25">- Data Tampil 25 -</option>
                <option value="50">- Data Tampil 50 -</option>
                <option value="100">- Data Tampil 100 -</option>
                <option value="250">- Data Tampil 250 -</option>
                <option value="500">- Data Tampil 500 -</option>
              </select>
            </div>
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

                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Urusan Pemerintahan</span>
                                <select v-model="form.urusan_kode" @change="asyncFetchUrusanBidang(form.urusan_kode)" class="bg-white margin_btn">
                                    <option v-for="data in $store.state.list_urusan" :key="data.id" :value="data.kode_full">[{{ data.kode }}]. {{ data.uraian }}</option>
                                </select>
                            </div>

                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Urusan Bidang Pemerintahan</span>
                                <select v-model="form.urusan_bidang_kode" class="bg-white margin_btn">
                                    <option v-for="data in $store.state.list_urusan_bidang" :key="data.id" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
                                </select>
                            </div>

                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Urusan Pemerintahan Utama</span>
                                <select v-model="form.utama" class="bg-white margin_btn">
                                    <option  :value="1">Utama</option>
                                    <option  :value="0">Non-Utama</option>
                                </select>
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

                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Urusan Pemerintahan</span>
                                <select v-model="form.urusan_kode" @change="asyncFetchUrusanBidang(form.urusan_kode)" class="bg-white margin_btn">
                                    <option v-for="data in $store.state.list_urusan" :key="data.id" :value="data.kode_full">[{{ data.kode }}]. {{ data.uraian }}</option>
                                </select>
                            </div>

                            <div class="col-12 col-md-12 frame_cari">
                                <span class="h_lable ">Urusan Bidang Pemerintahan</span>
                                <select v-model="form.urusan_bidang_kode" class="bg-white margin_btn">
                                    <option v-for="data in $store.state.list_urusan_bidang" :key="data.id" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
                                </select>
                            </div>

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
  
  


              <!-- ================================================= MODAL SET KODE ================================================ -->
                 <q-dialog v-model="mdl_update_kode" persistent>
                  <q-card class="mdl-md">
                    <q-card-section class="bg-orange">
                      <div class="text-h6 h_modalhead">Edit Data</div>
                    </q-card-section>
  
                    <q-card-section class="q-pt-none">
                          <br>
                          <div class="row">



                            <div class="col-12 col-md-12 frame_cari frame_cari">
                              <span class="h_lable ">Kode</span>
                              <q-input v-model="kode.kode" outlined square :dense="true" class="bg-white margin_btn" /> 
                            </div>

                          </div>
                    </q-card-section>
  
                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                      
                        <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" />
                        <q-btn label="Batal" color="negative" v-close-popup />
               
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              <!-- ================================================= MODAL SET KODE ================================================ -->
  
  
  
            <!-- =================================================== MODAL =========================================================== -->
  
  
  
  
    </div>
</template>
  
  
  <script>
  
  
  import FETCHING from '../../library/fetching'
  import DATAMASTER from '../../library/dataMaster'
  import UMUM from '../../library/umum'
  
  export default {
    data() {
      return {
  
        form : {
          id : '',
          urusan_kode : '',
          urusan_bidang_kode : '',
          utama : 0,
          unit_kerja_id : '',
        },

        kode : {
          id : '',
          unit_kerja_id : '',
          kode : '',
        },
  
        // ====================================== CONTOH AUTOCOMPLETE ====================================
        autocomplete_db : '',
        // ====================================== CONTOH AUTOCOMPLETE ====================================
        
        filterku : {
            urusan_kode : ''
        },

  
  
       
        list_data : [],
  
        page_first: 1,
        page_last: 0,
        page_limit : 10,
        cari_value: "",
        cek_load_data : true,
  
  
        mdl_add: false,
        mdl_edit: false,
        mdl_hapus : false,
        btn_add: false,
        mdl_update_kode : false,
  
  
        FETCHING : FETCHING,
        DATAMASTER : DATAMASTER,
        UMUM : UMUM,
      }
    },
    methods: {
  
  
      getView : function(){
        this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.URL_simpeg_unit_kerja + "view", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                data_ke: this.page_first,
                cari_value: this.cari_value,
                page_limit : this.page_limit,
                urusan_kode : this.filterku.urusan_kode,
                urusan_bidang_kode : this.filterku.urusan_bidang_kode,
            })
        })
            .then(res => res.json())
            .then(res_data => {
                this.list_data = res_data.data;
                this.page_last = res_data.jml_data;
                this.$store.commit("hideLoading");
                console.log(res_data);
        });
      },
  
  
      addData : function() {
        fetch(this.$store.state.url.URL_simpeg_unit_kerja + "addData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.form)
        }).then(res_data => {
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
            this.getView();
            this.mdl_add = false
        });
      },
  
  
      editData : function(){
        fetch(this.$store.state.url.URL_simpeg_unit_kerja + "editData", {
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
        fetch(this.$store.state.url.URL_simpeg_unit_kerja + "removeData", {
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
          this.form.unit_kerja_id = data.id;
          this.asyncFetchUrusanBidang(this.form.urusan_kode)

      },

      selectDataRelasi : function(data){
          console.log(data);
          this.form.id = data.id;
          this.form.urusan_bidang_kode = data.urusan_bidang_kode;
          this.form.unit_kerja_id = data.unit_kerja_id;
      },


    // ========================================================================================================================


      addDataKode : function() {
        fetch(this.$store.state.url.URL_simpeg_unit_kerja_kode + "checkUpdateData", {
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
  

      selectKodefikasi : function(data){
          this.kode.id = data.id ;
          this.kode.unit_kerja_id = data.unit_kerja_id ;
          this.kode.kode = data.kode_unit_akun ;
      },
  
  
      // ====================================== CONTOH eDOC ====================================
      onChangex(data){
        // await DATAMASTER.postMasterUrusanBidang(val)
      },
      async asyncFetchUrusan(){
        await DATAMASTER.postMasterUrusan('');
        this.form.urusan_kode = this.$store.state.list_urusan[0].kode;
        this.asyncFetchUrusanBidang(this.form.urusan_kode)
      },
      async asyncFetchUrusanBidang(val){
        await DATAMASTER.postMasterUrusanBidang(val)
      },
      // ====================================== CONTOH eDOC ====================================
  
    // ====================================== CONTOH AUTOCOMPLETE ====================================
      autocomplete_urusan_filter : function (val, update) {
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
      this.asyncFetchUrusan();
    //   DATAMASTER.postMasterUrusan('')
      this.getView();
    },
  }
  </script>
  
  
  
  
   