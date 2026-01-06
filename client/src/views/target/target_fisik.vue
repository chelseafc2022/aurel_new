<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="main1 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Target Fisik</div>
            <div class="text-subtitle2">Target</div>
          </div>
          <div class="col-12 col-md-2"></div>
          <div class="col-12 col-md-4">
            <div class="row">
              <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:90%"/>
              <q-btn glossy class="bg-light-blue-10"  dense flat icon="add" style="width:10%">
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

          <div class="col-12 col-md-4 rowRight">
              <span class="h_lable ">Filter Unit Kerja</span>
              <select v-model="filterku.unit_kerja" @change="cari_data()" class="bg-white">
                  <option value="">-- SEMUA UNIT KERJA --</option>
                  <option v-for="(data, index) in $store.state.list_program" :key="data.id+'-'+index" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
              </select>
          </div>

          <div class="col-12 col-md-4 rowRight">
              <span class="h_lable ">Filter Tahun</span>
              <select v-model="filterku.tahun" @change="cari_data(); target.thn = filterku.tahun" class="bg-white">
                  <option v-for="data in $store.state.list_tahun" :key="data.id" :value="data.uraian">{{data.uraian}}</option>
              </select>
          </div>

          <div class="col-12 col-md-4 rowRight">
              <span class="h_lable ">Filter Program</span>
              <select v-model="filterku.program_kode" @change="cari_data()" class="bg-white">
                  <option value="">-- SEMUA PROGRAM --</option>
                  <option v-for="(data, index) in $store.state.list_program" :key="data.id+'-'+index" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
              </select>
          </div>

        </div> -->

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


        <hr class="hrpagin2">


        <div class="tbl_responsive">
          <!-- =================================================== KONTENT =========================================================== -->
            <table width="100%">
              <tr class="h_table_head main1">
                <th class="text-center">No</th>
                <th class="text-center" >Kode</th>
                <th colspan="5">Program / Kegiatan</th>
                <th >Nilai (Rp.)</th>
                <th ></th>
              </tr>

              <div>

              </div>
              <template v-for="(data, index) in list_data">
                <!-- ================= PROGRAM ================= -->
                <tr class="h_table_body main1xx_1" :key="'program-'+data.id">
                  <td class="text-center">{{ indexing(index+1) }}.</td>
                  <td class="h_nip">{{ data.kode_full }}</td>
                  <td colspan="5">
                    <b>{{ data.uraian }}</b>
                    <div class="h_nip">{{ data.program_uraian }}</div>
                  </td>
                  <td class="h_nip">{{ UMUM.Rupiah(data.jml) }}</td>
                  <td></td>
                </tr>

                <!-- ================= SUB KEGIATAN ================= -->
                <template v-for="data1 in data.sub_kegiatan">
                  <tr class="h_table_body bg-white" :key="'sub-'+data1.id">
                    <td></td>
                    <td class="h_nip1">{{ data1.kode_full }}</td>
                    <td colspan="5">
                      {{ data1.uraian }}
                      <div class="h_nip1">
                        (SUMBER DANA : {{ data1.master_sumber_dana_uraian }})
                      </div>
                    </td>
                    <td class="h_nip1">{{ UMUM.Rupiah(data1.jml) }}</td>
                    <td></td>
                  </tr>

                  <!-- HEADER RINCIAN -->
                  <tr class="h_table_head1 softGrey">
                    <th colspan="2"></th>
                    <th>Uraian</th>
                    <th>Koefisien</th>
                    <th>Satuan</th>
                    <th>Harga</th>
                    <th>PPN</th>
                    <th>Jumlah</th>
                    <th></th>
                  </tr>

                  <!-- ================= RINCIAN ================= -->
                  <template v-for="rincian in data1.rincian">
                    <tr class="h_table_body bg-white" :key="'rincian-'+rincian.id">
                      <td></td>
                      <td></td>
                      <td>{{ rincian.uraian }}</td>
                      <td>{{ rincian.koefisien }}</td>
                      <td>{{ rincian.satuan }}</td>
                      <td>{{ rincian.harga }}</td>
                      <td>{{ rincian.ppn }}</td>
                      <td>{{ UMUM.Rupiah(rincian.jml) }}</td>
                      <td class="text-center">
                        <q-btn-dropdown
                          round dense
                          icon="pending"
                          :color="UMUM.indikatorNull(rincian.jml_target_fisik)"
                        >
                          <q-list>
                            <q-item clickable v-close-popup
                              @click="mdl_view_sub_kegiatan_rincian = true; selectRincian(rincian, data1)">
                              <q-item-section>
                                <q-item-label>Detile Target Fisik</q-item-label>
                              </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup
                              @click="mdl_add_sub_kegiatan_rincian = true; selectRincian(rincian, data1)">
                              <q-item-section>
                                <q-item-label>Perbaharui Target Fisik</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-btn-dropdown>
                      </td>
                    </tr>
                  </template>
                </template>
              </template>



              <tr class="bg-white">
                <th width="5%" class="text-center bg-white"></th>
                <th width="5%"  class="text-center bg-white"></th>
                <th width="38%"></th>
                <th width="10%"></th>
                <th width="10%"></th>
                <th width="10%"></th>
                <th width="7%"></th>
                <th width="10%"></th>
                <th width="5%"></th>
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

        <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++ KEGIATAN ++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->



          <!-- ================================================= MODAL LIHAT TARGET KEGIATAN ================================================ -->
              <q-dialog v-model="mdl_view_sub_kegiatan_rincian" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Detile Target Rincian Sub-Kegiatan</div>
                  </q-card-section>

                  <form @submit.prevent="addTarget()">
                    <q-card-section class="q-pt-none">
                        <br>

                        <div class="row">

                            <div class="col-12 col-md-12 frame_cari ">
                              <span class="h_lable ">Referensi</span>
                              <table width="100%">

                                <tr class="h_table_body">
                                  <td style="width:30%" class="h_table_body1">Sub-Kegiatan</td>
                                  <td style="width:70%" class="">
                                    [{{kegiatanSub.kode_full}}] {{kegiatanSub.uraian}}
                                    <div class="h_nip">{{kegiatanSub.master_sumber_dana_uraian}}</div>
                                  </td>
                                </tr>
                      
                                <tr class="h_table_body">
                                  <td class="h_table_body1">Rincian</td>
                                  <td class="">{{rincian.uraian}}</td>
                                </tr>

                  
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
                              <span class="h_lable ">Jumlah Pagu</span>
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
                        <q-btn  color="primary" @click="addTarget()" label="Simpan" />
                        <q-btn label="Batal" color="negative" v-close-popup />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
          <!-- ================================================= MODAL LIHAT TARGET KEGIATAN ================================================ -->


          <!-- ================================================ MODAL TAMBAH TARGET KEGIATAN ================================================ -->
            <q-dialog v-model="mdl_add_sub_kegiatan_rincian" persistent>
                <q-card class="mdl-md ">
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Edit Target Data Rincian Sub-Kegiatan</div>
                  </q-card-section>
                    <form @submit.prevent="addTarget()">


                      <q-card-section class="q-pt-none">
                        <br>
                        <div class="row">

                            <div class="col-12 col-md-12 frame_cari ">
                              <span class="h_lable ">Referensi</span>
                              <table width="100%">

                                <tr class="h_table_body">
                                  <td style="width:30%" class="h_table_body1">Sub-Kegiatan</td>
                                  <td style="width:70%" class="">
                                    [{{kegiatanSub.kode_full}}] {{kegiatanSub.uraian}}
                                    <div class="h_nip">{{kegiatanSub.master_sumber_dana_uraian}}</div>
                                  </td>
                                </tr>
                
                                <tr class="h_table_body">
                                  <td class="h_table_body1">Rincian</td>
                                  <td class="">{{rincian.uraian}}</td>
                                </tr>

                  
                              </table>
                              <br>

                            </div>




                            <div class="col-12 col-md-12 frame_cari ">
                              <span class="h_lable ">Target Realisasi Keuangan</span>
                              <table width="100%">
                                <tr class="h_table_head main1x_1">
                                  <th width="5%" class="text-center">No</th>
                                  <th width="45%">Uraian</th>
                                  <th width="50%">Jml(%)</th>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">1.</td>
                                  <td class="">Januari</td>
                                  <td class="text-center"><input v-model="target.jan" type="number" step="0.25" class="input_standard"></td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">2.</td>
                                  <td class="">Februari</td>
                                  <td class="text-center"><input v-model="target.feb" type="number" step="0.25" class="input_standard"></td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">3.</td>
                                  <td class="">Maret</td>
                                  <td class="text-center"><input v-model="target.mar" type="number" step="0.25" class="input_standard"></td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">4.</td>
                                  <td class="">April</td>
                                  <td class="text-center"><input v-model="target.apr" type="number" step="0.25" class="input_standard"></td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">5.</td>
                                  <td class="">Mei</td>
                                  <td class="text-center"><input v-model="target.mei" type="number" step="0.25" class="input_standard"></td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">6.</td>
                                  <td class="">Juni</td>
                                  <td class="text-center"><input v-model="target.jun" type="number" step="0.25" class="input_standard"></td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">7.</td>
                                  <td class="">Juli</td>
                                  <td class="text-center"><input v-model="target.jul" type="number" step="0.25" class="input_standard"></td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">8.</td>
                                  <td class="">Agustus</td>
                                  <td class="text-center"><input v-model="target.agu" type="number" step="0.25" class="input_standard"></td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">9.</td>
                                  <td class="">September</td>
                                  <td class="text-center"><input v-model="target.sep" type="number" step="0.25" class="input_standard"></td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">10.</td>
                                  <td class="">Oktober</td>
                                  <td class="text-center"><input v-model="target.okt" type="number" step="0.25" class="input_standard"></td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">11.</td>
                                  <td class="">November</td>
                                  <td class="text-center"><input v-model="target.nov" type="number" step="0.25" class="input_standard"></td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="text-center">12.</td>
                                  <td class="">Desember</td>
                                  <td class="text-center"><input v-model="target.des" type="number" step="0.25" class="input_standard"></td>
                                </tr>
                  
                              </table>

                            </div>
                            <div class="col-12 col-md-6 frame_cari ">
                              <hr class="hrpagin2">
                              <span class="h_lable ">Jumlah Pagu</span>
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
                        <q-btn  color="primary" @click="addTarget()" label="Ubah" />
                        <q-btn label="Batal" color="negative" v-close-popup />
                      </q-card-actions>
                    </form>
                </q-card>
            </q-dialog>
          <!-- ================================================ MODAL TAMBAH TARGET KEGIATAN ================================================ -->


          <!-- ================================================ MODAL HAPUS TARGET KEGIATAN ================================================ -->
            <q-dialog v-model="mdl_hapus_sub_kegiatan_rincian" persistent>
                <q-card class="mdl-sm ">
                <q-card-section class="q-pt-none text-center orageGrad">
                    <form @submit.prevent="removeTarget()">
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
          <!-- ================================================ MODAL HAPUS TARGET KEGIATAN ================================================ -->




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
        program_kode : '',
        kegiatan_kode : [],
        unit_kerja : '',
        tahun : '',
        kegiatan_id : '',
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

      rincian : {
        id : '',
        kegiatan_sub_label_id : '',
        kegiatan_sub_kode : '',
        uraian : '',
        koefisien : '',
        satuan : '',
        harga : 0,
        ppn : 0,
        jml : 0,
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

      target_persen : 100,


      // ====================================== CONTOH AUTOCOMPLETE ====================================
      autocomplete_db : '',
      // ====================================== CONTOH AUTOCOMPLETE ====================================
      
      filterku : {
          program_kode : '',
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



      mdl_view_sub_kegiatan_rincian : false,
      mdl_add_sub_kegiatan_rincian : false,
      mdl_edit_sub_kegiatan_rincian : false,
      mdl_hapus_sub_kegiatan_rincian : false,


      FETCHING : FETCHING,
      DATAMASTER : DATAMASTER,
      UMUM : UMUM,
    }
  },
  methods: {


    getView : function(){
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.CT_KEGIATAN + "view", {
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
              this.list_data = res_data.data;
              this.page_last = res_data.jml_data;
              this.$store.commit("hideLoading");
              console.log(res_data);
      });
    },


    addData : function() {
      fetch(this.$store.state.url.CT_KEGIATAN + "addData", {
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
      fetch(this.$store.state.url.CT_KEGIATAN + "editData", {
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
      fetch(this.$store.state.url.CT_KEGIATAN + "removeData", {
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
        this.form.kegiatan_kode = data.kode_full;
    },

    selectKegiatan : function(data){
      console.log(data)
      this.form.kegiatan_id = data.kegiatan_id
      DATAMASTER.postMasterkegiatanSub(data.kode_full)
    },

    selectSubKegiatan : function(data){

      console.log(data)
        this.kegiatanSub.tahun = data.tahun ;
        this.kegiatanSub.kegiatan_sub_id = data.kegiatan_sub_id ;
    },

    selectRincian(rincian, subKegiatan) {
      this.rincian.id = rincian.id
      this.rincian.uraian = rincian.uraian
      this.rincian.koefisien = rincian.koefisien
      this.rincian.satuan = rincian.satuan
      this.rincian.harga = rincian.harga
      this.rincian.ppn = rincian.ppn
      this.rincian.jml = rincian.jml

      this.target.rincian_id = rincian.id

      this.kegiatanSub.kode_full = subKegiatan.kode_full
      this.kegiatanSub.uraian = subKegiatan.uraian
      this.kegiatanSub.master_sumber_dana_uraian =
        subKegiatan.master_sumber_dana_uraian

      this.viewTarget()
    },



    viewTarget : function(){
      // this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.CT_TARGET_FISIK + "getOne", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.target)
      })
          .then(res => res.json())
          .then(res_data => {
              console.log(res_data);

              this.target.jan = res_data[0].jan
              this.target.feb = res_data[0].feb
              this.target.mar = res_data[0].mar
              this.target.apr = res_data[0].apr
              this.target.mei = res_data[0].mei
              this.target.jun = res_data[0].jun
              this.target.jul = res_data[0].jul
              this.target.agu = res_data[0].agu
              this.target.sep = res_data[0].sep
              this.target.okt = res_data[0].okt
              this.target.nov = res_data[0].nov
              this.target.des = res_data[0].des

      });
    },


    addTarget : function(){
      console.log(this.target);
      fetch(this.$store.state.url.CT_TARGET_FISIK + "addData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.target)
      }).then(res_data => {
          this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
          this.kegiatanSub.kegiatan_sub_kode = [];
          this.getView();
      });

      // console.log(this.label.rincian);
    },



    selectTarget : function(data){
      this.target.rincian_id = data.rincian_id ;
        this.target.jan = data.jan ;
        this.target.feb = data.feb ;
        this.target.mar = data.mar ;
        this.target.apr = data.apr ;
        this.target.mei = data.mei ;
        this.target.jun = data.jun ;
        this.target.jul = data.jul ;
        this.target.agu = data.agu ;
        this.target.sep = data.sep ;
        this.target.okt = data.okt ;
        this.target.nov = data.nov ;
        this.target.des = data.des ;
        this.target.thn = data.thn ;
        this.target.status = data.status ;
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
    onChangex(data){
      // await DATAMASTER.postMasterUrusanBidang(val)
    },

    async AsyncKegiatan(){
      DATAMASTER.postMasterkegiatan(this.form.program_kode)
    },

    async onChangexInstansi(){
        await DATAMASTER.getInstansiAsync("");
        await this.onChangexUnitKerja();
      },
    async onChangexUnitKerja(){
      var unitkerjax = await DATAMASTER.getUnitKerjaAsync(this.filterku.instansi)
      console.log(unitkerjax[0]);
      this.filterku.unit_kerja = unitkerjax[0].id
      console.log(this.filterku.unit_kerja);
      this.getView();
    },

    // ====================================== CONTOH eDOC ====================================

  // ====================================== CONTOH AUTOCOMPLETE ====================================
    autocomplete_sumber_dana_filter : function (val, update) {
        update(() => {
          if (val === '') {}
          else {DATAMASTER.postMasterSumberDanaAutoComplete(val)}
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
    this.form.unit_kerja = profile.unit_kerja;
    this.kegiatanSub.unit_kerja = profile.unit_kerja;

    this.filterku.instansi = profile.instansi_id;
    this.filterku.unit_kerja = profile.unit_kerja;


    const d = new Date();
    let year = d.getFullYear();

    this.form.tahun = year;
    this.filterku.tahun = year;
    this.kegiatanSub.tahun = year;
    this.target.thn = year;

    // console.log(year)


    DATAMASTER.postProgram(this.form.unit_kerja)
    DATAMASTER.postMasterSumberDanaAutoComplete('')
    DATAMASTER.getTahun();





    FETCHING.getContohAtocomplete('')
  //   DATAMASTER.postMasterUrusan('')
    this.onChangexInstansi(); 
  },
}
</script>




 