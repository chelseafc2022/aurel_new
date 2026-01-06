<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="main1 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Master Kegiatan</div>
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

          <hr class="hrpagin">


        <div class="row">
          <div class="col-12 col-md-4 rowLeft">
              <span class="h_lable ">Filter Urusan</span>
              <select v-model="filterku.urusan_kode" @change="filterku.urusan_bidang_kode = '', filterku.program_kode = '', asyncFetchUrusanBidang(filterku.urusan_kode), cari_data()" class="bg-white">
                  <option value="">-- SEMUA URUSAN --</option>
                  <option v-for="data in $store.state.list_urusan" :key="data.id" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
              </select>
          </div>

          <div class="col-12 col-md-4">
              <span class="h_lable ">Filter Bidang Urusan</span>
              <select v-model="filterku.urusan_bidang_kode" @change="filterku.program_kode = '',asyncFetchProgram(filterku.urusan_kode, filterku.urusan_bidang_kode), cari_data()" class="bg-white">
                  <option value="">-- SEMUA BIDANG URUSAN --</option>
                  <option v-for="data in $store.state.list_urusan_bidang" :key="data.id" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
              </select>
          </div>

          <div class="col-12 col-md-4 rowRight">
              <span class="h_lable ">Filter Program</span>
              <select v-model="filterku.program_kode" @change="cari_data()" class="bg-white">
                  <option value="">-- SEMUA PROGRAM --</option>
                  <option v-for="data in $store.state.list_master_program" :key="data.id" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
              </select>
          </div>

        </div>


        <hr class="hrpagin2">


        <div class="tbl_responsive">
          <!-- =================================================== KONTENT =========================================================== -->
            <table width="100%">
              <tr class="h_table_head main1x_1">
                <th width="5%" class="text-center">No</th>
                <th class="text-center" width="10%">Kode</th>
                <th width="45%">Program / Bidang Urusan</th>
                <th width="30%">Keterangan</th>
                <th width="10%"></th>
              </tr>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                  <td class="text-center">{{indexing(index+1)}}.</td>
                  <td class="text-center">{{data.kode_full}}</td>
                  <td>
                      {{data.uraian}}
                      <div class="h_nip">{{ data.program_uraian }}</div>
                  </td>
                  <td>{{data.keterangan}}</td>
                  <td class="text-center">
                      <q-btn-group>
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

                          <div class="col-12 col-md-12 frame_cari">
                              <span class="h_lable ">Urusan Pemerintahan</span>
                              <select v-model="form.urusan_kode" @change="asyncFetchUrusanBidang(form.urusan_kode)" class="bg-white margin_btn">
                                  <option v-for="data in $store.state.list_urusan" :key="data.id" :value="data.kode_full">[{{ data.kode }}]. {{ data.uraian }}</option>
                              </select>
                          </div>

                          <div class="col-12 col-md-12 frame_cari">
                              <span class="h_lable ">Urusan Bidang Pemerintahan</span>
                              <select v-model="form.urusan_bidang_kode" @change="asyncFetchProgram(form.urusan_kode, form.urusan_bidang_kode)" class="bg-white margin_btn">
                                  <option v-for="data in $store.state.list_urusan_bidang" :key="data.id" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
                              </select>
                          </div>

                          <div class="col-12 col-md-12 frame_cari">
                              <span class="h_lable ">Program</span>
                              <select v-model="form.program_kode" class="bg-white margin_btn">
                                  <option v-for="data in $store.state.list_master_program" :key="data.id" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
                              </select>
                          </div>

                          <div class="col-12 col-md-12 frame_cari ">
                            <span class="h_lable ">Kode</span>
                            <q-input v-model="form.kode" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-12 frame_cari ">
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

                          <div class="col-12 col-md-12 frame_cari">
                              <span class="h_lable ">Urusan Pemerintahan</span>
                              <select v-model="form.urusan_kode" @change="asyncFetchUrusanBidang(form.urusan_kode)" class="bg-white margin_btn">
                                  <option v-for="data in $store.state.list_urusan" :key="data.id" :value="data.kode_full">[{{ data.kode }}]. {{ data.uraian }}</option>
                              </select>
                          </div>

                          <div class="col-12 col-md-12 frame_cari">
                              <span class="h_lable ">Urusan Bidang Pemerintahan</span>
                              <select v-model="form.urusan_bidang_kode" @change="asyncFetchProgram(form.urusan_kode, form.urusan_bidang_kode)" class="bg-white margin_btn">
                                  <option v-for="data in $store.state.list_urusan_bidang" :key="data.id" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
                              </select>
                          </div>

                          <div class="col-12 col-md-12 frame_cari">
                              <span class="h_lable ">Program</span>
                              <select v-model="form.program_kode" class="bg-white margin_btn">
                                  <option v-for="data in $store.state.list_master_program" :key="data.id" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
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




          <!-- =================================================== MODAL =========================================================== -->




  </div>
</template>


<script>


import FETCHING from '../../library/fetching'
import DATAMASTER from '../../library/dataMaster'

export default {
  data() {
    return {

      form : {
        id : '',
        urusan_kode : '',
        urusan_bidang_kode : '',
        program_kode : '',
        kode : '',
        uraian : '',
        keterangan : '',
      },

      // ====================================== CONTOH AUTOCOMPLETE ====================================
      autocomplete_db : '',
      // ====================================== CONTOH AUTOCOMPLETE ====================================
      
      filterku : {
          urusan_kode : '',
          urusan_bidang_kode : '',
          program_kode : '',
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


      FETCHING : FETCHING,
      DATAMASTER : DATAMASTER,
    }
  },
  methods: {


    getView : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.RL_DM_KEGIATAN + "view", {
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
              program_kode : this.filterku.program_kode,
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
      fetch(this.$store.state.url.RL_DM_KEGIATAN + "addData", {
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
      fetch(this.$store.state.url.RL_DM_KEGIATAN + "editData", {
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
      fetch(this.$store.state.url.RL_DM_KEGIATAN + "removeData", {
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

      console.log(data);
        this.form.id = data.id;
        this.form.urusan_kode = data.urusan_kode;
        this.form.urusan_bidang_kode = data.urusan_bidang_kode;
        this.form.program_kode = data.program_kode;
        this.form.kode = data.kode;
        this.form.uraian = data.uraian;
        this.form.keterangan = data.keterangan;

        this.asyncFetchUrusanBidang(this.form.urusan_kode);
        this.asyncFetchProgram(this.form.urusan_kode, this.form.urusan_bidang_kode)
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
      await DATAMASTER.postMasterUrusanBidang(val);
      await this.asyncFetchProgram(this.form.urusan_kode, this.form.urusan_bidang_kode)
    },
    async asyncFetchProgram(urusan_kode, urusan_bidang_kode){
      await DATAMASTER.postMasterProgram(urusan_kode, urusan_bidang_kode)
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




 