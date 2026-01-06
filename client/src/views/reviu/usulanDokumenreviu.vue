<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="main1 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Direktory Publikasi</div>
            <div class="text-subtitle2">Publikasi</div>
          </div>
          <div class="col-12 col-md-2">

            <!-- <div class="row">
               <q-select class="bg-white" style="width:90%"
                v-model="filter.irban"
                :options="irban"
                option-value="id"
                option-label="irban"
                label="IRBAN"
                @input="getView()"
                outlined square :dense="true"
                emit-value
              >
              <template v-slot:no-option>
                <q-item>
                    <q-item-section class="text-grey">
                    Tidak ditemukan
                    </q-item-section>
                </q-item>
              </template>
              </q-select>
            </div> -->

          </div>
          <div class="col-12 col-md-4">
            <div class="row">
              <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:90%"/>
              
              <q-btn v-if="tipe == 1 || tipe == 4 || tipe == 5 || tipe == 6 || tipe == 7 || tipe == 8 || tipe == 9  " glossy class="tambah" @click="mdl_add = true" dense flat icon="add" style="width:10%">
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

        
            <!-- <v-subheader>List Direktory</v-subheader> -->


        <hr class="hrpagin2">



      <!-- <template bordered separator v-for="data in list_data" :key="data.id"> -->
      <template v-for="data in list_data">
        <!-- <v-divider :key="data.id" :inset="true" /> -->
        <!-- <v-list-item :key="data.id+'a'"> -->
        <!-- <v-divider :key="data.id" :inset="true" /> -->

        <div class="row">
          <div class="col-md-1 col-12 text-center">
            <a href="javascript:void(0);" class="clear_underline">
              <!-- <img class="gbrDoc" src="https://e-dokumen.konaweselatankab.go.id/img/svg/pdf.png" alt="" @click="select1(data),  mdl_list_direktori=true"> -->
              <img class="gbrDoc" src="img/doc.png" alt="" @click="select1(data),  mdl_list_direktori=true">
            </a>
          </div>
          
          <div class="col-md-11 col-12">
            <div class="">
              <a class="clear_underline h_judulDoc" href="javascript:void(0);" @click="select1(data),  mdl_list_direktori=true"> 
                {{data.uraian}}
              </a>
              <q-fab v-if="tipe == 1 || tipe == 5|| tipe == 6|| tipe == 7|| tipe == 8|| tipe == 9" class="paddingnya" color="grey-6" icon="settings" padding="2pt" direction="right">

                <q-fab-action color="orange-6" @click="selectData(data), mdl_edit = true, lokasiData(data.id)" icon="edit" padding="2pt"  />
                <q-fab-action color="red" @click="mdl_delete = true, selectData(data)" icon="clear" padding="2pt" />

              </q-fab>
            </div>

            <div class="h_titleDoc "> <a href="javascript:void(0)" class="removeTextDecoration h_nip"><strong>📅 Batas Upload File ( {{UMUM.tglConvert(data.daritgl)}} - {{UMUM.tglConvert(data.sampaitgl)}} ) </strong></a></div>
            <!-- <div class="h_sidebar_menu1">File {{data.master_uraian}} </div> -->
            <!-- <div class="h_sidebar_menu1" >FILE {{$store.state.master_type.uraian }} </div> -->
            <!-- <div class="h_titleDoc"> <a href="javascript:void(0)" class="removeTextDecoration h_subSubHeadDoc"><strong>@{{data.username}}</strong></a>
                      - {{UMUM.tglConvert(data.createAt)}}</div> -->
            <div class="h_titleDoc"> <a href="javascript:void(0)" class="removeTextDecoration h_nip"><strong>@{{data.userx}}</strong></a></div>
              
          </div>


          
        </div>
        <hr class="hrpagin3">
        <!-- </v-list-item> -->
        </template>


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
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Tambah Data Direktory</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>

                        <div class="row"> 
                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Judul Direktory</span>
                            <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>


                          <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable ">Tipe Akses</span>
                            <q-select
                              v-model="form.master_type_id"
                              use-input
                              hide-selected
                              fill-input
                              input-debounce="0"
                              :options="$store.state.list_master_type"
                              option-value="id"
                              option-label="uraian"
                              @filter="tipe_akses_filter"
                              emit-value
                              map-options
                              clearable outlined square :dense="true"
                          >
                            <template v-slot:no-option>
                              <q-item>
                                  <q-item-section class="text-grey">
                                  Tidak ditemukan
                                  </q-item-section>
                              </q-item>
                            </template>
                        </q-select>
                        </div>

                        <div class="col-12 col-md-6 frame_cari">
                          <span class="h_lable ">Tahun</span>
                            <q-select
                              v-model="form.tahun"
                              use-input
                              hide-selected
                              fill-input
                              input-debounce="0"
                              :options="tahun"
                              option-value="id"
                              option-label="tahun"
                              emit-value
                              map-options
                              clearable outlined square :dense="true"
                          >
                            <template v-slot:no-option>
                              <q-item>
                                  <q-item-section class="text-grey">
                                  Tidak ditemukan
                                  </q-item-section>
                              </q-item>
                            </template>
                        </q-select>
                        </div>

                        <div class="col-12 col-md-6 frame_cari frame_cari">
                          <span class="h_lable ">Dari Tanggal</span>
                          <q-input v-model="form.daritgl" outlined square :dense="true" type="date" class="bg-white margin_btn" /> 
                        </div>

                        <div class="col-12 col-md-6 frame_cari frame_cari">
                          <span class="h_lable ">Sampai Tanggal</span>
                          <q-input v-model="form.sampaitgl" outlined square :dense="true" type="date" class="bg-white margin_btn" /> 
                        </div>


                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Keterangan Direktory</span>
                            <q-editor v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" />
                            <!-- <p v-html="form.keterangan"></p> -->
                          </div>

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
                            <span class="h_lable ">Judul Direktory</span>
                            <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>


                          <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable ">Tipe Akses</span>
                            <q-select
                              v-model="form.master_type_id"
                              use-input
                              hide-selected
                              fill-input
                              input-debounce="0"
                              :options="$store.state.list_master_type"
                              option-value="id"
                              option-label="uraian"
                              @filter="tipe_akses_filter"
                              emit-value
                              map-options
                              clearable outlined square :dense="true"
                          >
                            <template v-slot:no-option>
                              <q-item>
                                  <q-item-section class="text-grey">
                                  Tidak ditemukan
                                  </q-item-section>
                              </q-item>
                            </template>
                        </q-select>
                        </div>

                        <div class="col-12 col-md-6 frame_cari ">
                          <span class="h_lable ">Tahun</span>
                             <q-select
                              v-model="form.tahun"
                              :options="tahun"
                              option-value="id"
                              option-label="tahun"
                              outlined square :dense="true"
                            >
                            <template v-slot:no-option>
                              <q-item>
                                  <q-item-section class="text-grey">
                                  Tidak ditemukan
                                  </q-item-section>
                              </q-item>
                            </template>
                            </q-select>
                        </div>

                        <div class="col-12 col-md-6 frame_cari frame_cari">
                          <span class="h_lable ">Dari Tanggal</span>
                          <q-input v-model="form.daritgl" outlined square :dense="true" type="date" class="bg-white margin_btn" /> 
                        </div>

                        <div class="col-12 col-md-6 frame_cari frame_cari">
                          <span class="h_lable ">Sampai Tanggal</span>
                          <q-input v-model="form.sampaitgl" outlined square :dense="true" type="date" class="bg-white margin_btn" /> 
                        </div>


                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Keterangan Direktory</span>
                            <q-editor v-model="form.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>
                          </div>

                          <div class="col-12 col-md-12 frame_cari">
                            <hr class="hrpagin2">
                          </div>
                   
                        </div>

                        <!-- <div class="col-12 col-md-12 frame_cari">
                          
                            <div class="col-12 col-md-12 frame_cari">
                              <q-btn class="glossy" @click="mdl_add_opd = true" size="sm" rounded color="deep-orange" label="Tambah OPD" />
                            </div>
                            <div class="col-12 col-md-12 frame_cari">
                              <hr class="hrpagin2">
                            </div>

                            <div class="tbl_responsive" style="margin-top: 13px;width:100%;"> -->

                              <!-- =================================================== KONTENT =========================================================== -->

                                <!-- <table >
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

                                </table> -->

                              <!-- =================================================== KONTENT =========================================================== -->
                            <!-- </div>

                          </div> -->


                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn class="bg-orange text-white" @click="editData()" label="Edit" />
                      <q-btn label="Batal" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL EDIT ================================================ -->

            <!-- ================================================ MODAL HAPUS Direktori ================================================ -->
                  <q-dialog v-model="mdl_delete" persistent>
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
            <!-- ================================================ MODAL HAPUS file ================================================ -->
                  <q-dialog v-model="mdl_hapus" persistent>
                    <q-card class="mdl-sm ">
                      <q-card-section class="q-pt-none text-center orageGrad">
                          <form @submit.prevent="removeLampiran">
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

          <!-- =================================================== MODAL LIST DATA =========================================================== -->
              <q-dialog v-model="mdl_list" persistent>
                <q-card class="mdl-lg">
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">List File</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <q-btn label="Tambah" class="main1x_1" icon="add" style="margin-top: 13px; text-color: white;" @click="mdl_add_file = true" />  &nbsp;
                    <!-- <q-btn label="Hasil" class=" text-white " icon="description" style="background-color:green; margin-top: 13px; text-color: white;" @click="getHasilaudit(), mdl_hasil_file = true" />  -->
                    
                    <!-- <q-btn v-if="form.master_type_id==3" label="Print" class="main2 text-white" icon="print" style="margin-top: 13px; text-color: white;" @click="mdl_cetak = true" /> -->
                    <!-- <q-btn label="Hasil Audit" class="main2 text-white" icon="print" style="margin-top: 13px; text-color: white;" @click="mdl_cetak = true" /> -->

                    <div class="tbl_responsive" style="margin-top: 13px;">
                      <!-- =================================================== KONTENT =========================================================== -->
                        <table width="100%">
                         <tr class="h_table_head main1x_1">
                          <th class="text-center" style="width:5%">Status</th>
                          <th class="text-left" style="width:30%">Nama File</th>
                          <th class="text-left" style="width:30%">Keterangan</th>
                          <th class="text-left" style="width:20%">Unit Kerja</th>
                          <th class="text-left" style="width:15%">Act</th>
                        </tr>
                          <tr class="h_table_body" v-for="data in list_lampiran" :key="data.id">
                            <td class="text-center">
                                <a href="javascript:void(0)" class="removeTextDecoration" @click="selectLampiran(data), mdl_keterangan = true">
                                  <q-btn v-if="data.status_wali == 0" round glossy size="xs" color="orange" icon="hourglass_empty" />
                                  <q-btn v-if="data.status_wali == 1" round size="xs" glossy color="green" icon="done" />
                                  <q-btn v-if="data.status_wali == 2" round glossy size="xs" color="red" icon="close" />
                                </a>
                              </td>
                              <td>{{data.uraian}} <br>
                                 <span class="h_nip">
                                  <strong>Waktu Upload : {{UMUM.tglConvert(data.createAt)}}</strong>
                                  </span>

                              </td>
                              <td>{{data.keterangan}}</td>
                              <td>{{data.unit_kerja_uraian}}</td>
                              <td class="text-center">

                                <q-btn-group>
                                  <q-btn @click="selectLampiran(data), mdl_open = true" glossy color="green" icon="description" class="tbl_btn">
                                    <q-tooltip content-class="bg-green-9" content-style="font-size: 13px">
                                      Lihat Lampiran
                                    </q-tooltip>
                                  </q-btn>

                                  <q-btn @click="selectLampiran(data), mdl_edit_file = true" glossy color="orange" icon="create" class="tbl_btn" :disabled="UMUM.statusNotice(data.status_wali).btn">
                                    <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                                      Click untuk mengubah data ini
                                    </q-tooltip>
                                  </q-btn>

                                  <q-btn @click="selectLampiran(data), mdl_hapus = true" glossy color="negative" icon="delete_forever" class="tbl_btn" :disabled="UMUM.statusNotice(data.status_wali).btn">
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
                    
                    <q-btn label="Batal" color="negative" @click="getLampiran()" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>

          <!-- =================================================== MODAL LIST DATA =========================================================== -->

          <!-- =================================================== MODAL LIST DIREKTORI =========================================================== -->
              <q-dialog v-model="mdl_list_direktori" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="main1">
                        <div class="text-h6 h_modalhead">Directory</div>
               
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
                      </span> <br>
                      <span v-html="nama_keterangan" class="h_sub_tittleDir">
                      </span> <br>

                      <span class="h_titleDir">
                      Jumlah File : 
                      </span>
                      <span class="h_sub_tittleDir">
                      <strong>
                      {{total_file}}
                      </strong>
                      </span> <br>
                      

                      <hr class="hrpagin2">


                      <!-- =================================================== KONTENT =========================================================== -->
                        <table width="100%">
                         <tr class="h_table_head main1x_1">
                          <th class="text-center" style="width:5%">No</th>
                          <th class="text-left" style="width:45%">Unit Kerja</th>
                          <th class="text-center" style="width:25%"> File</th>
                          <!-- <th class="text-center" style="width:25%"> Hasil</th> -->
                          <!-- <th class="text-center" style="width:25%">#</th> -->
                        </tr>
                          <tr class="h_table_body" v-for="(data,index) in list_direktori_opd" :key="data.id">
                            <td class="text-center">{{indexing(index+1)}}.</td>
                              <td>{{data.unit_kerja_uraian}}</td>
                              <!-- <td class="text-center">{{data.proses}}</td> -->
                              <td class="text-center">
                                <q-btn rounded glossy class="main1 text-white"  @click="select2(data), mdl_list = true">
                                     {{data.proses}}
                                  </q-btn>
                                  <!-- <q-btn class="tbl_btn" glossy @click="mdl_add = true" flat icon="add" rounded> -->
                              </td>

                              <!-- <td class="text-center">
                                <q-btn rounded glossy icon="search" class="main2x text-white" color="red"  @click="select2(data) , mdl_list_hasil=true">
                                    
                                  </q-btn>
                              </td> -->
                          </tr>

                        </table>

                      <!-- =================================================== KONTENT =========================================================== -->
                    </div>
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn v-if="tipe == 1" label="View" class="main1 text-white" icon="print" style="text-color: white;" @click="mdl_cetak = true" />
                      <q-btn label="Close" color="negative" v-close-popup />
                      <!-- <q-btn label="view" color="primary" v-close-popup /> -->
             
                  </q-card-actions>
                </q-card>
              </q-dialog>

          <!-- =================================================== MODAL LIST DIREKTORI =========================================================== -->

          


          <!-- ========================== ADD FILE ================================ -->
           <q-dialog v-model="mdl_add_file" persistent>
                <q-card class="mdl-xs">
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Tambah File</div>
                  </q-card-section>

                  <form @submit.prevent="addLampiran()">
                    <q-card-section class="q-pt-none">
                        <br>

                        <div class="row">

                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Pilih File</span>
                            <q-file v-model="lampiran.file" outlined square accept=".pdf" :dense="true" class="bg-white margin_btn">
                              <template v-slot:prepend>
                                <q-icon name="attach_file" />
                              </template>
                            </q-file>
                          </div>
                        </div>

                           <hr class="hrpagin2">

                        <div class="row">



                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Tipe Akses</span>
                            <q-select
                              v-model="lampiran.master_type_id"
                              use-input
                              hide-selected
                              fill-input
                              input-debounce="0"
                              :options="$store.state.list_master_type"
                              option-value="id"
                              option-label="uraian"
                              @filter="tipe_akses_filter"
                              emit-value
                              map-options
                              clearable outlined square :dense="true"
                          >
                            <template v-slot:no-option>
                              <q-item>
                                  <q-item-section class="text-grey">
                                  Tidak ditemukan
                                  </q-item-section>
                              </q-item>
                            </template>
                        </q-select>
                        </div>


                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Nama File</span>
                            <q-input v-model="lampiran.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Keterangan</span>
                            <q-input v-model="lampiran.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>
                          </div>

                        </div>


                        

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn class="main1 text-white" @click="addLampiran()" label="Simpan" />
                        <q-btn label="Batal" color="negative" v-close-popup />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
          <!-- ========================== ADD FILE ================================ -->

          
          <!-- ========================== edit FILE ================================ -->
           <q-dialog v-model="mdl_edit_file" persistent>
                <q-card class="mdl-xs">
                  <q-card-section class="bg-orange">
                    <div class="text-h6 h_modalhead">Tambah File</div>
                  </q-card-section>

                  <form @submit.prevent="editLampiran()">
                    <q-card-section class="q-pt-none">
                        <br>

                        <div class="row">

                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Pilih File</span>
                            <q-file v-model="lampiran.file" outlined square :dense="true" class="bg-white margin_btn">
                              <template v-slot:prepend>
                                <q-icon name="attach_file" />
                              </template>
                            </q-file>
                          </div>
                        </div>

                           <hr class="hrpagin2">

                        <div class="row">



                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Tipe Akses</span>
                            <q-select
                              v-model="lampiran.master_type_id"
                              use-input
                              hide-selected
                              fill-input
                              input-debounce="0"
                              :options="$store.state.list_master_type"
                              option-value="id"
                              option-label="uraian"
                              @filter="tipe_akses_filter"
                              emit-value
                              map-options
                              clearable outlined square :dense="true"
                          >
                            <template v-slot:no-option>
                              <q-item>
                                  <q-item-section class="text-grey">
                                  Tidak ditemukan
                                  </q-item-section>
                              </q-item>
                            </template>
                        </q-select>
                        </div>


                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Nama File</span>
                            <q-input v-model="lampiran.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Keterangan</span>
                            <q-input v-model="lampiran.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>
                          </div>

                        </div>


                        

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn class="bg-orange text-white" @click="editLampiran()" label="Edit" />
                        <q-btn label="Batal" color="negative" v-close-popup />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
          <!-- ========================== edit FILE ================================ -->

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


           <!-- ================================================= MODAL HASIL AUDIT ================================================ -->
               <q-dialog v-model="mdl_hasil_file" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-green">
                    <div class="text-h6 h_modalhead">Hasil Verfikasi Dokumen</div>
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
            
            
            <!-- =================================================== MODAL CETAK =========================================================== -->

            <q-dialog v-model="mdl_cetak" persistent>
                <q-card id="printsaja"  class="mdl-lg">
                  <q-card-section id="hide" class="main1">
                    <div class="text-h6 h_modalhead">CETAK</div>
                    <!-- <q-btn label="Cetak" color="primary" @click="print()" /> -->
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                          <div class="rangkakop">

                            <div style="position: absolute; left: 50%; transform: translate(-40%, -50%);">
                              <div class="text-center" style="padding-top: 30%;">
                                <div style="background-color: pink; float: left;">
                                  <img src="img/icons/logo_konsel.png" style="width: 75px; margin-left: -150px;">
                                  </div>
                                  <div class="text-center" style="float: left; margin: 0px !important;">
                                    <span class="satux">PEMERINTAH KABUPATEN KONAWE SELATAN</span> <br>
                                    <span class="satux">INSPEKTORAT DAERAH</span> <br>
                                    <span class="duax">Jl. Poros Andoolo No.1 Telp. (0408) 22600</span>
                                    </div>
                                    </div>
                                    </div> 
                           
                        <div class="text-center" style="padding-top: 100px;">
                            <hr class="hrpagin2" />
                            <br>

                            <span class="satux" > Daftar Instansi yang telah mengisi file pada Direktori/Folder {{nama_direktori}} </span> <br>

                            <div class="tbl_responsive" style="margin-top: 13px;">
                      <!-- =================================================== KONTENT =========================================================== -->
                        <table width="100%">
                         <tr class="h_table_head bg-blue-2">
                          <th class="text-center" style="width:5%">No</th>
                          <th class="text-left" style="width:70%">Unit Kerja</th>
                          <th class="text-center" style="width:25%">Jumlah File</th>
                          
                        </tr>
                          <tr class="h_table_body" v-for="(data,index) in list_direktori_opd" :key="data.id">
                            <td class="text-center">{{indexing(index+1)}}.</td>
                              <td>{{data.unit_kerja_uraian}}</td>
                              <td class="text-center">{{data.proses}}</td>
                          </tr>

                        </table>

                      <!-- =================================================== KONTENT =========================================================== -->
                    </div>
                            

                            <!-- <table width="100%" class="my-table">
                              <tr class="h_table_head">
                                <th class="text-center" style="width:15%">No</th>
                                <th class="text-left" style="width:85%">Unit Kerja</th>
                              </tr>
                              <tr class="h_table_body" v-for="(data, index) in list_cetak" :key="data.uniqid">
                                  <td class="text-center">{{indexing(index+1)}}.</td>
                                  <td v-if="data.instansi_uraian != 'Inspektorat Daerah'">{{data.instansi_uraian}}</td>
                              </tr>

                             </table> -->
                          </div>
                        </div>

                  </q-card-section>

                    
                  <q-card-actions id="hide" class="bg-grey-4 mdl-footer" align="right">
                      <q-btn label="Kembali" color="negative" v-close-popup />
                      <q-btn label="Cetak" class="main1" @click="print()" />
                  </q-card-actions>
                </q-card>
              </q-dialog>

            <!-- =================================================== MODAL CETAK =========================================================== -->



