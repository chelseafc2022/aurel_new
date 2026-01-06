<template>
    <div class="about" style="padding:15px">
      <q-card bordered class="my-card">
        <q-card-section class="main1 text-white">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="text-h6 h_titleHead">KKA ADM</div>
              <div class="text-subtitle2">Kertas Kerja</div>
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
  
  
          <!-- <div class="row">
            <div class="col-12 col-md-4 rowLeft">
                <span class="h_lable ">Unit Kerja</span>
                <select v-model="filterku.instansi" @change="onChangexUnitKerja()" class="bg-white">
                    <option value="">-- SEMUA UNIT KERJA --</option>
                    <option v-for="data in $store.state.list_instansi" :key="data.id" :value="data.id">🔹 {{ data.instansi }}</option>
                </select>
            </div>
            <div class="col-12 col-md-4 ">
                <span class="h_lable ">Sub Unit Kerja</span>
                <select v-model="filterku.unit_kerja" @change="cari_data()" class="bg-white">
                    <option value="">-- SEMUA SUB-UNIT KERJA --</option>
                    <option v-for="data in $store.state.list_unit_kerja" :key="data.id" :value="data.id">🔸 {{ data.unit_kerja }}</option>
                </select>
            </div>
            <div class="col-12 col-md-4 rowRight">
                <span class="h_lable ">Tahun Anggaran</span>
                <select v-model="filterku.tahun" @change="cari_data()" class="bg-white">
                    <option value="">-- Tahun --</option>
                    <option v-for="data in $store.state.list_tahun" :key="data.id" :value="data.id">{{data.id}}</option>
                </select>
            </div>
            
          </div> -->
  
  
          <hr class="hrpagin2">
  
  
          <div class="tbl_responsive">
            <!-- =================================================== KONTENT =========================================================== -->
              <table width="100%">
                <tr class="h_table_head main1x_1">
                    <th width="5%" class="text-center">No</th>
                    <th width="10%">Tanggal</th>
                    <th width="20%">Nomor</th>
                    <th width="30%">Uraian</th>
                    <th width="10%">Jenis permintaan</th>
                    <th width="15%">Nilai</th>
                    <th width="10%" class="text-center">#</th>
                </tr>
                <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id+'-'+index">
                    <td class="text-center">{{indexing(index+1)}}.</td>
                <td> {{UMUM.tglConvert(data.tgl)}} </td>
                <td>
                    {{data.uraian}} 
                </td>
                <td style=""> 
                  <div class="text-light-green-9"><q-icon style="font-size: 14px;" name="payments"/> - <strong>{{UMUM.rupiah(data.jml_terima)}}</strong></div>
                  <a @click="selectData(data), mdl_lihat_pajak = true" href="javascript:void(0);" class="clear_underline text-red-4"><q-icon style="font-size: 14px;" name="payments"/> <strong>- {{UMUM.rupiah(data.pajak_masuk)}}</strong></a>
                </td>
                <td>
                  <div class="text-red-4"><q-icon style="font-size: 14px;" name="payments"/> - <strong>{{UMUM.rupiah(data.pengeluaran)}} </strong></div>
                  <div class="clear_underline text-grey-8"><q-icon style="font-size: 14px;" name="payments"/> <strong>- Rp.20000</strong></div>
                </td>
                <td> {{UMUM.rupiah(data.jml_terima-data.pengeluaran)}} </td>
                <!-- <td> {{
                  toRupiah(data.jml_terima, {symbol: 'IDR', floatingPoint: 0})
                  }} </td> -->
                
                <td> {{data.no_bukti}} </td>

                <td class="text-center">

                <q-btn-group>
                     <q-btn @click="selectData(data), mdl_lihat = true" glossy color="primary" icon="search" class="tbl_btn">
                      <q-tooltip content-class="bg-primary" content-style="font-size: 13px">
                        Lihat Detil
                      </q-tooltip>
                    </q-btn>

                    <q-btn @click="selectData(data), mdl_edit = true" glossy color="orange" icon="create" class="tbl_btn" :disabled="UMUM.statusNotice(data.status_wali).btn">
                      <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                        Click untuk mengubah data ini
                      </q-tooltip>
                    </q-btn>

                    <q-btn @click="selectData(data), mdl_hapus = true" glossy color="negative" icon="delete_forever" class="tbl_btn" :disabled="UMUM.statusNotice(data.status_wali).btn">
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
  
                            
                              <div class="col-12 col-md-12 frame_cari ">
                                <span class="h_lable ">Pilih File Rekening Koran</span>
                                <q-file v-model="form.file" outlined square accept=".pdf" :dense="true" class="bg-white margin_btn">
                                <template v-slot:prepend>
                                  <q-icon name="attach_file" />
                                </template>
                              </q-file>
                              </div>

                              <div class="col-12 col-md-6 frame_cari ">
                                <span class="h_lable ">Tahun</span>
                                <select class="bg-white margin_btn" v-model="form.tahun">
                                    <option v-for="data in $store.state.list_tahun" :key="data.id" :value="data.uraian">{{data.uraian}}</option>
                                </select>
                            </div>
                            
                            <div class="col-12 col-md-6 frame_cari ">
                              <span class="h_lable ">Bulan</span>
                              <select class="bg-white margin_btn" v-model="form.bulan">
                                <option v-for="data in $store.state.BULAN" :key="data.id" :value="data.uraian">{{data.uraian}}</option>
                              </select>
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
                            <div class="col-12 col-md-12 frame_cari ">
                                <span class="h_lable ">Pilih File Rekening Koran</span>
                                <q-file v-model="form.file" outlined square accept=".pdf" :dense="true" class="bg-white margin_btn">
                                <template v-slot:prepend>
                                  <q-icon name="attach_file" />
                                </template>
                              </q-file>
                              </div>


  
                            <div class="col-12 col-md-12 frame_cari ">
                                <span class="h_lable ">Tahun</span>
                                <select class="bg-white margin_btn" v-model="form.tahun">
                                    <option v-for="data in $store.state.list_tahun" :key="data.id" :value="data.uraian">{{data.uraian}}</option>
                                </select>
                            </div>

                            <div class="col-12 col-md-12 frame_cari ">
                              <span class="h_lable ">Bulan</span>
                              <select class="bg-white margin_btn" v-model="form.bulan">
                                <option v-for="data in $store.state.BULAN" :key="data.id" :value="data.uraian">{{data.uraian}}</option>
                              </select>
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
          tgl: '',
          uraian: '',
          no_bukti: '',
          jml_terima: '',
          pengeluaran : '',
          sisax : '',
          kode_rekening : '',
          nama_rekening : '',
         keterangan : '',
         unit_kerja_id : '',
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
  
    
    
         
          list_data : [],
    
          page_first: 1,
          page_last: 0,
          page_limit : 10,
          cari_value: "",
          cek_load_data : true,
    
    
          mdl_add: false,
          mdl_edit: false,
          mdl_hapus : false,
          mdl_open : false,
          btn_add: false,
    
    
          FETCHING : FETCHING,
          DATAMASTER : DATAMASTER,
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
                        tipe : this.tipe
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

            this.form.id= data.id;
            this.form.tgl = data.tgl;
            this.form.uraian = data.uraian;
            this.form.no_bukti = data.no_bukti;
            this.form.jml_terima= data.jml_terima;
            this.form.pengeluaran = data.pengeluaran;
            this.form.sisax = data.sisax;
            this.form.kode_rekening = data.kode_rekening;
            this.form.nama_rekening = data.nama_rekening;
            this.form.keterangan = data.keterangan;
            this.form.unit_kerja_id = data.unit_kerja_id;


            this.m_pajak.id_adm = data.id;


            this.getViewPajak();
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
        var get_profile = JSON.parse(localStorage.profile);
      this.form.unit_kerja_id = get_profile.profile.unit_kerja;
      this.unit_kerja_id = get_profile.profile.unit_kerja;

      this.tipe = get_profile.profile.trista_monev;

      this.getView();
      },
    }
    </script>
    
    
    
    
     