<template>
    <div class="about" style="padding:15px">
      <q-card bordered class="my-card">
        <q-card-section class="main1 text-white">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="text-h6 h_titleHead">Laporan Realisasi Pembangunan</div>
              <div class="text-subtitle2">Laporan</div>
            </div>
            <div class="col-12 col-md-2"></div>
            <div class="col-12 col-md-4">
              <div class="row">
                <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:100%"/>
              </div>
            </div>
          </div>
        </q-card-section>
  
        <q-separator dark inset />
  
  
        <q-card-section>
  
          <div class="row">
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
          </div>

          <div style="margin-top:50px">



              <div class="text-center" >
    
                  <hr class="hrpagin2">
        
                  <div class="h15 h_gray1"><b>LAPORAN REALISASI FISIK DAN KEUANGAN</b></div>
                  <div class="h_ket h_gray1"><b>{{filterku.unit_kerja_uraian}}</b></div>
                  <div class="h12 h_gray1">KEGIATAN PEMBANGUNAN DAERAH</div>
                  <div class="h12 h_gray1"><b>TAHUN ANGGARAN {{filterku.tahun}}</b></div>
                  <hr class="hrpagin2">
              </div>
      
      
              <div class="tbl_responsive">
                <!-- =================================================== KONTENT =========================================================== -->
                    <table width="100%">
                        <tr class="h_table_head main1x_1">
                            <th width="5%" class="text-center">No</th>
                            <th width="30%">Paket</th>
                            <th width="25%">Kegiatan/sub/Unit Kerja</th>
                            <th width="10%">Pagu (Rp)</th>
                            <th width="10%">Realisasi (Rp)</th>
                            <th width="10%">Target (%)</th>
                            <th width="10%">Realisasi (%)</th>
                            
                        </tr>
                        <tr class="h_table_body" v-for="(data, i) in list_data" :key="data.id+'a'+i">
                            <td class="text-center">{{indexing(i+1)}}.</td>
                            <td>
                                <div>{{data.nama_paket}}</div>
                                <div v-if="data.kegiatan_sub_rincian_uraian != null && data.kegiatan_sub_rincian_uraian != ''" class="h_nip">Rincian Keg : {{data.kegiatan_sub_rincian_uraian}}</div>
                                <div class="h_nip1">Metode : {{data.metode_pengadaan}}</div>
                            </td>
                            <td>
                                <div class="h_nip">Kegiatan : {{data.kegiatan_uraian}}</div>
                                <div class="h_nip1">Sub-Kegiatan : {{data.kegiatan_sub_uraian}}</div>
                                <div class="h_nip2">{{data.nama_satker}}</div>
                            
                            </td>
                            <td>{{UMUM.Rupiah(data.pagu)}}</td>
                            <td>{{UMUM.Rupiah(data.total_jml_realisasi_keuangan)}}</td>
                            <td class="text-center">{{data.jml_target_fisik}} %</td>
                            <td class="text-center">{{data.total_jml_realisasi_fisik}}%</td>


                        </tr>
        
                    </table>
      
                <!-- =================================================== KONTENT =========================================================== -->
              </div>
          </div>
  
          <hr class="hrpagin">
          <br>
          <div class="flex flex-center">

          </div>
  
          <hr class="hrpagin2">
          <br>
        </q-card-section>
      </q-card>
  
  
  
  
  
            <!-- =================================================== MODAL =========================================================== -->
  
  
            <!-- ================================================= MODAL LIHAT TARGET KEGIATAN ================================================ -->
              <q-dialog v-model="mdl_view_detile_target" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Detile Target Paket Kegiatan</div>
                  </q-card-section>

                  <form @submit.prevent="addTarget()">
                    <q-card-section class="q-pt-none">
                        <br>

                        <div class="row">

                            <div class="col-12 col-md-12 frame_cari ">
                              <span class="h_lable ">Referensi</span>
                              <table width="100%">

                                <!-- <tr class="h_table_body">
                                  <td style="width:30%" class="h_table_body1">Sub-Kegiatan</td>
                                  <td style="width:70%" class="">
                                    [{{kegiatanSub.kode_full}}] {{kegiatanSub.uraian}}
                                    <div class="h_nip">{{kegiatanSub.master_sumber_dana_uraian}}</div>
                                  </td>
                                </tr> -->
                                <!-- <tr class="h_table_body">
                                  <td class="h_table_body1">Tag</td>
                                  <td class="">[#] {{tag.uraian}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="h_table_body1">Label</td>
                                  <td class="">[-] {{label.uraian}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="h_table_body1">Rincian</td>
                                  <td class="">{{rincian.uraian}}</td>
                                </tr> -->

                  
                              </table>
                              <br>

                            </div>




                            <div class="col-12 col-md-12 frame_cari ">
                              <span class="h_lable ">Target Realisasi Keuangan</span>
                              <table width="100%">
                                <tr class="h_table_head main1x_1">
                                  <th width="5%" class="text-center">No</th>
                                  <th width="45%">Uraian</th>
                                  <th width="50%">Jml (%)</th>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">1.</td>
                                  <td class="">Januari</td>
                                  <td class="">{{UMUM.Rupiah(target.jan)}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">2.</td>
                                  <td class="">Februari</td>
                                  <td class="">{{UMUM.Rupiah(target.feb)}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">3.</td>
                                  <td class="">Maret</td>
                                  <td class="">{{UMUM.Rupiah(target.mar)}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">4.</td>
                                  <td class="">April</td>
                                  <td class="">{{UMUM.Rupiah(target.apr)}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">5.</td>
                                  <td class="">Mei</td>
                                  <td class="">{{UMUM.Rupiah(target.mei)}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">6.</td>
                                  <td class="">Juni</td>
                                  <td class="">{{UMUM.Rupiah(target.jun)}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">7.</td>
                                  <td class="">Juli</td>
                                  <td class="">{{UMUM.Rupiah(target.jul)}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">8.</td>
                                  <td class="">Agustus</td>
                                  <td class="">{{UMUM.Rupiah(target.agu)}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">9.</td>
                                  <td class="">September</td>
                                  <td class="">{{UMUM.Rupiah(target.sep)}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">10.</td>
                                  <td class="">Oktober</td>
                                  <td class="">{{UMUM.Rupiah(target.okt)}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">11.</td>
                                  <td class="">November</td>
                                  <td class="">{{UMUM.Rupiah(target.nov)}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">12.</td>
                                  <td class="">Desember</td>
                                  <td class="">{{UMUM.Rupiah(target.des)}}</td>
                                </tr>
                              </table>

                            </div>


                            <div class="col-12 col-md-6 frame_cari ">
                              <hr class="hrpagin2">
                              <span class="h_lable ">Target Ideal</span>
                              <div class="h_ket" style="color:#9c9c9c">
                                {{target_persen}}%
                              </div>
                              <hr class="hrpagin2">
                            </div>
                            <div class="col-12 col-md-6 frame_cari ">
                              <hr class="hrpagin2">
                              <span class="h_lable ">Total Target</span>
                              <div class="h_ket" style="color:#9c9c9c">
                                {{UMUM.Rupiah(countMount(target))}}%
                              </div>
                              <hr class="hrpagin2">
                            </div>
                         

                        </div>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <!-- <q-btn  color="primary" @click="addTarget()" label="Simpan" /> -->
                        <q-btn label="Batal" color="negative" v-close-popup />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL LIHAT TARGET KEGIATAN ================================================ -->


  
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
          pembangunan_list_id : '',
          kegiatan_sub_kode : "",
          kegiatan_sub_rincian : "",
          kegiatan_sub_uraian : "",
          kegiatan_uraian : "",
          kegiatan_kode : "",
          unit_kerja : "",
          id : "",
          type_kegiatan : "",
          tahun_anggaran : "",
          kd_satker : "",
          kd_satker_str : "",
          nama_satker : "",
          kd_rup : "",
          kd_rup_lokal : "",
          kd_klpd : "",
          nama_klpd : "",
          jenis_klpd : "",
          nama_paket : "",
          nama_ppk : "",
          nip_ppk : "",
          username_ppk : "",
          pagu : 0,
          tgl_buat_paket : "",
          tgl_pengumuman_paket : "",
          uraian_pekerjaan : "",
          volume_pekerjaan : "",
          status_aktif_rup : 1,
          status_delete_rup : 0,
          status_umumkan_rup : "",
          kd_klpd_penyelenggara : "",
          nama_klpd_penyelenggara : "",
          nama_satker_penyelenggara : "",
          tgl_akhir_pelaksanaan_kontrak : "",
          tgl_awal_pelaksanaan_kontrak : "",
          tipe_swakelola : "",
          alasan_non_ukm : "",
          jenis_pengadaan : "",
          kd_jenis_pengadaan : "",
          kd_metode_pengadaan : "",
          kd_rup_swakelola : "",
          metode_pengadaan : "",
          spesifikasi_pekerjaan : "",
          status_konsolidasi : "",
          status_pdn : "",
          status_pradipa : "",
          status_ukm : "",
          tgl_akhir_kontrak : "",
          tgl_akhir_pemanfaatan : "",
          tgl_akhir_pemilihan : "",
          tgl_awal_kontrak : "",
          tgl_awal_pemanfaatan : "",
          tgl_awal_pemilihan : "",
          tipe_paket : "",

        },
        kegiatanSub : {
          kegiatan_sub_kode : [],
          unit_kerja : '',
          tahun : '',
          kegiatan_sub_id : '',
          sumber_dana : '',
          uraian : '',
          kode_full  : '',
          master_sumber_dana_uraian : '',

        },

        target : {
          id : 0,
          rincian_id : 0,
          jan : 0,
          feb : 0,
          mar : 0,
          apr : 0,
          mei : 0,
          jun : 0,
          jul : 0,
          agu : 0,
          sep : 0,
          okt : 0,
          nov : 0,
          des : 0,
          thn : 0,
          status : 0,
        },

        filterku : {
            program_kode : '',
            tahun : '',
            unit_kerja : '',
            unit_kerja_uraian : '',
            instansi : '',
        },

        target_persen : 100,
  
        // ====================================== CONTOH AUTOCOMPLETE ====================================
        autocomplete_db : '',
        // ====================================== CONTOH AUTOCOMPLETE ====================================
        
  
  
      
        list_data : [],
        list_tag : [],
  
        page_first: 1,
        page_last: 0,
        page_limit : 10,
        cari_value: "",
        cek_load_data : true,
  
  
        mdl_view_detile_target : false,
        mdl_add_sub_kegiatan_rincian : false,
        mdl_edit_sub_kegiatan_rincian : false,
        mdl_hapus_sub_kegiatan_rincian : false,
        mdl_sync_rincian_kegiatan : false,

        mdl_view_detile_paket : false,
  
  
        FETCHING : FETCHING,
        DATAMASTER : DATAMASTER,
        UMUM : UMUM,
      }
    },
    methods: {
  
  
      getView : function(){
        this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.CT_TARGET_PEMBANGUNAN + "list", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                data_ke: this.page_first,
                cari_value: this.cari_value,
                page_limit : this.page_limit,
                instansi : this.filterku.instansi,
                unit_kerja : this.filterku.unit_kerja,
                tahun : this.filterku.tahun,
                program_kode : this.filterku.program_kode,
            })
        })
            .then(res => res.json())
            .then(res_data => {
                this.list_data = res_data;
                this.$store.commit("hideLoading");
                console.log(res_data);
        });
      },
  
  
      addData : function(number) {
        fetch(this.$store.state.url.CT_TARGET_PEMBANGUNAN + "Add", {
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
        fetch(this.$store.state.url.CT_TARGET_PEMBANGUNAN + "editData", {
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
        fetch(this.$store.state.url.URL_MasterKategori + "removeData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({id : this.form.id})
        }).then(res_data => {
            this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
            this.getView();
        });
  
      },
  
      selectData : function(data){

        console.log(data)

          this.form.pembangunan_list_id = data.pembangunan_list_id ;
          this.form.kegiatan_sub_kode = data.kegiatan_sub_kode ;
          this.form.kegiatan_sub_rincian = data.kegiatan_sub_rincian ;
          this.form.kegiatan_sub_uraian = data.kegiatan_sub_uraian ;
          this.form.kegiatan_uraian = data.kegiatan_uraian ;
          this.form.kegiatan_kode = data.kegiatan_kode ;
          this.form.unit_kerja = data.unit_kerja ;
          this.form.id = data.id ;
          this.form.type_kegiatan = data.type_kegiatan ;
          this.form.tahun_anggaran = data.tahun_anggaran ;
          this.form.kd_satker = data.kd_satker ;
          this.form.kd_satker_str = data.kd_satker_str ;
          this.form.nama_satker = data.nama_satker ;
          this.form.kd_rup = data.kd_rup ;
          this.form.kd_rup_lokal = data.kd_rup_lokal ;
          this.form.kd_klpd = data.kd_klpd ;
          this.form.nama_klpd = data.nama_klpd ;
          this.form.jenis_klpd = data.jenis_klpd ;
          this.form.nama_paket = data.nama_paket ;
          this.form.nama_ppk = data.nama_ppk ;
          this.form.nip_ppk = data.nip_ppk ;
          this.form.username_ppk = data.username_ppk ;
          this.form.pagu = data.pagu ;
          this.form.tgl_buat_paket = data.tgl_buat_paket ;
          this.form.tgl_pengumuman_paket = data.tgl_pengumuman_paket ;
          this.form.uraian_pekerjaan = data.uraian_pekerjaan ;
          this.form.volume_pekerjaan = data.volume_pekerjaan ;
          this.form.status_aktif_rup = data.status_aktif_rup ;
          this.form.status_delete_rup = data.status_delete_rup ;
          this.form.status_umumkan_rup = data.status_umumkan_rup ;
          this.form.kd_klpd_penyelenggara = data.kd_klpd_penyelenggara ;
          this.form.nama_klpd_penyelenggara = data.nama_klpd_penyelenggara ;
          this.form.nama_satker_penyelenggara = data.nama_satker_penyelenggara ;
          this.form.tgl_akhir_pelaksanaan_kontrak = data.tgl_akhir_pelaksanaan_kontrak ;
          this.form.tgl_awal_pelaksanaan_kontrak = data.tgl_awal_pelaksanaan_kontrak ;
          this.form.tipe_swakelola = data.tipe_swakelola ;
          this.form.alasan_non_ukm = data.alasan_non_ukm ;
          this.form.jenis_pengadaan = data.jenis_pengadaan ;
          this.form.kd_jenis_pengadaan = data.kd_jenis_pengadaan ;
          this.form.kd_metode_pengadaan = data.kd_metode_pengadaan ;
          this.form.kd_rup_swakelola = data.kd_rup_swakelola ;
          this.form.metode_pengadaan = data.metode_pengadaan ;
          this.form.spesifikasi_pekerjaan = data.spesifikasi_pekerjaan ;
          this.form.status_konsolidasi = data.status_konsolidasi ;
          this.form.status_pdn = data.status_pdn ;
          this.form.status_pradipa = data.status_pradipa ;
          this.form.status_ukm = data.status_ukm ;
          this.form.tgl_akhir_kontrak = data.tgl_akhir_kontrak ;
          this.form.tgl_akhir_pemanfaatan = data.tgl_akhir_pemanfaatan ;
          this.form.tgl_akhir_pemilihan = data.tgl_akhir_pemilihan ;
          this.form.tgl_awal_kontrak = data.tgl_awal_kontrak ;
          this.form.tgl_awal_pemanfaatan = data.tgl_awal_pemanfaatan ;
          this.form.tgl_awal_pemilihan = data.tgl_awal_pemilihan ;
          this.form.tipe_paket = data.tipe_paket ;
      },

      getViewKegiatanSubTag : function(){
        // this.$store.commit("shoWLoading");
        this.list_tag = [];
        fetch(this.$store.state.url.CT_KEGIATAN_SUB_TAG + "list", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
              kegiatan_sub_kode: this.form.kegiatan_sub_kode,
            })
        })
            .then(res => res.json())
            .then(res_data => {
                // this.$store.commit("hideLoading");
                this.list_tag = res_data
                // console.log(res_data);
        });
      },



      syncRincian : function(data){
        console.log(data)
        fetch(this.$store.state.url.CT_TARGET_PEMBANGUNAN + "syncRincian", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
              kegiatan_sub_rincian : data.id,
              id : this.form.pembangunan_list_id
            })
        }).then(res_data => {
            this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
            this.mdl_sync_rincian_kegiatan = false
            this.getView();
        });
      },

      countMount : function(data){
        var datax = parseFloat(data.jan) + 
        parseFloat(data.feb) + 
        parseFloat(data.mar) + 
        parseFloat(data.apr) + 
        parseFloat(data.mei) + 
        parseFloat(data.jun) + 
        parseFloat(data.jul) + 
        parseFloat(data.agu) + 
        parseFloat(data.sep) + 
        parseFloat(data.okt) + 
        parseFloat(data.nov) + 
        parseFloat(data.des) 

        return datax

      },

  
  
      // ====================================== CONTOH eDOC ====================================
      onClickx(data){
        alert(data)
      },
      async onChangexInstansi(){
        await DATAMASTER.getInstansiAsync("");
        await this.onChangexUnitKerja();
      },
      async onChangexUnitKerja(){
        var unitkerjax = await DATAMASTER.getUnitKerjaAsync(this.filterku.instansi)
        console.log(unitkerjax[0]);
        this.filterku.unit_kerja = unitkerjax[0].id
        this.filterku.unit_kerja_uraian = unitkerjax[0].unit_kerja
        console.log(this.filterku.unit_kerja);
        this.getView();
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
      DATAMASTER.getTahun();



      let profilex = JSON.parse(localStorage.profile);
      let profile = profilex.profile;

      const d = new Date();
      let year = d.getFullYear();

      this.filterku.instansi = profile.instansi_id;
      this.filterku.unit_kerja = profile.unit_kerja;
      this.filterku.tahun = year;


      // this.getView();
      this.onChangexInstansi(); 

    },
  }
</script>
  
  
  
  
   