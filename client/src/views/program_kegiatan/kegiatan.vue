<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="main1 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Kegiatan</div>
            <div class="text-subtitle2">Program/Kegiatan</div>
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

          <div class="col-12 col-md-4 rowRight">
              <span class="h_lable ">Filter Unit Kerja</span>
              <select v-model="filterku.unit_kerja" @change="cari_data()" class="bg-white">
                  <option value="">-- SEMUA UNIT KERJA --</option>
                  <option v-for="(data, index) in $store.state.list_program" :key="data.id+'-'+index" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
              </select>
          </div>

          <div class="col-12 col-md-4 rowRight">
              <span class="h_lable ">Filter Tahun</span>
              <select v-model="filterku.tahun" @change="cari_data()" class="bg-white">
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
                <tr class="h_table_body main1xx_1" :key="data.id+'a'+index">
                    <td class="text-center">{{indexing(index+1)}}.</td>
                    <td class="h_nip">{{data.kode_full}}</td>
                    <td colspan="5">
                      <b>{{data.uraian}}</b>
                      <div class="h_nip">{{ data.program_uraian }}</div>
                    </td>
                    <td class="h_nip">{{UMUM.Rupiah(data.jml)}}</td>
                    <td class="text-center">



                      <q-btn-dropdown round dense color="deep-purple-4" size="md" label="" icon="settings" title="Setting Kegiatan">
                        <q-list>
                          <q-item clickable v-close-popup @click="mdl_add_sub_kegiatan = true, selectKegiatan(data)">
                            <q-item-section>
                              <q-item-label>Tambah</q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-item clickable v-close-popup @click="mdl_add_sub_kegiatan = true, selectKegiatan(data)">
                            <q-item-section>
                              <q-item-label>Detile</q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-item clickable v-close-popup @click="mdl_hapus = true, selectKegiatan(data)">
                            <q-item-section>
                              <q-item-label>Hapus kegiatan ini</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-btn-dropdown>


    
                    </td>
                </tr>

                <template v-for="(data1, index1) in data.sub_kegiatan">
                  <tr class="h_table_body bg-white" :key="data1.id+'.b'+index+'.'+index1">
                    <td class="text-center"></td>
                    <td class="h_nip1">{{data1.kode_full}}</td>
                    <td colspan="5">
                      {{data1.uraian}}
                      <div class="h_nip1">( SUMBER DANA : {{ data1.master_sumber_dana_uraian }} )</div>
                    </td>
                    <!-- <td class="h_nip1">999.999.999</td> -->
                    <td class="h_nip1">{{UMUM.Rupiah(data1.jml)}}</td>
                    <td class="text-center">
                    
                      <q-btn-dropdown round dense color="purple-4" size="md" label="" icon="pending" title="Setting Sub-Kegiatan">
                        <q-list>
                       
                          <q-item clickable v-close-popup @click="mdl_hapus_sub_kegiatan = true, selectSubKegiatan(data1)">
                            <q-item-section>
                              <q-item-label>Hapus Sub-Kegiatan ini</q-item-label>
                            </q-item-section>
                          </q-item>

                          <q-item clickable v-close-popup @click="mdl_add_sub_kegiatan = true, selectSubKegiatan(data1)">
                            <q-item-section>
                              <q-item-label>Detile</q-item-label>
                            </q-item-section>
                          </q-item>

                        </q-list>
                      </q-btn-dropdown>
                    </td>
                  </tr>

                  <tr v-if="data1.rincian && data1.rincian.length > 0" class="h_table_head1 softGrey">
                    <th colspan="2" class="text-center bg-white"></th>
                        <th >Uraian</th>
                        <th >Koefisien</th>
                        <th >Satuan</th>
                        <th >Harga</th>
                        <th >PPN</th>
                        <th >Jumlah</th>
                        <th >
                           <q-btn-dropdown round dense color="orange-5" size="md" label="" icon="add" title="Setting Tag Sub-Kegiatan">
                            <q-list>
                              <q-item clickable v-close-popup @click="mdl_add_sub_kegiatan_rincian = true; selectSubKegiatan(data1)">
                                <q-item-section>
                                  <q-item-label>Tambah Rincian</q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-list>
                          </q-btn-dropdown>
                          
                        </th>
                  </tr>

                  

                  <!-- ================= RINCIAN SUB KEGIATAN ================= -->
                  <template v-for="(rin, rIndex) in data1.rincian">
                    <tr class="h_table_body bg-white" :key="rin.id + '-' + rIndex">

                      <td class="text-center"></td>
                          <td class=""></td>

                      <!-- Uraian -->
                      <td>
                        {{ rin.uraian }}
                      </td>

                      <!-- Koefisien -->
                      <td class="">
                        {{ rin.koefisien }}
                      </td>

                      <!-- Satuan -->
                      <td class="">
                        {{ rin.satuan }}
                      </td>

                      <!-- Harga -->
                      <td class="">
                        {{ UMUM.Rupiah(rin.harga) }}
                      </td>

                      <!-- PPN -->
                      <td class="">
                        {{ UMUM.Rupiah(rin.ppn || 0) }}
                      </td>

                      <!-- Jumlah -->
                      <td class="">
                        {{ UMUM.Rupiah(rin.jml) }}
                      </td>

                      <!-- Aksi -->
                      <td class="text-center">
                        <q-btn
                          dense round icon="edit" size="xs" color="orange"
                          @click="mdl_edit_sub_kegiatan_rincian = true; selectRincian(rin)"
                        />
                        <q-btn
                          dense round icon="delete" size="xs" color="red-10"
                          style="margin-left:5px"
                          @click="mdl_hapus_sub_kegiatan_rincian = true; selectRincian(rin)"
                        />
                      </td>

                    </tr>
                  </template>

                  <!-- ======================================================== -->



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


          <!-- ================================================= MODAL TAMBAH ================================================ -->
              <q-dialog v-model="mdl_add" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Tambah Data Kegiatan</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>

                        <div class="row">

                          <div class="col-12 col-md-12 frame_cari ">
                            <span class="h_lable ">Tahun</span>
                            <select class="bg-white margin_btn" v-model="form.tahun">
                              <option v-for="data in $store.state.list_tahun" :key="data.id" :value="data.uraian">{{data.uraian}}</option>
                            </select>
                          </div>


                          <div class="col-12 col-md-12 frame_cari">
                              <span class="h_lable ">Program</span>
                              <select v-model="form.program_kode" @change="AsyncKegiatan()" class="bg-white margin_btn">
                                  <option v-for="data in $store.state.list_program" :key="data.id" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
                              </select>
                          </div>

                          <div class="col-12 col-md-12 frame_cari">
                              <span class="h_lable ">Pilih Kegiatan</span>

                            <table width="100%">
                              <tr class="h_table_head main1x_1">
                                <th width="5%" class="text-center">No</th>
                                <th width="10%">Kode</th>
                                <th width="75%">Kegiatan</th>
                                <th width="10%" class="text-center">#</th>

                              </tr>

                              <div>

                              </div>
                                <tr class="h_table_body main1xx" v-for="(data, index) in $store.state.list_master_kegiatan" :key="data.id">
                                    <td class="text-center">{{index+1}}.</td>
                                    <td class="">{{data.kode_full}}</td>
                                    <td >{{data.uraian}}</td>
                                    <td class="text-center">
                                      <input type="checkbox" v-model="form.kegiatan_kode" :value="data">
                                    </td>
                                </tr>

          

                            </table>

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

          <!-- ================================================ MODAL HAPUS ================================================ -->
            <q-dialog v-model="mdl_hapus" persistent>
                <q-card class="mdl-sm ">
                <q-card-section class="q-pt-none text-center orageGrad">
                    <form @submit.prevent="removeData">
                        <br>
                        <img src="img/alert.png" alt="" width="75"> <br>
                        <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MENGHAPUS DATA KEGIATAN INI??</span>
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

        <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++++++ KEGIATAN ++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->




          <!-- ================================================= MODAL TAMBAH SUB KEGIATAN ================================================ -->
              <q-dialog v-model="mdl_add_sub_kegiatan" persistent>
                <q-card class="mdl-lg">
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Tambah Data Sub-Kegiatan</div>
                  </q-card-section>

                  <form @submit.prevent="addDataKegiatanSub()">
                    <q-card-section class="q-pt-none">
                        <br>

                        <div class="row">

                          <div class="col-12 col-md-12 frame_cari ">
                            <span class="h_lable ">Pilih Tahun</span>
                            <select class="bg-white margin_btn" v-model="kegiatanSub.tahun">
                              <option v-for="data in $store.state.list_tahun" :key="data.id" :value="data.uraian">{{data.uraian}}</option>
                            </select>
                          </div>

                          <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Ketik dan Pilih Sumber Dana</span>
                            <q-select
                              v-model="kegiatanSub.sumber_dana"
                              use-input
                              hide-selected
                              fill-input
                              input-debounce="0"
                              :options="$store.state.list_master_sumber_dana"
                              option-value="kode_full"
                              option-label="uraian"
                              @filter="autocomplete_sumber_dana_filter"
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

                            <br/>
                            <span class="h_lable ">Pilih Kegiatan</span>

                            <table width="100%">
                              <tr class="h_table_head main1x_1">
                                <th width="5%" class="text-center">No</th>
                                <th width="10%">Kode</th>
                                <th width="75%">Sub-Kegiatan</th>
                                <th width="10%" class="text-center">#</th>

                              </tr>

                              <div>

                              </div>
                                <tr class="h_table_body main1xx" v-for="(data, index) in $store.state.list_master_kegiatan_sub" :key="data.id">
                                    <td class="text-center">{{index+1}}.</td>
                                    <td class="">{{data.kode_full}}</td>
                                    <td >{{data.uraian}}</td>
                                    <td class="text-center">
                                      <input type="checkbox" v-model="kegiatanSub.kegiatan_sub_kode" :value="data">
                                    </td>
                                </tr>

          

                            </table>

                          </div>

                        </div>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn :loading="btn_add" color="primary" @click="addDataKegiatanSub()" label="Simpan" />
                        <q-btn label="Batal" color="negative" v-close-popup />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
          <!-- ================================================= MODAL TAMBAH SUB KEGIATAN ================================================ -->

          <!-- ================================================ MODAL HAPUS SUB KEGIATAN ================================================ -->
            <q-dialog v-model="mdl_hapus_sub_kegiatan" persistent>
                <q-card class="mdl-sm ">
                <q-card-section class="q-pt-none text-center orageGrad">
                    <form @submit.prevent="removeDataKegiatanSub">
                        <br>
                        <img src="img/alert.png" alt="" width="75"> <br>
                        <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MENGHAPUS DATA SUB-KEGIATAN INI??</span>
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
          <!-- ================================================ MODAL HAPUS SUB KEGIATAN ================================================ -->


          <!-- ================================================= MODAL TAMBAH RINCIAN KEGIATAN ================================================ -->
              <q-dialog v-model="mdl_add_sub_kegiatan_rincian" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Tambah Data Rincian Sub-Kegiatan</div>
                  </q-card-section>

                  <form @submit.prevent="addDRincian()">
                    <q-card-section class="q-pt-none">
                        <br>

                        <div class="row">

                          <div class="col-12 col-md-12 frame_cari ">
                            <span class="h_lable ">Uraian</span>
                            <q-input v-model="rincian.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-6 frame_cari ">
                            <span class="h_lable ">Koefisien</span>
                            <q-input v-model="rincian.koefisien" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-6 frame_cari ">
                            <span class="h_lable ">Satuan</span>
                            <q-input v-model="rincian.satuan" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-6 frame_cari ">
                            <span class="h_lable ">Harga</span>
                            <q-input type="number" step="0.25" v-model="rincian.harga" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-6 frame_cari ">
                            <span class="h_lable ">PPN</span>
                            <q-input type="number" step="0.25" v-model="rincian.ppn" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-12 frame_cari ">
                            <span class="h_lable ">Jumlah Total (Otomatis terisi)</span>
                            <div class="h_ket" style="color:#9c9c9c">
                            Rp. {{rincian.jml = countRincian(rincian.koefisien, rincian.harga)}} 
                            </div>
                          </div>


                         

                        </div>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn :loading="btn_add" color="primary" @click="addDRincian()" label="Simpan" />
                        <q-btn label="Batal" color="negative" v-close-popup />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
          <!-- ================================================= MODAL TAMBAH RINCIAN KEGIATAN ================================================ -->


          <!-- ================================================ MODAL EDIT RINCIAN KEGIATAN ================================================ -->
            <q-dialog v-model="mdl_edit_sub_kegiatan_rincian" persistent>
                <q-card class="mdl-md ">
                  <q-card-section class="bg-orange">
                    <div class="text-h6 h_modalhead">Edit Data Rincian Sub-Kegiatan</div>
                  </q-card-section>
                    <form @submit.prevent="editRincian()">


                      <q-card-section class="q-pt-none">
                        <br>
                        <div class="row">

                          <div class="col-12 col-md-12 frame_cari ">
                            <span class="h_lable ">Uraian</span>
                            <q-input v-model="rincian.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-6 frame_cari ">
                            <span class="h_lable ">Koefisien</span>
                            <q-input v-model="rincian.koefisien" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-6 frame_cari ">
                            <span class="h_lable ">Satuan</span>
                            <q-input v-model="rincian.satuan" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-6 frame_cari ">
                            <span class="h_lable ">Harga</span>
                            <q-input type="number" step="0.25" v-model="rincian.harga" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-6 frame_cari ">
                            <span class="h_lable ">PPN</span>
                            <q-input type="number" step="0.25" v-model="rincian.ppn" outlined square :dense="true" class="bg-white margin_btn" /> 
                          </div>

                          <div class="col-12 col-md-12 frame_cari ">
                            <span class="h_lable ">Jumlah Total (Otomatis terisi)</span>
                            <div class="h_ket" style="color:#9c9c9c">
                            Rp. {{rincian.jml = countRincian(rincian.koefisien, rincian.harga)}} 
                            </div>
                          </div>


                         

                        </div>
                      </q-card-section>
                      <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn :loading="btn_add" color="primary" @click="editRincian()" label="Ubah" />
                        <q-btn label="Batal" color="negative" v-close-popup />
                      </q-card-actions>
                    </form>
                </q-card>
            </q-dialog>
          <!-- ================================================ MODAL EDIT RINCIAN KEGIATAN ================================================ -->


          <!-- ================================================ MODAL HAPUS RINCIAN KEGIATAN ================================================ -->
            <q-dialog v-model="mdl_hapus_sub_kegiatan_rincian" persistent>
                <q-card class="mdl-sm ">
                <q-card-section class="q-pt-none text-center orageGrad">
                    <form @submit.prevent="removeRincian()">
                        <br>
                        <img src="img/alert.png" alt="" width="75"> <br>
                        <!-- <div class="h_notifikasi">Dengan menghapus data ini, maka rincian kegiatan akan ikut terhapus</div> -->
                        <br>
                        <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MENGHAPUS DATA RINCIAN INI??</span>
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
          <!-- ================================================ MODAL HAPUS RINCIAN KEGIATAN ================================================ -->




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
        sumber_dana : '',
      },


      rincian : {
        id : '',
        kegiatan_sub_kode : '',
        uraian : '',
        koefisien : '',
        satuan : '',
        harga : 0,
        ppn : 0,
        jml : 0,
      },



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
      list_label : [],

      page_first: 1,
      page_last: 0,
      page_limit : 10,
      cari_value: "",
      cek_load_data : true,


      mdl_add: false,
      mdl_edit: false,
      mdl_hapus : false,
      btn_add: false,


      mdl_add_sub_kegiatan: false,
      mdl_hapus_sub_kegiatan : false,

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


    addDataKegiatanSub : function(){
      fetch(this.$store.state.url.CT_KEGIATAN_SUB + "addData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.kegiatanSub)
      }).then(res_data => {
          this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
          this.kegiatanSub.kegiatan_sub_kode = [];
          this.getView();
      });
    },

    removeDataKegiatanSub : function(E){
      fetch(this.$store.state.url.CT_KEGIATAN_SUB + "removeData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.kegiatanSub)
      }).then(res_data => {
          this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
          this.getView();
      });

    },

    selectSubKegiatan(data1) {
      this.rincian = {
        id: '',
        kegiatan_sub_kode: data1.kegiatan_sub_kode || data1.kode_full,
        uraian: '',
        koefisien: '',
        satuan: '',
        harga: 0,
        ppn: 0,
        jml: 0
      }
    },




    
    addDRincian : function(){
      fetch(this.$store.state.url.CT_KEGIATAN_SUB_RINCIAN + "addData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.rincian)
      }).then(res_data => {
          this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
          this.kegiatanSub.kegiatan_sub_kode = [];
          this.getView();
      });

      // console.log(this.label.rincian);
    },

    editRincian : function(){
      fetch(this.$store.state.url.CT_KEGIATAN_SUB_RINCIAN + "editData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.rincian)
      }).then(res_data => {
          this.Notify('Sukses Memperbaharui Data', 'primary', 'check_circle_outline');
          this.kegiatanSub.kegiatan_sub_kode = [];
          this.getView();
      });
    },

    removeRincian : function(E){
      fetch(this.$store.state.url.CT_KEGIATAN_SUB_RINCIAN + "removeData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.rincian)
      }).then(res_data => {
          this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
          this.getView();
      });

    },

    selectRincian : function(data, data3, data2, data1){

      // console.log(data);

        this.rincian.id = data.id ; 
        this.rincian.kegiatan_sub_kode = data.kegiatan_sub_kode ; 
        this.rincian.uraian = data.uraian ; 
        this.rincian.koefisien = data.koefisien ; 
        this.rincian.satuan = data.satuan ; 
        this.rincian.harga = data.harga ; 
        this.rincian.ppn = data.ppn ; 
    },

    countRincian : function(data1, data2){
      var datax = data1.replace('X','*')
      var datax1 = datax.replace('X','*')
      var datax2 = datax1.replace('X','*')
      var datax3 = datax2.replace('X','*')

      var datay1 = datax3.replace('x','*')
      var datay2 = datay1.replace('x','*')
      var datay3 = datay2.replace('x','*')
      var datay4 = datay3.replace('x','*')
      var datay = datay4.replace('x','*')


      try {
        var data3 = (eval(datay)) * data2
        if (data1 == undefined || data1 == null || data1 == '') {
          return 0
        } else {
          return data3
          
        }

      } catch (e) {
          if (e instanceof SyntaxError) {
            if (data3 == undefined || data3 == null || data3 == '') {
              return 0
            }
          }
      }

      // if (data1 == null || data1 == undefined || data1 == '') {
      //   return 0
      // } else {
      //   return data3
      // }

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

    // console.log(year)


    DATAMASTER.postProgram(this.form.unit_kerja)
    DATAMASTER.postMasterSumberDanaAutoComplete('')
    DATAMASTER.getTahun();





    FETCHING.getContohAtocomplete('')
  //   DATAMASTER.postMasterUrusan('')
    this.onChangexInstansi(); 
    // this.getView();
  },
}
</script>




 