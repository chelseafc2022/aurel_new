<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="main1 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Evaluasi File</div>
            <div class="text-subtitle2">Form Approve</div>
          </div>

          <div class="col-12 col-md-3">
           
          </div>
          <div class="col-12 col-md-3">
            <div class="row">
              <q-input class="bg-white" style="width:90%"
              v-model="cari_value" 
              @keyup="cari_data()" 
              outlined square 
              :dense="true" 
              />
              <q-btn glossy class="tambah" @click="mdl_add = true" dense flat icon="add" style="width:10%" disabled>
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
                <th width="30%">Nama Direktory</th>
                <th width="10%">Auditor</th>
                <th width="40%">Keterangan</th>
                <!-- <th colspan="3" class="text-center" width="20%" >Jumlah File</th> -->
                <th width="15%" class="text-center">Lihat</th>
              </tr>
              <!-- <tr>
                  <td class="text-center">⌛</td>
                  <td class="text-center">✅</td>
                  <td class="text-center">❌</td>
                </tr> -->
              <tr class="h_table_body" v-for="(data, index) in list_data_direktori" :key="data.id">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td>{{data.uraian}} </td>
                <td>{{data.userx}} </td>
                <td><p v-html="data.keterangan"></p></td>
                <!-- <td class="text-center">{{data.jmlProses}}</td>
                <td class="text-center">{{data.jmlTerima}}</td>
                <td class="text-center">{{data.jmlTolak}}</td>
                               -->
                <td class="text-center">

                <q-btn-group>
                      <q-btn glossy icon="visibility" class="tbl_btn main1 text-white" @click="mdl_unit=true, getView1(data.id), selectData(data)">
                        <q-tooltip content-class="main1" content-style="font-size: 13px">
                          Click untuk melihat lampiran
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
                            <q-btn @click="approveLampiran()" label="Verifikasi" size="sm" color="primary" v-close-popup/>

                          </form>
                      </q-card-section>
                    </q-card>
                  </q-dialog>

            <!-- ================================================ MODAL APROVE LAMPIRAN ================================================ -->


       <!-- ================================================= MODAL OPEN ================================================ -->
               <q-dialog v-model="mdl_open" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-green">
                    <div class="text-h6 h_modalhead">Lampiran</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                        <br>
                        <div class="text-center">
                           <embed :src="file_path+lampiran.file_old" width="100%" height="600" type='application/pdf'>
                        </div>

                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <!-- <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" /> -->
                      <q-btn label="Kembali" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL OPEN ================================================ -->
           
                <q-dialog v-model="mdl_kembalikan" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-red">
                    <div class="text-h6 h_modalhead">Evaluasi File</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                        <br>

                        <span class="h_lable ">Hasil Evaluasi</span>
                        <q-input v-model="lampiran.notice" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>

                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn color="warning" @click="evaluasiLampiran()" label="Evaluasi"/>
                      <q-btn label="Batal" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>

          <!-- =================================================== MODAL =========================================================== -->

           <!-- ========================== KETERANGAN ================================ -->
           <q-dialog v-model="mdl_keterangan" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-orange">
                    <div class="text-h6 h_modalhead">KETERANGAN</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                        <br>
                       <span style="margin-top:100px">{{lampiran.notice}}</span>

                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn label="Close" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>


          <!-- ========================== KETERANGAN ================================ -->

          <!-- =================================================== MODAL LIST UNIT =========================================================== -->
              <q-dialog v-model="mdl_unit" persistent>
                <q-card class="mdl-lg">
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Direktory</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                 
                    <div class="tbl_responsive" style="margin-top: 13px;">

                         <hr class="hrpagin2">
                      <span class="h_titleDir">
                      Nama Direktory/Folder : 
                      </span>
                      <span class="h_sub_tittleDir">
                      {{nama_direktori}}
                      </span> <br>
                      <span class="h_titleDir">
                      Tahun : 
                      </span>
                      <span class="h_sub_tittleDir">
                      {{tahundir}}
                      </span> <br>
                      <span class="h_titleDir">
                      Keterangan : 
                      </span>
                      <span v-html="nama_uraian" class="h_sub_tittleDir">
                      </span> <br>
                      

                      <hr class="hrpagin2">
                      <!-- =================================================== KONTENT =========================================================== -->
                        <table width="100%">
                         <tr class="h_table_head main1x_1">
                          <th rowspan="2" class="text-center" style="width:5%">No</th>
                          <th rowspan="2" class="text-left" style="width:60%">Unit Kerja</th>
                          <th colspan="3" class="text-center" style="width:10%">Jumlah File</th>
                          <th rowspan="2" class="text-center" style="width:25%">Direktori</th>
                        </tr>
                        <tr>
                          <td>⌛</td>
                          <td>✅</td>
                          <td>❌</td>
                        </tr>
                          <tr class="h_table_body" v-for="(data,index) in list_direktori_opd" :key="data.id">
                            <td class="text-center">{{indexing(index+1)}}.</td>
                              <td>{{data.unit_kerja_uraian}}</td>
                              <td class="text-center">{{data.jmlProses}}</td>
                              <td class="text-center">{{data.jmlTerima}}</td>
                              <td class="text-center">{{data.jmlTolak}}</td>
                              <td class="text-center">

                                  <!-- <q-btn class="tambah text-white" icon="visibility" style="margin-top: 13px; text-color: white;" @click="selectLampiran(data) , mdl_list=true"/>
                                  <q-btn label="HASIL AUDIT" icon="description" color="green" @click="getHasilaudit(), mdl_hasil_file=true" />
                                  <q-btn label="UPLOAD HASIL AUDIT" icon="print" color="dark yellow" @click="mdl_hasil=true" /> -->

                                  <q-btn glossy icon="visibility" class="main1 text-white" style="margin-right: 5px;" @click="selectLampiran(data) , mdl_list=true">
                                    <q-tooltip content-class="main1" content-style="font-size: 13px">
                                      Lihat File
                                    </q-tooltip>
                                  </q-btn>

                                  <!-- <q-btn glossy color="primary" icon="description" class="tbl_btn" @click="selectLampiran(data) , mdl_list_hasil=true">
                                    <q-tooltip content-class="bg-blue" content-style="font-size: 13px">
                                      Hasil Verifikasi Dokumen
                                    </q-tooltip>
                                  </q-btn> -->


                              </td>
                          </tr>

                        </table>

                      <!-- =================================================== KONTENT =========================================================== -->
                    </div>
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">

                    <!-- <q-btn label="Tambah" class="tambah text-white" icon="add" style="margin-top: 13px; text-color: white;" @click="mdl_add_file = true" />  &nbsp; -->
                    <!-- <q-btn v-if="tipe == 1 " label="Print" color="primary" class="text-white" icon="print" style="text-color: white;" @click="mdl_cetak = true, getCetak(lampiran.direktori_id)" /> -->
                    
                      <q-btn label="Batal" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>

          <!-- =================================================== MODAL LIST DIREKTORI =========================================================== -->

          <!-- =================================================== MODAL LIST DATA =========================================================== -->
              <q-dialog v-model="mdl_list" persistent>
                <q-card class="mdl-lg">
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">List File</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <!-- <q-btn label="Tambah" class="tambah text-white" icon="add" style="margin-top: 13px; text-color: white;" @click="mdl_add_file = true" />  &nbsp; -->
                    <!-- <q-btn v-if="form.master_type_id==2" label="Print" class="main2 text-white" icon="print" style="margin-top: 13px; text-color: white;" @click="mdl_cetak = true, getCetak(lampiran.direktori_id)" /> -->
                    <!-- <q-btn v-if="form.master_type_id==3" label="Print" class="main2 text-white" icon="print" style="margin-top: 13px; text-color: white;" @click="mdl_cetak = true" /> -->

                    <div class="tbl_responsive" style="margin-top: 13px;">
                      <!-- =================================================== KONTENT =========================================================== -->
                        <table width="100%">
                         <tr class="h_table_head main1x_1">
                          <th width="5%" class="text-center">No</th>
                          <th class="text-left" style="width:30%">Nama File</th>
                          <th class="text-left" style="width:30%">Keterangan</th>
                          <th class="text-left" style="width:5%">Status</th>
                          <th class="text-left" style="width:15%">Act</th>
                        </tr>
                          <tr class="h_table_body" v-for="(data,index) in list_lampiran" :key="data.id">
                            <td class="text-center">{{indexing(index+1)}}.</td>
                            <td class="text-left">
                                {{data.uraian}}
                            </td>
                            <td>{{data.keterangan}}</td>
                            <td class="text-center">
                              <a href="javascript:void(0)" class="removeTextDecoration" @click="selectFileLampiran(data), mdl_keterangan = true">
                                <q-btn v-if="data.status_wali == 0" round glossy size="xs" color="orange" icon="hourglass_empty" />
                                <q-btn v-if="data.status_wali == 1" round size="xs" glossy color="green" icon="done" />
                                <q-btn v-if="data.status_wali == 2" round glossy size="xs" color="red" icon="close" />
                              </a>
                            </td>

                              <td class="text-center">
                                <q-btn-group>
                                    <q-btn @click="selectFileLampiran(data), mdl_open = true" glossy color="blue" icon="description" class="tbl_btn">
                                      <q-tooltip content-class="main1" content-style="font-size: 13px">
                                        Click untuk melihat lampiran
                                      </q-tooltip>
                                    </q-btn>

                                    <q-btn glossy color="green" icon="assignment_turned_in" class="tbl_btn" @click="selectFileLampiran(data), mdl_approve =true">
                                      <q-tooltip content-class="bg-green-9" content-style="font-size: 13px">
                                        Setujui
                                      </q-tooltip>
                                    </q-btn>

                                    <q-btn glossy color="negative" icon="block" class="tbl_btn" @click="selectFileLampiran(data), mdl_kembalikan =true">
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
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <!-- <q-btn label="HASIL AUDIT" icon="description" color="green" @click="getHasilaudit(), mdl_hasil_file=true" />
                      <q-btn label="UPLOAD HASIL AUDIT" icon="print" color="dark yellow" @click="mdl_hasil=true" /> -->
                      <q-btn label="Batal" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>

          <!-- =================================================== MODAL LIST DATA =========================================================== -->

          <!-- ================================================= MODAL HASIL AUDIT ================================================ -->
               <q-dialog v-model="mdl_hasil" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-dark">
                    <div class="text-h6 h_modalhead">HASIL AUDIT</div>
                  </q-card-section>

                  
                  <form @submit.prevent="addHasil()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Pilih File</span>
                            <q-file v-model="hasilaudit.file" outlined square :dense="true" class="bg-white margin_btn">
                              <template v-slot:prepend>
                                <q-icon name="attach_file" />
                              </template>
                            </q-file>
                          </div>
                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Nama File</span>
                            <q-input v-model="hasilaudit.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Keterangan</span>
                            <q-input v-model="hasilaudit.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>
                          </div>
                        <!-- <div class="text-center">
                           <embed :src="file_path+lampiran.file_old" width="100%" height="600" type='application/pdf'>
                        </div> -->

                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <!-- <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" /> -->
                      
                        <q-btn class="main2 text-white" @click="addHasil()" label="Simpan" />
                      <q-btn label="Kembali" color="negative" v-close-popup />
             
                  </q-card-actions>
                  </form>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL OPEN ================================================ -->

             <!-- ================================================= MODAL HASIL AUDIT ================================================ -->
               <q-dialog v-model="mdl_hasil_file" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-green">
                    <div class="text-h6 h_modalhead">HASIL AUDIT</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                        <br>
                        <div class="text-center">
                           <embed :src="file_path+hasilaudit" width="100%" height="600" type='application/pdf'>
                        </div>

                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <!-- <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" /> -->
                      <q-btn label="Kembali" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL HASIL AUDIT ================================================ -->

            <!-- =================================================== MODAL LIST DATA =========================================================== -->
              <q-dialog v-model="mdl_list_hasil" persistent>
                <q-card class="mdl-lg">
                  <q-card-section class="h_modalhead1">
                    <div class="text-h6 h_modalhead">TANGGAPAN</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <q-btn label="Tambah" class="tambah text-white" icon="add" style="margin-top: 13px; text-color: white;" @click="mdl_add_tanggapan = true" />  &nbsp;
                 
                    <div class="tbl_responsive" style="margin-top: 13px;">
                      <!-- =================================================== KONTENT =========================================================== -->
                        <table width="100%">
                         <tr class="h_table_head bg-blue-2">
                          <th class="text-left" style="width:30%">Nama File</th>
                          <th class="text-left" style="width:30%">Keterangan</th>
                          <th class="text-left" style="width:15%">Act</th>
                        </tr>
                          <tr class="h_table_body" v-for="data in list_hasil" :key="data.id">
                            
                              <td>{{data.uraian}}</td>
                              <td>{{data.keterangan}}</td>
                              <td class="text-center">

                                <q-btn-group>
                                  <q-btn @click="selectTanggapan(data), mdl_open_tanggapan = true" glossy color="green" icon="description" class="tbl_btn">
                                    <q-tooltip content-class="bg-green-9" content-style="font-size: 13px">
                                      Lihat Lampiran
                                    </q-tooltip>
                                  </q-btn>

                                  <q-btn @click="selectTanggapan(data), mdl_edit_tanggapan = true" glossy color="orange" icon="create" class="tbl_btn" :disabled="UMUM.statusNotice(data.status_wali).btn">
                                    <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                                      Click untuk mengubah data ini
                                    </q-tooltip>
                                  </q-btn>

                                  <q-btn @click="selectTanggapan(data), mdl_delete_tanggapan = true" glossy color="negative" icon="delete_forever" class="tbl_btn" :disabled="UMUM.statusNotice(data.status_wali).btn">
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
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn label="Batal" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>

          <!-- =================================================== MODAL LIST DATA =========================================================== -->

          <!-- ================================================= MODAL TANGGAPAN ================================================ -->
               <q-dialog v-model="mdl_add_tanggapan" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-dark">
                    <div class="text-h6 h_modalhead">TAMBAH TANGGAPAN</div>
                  </q-card-section>

                  
                  <form @submit.prevent="addTanggapan()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Pilih File</span>
                            <q-file v-model="tanggapan.file" outlined square :dense="true" class="bg-white margin_btn">
                              <template v-slot:prepend>
                                <q-icon name="attach_file" />
                              </template>
                            </q-file>
                          </div>
                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Nama File</span>
                            <q-input v-model="tanggapan.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Keterangan</span>
                            <q-input v-model="tanggapan.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>
                          </div>

                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <!-- <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" /> -->
                      
                        <q-btn class="main2 text-white" @click="addTanggapan()" label="Simpan" />
                      <q-btn label="Kembali" color="negative" v-close-popup />
             
                  </q-card-actions>
                  </form>
                </q-card>
              </q-dialog>


               <!-- ================================================= MODAL TANGGAPAN ================================================ -->
               <q-dialog v-model="mdl_edit_tanggapan" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-dark">
                    <div class="text-h6 h_modalhead">EDIT TANGGAPAN</div>
                  </q-card-section>

                  
                  <form @submit.prevent="editTanggapan()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Pilih File</span>
                            <q-file v-model="tanggapan.file" outlined square :dense="true" class="bg-white margin_btn">
                              <template v-slot:prepend>
                                <q-icon name="attach_file" />
                              </template>
                            </q-file>
                          </div>
                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Nama File</span>
                            <q-input v-model="tanggapan.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Keterangan</span>
                            <q-input v-model="tanggapan.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>
                          </div>

                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <!-- <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" /> -->
                      
                        <q-btn class="main2 text-white" @click="editTanggapan()" label="Simpan" />
                      <q-btn label="Kembali" color="negative" v-close-popup />
             
                  </q-card-actions>
                  </form>
                </q-card>
              </q-dialog>

              <!-- ================================================ MODAL HAPUS Direktori ================================================ -->
                  <q-dialog v-model="mdl_delete_tanggapan" persistent>
                    <q-card class="mdl-sm ">
                      <q-card-section class="q-pt-none text-center orageGrad">
                          <form @submit.prevent="removeDatax">
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
               <q-dialog v-model="mdl_open_tanggapan" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-green">
                    <div class="text-h6 h_modalhead">Lampiran</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                        <br>
                        <div class="text-center">
                           <embed :src="file_path+tanggapan.file_old" width="100%" height="600" type='application/pdf'>
                        </div>

                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <!-- <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" /> -->
                      <q-btn label="Kembali" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL OPEN ================================================ -->




  </div>
