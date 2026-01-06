<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="main1 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Realisasi Keuangan</div>
            <div class="text-subtitle2">Realisasi</div>
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
              <tr class="h_table_head main1x_1">
                <th width="5%" class="text-center">No</th>
                <th class="text-center" width="10%">No.SP2D</th>
                <th width="35%">Uraian SP2D</th>
                <th width="13%">Nilai</th>
                <th width="25%">Keterangan</th>
                <th width="12%"></th>
              </tr>
              <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td class="text-center">{{data.no}}</td>
                <td>
                  {{data.uraian}} - ({{data.master_permintaan_uraian}})
                  <div class="h_nip">
                    ( {{UMUM.tglConvert(data.tgl)}} )
                  </div>
                </td>
                <td>
                  Rp.{{UMUM.Rupiah(data.realisasi)}}
                  <div class="h_nip1">Rp.0</div>
                </td>
                <td>{{data.keterangan}}</td>
                <td class="text-center">
                  <q-btn-group>
                    <q-btn size="sm" @click="mdl_view_list_serapan = true, selectData(data)" glossy color="blue" icon="payment" class="tbl_btn">
                      <q-tooltip content-class="bg-blue-9" content-style="font-size: 13px">
                        Click untuk Maping Nilai
                      </q-tooltip>
                    </q-btn>
                    <q-btn size="sm" @click="mdl_edit = true, selectData(data)" glossy color="orange" icon="create" class="tbl_btn">
                      <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                        Click untuk mengubah data ini
                      </q-tooltip>
                    </q-btn>
                    <q-btn size="sm" @click="mdl_hapus = true, selectData(data)" glossy color="negative" icon="delete_forever" class="tbl_btn">
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
                    <div class="flexModal">
                      <div class="text-h6 h_modalhead">Simpan Data</div>
                      <div class="flexModalRight">
                          <q-btn @click="mdl_add = false" round push size="sm" color="deep-purple-5" text-color="white" label="X" />
                      </div>
                    </div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>

                        <div class="row">

                          <div class="col-12 col-md-12 frame_cari frame_cari">
                            <span class="h_lable ">Nomor</span>
                            <q-input v-model="form.no" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>
                          <div class="col-12 col-md-12 frame_cari frame_cari">
                            <span class="h_lable ">Uraian</span>
                            <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>
                          <div class="col-12 col-md-12 frame_cari frame_cari">
                            <span class="h_lable ">Jumlah Permintaan</span>
                            <q-input v-model="form.realisasi" outlined square :dense="true" type="number" step="0.25" class="bg-white margin_btn" /> 
                          </div>
                          <div class="col-12 col-md-12 frame_cari frame_cari">
                            <span class="h_lable ">Jenis Permintaan</span>
                            <select v-model="form.master_permintaan" class="bg-white margin_btn">
                              <option v-for="data in $store.state.list_master_permintaan" :key="data.id" :value="data.id">[{{data.kode}}]. {{data.jenis_permintaan}}</option>
                            </select>
                          </div>
                          <div class="col-12 col-md-12 frame_cari frame_cari">
                            <span class="h_lable ">Tgl Permintaan</span>
                            <q-input v-model="form.tgl" type="date" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>
                          <div class="col-12 col-md-12 frame_cari frame_cari">
                              <span class="h_lable ">File Lampiran</span>
                              <q-file v-model="form.file" outlined square :dense="true" class="bg-white margin_btn">
                                <template v-slot:prepend>
                                  <q-icon name="attach_file" />
                                </template>
                              </q-file>
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
                            <span class="h_lable ">Nomor</span>
                            <q-input v-model="form.no" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>
                          <div class="col-12 col-md-12 frame_cari frame_cari">
                            <span class="h_lable ">Uraian</span>
                            <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>
                          <div class="col-12 col-md-12 frame_cari frame_cari">
                            <span class="h_lable ">Jumlah Permintaan</span>
                            <q-input v-model="form.realisasi" outlined square :dense="true" type="number" step="0.25" class="bg-white margin_btn" /> 
                          </div>
                          <div class="col-12 col-md-12 frame_cari frame_cari">
                            <span class="h_lable ">Jenis Permintaan</span>
                            <select v-model="form.master_permintaan" class="bg-white margin_btn">
                              <option v-for="data in $store.state.list_master_permintaan" :key="data.id" :value="data.id">[{{data.kode}}]. {{data.jenis_permintaan}}</option>
                            </select>
                          </div>
                          <div class="col-12 col-md-12 frame_cari frame_cari">
                            <span class="h_lable ">Tgl Permintaan</span>
                            <q-input v-model="form.tgl" type="date" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>
                          <div class="col-12 col-md-12 frame_cari frame_cari">
                              <span class="h_lable ">File Lampiran</span>
                              <q-file v-model="form.file" outlined square :dense="true" class="bg-white margin_btn">
                                <template v-slot:prepend>
                                  <q-icon name="attach_file" />
                                </template>
                              </q-file>
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
                                  <q-btn size="sm" glossy color="orange" icon="create" class="tbl_btn" @click="selectSerapan(data), mdl_edit_serapan = true">
                                    <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                                      Click untuk mengubah nilai serapan 
                                    </q-tooltip>
                                  </q-btn>
                                  <q-btn size="sm" glossy color="negative" icon="delete_forever" class="tbl_btn" @click="selectSerapan(data),mdl_delete_serapan=true">
                                    <q-tooltip content-class="bg-red" content-style="font-size: 13px">
                                      Click untuk menghapus data ini
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
                              <td colspan="3" class="text-center">{{'Rp. '+UMUM.Rupiah(TOTAL_SERAPAN)}}</td>
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


            <!-- ================================================ MODAL LIHAT/ADD RINCIAN SERAPAN KEGIATAN ================================================ -->
              <q-dialog v-model="mdl_select_list_serapan" persistent>
                  <q-card class="mdl-lgx ">
                    <q-card-section class="bg-deep-purple-3">
                      <div class="flexModal">
                        <div class="text-h6 h_modalhead">Sesuaikan Serapan</div>
                        <div class="flexModalRight">
                           <q-btn @click="mdl_select_list_serapan = false, viewSerapan()" round push size="sm" color="red-4" text-color="white" label="X" />
                        </div>
                      </div>
                    </q-card-section>

                        <q-card-section class="q-pt-none">
                          <br>
                          <rincianKegiatanTemp :realisasi_keuangan_id="form.id" :unit_kerja="filterku.unit_kerja"/>
                          
                        </q-card-section>
                        <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                          <q-btn label="Kembali" size="sm" color="negative" v-close-popup @click="viewSerapan()"/>
                        </q-card-actions>
                  </q-card>
              </q-dialog>
            <!-- ================================================ MODAL LIHAT/ADD RINCIAN SERAPAN KEGIATAN ================================================ -->

            <!-- ================================================= MODAL EDIT RINCIAN SERAPAN KEGIATAN ================================================ -->
              <q-dialog v-model="mdl_edit_serapan" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-orange">
                    <div class="text-h6 h_modalhead">Edit Nilai Serapan</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <br>
                    <div class="row">

                          <div class="col-12 col-md-12 frame_cari frame_cari">
                            <span class="h_lable ">Nilai Serapan</span>
                            <q-input v-model="serapan.realisasi" outlined square :dense="true" type="number" step="0.25" class="bg-white margin_btn" /> 
                          </div>

                        </div>


                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    <q-btn :loading="btn_add" color="primary" @click="editSerapan()" label="Simpan" />
                    <q-btn label="Batal" color="negative" v-close-popup />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL EDIT RINCIAN SERAPAN KEGIATAN ================================================ -->

            <!-- ================================================ MODAL HAPUS RINCIAN SERAPAN KEGIATAN ================================================ -->
            <q-dialog v-model="mdl_delete_serapan" persistent>
                <q-card class="mdl-sm ">
                  <q-card-section class="q-pt-none text-center orageGrad">
                      <form @submit.prevent="removeSerapan">
                          <br>
                          <img src="img/alert.png" alt="" width="75"> <br>
                          <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MENGHAPUS DATA SERAPAN INI??</span>
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

           <!-- ================================================ MODAL HAPUS RINCIAN SERAPAN KEGIATAN ================================================ -->


            <!-- ================================================ MODAL HAPUS RINCIAN SERAPAN KEGIATAN ================================================ -->
              <q-dialog v-model="mdl_delete_serapan" persistent>
                <q-card class="mdl-sm ">
                  <q-card-section class="q-pt-none text-center orageGrad">
                      <form @submit.prevent="removeSerapan">
                          <br>
                          <img src="img/alert.png" alt="" width="75"> <br>
                          <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MENGHAPUS DATA SERAPAN INI??</span>
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

            <!-- ================================================ MODAL HAPUS RINCIAN SERAPAN KEGIATAN ================================================ -->


            <!-- ================================================ MODAL LIHAT LAMPIRAN KEGIATAN ================================================ -->
              <q-dialog v-model="mdl_view_lampiran" persistent>
                  <q-card class="mdl-lg ">
                    <q-card-section class="bg-deep-purple-3">
                      <div class="text-h6 h_modalhead">Lihat Lampiran</div>
                    </q-card-section>

                        <q-card-section class="q-pt-none">
                          <br>
                          <pdfViewKu :type="form.type" :pdfFile="$store.state.url.URL_APP+'uploads/'+form.file_old"/>

                        </q-card-section>
                        <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                          <q-btn label="Kembali" color="negative" v-close-popup />
                        </q-card-actions>
                  </q-card>
              </q-dialog>
            <!-- ================================================ MODAL LIHAT LAMPIRAN KEGIATAN ================================================ -->

            









          <!-- =================================================== MODAL =========================================================== -->




  </div>
