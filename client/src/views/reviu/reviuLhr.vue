<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="main1 text-white">
        <div class="row">
          <div class="col-12 col-md-4">
            <div class="text-h6 h_titleHead">Reviu LHR</div>
            <div class="text-subtitle2">Menu Reviu</div>
          </div>
          <div class="col-12 col-md-4">
            
          </div>

          <div class="col-12 col-md-4">
            <div class="row">
              <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:80%"/>
              
              <q-btn v-if="tipe == 4 || tipe == 5 || tipe == 6 || tipe == 7 || tipe == 8 || tipe == 9 " glossy class="tambah" @click="mdl_add = true" dense flat icon="add" style="margin-right: 5px; width: 10%;">
                  <q-tooltip content-class="tambah" content-style="font-size: 13px">
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
             <tr class="h_table_head bg-blue-2">
                <th class="text-left" style="width:5%">No</th>
                
                          <th class="text-left" style="width:5%">Status</th>
                <th class="text-left" style="width:10%">Tahun</th>
                <th class="text-left" style="width:25%">Nama File</th>
                <th class="text-left" style="width:30%">Keterangan</th>
                <th class="text-left" style="width:15%">Act</th>
            </tr>
             
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td class="text-center">
                    <a href="javascript:void(0)" class="removeTextDecoration" @click="selectData(data), mdl_keterangan = true">
                      <q-btn v-if="data.status_wali == 0" round glossy size="xs" color="orange" icon="hourglass_empty" />
                      <q-btn v-if="data.status_wali == 1" round size="xs" glossy color="green" icon="done" />
                      <q-btn v-if="data.status_wali == 2" round glossy size="xs" color="red" icon="close" />
                    </a>
                  </td>
                <td>
                    {{data.tahun}} 
                </td>
                <td>
                    {{data.uraian}} 
                </td>
                <td>{{data.keterangan}}</td>
               
                <td class="text-center">

                <q-btn-group>

                    <q-btn v-if=" tipe == 4 || tipe == 5 || tipe == 6 || tipe == 7 || tipe == 8 || tipe == 9" @click="selectData(data), mdl_open = true" glossy color="green" icon="description" class="tbl_btn">
                    <q-tooltip content-class="bg-green-9" content-style="font-size: 13px">
                        Lihat Lampiran
                    </q-tooltip>
                    </q-btn>

                    <q-btn v-if=" tipe == 1" @click="selectData(data), mdl_open = true" glossy color="primary" icon="description" class="tbl_btn">
                    <q-tooltip content-class="bg-blue-5" content-style="font-size: 13px">
                        Lihat Lampiran
                    </q-tooltip>
                    </q-btn>

                    <q-btn v-if=" tipe == 4 || tipe == 5 || tipe == 6 || tipe == 7 || tipe == 8 || tipe == 9" @click="selectData(data), mdl_edit = true" glossy color="orange" icon="create" class="tbl_btn">
                    <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                        Click untuk mengubah data ini
                    </q-tooltip>
                    </q-btn>

                    <q-btn v-if=" tipe == 4 || tipe == 5 || tipe == 6 || tipe == 7 || tipe == 8 || tipe == 9" @click="selectData(data), mdl_hapus = true" glossy color="negative" icon="delete_forever" class="tbl_btn">
                    <q-tooltip content-class="bg-red" content-style="font-size: 13px">
                        Click untuk menghapus data ini
                    </q-tooltip>
                    </q-btn>

                    <q-btn v-if=" tipe == 1" glossy color="green" icon="assignment_turned_in" class="tbl_btn" @click="selectData(data), mdl_approve =true">
                      <q-tooltip content-class="bg-green-9" content-style="font-size: 13px">
                        Setujui
                      </q-tooltip>
                    </q-btn>

                    <q-btn v-if=" tipe == 1" glossy color="negative" icon="block" class="tbl_btn" @click="selectData(data), mdl_kembalikan =true">
                      <q-tooltip content-class="bg-red" content-style="font-size: 13px">
                        Evaluasi
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
        <div class="text-center">
          <q-btn @click="btn_prev" glossy color="orange" icon="skip_previous" class="paginate_btn" />
            <span class="h_panation">&nbsp; {{page_first}} - {{page_last}} &nbsp;</span>
          <q-btn @click="btn_next" glossy color="orange" icon="skip_next" class="paginate_btn" />
        </div>


       

        <br>
      </q-card-section>
    </q-card>





          <!-- =================================================== MODAL =========================================================== -->


            <!-- ================================================= MODAL TAMBAH ================================================ -->
              <q-dialog v-model="mdl_add" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="h_modalhead1">
                    <div class="text-h6 h_modalhead">Upload LHR</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>

                        <div class="row"> 

                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Tahun</span>
                            <select v-model="form.tahun" class="bg-white margin_btn">
                              <option value="2022">2022</option>
                              <option value="2023">2023</option>
                              <option value="2024">2024</option>
                              <option value="2025">2025</option>
                            </select> 
                          </div> 
                           
                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Pilih File </span>
                            <q-file v-model="form.file" outlined square :dense="true" class="bg-white margin_btn">
                              <template v-slot:prepend>
                                <q-icon name="attach_file" />
                              </template>
                            </q-file>
                          </div>
                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Nama File</span>
                            <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>
                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Keterangan</span>
                            <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>
                          </div>
                       

                            <!-- <pre> {{formlist_opd}} </pre> -->
                             <div class="col-12 col-md-12 frame_cari">
                            <hr class="hrpagin2">
                          </div>
                          
                          <div class="col-12 col-md-12 frame_cari">
                          
                            <div class="col-12 col-md-12 frame_cari">
                              <q-btn class="glossy" @click="mdl_add_opd = true" size="sm" rounded color="deep-orange" label="Tambah OPD" />
                            </div>
                            
                            <div class="col-12 col-md-12 frame_cari">
                              <hr class="hrpagin2">
                            </div>

                            <!-- <pre> {{formlist_opd}} </pre> -->
                            <div class="tbl_responsive" style="margin-top: 13px;width:100%;">

                              <!-- =================================================== KONTENT =========================================================== -->

                                <table >
                                <tr class="h_table_head_blue h_table_head">
                                  <th class="text-center" style="width:15%">No</th>
                                  <th class="text-left" style="width:70%">Nama OPD</th>
                                  <th class="text-center" style="width:15%">Check</th>
                                </tr>
                                  <tr class="h_table_body" v-for="(data, index) in lokasi" :key="data.uniqid">
                                    <td class="text-center">{{indexing(index+1)}}.</td>
                                      <td>{{data.unit_kerja}}</td>
                                        <td class="text-center">
                                          <q-btn color="red" icon="clear" size="sm" @click="hapusArray(data)" />
                                      </td>
                                </tr>

                                </table>

                              <!-- =================================================== KONTENT =========================================================== -->
                            </div>

                          </div>

                          </div>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn class="main1 text-white" @click="addData()" label="Simpan" />
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
                            <span class="h_lable ">Tahun</span>
                            <select v-model="form.tahun" class="bg-white margin_btn">
                              <option value="2022">2022</option>
                              <option value="2023">2023</option>
                              <option value="2024">2024</option>
                              <option value="2025">2025</option>
                            </select> 
                          </div> 
                           
                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Pilih File </span>
                            <q-file v-model="form.file" outlined square accept=".pdf" :dense="true" class="bg-white margin_btn">
                              <template v-slot:prepend>
                                <q-icon name="attach_file" />
                              </template>
                            </q-file>
                          </div>
                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Nama File</span>
                            <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>
                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Keterangan</span>
                            <q-input v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>
                          </div>
                       

                          </div>

                    </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn class="bg-orange text-white" @click="editData()" label="Edit" />
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

              <!-- ================================================= MODAL OPEN ================================================ -->
               <q-dialog v-model="mdl_open" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-green">
                    <div class="text-h6 h_modalhead">Lampiran</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                        <br>
                        <div class="text-center">
                           <embed :src="file_path+form.file_old" width="100%" height="600" type='application/pdf'>
                        </div>

                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <!-- <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" /> -->
                      <q-btn label="Kembali" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL OPEN ================================================ -->

             <!-- =================================================== MODAL ADD OPD =========================================================== -->
              <q-dialog v-model="mdl_add_opd" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="h_modalhead2">
                    <div class="text-h6 h_modalhead">List OPD</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none"> <br>
                    <div class="row">

                    <q-input class="bg-white" style="width:100%"
                    v-model="cariOPD" 
                    @keyup="iniopd()" 
                    outlined 
                    square 
                    :dense="true" 
                    placeholder="Cari OPD" 
                    />
                    </div>

                    <!-- {{$store.state.listOPD}} -->

                    <div class="tbl_responsive" style="margin-top: 13px;">
                      <!-- =================================================== KONTENT =========================================================== -->
                        <table width="100%">
                         <tr class="h_table_head_blue h_table_head">
                          <th class="text-center" style="width:15%">No</th>
                          <th class="text-left" style="width:70%">Nama OPD</th>
                          <th class="text-center" style="width:15%"> <input type="checkbox" @click="getcheckAll()" :value="data" /> Check</th>
                        </tr>
                          <tr class="h_table_body" v-for="(data, index) in $store.state.listOPD" :key="data.id">
                            <td class="text-center">{{indexing(index+1)}}.</td>
                              <td>{{data.unit_kerja}}</td>
                              <!-- <td></td> -->
                              <td class="text-center">
                                  <input type="checkbox" v-model="lokasi" :value="data" />
                                </td>
                          </tr>

                        </table>

                      <!-- =================================================== KONTENT =========================================================== -->
                    </div>
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn label="Batal" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>

            <!-- =================================================== MODAL ADD OPD =========================================================== -->

            <!-- ================================================= MODAL OPEN ================================================ -->
           
                <q-dialog v-model="mdl_kembalikan" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-red">
                    <div class="text-h6 h_modalhead">Evaluasi File</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                        <br>

                        <span class="h_lable ">Hasil Evaluasi</span>
                        <q-input v-model="form.notice" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>

                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn color="warning" @click="evaluasi()" label="Evaluasi"/>
                      <q-btn label="Batal" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>

          <!-- =================================================== MODAL =========================================================== -->

           <!-- ================================================ MODAL APROVE LAMPIRAN ================================================ -->
                  <q-dialog v-model="mdl_approve" persistent>
                    <q-card class="mdl-sm ">
                      <q-card-section class="q-pt-none text-center hijauMudaGrad">
                          <form @submit.prevent="selectFileLampiran">
                              <br>
                              <img src="img/alert.png" alt="" width="75"> <br>
                              <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MEMVERIFIKASI DATA INI??</span>
                              <input type="submit" style="position: absolute; left: -9999px"/>
                              <br>
                              <br>

                            <q-btn label="Batal" size="sm" color="negative"  v-close-popup/>
                            &nbsp;
                            <q-btn @click="approve()" label="Verifikasi" size="sm" color="primary" v-close-popup/>

                          </form>
                      </q-card-section>
                    </q-card>
                  </q-dialog>

            <!-- ================================================ MODAL APROVE LAMPIRAN ================================================ -->

            <!-- ========================== KETERANGAN ================================ -->
           <q-dialog v-model="mdl_keterangan" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-orange">
                    <div class="text-h6 h_modalhead">KETERANGAN</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                        <br>
                       <span style="margin-top:100px">{{form.notice}}</span>

                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn label="Close" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>


          <!-- ========================== KETERANGAN ================================ -->


  </div>