<!-- =================================================== MODAL LIST DATA =========================================================== -->
              <q-dialog v-model="mdl_list_hasil" persistent>
                <q-card class="mdl-lg">
                  <q-card-section class="h_modalhead1">
                    <div class="text-h6 h_modalhead">TANGGAPAN</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <!-- <q-btn label="Tambah" class="tambah text-white" icon="add" style="margin-top: 13px; text-color: white;" @click="mdl_add_tanggapan = true" />  &nbsp; -->
                 
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
                                  <q-btn @click="selectLampiran(data), mdl_open = true" glossy color="green" icon="description" class="tbl_btn">
                                    <q-tooltip content-class="bg-green-9" content-style="font-size: 13px">
                                      Lihat Lampiran
                                    </q-tooltip>
                                  </q-btn>

                                  <!-- <q-btn @click="selectLampiran(data), mdl_edit_file = true" glossy color="orange" icon="create" class="tbl_btn" :disabled="UMUM.statusNotice(data.status_wali).btn">
                                    <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                                      Click untuk mengubah data ini
                                    </q-tooltip>
                                  </q-btn>

                                  <q-btn @click="selectLampiran(data), mdl_hapus = true" glossy color="negative" icon="delete_forever" class="tbl_btn" :disabled="UMUM.statusNotice(data.status_wali).btn">
                                    <q-tooltip content-class="bg-red" content-style="font-size: 13px">
                                      Click untuk menghapus data ini
                                    </q-tooltip>
                                  </q-btn> -->
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
        list_instansi:[],
        list_unitkerja:[],
        cariOPD:'',
        formlist_opd:[],

         tahun: [
				      { id: '', tahun: 'Pilih Tahun'},
				     
				      { id: 2023, tahun: '2023'},
				      { id: 2024, tahun: '2024'},
				      { id: 2025, tahun: '2025'},
		    ],

        irban : [
           { id: '', irban: 'Pilih Irban'},
				   { id: 5, irban: 'IRBAN I'},
				   { id: 6, irban: 'IRBAN II'},
				   { id: 7, irban: 'IRBAN III'},
				   { id: 8, irban: 'IRBAN IV'},
				   { id: 9, irban: 'IRBAN INVESTIGASI'},
        ],

        filter : {
          irban :'' 
        },

       
        
      list_hasil:[],
      lokasi : [],
      form : {
          id              : '',
          uraian          : '',
          keterangan     : '',
          daritgl        : '',
          sampaitgl      : '',
          instansi_id    : '',
          unit_kerja_id  : '',
          master_type_id : 1,
          menu_klp : '',
          list_opd       :[],
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


        lampiran : {
          id : '',
          direktori_id : '',
          unit_kerja_id : '',
          master_type_id : 1,
          uraian : '',
          keterangan : '',
          file : null,
          file_type : '',
          status_wali : 0,
          status_opd : 0,
          notice : '',
           file_old : null,
        },

        filter : {
          tipe : '',
        },
      // ====================================== CONTOH AUTOCOMPLETE ====================================
      tipe_akses : '',
      // ====================================== CONTOH AUTOCOMPLETE ====================================
      
      autocomplete_db : '',
      // ====================================== CONTOH AUTOCOMPLETE ====================================
      
      dummyObj : null,
      list_data : [],
      list_lampiran : [],
      list_cetak : [],
      list_opd : [],
      list_direktori_opd : [],
      

      tipe: 0,

      val:[],
      
      file_path: this.$store.state.url.URL_APP + "uploads/",

      cek_load_data : true,


       mdl_add : false,
        mdl_edit : false,
        mdl_delete : false,
        mdl_hapus : false,
        mdl_list : false,
        mdl_add_file : false,
        mdl_edit_file : false,
        mdl_view_file : false,
        mdl_keterangan : false,
        mdl_add_opd : false,
        mdl_open: false,
        mdl_cetak: false,
        mdl_list_direktori: false,
        mdl_hasil_file: false,
        
        mdl_list_hasil : false,
        mdl_add_tanggapan : false,

        checkAll : true,
        tahundir : 0,
        total_file : 0,
        nama_direktori : '',
        nama_keterangan : '',


        
        instansi_id : '',
        unit_kerja : '',
        

        cthSelect : '',

        page_first: 1,
        page_last: 0,
        page_limit : 10,
        cari_value: "",
        FETCHING : FETCHING,
        UMUM : UMUM,
        
      DATA_MASTER : DATA_MASTER, 
        fileOld : null,


        hasilaudit: "",

    }
  },
  methods: {

    print : function(){
      const element = document.getElementById("printsaja");
      window.print()
    },

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

    
    getView : function(){
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
                menu_klp : this.form.menu_klp,
                instansi_id : this.instansi_id,
                unit_kerja : this.unit_kerja_id,
                direktori_id : this.id_direktori,
                tipe : this.tipe,
                irban : this.filter.irban
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
        // console.log("ini lokasi : ", this.lokasi);
        
        fetch(this.$store.state.url.URL_direktorireviu + "addData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
            form : this.form,
            lokasi:this.lokasi
          })
            
        }).then(res_data => {
            this.getView();
           this.Notify ('Sukses Menambah Data', 'primary', 'check_circle_outline');
        });


      },


    editData : function(){
      fetch(this.$store.state.url.URL_direktorireviu + "editData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
            form : this.form
          })
      }).then(res_data => {
          this.Notify('Sukses Merubah Data', 'warning', 'check_circle_outline');
          this.getView();
      });
    },

  
    removeData : function(E){
      fetch(this.$store.state.url.URL_direktorireviu + "removeData", {
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

   selectData : function(data){

          this.form.id= data.id;
          this.form.uraian = data.uraian;
          this.form.keterangan = data.keterangan;
          this.form.daritgl = data.daritgl;
          this.form.sampaitgl = data.sampaitgl;
          this.form.unit_kerja_id = data.unit_kerja_id;
          this.form.master_type_id= data.master_type_id;
          this.form.menu_klp= data.menu_klp;


          // this.lampiran.direktori_id = data.id;
          // this.lampiran.unit_kerja_id = data.unit_kerja_id;

          // this.getLampiran();

      },

      
       selectLampiran : function(data){

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
       
       

      },

      getLampiran : function(dir, unit){
   
        fetch(this.$store.state.url.URL_filereviu + "view", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                direktori_id : dir,
                unit_kerja_id : unit,
                unit_kerja : this.unit_kerja_id,
            })
        })
            .then(res => res.json())
            .then(res_data => {
              console.log(res_data)
              this.list_lampiran = res_data
        });
      },

      addLampiran: function(){
 
        var get_profile = JSON.parse(localStorage.profile);
        this.lampiran.unit_kerja_id = get_profile.profile.unit_kerja; 

        var formData = new FormData();
        formData.append('pb', JSON.stringify(this.lampiran));
        formData.append('file', this.lampiran.file);

        fetch(this.$store.state.url.URL_filereviu + 'addData', {
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

      editLampiran: function(){

        var formData = new FormData();
        formData.append('pb', JSON.stringify(this.lampiran));
        formData.append('file', this.lampiran.file);
        // formData.append('fileOld', this.fileOld);

        fetch(this.$store.state.url.URL_filereviu + 'editData', {
            method: "POST",
            headers: {
                authorization: "kikensbatara " + localStorage.token
            },
            body: formData
            }).then(res_data => {
              var a = this.lampiran.direktori_id
              var b = this.lampiran.unit_kerja_id 
              this.getLampiran(a, b); 
              this.$store.commit('notifAdd', 'Menambah')
        });
      },

      removeLampiran : function(E){
      fetch(this.$store.state.url.URL_filereviu + "removeData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({id : this.lampiran.id})
      }).then(res_data => {
        var a = this.lampiran.direktori_id
        var b = this.lampiran.unit_kerja_id 
        this.getLampiran(a, b); 
        this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
        
      });

    },

    

    getView1 : function(a){

      var get_profile = JSON.parse(localStorage.profile);
      var level_users = get_profile.profile.trista_monev;
      console.log(level_users);
        
        fetch(this.$store.state.url.URL_direktorireviu + "view1", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                id_direktori : a,
                unit_kerja_id : this.form.unit_kerja_id,
                
                unit_kerja : this.unit_kerja_id,
                level_users:level_users,
            })
        })
            .then(res => res.json())
            .then(res_data => {
              this.list_direktori_opd = res_data;

              this.nama_direktori = this.list_direktori_opd[0].uraian;
              this.tahundir = this.list_direktori_opd[0].tahun;
              this.total_file = this.list_direktori_opd.map(total => total.proses).reduce((acc, amount) => acc + amount);
              this.nama_keterangan = this.list_direktori_opd[0].keterangan;
              console.log(this.nama_keterangan);
        });
      },
      

      select1(data){
        // console.log(data);
        // console.log(data.id);data.id

        this.lampiran.direktori_id = data.id
        this.getView1(data.id)


         

        // this.lampiran.direktori_id = data.id
        // this.lampiran.unit_kerja_id
        

      },
      select2(data){
        console.log(data.id);
        console.log(data.id_instansi);
        this.lampiran.direktori_id = data.id
        this.lampiran.unit_kerja_id = data.id_instansi


        this.getLampiran(data.id, data.id_instansi);
        
        this.getTanggapan(data.id, data.id_instansi) 
        
      },

      hapusArray : function(data){
      var arr = this.lokasi
      const objWithIdIndex = arr.findIndex((obj) => obj.uniqid === data.uniqid);
      console.log(objWithIdIndex);
      this.lokasi.splice(objWithIdIndex, 1);
    },

    

    


    // ====================================== CONTOH eDOC ====================================
    onClickx(data){
      alert(data)
    },
    // ====================================== CONTOH eDOC ====================================

  // ====================================== CONTOH AUTOCOMPLETE ====================================
    tipe_akses_filter : function (val, update) {
        update(() => {
          if (val === '') {}
          else {FETCHING.getType(val)}
        })
    },

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

         iniopd : async function(){
          this.$store.state.listOPD = await FETCHING.FETCH_POST(this.$store.state.url.URL_simpeg_unit_kerja + "listreviu", {cari : this.cariOPD})
        },
          funcAwaitAdd : async function(){

        },


    // ====================================== PAGINATE ====================================







  },

  mounted () {
    
      var get_profile = JSON.parse(localStorage.profile);
      this.form.instansi_id = get_profile.profile.instansi_id;
      this.form.unit_kerja_id = get_profile.profile.unit_kerja;
      this.form.menu_klp = get_profile.profile.trista_monev;
      this.lampiran.unit_kerja_id = get_profile.profile.unit_kerja;
      this.instansi_id = get_profile.profile.instansi_id;
      this.unit_kerja_id = get_profile.profile.unit_kerja;

      this.tipe = get_profile.profile.trista_monev;
      this.filter.tipe = get_profile.profile.trista_monev;

      this.getView();
    FETCHING.getContohAtocomplete('');
    FETCHING.getType('');
    
    this.iniopd();
    // this.getView();
  },
}
</script>




 