</template>
  
  
  <script>
  
  
  import FETCHING from '../../library/fetching'
  import UMUM from '../../library/umum'
  import DATAMASTER from '../../library/dataMaster'
  
  export default {
    data() {
      return {
  
        form : {
          id : '',
          no : '',
          uraian : '',
          unit_kerja : '',
          master_permintaan : 1,
          realisasi : 0,
          tgl : '',
          keterangan : '',
          dd : '',
          mm : '',
          yy : '',
          file : null,
          type : '',
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
          file_old: "",
        },


        serapan : {
          id : '',
          rincian_id : '',
          realisasi_keuangan_id : '',
          realisasi : '',
          dd : '',
          mm : '',
          yy : ''
        },
        filterku : {
          program_kode : '',
          tahun : '',
          unit_kerja : '',
          instansi : '',
        },


        TOTAL_SERAPAN : 0,

  
        // ====================================== CONTOH AUTOCOMPLETE ====================================
        autocomplete_db : '',
        // ====================================== CONTOH AUTOCOMPLETE ====================================
        
  
  
       
        list_data : [],
        list_data_serapan : [],
  
        page_first: 1,
        page_last: 0,
        page_limit : 8,
        cari_value: "",
        cek_load_data : true,
  
  
        mdl_add: false,
        mdl_edit: false,
        mdl_hapus : false,
        mdl_view_lampiran : false,
        btn_add: false,



        mdl_view_list_serapan : false,
        mdl_select_list_serapan : false,
        mdl_edit_serapan : false,
        mdl_delete_serapan : false,


        mdl_list_rincian : false,
  
  
        FETCHING : FETCHING,
        UMUM : UMUM,
        DATAMASTER : DATAMASTER,
      }
    },
    methods: {
  
  
      getView : function(){
        this.$store.commit("shoWLoading");
        fetch(this.$store.state.url.CT_REALISASI_KEUANGAN + "view", {
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
  
  
      addData : function() {

        this.form.dd = this.ReConvertFormatDate(this.form.tgl).dd
        this.form.mm = this.ReConvertFormatDate(this.form.tgl).mm
        this.form.yy = this.ReConvertFormatDate(this.form.tgl).yy

        var formData = new FormData();
        formData.append('uraian', this.form.uraian);
        formData.append('no', this.form.no);
        formData.append('master_permintaan', this.form.master_permintaan);
        formData.append('realisasi', this.form.realisasi);
        formData.append('unit_kerja', this.form.unit_kerja);
        formData.append('tgl', this.form.tgl);
        formData.append('keterangan', this.form.keterangan);
        formData.append('dd', this.form.dd);
        formData.append('mm', this.form.mm);
        formData.append('yy', this.form.yy);
        formData.append('file', this.form.file);

        fetch(this.$store.state.url.CT_REALISASI_KEUANGAN + "addData", {
            method: "POST",
            headers: {
                authorization : 'kikensbatara '+localStorage.token
            },
            body: formData
        }).then(res => res.json()).then((data_urusan) => {
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
            this.getView();
        });
      },
  
  
      editData : function(){

        this.form.dd = this.ReConvertFormatDate(this.form.tgl).dd
        this.form.mm = this.ReConvertFormatDate(this.form.tgl).mm
        this.form.yy = this.ReConvertFormatDate(this.form.tgl).yy

        var formData = new FormData();
        formData.append('id', this.form.id);
        formData.append('uraian', this.form.uraian);
        formData.append('no', this.form.no);
        formData.append('master_permintaan', this.form.master_permintaan);
        formData.append('realisasi', this.form.realisasi);
        // formData.append('unit_kerja', this.form.unit_kerja);
        formData.append('tgl', this.form.tgl);
        formData.append('keterangan', this.form.keterangan);
        formData.append('dd', this.form.dd);
        formData.append('mm', this.form.mm);
        formData.append('yy', this.form.yy);
        formData.append('file', this.form.file);
        formData.append('file_old', this.form.file_old);

        fetch(this.$store.state.url.CT_REALISASI_KEUANGAN + "editData", {
            method: "POST",
            headers: {
                authorization : 'kikensbatara '+localStorage.token
            },
            body: formData
        }).then(res => res.json()).then((res_data) => {
            this.Notify('Sukses Mengubah Data', 'primary', 'check_circle_outline');
            this.getView();
        });
      },
  
      removeData : function(E){
        fetch(this.$store.state.url.CT_REALISASI_KEUANGAN + "removeData", {
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
        this.form.no = data.no ;
        this.form.master_permintaan = data.master_permintaan ;
        this.form.uraian = data.uraian ;
        this.form.realisasi = data.realisasi ;
        // this.form.unit_kerja = data.unit_kerja ;
        this.form.tgl = data.yy +'-'+UMUM.addZeroDate(data.mm)+'-'+UMUM.addZeroDate(data.dd) ;
        this.form.keterangan = data.keterangan ;
        this.form.dd = data.dd ;
        this.form.mm = data.mm ;
        this.form.yy = data.yy ;
        this.form.type = data.type ;
        this.form.file_old = data.file;

        this.serapan.realisasi_keuangan_id = data.id


        this.viewSerapan();
      },

      selectRincian : function(data){
        this.rincian.id = data.id ;
        this.rincian.kegiatan_sub_label_id = data.kegiatan_sub_label_id ;
        this.rincian.kegiatan_sub_kode = data.kegiatan_sub_kode ;
        this.rincian.uraian = data.uraian ;
        this.rincian.koefisien = data.koefisien ;
        this.rincian.satuan = data.satuan ;
        this.rincian.harga = data.harga ;
        this.rincian.ppn = data.ppn ;
        this.rincian.jml = data.jml ;


        
      },

      viewSerapan : function(){
        fetch(this.$store.state.url.CT_REALISASI_KEUANGAN_SERAPAN + "getOne", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                realisasi_keuangan_id: this.serapan.realisasi_keuangan_id,
            })
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data);
                this.list_data_serapan = res_data;
                this.TOTAL_SERAPAN = 0
                res_data.forEach(element => {
                  this.TOTAL_SERAPAN = this.TOTAL_SERAPAN + element.realisasi
                });
        });
      },

      editSerapan : function(){
        fetch(this.$store.state.url.CT_REALISASI_KEUANGAN_SERAPAN + "editData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.serapan)
        }).then(res_data => {
            this.Notify('Sukses mengubah Data', 'primary', 'check_circle_outline');
            this.viewSerapan();
        });
      },

      removeSerapan : function(){

        fetch(this.$store.state.url.CT_REALISASI_KEUANGAN_SERAPAN + "removeData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.serapan)
        }).then(res_data => {
            this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
            this.viewSerapan();
        });

        
      },

      selectSerapan : function(data){
          this.serapan.id = data.id ;
          this.serapan.rincian_id = data.rincian_id ;
          this.serapan.realisasi_keuangan_id = data.realisasi_keuangan_id ;
          this.serapan.realisasi = data.realisasi ;
          this.serapan.dd = data.dd ;
          this.serapan.mm = data.mm ;
          this.serapan.yy = data.yy ;      
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
      ReConvertFormatDate : function(data){
        const d = new Date(data)
        return {
          yy : d.getFullYear(),
          mm : d.getMonth() + 1,
          dd : d.getDate(),
        }

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
      // this.kegiatanSub.unit_kerja = profile.unit_kerja;

      this.filterku.instansi = profile.instansi_id;
      this.filterku.unit_kerja = profile.unit_kerja;

      const d = new Date();
      let year = d.getFullYear();

      // this.form.tahun = year;
      this.filterku.tahun = year;



      FETCHING.getContohAtocomplete('');
      DATAMASTER.getMasterPermintaan();
      DATAMASTER.getTahun();
      // this.getView();
      this.onChangexInstansi(); 
    },
  }
  </script>
  
  
  
  
   