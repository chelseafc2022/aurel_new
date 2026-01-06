<template>
    <div class="about" style="padding:15px">
      <q-card bordered class="my-card">
        <q-card-section class="main1 text-white">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="text-h6 h_titleHead">BUKU KAS UMUM</div>
              <div class="text-subtitle2">Kertas Kerja</div>
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
                <span class="h_lable ">Unit Kerja</span>
                <select v-model="filterku.instansi" @change="onChangexUnitKerja()" class="bg-white">
                    <option value="">-- SEMUA UNIT KERJA --</option>
                    <option v-for="data in $store.state.list_instansi" :key="data.id" :value="data.id">🔹 {{ data.instansi }}</option>
                </select>
            </div>
            <div class="col-12 col-md-6 ">
                <span class="h_lable ">Sub Unit Kerja</span>
                <select v-model="filterku.unit_kerja" @change="cari_data()" class="bg-white">
                    <option value="">-- SEMUA SUB-UNIT KERJA --</option>
                    <option v-for="data in $store.state.list_unit_kerja" :key="data.id" :value="data.id">🔸 {{ data.unit_kerja }}</option>
                </select>
            </div>
            <!-- <div class="col-12 col-md-4 rowRight">
                <span class="h_lable ">Tahun Anggaran</span>
                <select v-model="filterku.tahun" @change="cari_data()" class="bg-white">
                    <option value="">-- Tahun --</option>
                    <option v-for="data in $store.state.list_tahun" :key="data.id" :value="data.id">{{data.id}}</option>
                </select>
            </div> -->
            
          </div>
  
  
          <hr class="hrpagin2">
  
  
          <div class="tbl_responsive">
            <!-- =================================================== KONTENT =========================================================== -->
              <table width="100%">
                <tr class="h_table_head main1x_1">
                    <th width="5%" class="text-center">No</th>
                    <th width="30%">Uraian</th>
                    <th width="15%">Jumlah Terima</th>
                    <th width="15%">Jumlah Keluar</th>
                    <th width="15%">Jumlah LPJ</th>
                    <th width="15%">Sisa</th>
                    <th width="5%" class="text-center">#</th>
                </tr>
                <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id+'-'+index">
                    <td class="text-center">{{indexing(index+1)}}.</td>
                    <td>
                        {{data.uraian}} 
                        <div class="h_nip1">No. {{data.no}}</div>
                        <div class="h_nip2">(Tgl. {{UMUM.tglConvert(data.tgl)}})</div>
                    </td>
                    <td style=""> 
                     Rp. {{UMUM.Rupiah(data.realisasi)}}
                    </td>
                    <td>
                      Rp.{{UMUM.Rupiah(data.jml_keluar)}}
                    </td>
                    <td> Rp. {{ UMUM.Rupiah(data.jml_lpj) }} </td>
                    <td> Rp. {{ UMUM.Rupiah(data.realisasi - data.jml_lpj) }} </td>

                    <td class="text-center">

                        <q-btn-group>
                          <q-btn @click="selectData(data), mdl_view_list_serapan = true" glossy color="primary" icon="search" class="tbl_btn">
                            <q-tooltip content-class="bg-primary" content-style="font-size: 13px">
                              Lihat Detil
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
      
  
  
  
  
          <br>
        </q-card-section>
      </q-card>
  
  
  
  
  
            <!-- =================================================== MODAL =========================================================== -->
  
  
              <!-- ================================================ MODAL LIST SERAPAN KEGIATAN ================================================ -->
                <q-dialog v-model="mdl_view_list_serapan" persistent>
                    <q-card class="mdl-lg ">
                      <q-card-section class="bg-blue-3">
                        <div class="flexModal">
                          <div class="text-h6 h_modalhead">Detile Permintaan Permintaan</div>
                          <div class="flexModalRight">
                            <q-btn @click="mdl_view_list_serapan = false" round push size="sm" color="red-4" text-color="white" label="X" />
                          </div>
                        </div>
                      </q-card-section>

                          <q-card-section class="q-pt-none">
                            <br>

                            <hr class="hrpagin2">
                            <q-btn @click="mdl_select_list_serapan = true" size="sm" color="white" text-color="black" icon="add" label="Tambah Data" />
                            <hr class="hrpagin2">
                            


                            <table width="100%">
                              <tr class="h_table_head bg-blue-2">
                                <th class="text-center">No</th>
                                <th colspan="2">Kegiatan/Sub-kegiatan/Rincian</th>
                                <th>Nilai (Rp.)</th>
                                <th></th>
                              </tr>
                              <tr class="h_table_body" v-for="(data, index) in list_data_serapan" :key="data.id">
                                <td class="text-center">{{index+1}}.</td>
                                <td colspan="2">
                                  {{data.kegiatan_sub_rincian_uraian}}
                                  <div class="h_nip2">
                                    Kegiatan : {{data.kegiatan_uraian}}
                                  </div>
                                  <div class="h_nip2">
                                    Sub-Kegiatan : {{data.kegiatan_sub_uraian}}
                                  </div>
                                </td>
                                <td>{{UMUM.Rupiah(data.realisasi)}}</td>
                                <td class="text-center">
                                  <q-btn-group>
                                    <q-btn size="sm" glossy color="light-blue" icon="search" class="tbl_btn" @click="selectSerapan(data), mdl_edit_serapan = true">
                                      <q-tooltip content-class="bg-light-blue-9" content-style="font-size: 13px">
                                        Click untuk melihat detile Pertanggungjawaban
                                      </q-tooltip>
                                    </q-btn>
                                  </q-btn-group>
                                  

                                </td>
                              </tr>



                              
                              <tr class="h_table_body">
                                <td colspan="6" class=""></td>
                              </tr>

                              <tr class="h_table_body bg-blue-2">
                                <td colspan="2" class="text-center">TOTAL PERMINTAAN</td>
                                <td colspan="3" class="text-center">TOTAL REALISASI</td>
                              </tr>

                              <tr class="h_table_body">
                                <td colspan="2" class="text-center">{{'Rp. '+UMUM.Rupiah(this.form.realisasi)}}</td>
                                <td colspan="3" class="text-center">{{'Rp. '+UMUM.Rupiah(form.jml_keluar)}}</td>
                              </tr>


                              <tr class="">
                                <th width="5%" class="text-center"></th>
                                <th width="45%"></th>
                                <th width="25%"></th>
                                <th width="13%"></th>
                                <th width="12%"></th>
                              </tr>

                            </table>
                            

                          </q-card-section>
                          <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                            <q-btn size="sm" label="Kembali" color="negative" v-close-popup />
                          </q-card-actions>
                    </q-card>
                </q-dialog>
              <!-- ================================================ MODAL LIST SERAPAN KEGIATAN ================================================ -->

  
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
        id :'',
        master_permintaan :'',
        uraian :'',
        no :'',
        realisasi :'',
        jml_keluar :'',
        jml_lpj :'',
        keterangan :'',
        dd :'',
        mm :'',
        yy :'',
        tgl :'',
        type :'',
        unit_kerja :'',
        file :'',

      },

      unit_kerja : '', 
      unit_kerja_id : '',

      file_path: this.$store.state.url.URL_APP + "uploads/",

  

  
        // ====================================== CONTOH AUTOCOMPLETE ====================================
        autocomplete_db : '',
        // ====================================== CONTOH AUTOCOMPLETE ====================================
        
        filterku : {
            urusan_kode : '',
            tahun : '',
            unit_kerja : '',
            instansi : '',
        },

        tipeku: null,

  
  
      
        list_data : [],
        list_data_serapan : [],
  
        page_first: 1,
        page_last: 0,
        page_limit : 10,
        cari_value: "",
        cek_load_data : true,



        mdl_view_list_serapan : false,
  
  
        mdl_add: false,
        mdl_edit: false,
        mdl_hapus : false,
        mdl_open : false,
        btn_add: false,
  
  
        FETCHING : FETCHING,
        DATAMASTER : DATAMASTER,
        UMUM : UMUM,
      }
    },
    methods: {
  
  
      getView : function(){
          this.$store.commit("shoWLoading");
          fetch(this.$store.state.url.URL_bku + "view", {
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
                      unit_kerja_id : this.form.unit_kerja_id,
                      instansi : this.filterku.instansi,
                        unit_kerja : this.filterku.unit_kerja,
                        tahun : this.filterku.tahun,
                        tipeku : this.tipeku,
                  })
              })
              .then(res => res.json())
              .then(res_data => {
                  // this.list_data = res_data.data;
                  this.list_data = res_data;
                  console.log(res_data);
                  // this.page_last = res_data.jml_data;
                  this.$store.commit("hideLoading");
                  // console.log(res_data);
          });
          },
  
  
      addData: function(){

          var formData = new FormData();
          formData.append('pb', JSON.stringify(this.form));
          formData.append('file', this.form.file);

          fetch(this.$store.state.url.URL_rek + 'addData', {
              method: "POST",
              headers: {
                  authorization: "kikensbatara " + localStorage.token
              },
              body: formData
              }).then(res_data => {
              
              // this.lampiran.direktori_id
                  this.Notify ('Sukses Menambah Data', 'primary', 'check_circle_outline');
              this.getView();
          });
      },
  
  
      editData : function(){
        fetch(this.$store.state.url.CT_PROGRAM + "editData", {
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
        fetch(this.$store.state.url.URL_rek + "removeData", {
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

        this.form.id = data.id ;
        this.form.master_permintaan = data.master_permintaan ;
        this.form.uraian = data.uraian ;
        this.form.no = data.no ;
        this.form.realisasi = data.realisasi ;
        this.form.jml_keluar = data.jml_keluar ;
        this.form.jml_lpj = data.jml_lpj ;
        this.form.keterangan = data.keterangan ;
        this.form.dd = data.dd ;
        this.form.mm = data.mm ;
        this.form.yy = data.yy ;
        this.form.tgl = data.tgl ;
        this.form.type = data.type ;
        this.form.unit_kerja = data.unit_kerja ;
        this.form.file = data.file ;


        this.viewSerapan();

          
      },

      viewSerapan : function(){
        fetch(this.$store.state.url.CT_REALISASI_KEUANGAN_SERAPAN + "getOne", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                realisasi_keuangan_id: this.form.id,
            })
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data);
                this.list_data_serapan = res_data;
                // this.TOTAL_SERAPAN = 0
                // res_data.forEach(element => {
                //   this.TOTAL_SERAPAN = this.TOTAL_SERAPAN + element.realisasi
                // });
        });
      },
  
  
      // ====================================== CONTOH eDOC ====================================
      async onChangexInstansi(){
        await DATAMASTER.getInstansiAsync("");
        this.onChangexUnitKerja();
      },
      async onChangexUnitKerja(){
        // console.log("yyyyyyyyyyyy");
        var unitkerjax = await DATAMASTER.getUnitKerjaAsync(this.filterku.instansi)
        // console.log("xxxxxxxxxxxxx");
        console.log(unitkerjax[0].id);
        this.filterku.unit_kerja = unitkerjax[0].id
        // console.log("xxxxxxxxxxxxx");
        console.log(this.filterku.unit_kerja);
        this.getView();
      },


      // async asyncFetchUrusan(){
      //   await DATAMASTER.postMasterUrusan('');
      //   this.form.urusan_kode = this.$store.state.list_urusan[0].kode;
      //   this.asyncFetchUrusanBidang(this.form.urusan_kode)
      // },
      // async asyncFetchUrusanBidang(val){
      //   await DATAMASTER.postMasterUrusanBidang(val)
      // },
      // ====================================== CONTOH eDOC ====================================
  
    // ====================================== CONTOH AUTOCOMPLETE ====================================
      autocomplete_program_filter : function (val, update) {
          update(() => {
            if (val === '') {}
            else {DATAMASTER.postMasterProgramAutoComplete(val, this.form.unit_kerja)}
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
      let profilex = JSON.parse(localStorage.profile);
        let profile = profilex.profile;
        // console.log("ASDASDA" + profile.unit_kerja);
        this.unit_kerja_id = profile.unit_kerja;
        this.form.unit_kerja_id = profile.unit_kerja;
        this.filterku.instansi = profile.instansi_id;

        this.tipeku = profile.trista_monev;
  
        const d = new Date();
        let year = d.getFullYear();
        this.form.tahun = year;
        this.filterku.tahun = year;
  
        console.log(profile)
  
  
        DATAMASTER.getTahun();
  
  
        DATAMASTER.postMasterProgramAutoComplete("", this.form.unit_kerja)
        
        // this.asyncFetchUrusan();
      //   DATAMASTER.postMasterUrusan('')
        this.onChangexInstansi();
        // this.getView();
    },
  }
</script>
    
    
    
    
     