</template>


<script>
import { ModelSelect, ModelListSelect  } from 'vue-search-select'
import 'vue-search-select/dist/VueSearchSelect.css'

import DATA_MASTER from  '../../library/dataMaster'
import FETCHING from '../../library/fetching'
import UMUM from "../../library/umum.js";
  

export default {
   components: {
    ModelSelect, ModelListSelect, 
  },
  data() {
    return {
      form : {
          id : '',
          tahun : '',
          uraian : '',
          keterangan : '',
          file : null,
          file_type : '',
          keterangan : '',
          unit_kerja_id : '',
          file_old : null,
          notice : '',
          status_wali : 0,
        },

        file_path: this.$store.state.url.URL_APP + "uploads/",

      list_data : [],
      cariOPD:'',
      lokasi : [],

      // ====================================== CONTOH AUTOCOMPLETE ====================================
      cek_load_data : true,
      
      unit_kerja : '', 
      unit_kerja_id : '',
      tipe: 0,
      mdl_add : false,
      mdl_edit : false,
      mdl_hapus : false,
      mdl_lihat : false,
      mdl_add_opd : false,
      mdl_kembalikan :false,
        mdl_approve :false,
        mdl_keterangan :false,

        
        mdl_open : false,

        page_first: 1,
        page_last: 0,
        page_limit : 5,
        cari_value: "",
        FETCHING : FETCHING,
        UMUM : UMUM,
        
      DATA_MASTER : DATA_MASTER, 
      

    }
  },

  methods: {

     getcheckAll : function () {

        console.log("===========");
          // this.lokasi = this.$store.state.listOPD

        if (this.checkAll==true) {
          
          this.lokasi = this.$store.state.listOPD
          this.checkAll = false
        } else {
          this.lokasi = []
          this.checkAll = true
          
        }

    },
    
    getView : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_lhr + "view", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                
                data_ke: this.page_first,
                cari_value: this.cari_value,
                page_limit : this.page_limit,
                unit_kerja : this.unit_kerja_id,
                tipe_user : this.tipe
            })
        })
          .then(res => res.json())
          .then(res_data => {
              this.list_data = res_data.data;
              console.log(res_data);
              this.page_last = res_data.jml_data;
              this.$store.commit("hideLoading");
              console.log(res_data);
      });
    },

     lokasiData : function(id){
      
          fetch(this.$store.state.url.URL_direktori + "lokasi", {
              method: "POST",
              headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
              },
              body: JSON.stringify({
                  
                  id_direktori : id
              })
          })
            .then(res => res.json())
            .then(res_data => {
                this.lokasi = res_data.data;
                
                this.$store.commit("hideLoading");
                
        });
    },

       addData: function(){
 
        console.log(this.lokasi);
        var formData = new FormData();
        formData.append('pb', JSON.stringify( this.form  ));
        formData.append('file', this.form.file);
        formData.append('lokasi', JSON.stringify(this.lokasi));

        fetch(this.$store.state.url.URL_lhr + 'addData', {
            method: "POST",
            headers: {
                authorization: "kikensbatara " + localStorage.token
            },
            body: formData,

            }).then(res_data => {

              
              // this.lampiran.direktori_id
               this.Notify ('Sukses Menambah Data', 'primary', 'check_circle_outline');
              this.getView();
        });
      },

     


     editData: function(){

        var formData = new FormData();
        formData.append('pb', JSON.stringify(this.form));
        formData.append('file', this.form.file);
        // formData.append('fileOld', this.fileOld);

        fetch(this.$store.state.url.URL_lhr + 'editData', {
            method: "POST",
            headers: {
                authorization: "kikensbatara " + localStorage.token
            },
            body: formData
            }).then(res_data => {
              this.Notify ('Sukses Mengubah Data', 'primary', 'check_circle_outline');
              this.getView();
        });
      },

  
    removeData : function(E){
      fetch(this.$store.state.url.URL_lhr + "removeData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({id : this.form.id})
      }).then(res_data => {
        // this.history
        this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
        this.getView();
      });

    },

    async history(){
        var a = await FETCHING.POST_DATA(this.$store.state.url.URL_history + "view")  
        console.log(a)
        this.list_data = a.data 
    },

     hapusArray : function(data){
      var arr = this.lokasi
      const objWithIdIndex = arr.findIndex((obj) => obj.uniqid === data.uniqid);
      console.log(objWithIdIndex);
      this.lokasi.splice(objWithIdIndex, 1);
    },


   selectData : function(data){

          this.form.id= data.id;
          this.form.tahun = data.tahun;
          this.form.uraian = data.uraian;
          this.form.keterangan = data.keterangan;
        this.form.file_old =  data.file;
          this.form.notice = data.notice;
        
        this.form.file = this.form.file
          this.form.unit_kerja_id = data.unit_kerja_id;
      },

      approve: async function(){
        // await UMUM.notifApprove();
        fetch(this.$store.state.url.URL_lhr + 'approve', {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.form)
            }).then(res_data => {
              // this.getLampiran();
              this.getView(this.form.id);
              this.Notify ('Mempublish', 'primary', 'check_circle_outline');
        });
      },

       evaluasi: async function(){
        fetch(this.$store.state.url.URL_lhr + 'kembalikan', {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.form)
            }).then(res_data => {
              // this.getLampiran();
              this.getView(this.form.id);
              this.Notify ('Mengevaluasi', 'primary', 'check_circle_outline');
        });
      },

    
      
    // ====================================== CONTOH eDOC ====================================
    onClickx(data){
      alert(data)
    },
    // ====================================== CONTOH eDOC ====================================

  // ====================================== CONTOH AUTOCOMPLETE ====================================
    jenis_audit_filter : function (val, update) {
        update(() => {
          if (val === '') {}
          else {FETCHING.getJenis(val)}
        })
    },
    anggota_filter : function (val, update) {
        update(() => {
          if (val === '') {}
          else {FETCHING.getAnggota(val)}
        })
    },


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
        iniopd : async function(){
          this.$store.state.listOPD = await FETCHING.FETCH_POST(this.$store.state.url.URL_simpeg_unit_kerja + "list", {cari : this.cariOPD})
        },

    // ====================================== PAGINATE ====================================

  },

  mounted () {
    
      var get_profile = JSON.parse(localStorage.profile);
      this.form.unit_kerja_id = get_profile.profile.unit_kerja;
      this.unit_kerja_id = get_profile.profile.unit_kerja;

      this.tipe = get_profile.profile.trista_monev;

      this.getView();
       this.iniopd();
 
    // this.getView();
  },
}
</script>




 