</template>


<script>


import FETCHING from '../../library/fetching';
  import UMUM from "../../library/umum.js";

export default {
  data() {
    return {

      lampiran : {
          id : '',
          direktori_id : '',
          unit_kerja_id : '',
          master_type_id : 1,
          uraian : '',
          keterangan : '',
          file : null,
          file_type : '',
          notice : '',
          status_wali : 0,
          status_opd : 0,
        },

      hasilaudit : {
          id : '',
          direktori_id : '',
          unit_kerja_id : '',
          uraian : '',
          keterangan : '',
          file : null,
          file_type : '',
        },

      tanggapan : {
          id : '',
          direktori_id : '',
          unit_kerja_id : '',
          uraian : '',
          keterangan : '',
          file : null,
          file_type : '',
        },

        form : {
          id : '',
          uraian : '',
          keterangan: '',
          daritgl: '',
          sampaitgl: '',
          instansi_id: '',
          unit_kerja_id: '',
          master_type_id: 1,
          list_opd:[],
        },


        filterku : {
          instansi_id : '',
          unit_kerja_id : '',
          direktori_id : '',
          status_wali : null,
        },

        filter_dir : '',

        tahundir : 0,
        total_file : 0,
        nama_direktori : '',
        nama_uraian : '',

        dummyObj : null,
        
      list_lampiran : [],
        list_data_direktori : [],
        list_direktori : [],
        list_unitkerja : [],
        
        list_direktori_opd:[],
        list_hasil:[],
        
        lokasi : [],

        
        // list_dir : [],

        
      file_path: this.$store.state.url.URL_APP + "uploads/",

      instansi_id : '',
      unit_kerja : '',




        mdl_add : false,
        mdl_add_tanggapan : false,
        mdl_open_tanggapan : false,
        mdl_edit_tanggapan : false,
        mdl_edit : false,
        mdl_delete : false,
        mdl_list : false,
        mdl_add_file : false,
        mdl_edit_file : false,
        mdl_view_file : false,
        mdl_keterangan :false,
        mdl_kembalikan :false,
        mdl_approve :false,
        mdl_open : false,
        mdl_unit : false,
        mdl_hasil : false,
        mdl_hasil_file : false,
        mdl_list_hasil : false,
        mdl_delete_tanggapan : false,

        cthSelect : '',

        page_first: 1,
        page_last: 0,
        page_limit : 10,
        cari_value: "",
        FETCHING : FETCHING,
        UMUM : UMUM,
        fileOld : '',


        cari_direktory: "",
        cari_unitKerja : '',

      }
    },
  methods: {


    //  getView : async function(){
    //     fetch(this.$store.state.url.URL_file + "getView", {
    //         method: "POST",
    //         headers: {
    //         "content-type": "application/json",
    //         authorization: "kikensbatara " + localStorage.token
    //         },
    //         body: JSON.stringify({
    //             data_ke: this.page_first,
    //             cari_value: this.cari_value,
    //             page_limit : this.page_limit,
    //             unit_kerja_id : this.filterku.unit_kerja_id,
    //             direktori_id : this.filterku.direktori_id,
    //             status_wali : this.filterku.status_wali,
    //         })
    //     })
    //         .then(res => res.json())
    //         .then(res_data => {
    //           console.log(res_data)
    //           this.list_data = res_data.data;
    //           this.page_last = res_data.jml_data;
    //     });
    //   },

     getView : async function(){
        this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.URL_direktorireviu + "view", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                data_ke: this.page_first,
                cari_value: this.cari_value,
                page_limit : this.page_limit,
                unit_kerja_id : this.form.unit_kerja_id,
                master_type_id : this.form.master_type_id,
                instansi_id : this.instansi_id,
                unit_kerja : this.unit_kerja_id,
                direktori_id : this.id_direktori,
                tipe : this.tipe
            })
        })
          .then(res => res.json())
          .then(res_data => {
              this.list_data_direktori = res_data.data;
              this.page_last = res_data.jml_data;
              this.$store.commit("hideLoading");
              console.log(res_data);
      });
    },

    getHasilaudit : function(){
      fetch(this.$store.state.url.URL_filereviu + "hasilaudit", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
               
                unit_kerja : this.lampiran.unit_kerja_id,
                direktori_id : this.lampiran.direktori_id,
            })
        })
          .then(res => res.json())
          .then(res_data => {
              this.hasilaudit = res_data.data[0].file;
              console.log("sfsdf ", this.hasilaudit);
              
      });
    },


    getTanggapan : function(dir, unit){
   
        fetch(this.$store.state.url.URL_filereviu + "tanggapan", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                direktori_id : dir,
                unit_kerja_id : unit,

            })
        })
            .then(res => res.json())
            .then(res_data => {
              console.log("AAAAAAAAAAAA " + res_data.data)
              this.list_hasil = res_data.data;
        });
      },


       approveLampiran: async function(){
        // await UMUM.notifApprove();
        fetch(this.$store.state.url.URL_filereviu + 'approve', {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.lampiran)
            }).then(res_data => {
              this.getLampiran();
              this.getView1(this.form.id);
              this.Notify ('Mempublish', 'primary', 'check_circle_outline');
        });
      },

       evaluasiLampiran: async function(){
        fetch(this.$store.state.url.URL_filereviu + 'kembalikan', {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(this.lampiran)
            }).then(res_data => {
              this.getLampiran();
              this.getView1(this.form.id);
              this.Notify ('Mengevaluasi', 'primary', 'check_circle_outline');
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

    selectData : function(data){

          this.form.id = data.id;
          this.form.uraian = data.uraian;
          this.form.keterangan = data.keterangan;
          this.form.daritgl = data.daritgl;
          this.form.sampaitgl = data.sampaitgl;
          this.form.unit_kerja_id = data.unit_kerja_id;
          this.form.master_type_id = data.master_type_id;

          this.lampiran.direktori_id = data.id;
          this.lampiran.unit_kerja_id = data.unit_kerja_id;

          this.getLampiran();

      },

      getLampiran : function( ){
        // this.$store.commit("shoWLoading");
        console.log('ambe lampiran');
        console.log(this.lampiran.direktori_id);
        console.log(this.lampiran.unit_kerja_id);
        fetch(this.$store.state.url.URL_filereviu + "view", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                direktori_id : this.lampiran.direktori_id,
                unit_kerja_id : this.lampiran.unit_kerja_id
                

            })
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data)
              this.list_lampiran = res_data
        });
      },


      
      selectLampiran : function(data){
        this.lampiran.direktori_id = data.id_direktori
        this.lampiran.unit_kerja_id= data.id_instansi        
        this.lampiran.file= ''        
        this.lampiran.file_old= data.file        

        // 
        this.hasilaudit.unit_kerja_id= data.id_instansi 
        this.hasilaudit.direktori_id = data.id_direktori
        this.tanggapan.unit_kerja_id= data.id_instansi
        this.tanggapan.direktori_id = data.id_direktori
        this.tanggapan.id = data.id;
        this.tanggapan.uraian = data.uraian;
          this.tanggapan.keterangan = data.keterangan;
          this.tanggapan.file_old =  data.file
          this.tanggapan.file = this.tanggapan.file
        // 
        
        this.getLampiran() 
        this.getTanggapan(data.id_direktori, data.id_instansi) 


      },

      selectHasil : function(data){

          this.hasilaudit.id = data.id;
          this.hasilaudit.direktori_id = data.id_direktori
          this.hasilaudit.unit_kerja_id = data.unit_kerja_id;
          this.hasilaudit.uraian = data.uraian;
          this.hasilaudit.keterangan = data.keterangan;
          this.hasilaudit.file_old =  data.file
          this.hasilaudit.file = this.hasilaudit.file
      },  

      selectTanggapan : function(data){

          this.tanggapan.id = data.id;
          this.tanggapan.direktori_id = data.id_direktori
          this.tanggapan.unit_kerja_id = data.unit_kerja_id;
          this.tanggapan.uraian = data.uraian;
          this.tanggapan.keterangan = data.keterangan;
          this.tanggapan.file_old =  data.file;
          this.tanggapan.file = this.tanggapan.file
      },  

       selectFileLampiran : function(data){ 
         this.lampiran.id = data.id;
          this.lampiran.direktori_id = data.direktori_id;
          this.lampiran.unit_kerja_id = data.unit_kerja_id;
          this.lampiran.master_type_id = data.master_type_id;
          this.lampiran.uraian = data.uraian;
          this.lampiran.keterangan = data.keterangan;
          this.lampiran.status_wali = data.status_wali;
          this.lampiran.status_opd = data.status_opd;
          this.lampiran.notice = data.notice;
        this.lampiran.file_old =  data.file
        
        this.lampiran.file = this.lampiran.file
          
          this.form.unit_kerja_id = data.unit_kerja_id;

        console.log(data); 

      },

      addHasil: function(){
 
        // var get_profile = JSON.parse(localStorage.profile);
        // this.hasilaudit.unit_kerja_id = get_profile.profile.unit_kerja; 

        var formData = new FormData();
        formData.append('pbx', JSON.stringify(this.hasilaudit));
        formData.append('file', this.hasilaudit.file);

        fetch(this.$store.state.url.URL_filereviu + 'addDatax', {
            method: "POST",
            headers: {
                authorization: "kikensbatara " + localStorage.token
            },
            body: formData
            }).then(res_data => {
              
              // this.lampiran.direktori_id
               this.Notify ('Sukses Menambah Data', 'primary', 'check_circle_outline');
              var a = this.lampiran.direktori_id
              var b = this.lampiran.unit_kerja_id 
              this.getLampiran(a, b); 
              this.getView1(data.id);
        });
      },



      addTanggapan: function(){
 
        // var get_profile = JSON.parse(localStorage.profile);
        // this.hasilaudit.unit_kerja_id = get_profile.profile.unit_kerja; 

        var formData = new FormData();
        formData.append('pbx', JSON.stringify(this.tanggapan));
        formData.append('file', this.tanggapan.file);

        fetch(this.$store.state.url.URL_filereviu + 'addDatax', {
            method: "POST",
            headers: {
                authorization: "kikensbatara " + localStorage.token
            },
            body: formData
            }).then(res_data => {
              
               this.Notify ('Sukses Menambah Data', 'primary', 'check_circle_outline');
              var a = this.lampiran.direktori_id
              var b = this.lampiran.unit_kerja_id 
              this.getTanggapan(a, b); 
        });
      },
      
      editTanggapan: function(){
 
        // var get_profile = JSON.parse(localStorage.profile);
        // this.hasilaudit.unit_kerja_id = get_profile.profile.unit_kerja; 

        var formData = new FormData();
        formData.append('pbx', JSON.stringify(this.tanggapan));
        formData.append('file', this.tanggapan.file);

        fetch(this.$store.state.url.URL_filereviu + 'editDatax', {
            method: "POST",
            headers: {
                authorization: "kikensbatara " + localStorage.token
            },
            body: formData
            }).then(res_data => {
              
               this.Notify ('Sukses Menambah Data', 'primary', 'check_circle_outline');
              var a = this.lampiran.direktori_id
              var b = this.lampiran.unit_kerja_id 
              this.getTanggapan(a, b); 
        });
      },

      removeDatax : function(E){
      fetch(this.$store.state.url.URL_file + "removeDatax", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({id : this.tanggapan.id})
      }).then(res_data => {
          this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
           var a = this.lampiran.direktori_id
          var b = this.lampiran.unit_kerja_id 
          this.getTanggapan(a, b);
      });

    },

      

      


     indexing : function(index){
            var idx = ((this.page_first-1)*this.page_limit)+index
            return idx
        },

         cari_data : function(){
            this.page_first = 1;
            this.getView();
        },


        funcAwaitDir : async function(){
          this.list_direktori = await FETCHING.postDirektori(this.filterku.unit_kerja_id, this.cari_direktory)
        },
        funcAwaitUnit : async function(){
          this.list_unitkerja = await FETCHING.getUnitKerjaAutocomplete(this.cari_unitKerja)
        },

    async getView1 (b){
      console.log(b);

      this.list_direktori_opd = await FETCHING.FETCH_POST(this.$store.state.url.URL_direktorireviu + "view2", {id : b, id_instansi : this.instansi_id, tipe : this.tipe })
     this.nama_direktori = this.list_direktori_opd[0].uraian;
     this.nama_uraian = this.list_direktori_opd[0].keterangan;
     
      this.tahundir = this.list_direktori_opd[0].tahun;
     
     
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

    dir_db_filter : function (val, update) {
        update(() => {
          if (val === '') {}
          else {FETCHING.getDir(val)}
        })
    },

    // ====================================== CONTOH AUTOCOMPLETE ====================================

    iniopd : async function(){
          this.$store.state.listOPD = await FETCHING.FETCH_POST(this.$store.state.url.URL_simpeg_instansi + "list", {cari : this.cariOPD})
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

        


    // ====================================== PAGINATE ====================================







  },

  mounted () {
    FETCHING.getContohAtocomplete('');
    FETCHING.getDir('');
    FETCHING.getType('');


      var get_profile = JSON.parse(localStorage.profile);
      this.filterku.instansi_id = get_profile.profile.instansi_id;
      this.filterku.unit_kerja_id = get_profile.profile.unit_kerja;
      this.form.instansi_id = get_profile.profile.instansi_id;
      this.form.unit_kerja_id = get_profile.profile.unit_kerja;
      this.lampiran.unit_kerja_id = get_profile.profile.unit_kerja;
      // this.hasilaudit.unit_kerja_id = get_profile.profile.unit_kerja;
      this.instansi_id = get_profile.profile.instansi_id;
      this.unit_kerja_id = get_profile.profile.unit_kerja;
    this.tipe = get_profile.profile.trista_monev;
      this.funcAwaitUnit();
      this.funcAwaitDir();
    
      this.getView();
      
    this.iniopd();
      
      // this.getDir();
  },
}
</script>




 