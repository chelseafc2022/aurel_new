<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="main1 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">Realisasi Fisik</div>
            <div class="text-subtitle2">Realisasi</div>
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
                <td class="">Realisasi (%)</td>
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
                    <td class="">aaa</td>
                    <td class="text-center">
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

                    </td>
                  </tr>



                  <template v-for="(data2, index2) in data1.tag">
                    <tr class="h_table_body bg-white" :key="data2.id+'.a'+index+'.b'+index1+'.c'+index2">
                      <td class="text-center"></td>
                      <td class=""></td>
                      <td colspan="5">
                            <b class="h_nip2">[#] {{data2.uraian}}</b>
                            <div class="h_nip2">{{data2.keterangan}}</div>
                      </td>
                      <!-- <td class="h_nip2">777.999.999</td> -->
                      <td class="h_nip2">{{UMUM.Rupiah(data2.jml)}}</td>
                      <!-- <td class="">zzz</td> -->
                      <td class=""></td>
                      <td class="text-center">
                      




                      </td>
                    </tr>



                    <template v-for="(data3, index3) in data2.label">
                      <!-- <tr class="h_table_head main1x_1">
                        <th width="5%" class="text-center">No</th>
                        <th width="10%"  class="text-center">Kode</th>
                        <th width="60%">Uraian</th>
                        <th width="15%">Nilai (Rp.)</th>
                        <th width="10%"></th>
                      </tr> -->

                      <tr class="h_table_body bg-white" :key="data2.id+'.a'+index+'.b'+index1+'.c'+index2+'.d'+index3">
                        <td class="text-center"></td>
                        <td class=""></td>
                        <td colspan="5">
                              <b class="h_nip3">[-] {{data3.uraian}}</b>
                        </td>
                        <!-- <td class="h_nip2">888.999.999</td> -->
                        <td class="h_nip3">{{UMUM.Rupiah(data3.jml)}}</td>
                        <!-- <td class="">yyy</td> -->
                        <td class=""></td>
                        <td class="text-center">

                        </td>
                      </tr>


                      <tr class="h_table_head1 softGrey" :key="data2.id+'.a'+index+'.b'+index1+'.c'+index2+'.dxx'+index3">
                        <th colspan="2" class="text-center bg-white"></th>
                        <th >Uraian</th>
                        <th >Koefisien</th>
                        <th >Satuan</th>
                        <th >Harga</th>
                        <th >PPN</th>
                        <th >Jumlah</th>
                        <!-- <td class="">xxx</td> -->
                        <td class=""></td>
                        <th >
       
                        </th>
                      </tr>


                      <template v-for="(data4, index4) in data3.rincian">
                        <tr style="font-size: 11px; font-weight: 500;" class="h_table_body bg-white" :key="data2.id+'.a'+index+'.b'+index1+'.c'+index2+'.d'+index3+'.e'+index4">
                          <td class="text-center"></td>
                          <td class=""></td>
                          <td>
                            <ul>
                              <li>
                                {{data4.uraian}}
                              </li>
                            </ul>
                          </td>
                          <td class="">{{data4.koefisien}}</td>
                          <td class="">{{data4.satuan}}</td>
                          <td class="">{{data4.harga}}</td>
                          <td class="">{{data4.ppn}}</td>
                          <td class="">{{UMUM.Rupiah(data4.jml)}}</td>
                          <td class="">{{data4.jml_realisasi_fisik}} %</td>
                          <td class="text-center">
                             <q-btn @click="mdl_view_realisasi = true, selectRincian(data4, data3, data2, data1)" :color="UMUM.indikatorNull(data4.jml_realisasi_fisik)" text-color="white" icon="pending" size="sm" title="Detile Realisasi"/>
                          </td>
                        </tr>

                        


                      </template>

                      <tr class="softGrey1" :key="data2.id+'.a'+index+'.b'+index1+'.c'+index2+'.dyy'+index3">
                        <th colspan="2" class="text-center bg-white"></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th width="7%"></th>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>

                    </template>


                  </template>


                </template>
              </template>


              <tr class="bg-white">
                <th width="5%" class="text-center bg-white"></th>
                <th width="5%"  class="text-center bg-white"></th>
                <th width="30%"></th>
                <th width="8%"></th>
                <th width="12%"></th>
                <th width="8%"></th>
                <th width="7%"></th>
                <th width="10%"></th>
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



          <!-- ================================================= MODAL LIHAT REALISASI KEGIATAN ================================================ -->
              <q-dialog v-model="mdl_view_realisasi" persistent>
                <q-card class="mdl-lgx">
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Detile Realisasi Rincian Sub-Kegiatan</div>
                  </q-card-section>
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
                                </tr>

                  
                              </table>
                              <br>

                            </div>




                            <div class="col-12 col-md-12 frame_cari ">
                              <hr class="hrpagin2">
                              <div>
                                <q-btn class="main1x_1" size="sm" icon="+" label="Tambah Data" @click="mdl_add_realisasi=true" />
                              </div>
                              <hr class="hrpagin2">
                              

                              <span class="h_lable ">List Realisasi Keuangan</span>
                              <table width="100%">
                                <tr class="h_table_head main1x_1">
                                  <th width="5%" class="text-center">No</th>
                                  <th width="60%">Uraian</th>
                                  <th width="25%">Capaian (%)</th>
                                  <th width="10%" class="text-center">#</th>
                                </tr>
                                <tr class="h_table_body" v-for="(data, index) in list_realisasi" :key="data.id">
                                  <td class="text-center">{{index+1}}.</td>
                                  <td class="">
                                    {{data.uraian}}
                                    <div class="h_nip">
                                      ( {{UMUM.tglConvert(data.tgl)}} )  
                                    </div>  
                                  </td>
                                  <td class="">{{UMUM.Rupiah(data.realisasi)}}</td>
                                  <td class="">
                                      <q-btn-group>
                                        <q-btn color="deep-purple-4" text-color="white" icon="receipt" size="sm" @click="selectRealisasi(data), mdl_list_lampiran = true">
                                          <q-tooltip content-class="bg-deep-purple-7" content-style="font-size: 13px">
                                            Click untuk menambah lampiran data ini
                                          </q-tooltip>
                                        </q-btn>
                                        <q-btn color="orange-6" text-color="white" size="sm" icon="create" @click="selectRealisasi(data), mdl_edit_realisasi= true">
                                          <q-tooltip content-class="bg-orange" content-style="font-size: 13px">
                                            Click untuk mengubah data ini
                                          </q-tooltip>
                                        </q-btn>

                                        <q-btn color="red-6" text-color="white" size="sm" icon="clear" @click="selectRealisasi(data), mdl_hapus_realisasi= true">
                                          <q-tooltip content-class="bg-red" content-style="font-size: 13px">
                                            Click untuk menghapus data ini
                                          </q-tooltip>
                                        </q-btn>
                                      </q-btn-group>
                                  </td>
                                </tr>
                              </table>

                            </div>
                            
                            <div class="col-12 col-md-6 frame_cari ">
                              <hr class="hrpagin2">
                              <span class="h_lable ">Target Persentase</span>
                              <div class="h_ket" style="color:#9c9c9c">
                                {{realisasi_target_persen}}%
                              </div>
                              <hr class="hrpagin2">
                            </div>
                            <div class="col-12 col-md-6 frame_cari ">
                              <hr class="hrpagin2">
                              <span class="h_lable ">Total Capaian</span>
                              <div class="h_ket" style="color:#9c9c9c">
                                {{realisasi_target_capaian}}%
                              </div>
                              <hr class="hrpagin2">
                            </div>
                         

                        </div>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <!-- <q-btn  color="primary" @click="addRealisasi()" label="Simpan" /> -->
                        <q-btn label="Batal" color="negative" @click="getView()" v-close-popup />
                    </q-card-actions>

                </q-card>
              </q-dialog>
          <!-- ================================================= MODAL LIHAT REALISASI KEGIATAN ================================================ -->


          <!-- ================================================ MODAL TAMBAH REALISASI KEGIATAN ================================================ -->
            <q-dialog v-model="mdl_add_realisasi" persistent>
                <q-card class="mdl-md ">
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Tambah Data Realisasi Fisik Rincian Sub-Kegiatan</div>
                  </q-card-section>
                    <!-- <form @submit.prevent="addRealisasi()"> -->
                    <form > 
                      <q-card-section class="q-pt-none">
                        <br>
                        <div class="row">

                            <div class="col-12 col-md-12 frame_cari frame_cari">
                              <span class="h_lable ">BKU/SP2D/Lainnya</span>
                              <select v-model="realisasi.realisasi_keuangan_serapan_id" class="bg-white">
                                <option v-for="data in $store.state.list_rincian_keuangan_serapan" :key="data.realisasi_keuangan_serapan_id" :value="data.realisasi_keuangan_serapan_id">
                                🔹 ({{ data.master_permintaan_uraian }}) - {{ data.realisasi_keuangan_uraian }} 🔹 Rp.{{ UMUM.Rupiah(data.realisasi_keuangan_realisasi) }} 🔹 {{ UMUM.tglConvert(data.realisasi_keuangan_tgl) }}
                                </option>
                              </select>
                            </div>

                            <div class="col-12 col-md-12 frame_cari frame_cari">
                              <span class="h_lable ">Tanggal Terhitung mulai</span>
                              <q-input v-model="realisasi.tgl" outlined square :dense="true" class="bg-white margin_btn" type="date"/> 
                            </div>

                            <div class="col-12 col-md-12 frame_cari frame_cari">
                              <span class="h_lable ">Jumlah Realisasi Fisik (%)</span>
                              <q-input v-model="realisasi.realisasi" outlined square :dense="true" type="number" step="0.25" class="bg-white margin_btn" /> 
                            </div>

                            <div class="col-12 col-md-12 frame_cari frame_cari">
                              <span class="h_lable ">Uraian Realisasi</span>
                              <q-input v-model="realisasi.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                            </div>

                            <div class="col-12 col-md-12 frame_cari frame_cari">
                              <span class="h_lable ">Keterangan</span>
                              <q-input v-model="realisasi.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>
                            </div>

                            <div class="col-12 frame_cari">
                            <hr class="hrpagin">
                            </div>


                            <div class="col-12 col-md-12 frame_cari frame_cari">
                              <span class="h_lable ">Jenis Realisasi</span>
                              <select v-model="realisasi.kk_jenis" class="bg-white">
                                  <option v-for="data in $store.state.kk" :key="data.id" :value="data.id">🔹 {{ data.uraian }}</option>
                              </select>
                            </div>

                            <div class="col-12 frame_cari">
                            <hr class="hrpagin2">
                            </div>

                            <div class="col-12">
                              <div v-if="realisasi.kk_jenis == 1">
                                <Kk_kontrak :realisasi="realisasi" :type="1" @refreshz="viewRealisasi()"/>
                              </div>
                              <div v-if="realisasi.kk_jenis == 2">
                                <Kk_sppd :realisasi="realisasi" :type="1" @refreshz="viewRealisasi()"/>
                              </div>
                              <div v-if="realisasi.kk_jenis == 3">
                                <Kk_adm :realisasi="realisasi" :type="1" @refreshz="viewRealisasi()"/>
                                <!-- <Kk_adm :realisasi="realisasi" @refreshz="telaso()"/> -->
                              </div>
                              <div v-if="realisasi.kk_jenis == 4">
                                <Kk_hibah :realisasi="realisasi" :type="1" @refreshz="viewRealisasi()"/>
                              </div>
                             
                            
                            </div>

                            <!-- <div class="col-12 frame_cari">
                            <hr class="hrpagin">
                            </div> -->

                            <!-- <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                              <q-btn  color="primary" @click="addRealisasi()" label="Simpan" />
                              <q-btn label="Batal" color="negative" v-close-popup />
                            </q-card-actions> -->
                            

                        </div>
                      </q-card-section>
                    </form>
                </q-card>
            </q-dialog>
          <!-- ================================================ MODAL TAMBAH REALISASI KEGIATAN ================================================ -->

          <!-- ================================================= MODAL EDIT REALISASI KEGIATAN ================================================ -->
            <q-dialog v-model="mdl_edit_realisasi" persistent>
              <q-card class="mdl-md">
                <q-card-section class="bg-orange">
                  <div class="text-h6 h_modalhead">Edit Data Realisasi</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <br>
                  <div class="row">

                    <div class="col-12 col-md-12 frame_cari frame_cari">
                      <span class="h_lable ">BKU/SP2D/Lainnya</span>
                      <select v-model="realisasi.realisasi_keuangan_serapan_id" class="bg-white">
                          <option v-for="data in $store.state.list_rincian_keuangan_serapan" :key="data.realisasi_keuangan_serapan_id" :value="data.realisasi_keuangan_serapan_id">
                          🔹 ({{ data.master_permintaan_uraian }}) - {{ data.realisasi_keuangan_uraian }} 🔹 Rp.{{ UMUM.Rupiah(data.realisasi_keuangan_realisasi) }} 🔹 {{ UMUM.tglConvert(data.realisasi_keuangan_tgl) }}
                          </option>
                      </select>
                    </div>

                    <div class="col-12 col-md-12 frame_cari frame_cari">
                      <span class="h_lable ">Tanggal Terhitung mulai</span>
                      <q-input v-model="realisasi.tgl" outlined square :dense="true" class="bg-white margin_btn" type="date"/> 
                    </div>

                    <div class="col-12 col-md-12 frame_cari frame_cari">
                      <span class="h_lable ">Jumlah Realisasi (%)</span>
                      <q-input v-model="realisasi.realisasi" outlined square :dense="true" type="number" step="0.25" class="bg-white margin_btn" /> 
                    </div>

                    <div class="col-12 col-md-12 frame_cari frame_cari">
                      <span class="h_lable ">Uraian Realisasi</span>
                      <q-input v-model="realisasi.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                    </div>

                    <div class="col-12 col-md-12 frame_cari frame_cari">
                      <span class="h_lable ">Keterangan</span>
                      <q-input v-model="realisasi.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>
                    </div>

                    <div class="col-12 col-md-12 frame_cari frame_cari">
                      <span class="h_lable ">Jenis Realisasi</span>
                      <select v-model="realisasi.kk_jenis" class="bg-white">
                          <option v-for="data in $store.state.kk" :key="data.id" :value="data.id">🔹 {{ data.uraian }}</option>
                      </select>
                    </div>

                    <div class="col-12 frame_cari">
                    <hr class="hrpagin2">
                    </div>

                    <div class="col-12">
                      <div v-if="realisasi.kk_jenis == 1">
                        <Kk_kontrak :realisasi="realisasi" :type="2" @refreshz="viewRealisasi()"/>
                      </div>
                      <div v-if="realisasi.kk_jenis == 2">
                        <Kk_sppd :realisasi="realisasi" :type="2" @refreshz="viewRealisasi()"/>
                      </div>
                      <div v-if="realisasi.kk_jenis == 3">
                        <Kk_adm :realisasi="realisasi" :type="2" @refreshz="viewRealisasi()"/>
                        <!-- <Kk_adm :realisasi="realisasi" @refreshz="telaso()"/> -->
                      </div>
                      <div v-if="realisasi.kk_jenis == 4">
                        <Kk_hibah :realisasi="realisasi" :type="2" @refreshz="viewRealisasi()"/>
                      </div>
                      
                    
                    </div>

                  </div>
                </q-card-section>

                <!-- <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                  
                    <q-btn color="primary" @click="editRealisasi()" label="Simpan" />
                    <q-btn label="Batal" color="negative" v-close-popup />
            
                </q-card-actions> -->
              </q-card>
            </q-dialog>
          <!-- ================================================= MODAL EDIT REALISASI KEGIATAN ================================================ -->

          <!-- ================================================ MODAL HAPUS REALISASI KEGIATAN ================================================ -->
            <q-dialog v-model="mdl_hapus_realisasi" persistent>
                <q-card class="mdl-sm ">
                <q-card-section class="q-pt-none text-center orageGrad">
                    <form @submit.prevent="removeRealisasi()">
                        <br>
                        <img src="img/alert.png" alt="" width="75"> <br>
                        <!-- <div class="h_notifikasi">Dengan menghapus data ini, maka rincian kegiatan akan ikut terhapus</div>
                        <br> -->
                        <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MENGHAPUS DATA LABEL INI??</span>
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
          <!-- ================================================ MODAL HAPUS REALISASI KEGIATAN ================================================ -->





          <!-- ================================================ MODAL LIST LAMPIRAN KEGIATAN ================================================ -->
            <q-dialog v-model="mdl_list_lampiran" persistent>
                <q-card class="mdl-lg ">
                  

                  <q-card-section class="bg-deep-purple-3">
                    <div class="text-h6 h_modalhead">List Lampiran</div>
                  </q-card-section>

                  <!--  -->

                      <q-card-section class="q-pt-none">
                        <br>
                        <div class="row">

                          <div class="col-12 col-md-12 frame_cari ">

                            <div>

                              <!-- =========== ADM ========= -->

                              <div v-if="realisasi.kk_jenis == 3">
                                <div class="col-12 col-md-12 frame_cari ">
                                  <span class="h_lable ">Detil Kegiatan</span>
                                  <table width="100%">
    
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" style="width:30%">Nama BKU</td>
                                      <td class="" style="width:70%">{{realisasi.detile.bku_uraian}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Nilai BKU Rincian Kegiatan</td>
                                      <td class="">{{realisasi.detile.bku_nilai_rincian_kegiatan}}</td>
                                    </tr>


                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Nilai Keuangan</td>
                                      <td class="">{{realisasi.detile.nilai}}</td>
                                    </tr>
                                    
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >PPN</td>
                                      <td class="">{{realisasi.detile.ppn}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Realisasi PPN</td>
                                      <td class="">{{realisasi.detile.ppn}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Jenis PPH</td>
                                      <td class="">{{realisasi.detile.master_pph_uraian}} - {{realisasi.detile.master_pph_nilai}}%</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >PPH</td>
                                      <td class="">{{realisasi.detile.pph_nilai}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Realisasi PPH</td>
                                      <td class="">{{realisasi.detile.pph_realisasi}}</td>
                                    </tr>
                                  </table>
                                  <br>
                                </div>
                              </div>

                              <!-- =========== KONTRAK ========= -->

                              <div v-if="realisasi.kk_jenis == 1">
                                <div class="col-12 col-md-12 frame_cari ">
                                  <span class="h_lable ">Detil Kegiatan</span>
                                  <table width="100%">
    
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" style="width:30%">Nama BKU</td>
                                      <td class="" style="width:70%">{{realisasi.detile.bku_uraian}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Nilai BKU Rincian Kegiatan</td>
                                      <td class="">{{realisasi.detile.bku_nilai_rincian_kegiatan}}</td>
                                    </tr>


                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Nomor</td>
                                      <td class="">{{realisasi.detile.no}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Nilai Kontrak</td>
                                      <td class="">{{realisasi.detile.nilai}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Tanggal (Dari Tanggal - Sampai Tanggal)</td>
                                      <td class="">{{realisasi.detile.dari_tgl}} - {{realisasi.detile.sampai_tgl}}</td>
                                    </tr>
                                    
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >No Bast / PHO / FHO</td>
                                      <td class="">{{realisasi.detile.bast}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Penyedia</td>
                                      <td class="">{{realisasi.detile.penyedia}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Penanggung Jawab</td>
                                      <td class="">{{realisasi.detile.penanggung_jawab_nip}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Jabatan Penanggung Jawab</td>
                                      <td class="">{{realisasi.detile.penanggung_jawab_jabatan_kegiatan}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >PPN</td>
                                      <td class="">{{realisasi.detile.ppn}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Realisasi PPN</td>
                                      <td class="">{{realisasi.detile.ppn}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Jenis PPH</td>
                                      <td class="">{{realisasi.detile.master_pph_uraian}} - {{realisasi.detile.master_pph_nilai}}%</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >PPH</td>
                                      <td class="">{{realisasi.detile.pph_nilai}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Realisasi PPH</td>
                                      <td class="">{{realisasi.detile.pph_realisasi}}</td>
                                    </tr>
                                  </table>
                                  <br>
                                </div>
                              </div>

                               <!-- =========== HIBAH ========= -->

                               <div v-if="realisasi.kk_jenis == 4">
                                <div class="col-12 col-md-12 frame_cari ">
                                  <span class="h_lable ">Detil Kegiatan</span>
                                  <table width="100%">
    
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" style="width:30%">Nama BKU</td>
                                      <td class="" style="width:70%">{{realisasi.detile.bku_uraian}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Nilai BKU Rincian Kegiatan</td>
                                      <td class="">{{realisasi.detile.bku_nilai_rincian_kegiatan}}</td>
                                    </tr>


                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Nomor</td>
                                      <td class="">{{realisasi.detile.no}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Nilai</td>
                                      <td class="">{{realisasi.detile.nilai}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Penyedia</td>
                                      <td class="">{{realisasi.detile.penyedia}}</td>
                                    </tr>
                                    
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Nama Penerima</td>
                                      <td class="">{{realisasi.detile.penerima}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Alamat Penerima</td>
                                      <td class="">{{realisasi.detile.penerima_alamat}}</td>
                                    </tr>
                                    
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >PPN</td>
                                      <td class="">{{realisasi.detile.ppn}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Realisasi PPN</td>
                                      <td class="">{{realisasi.detile.ppn}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Jenis PPH</td>
                                      <td class="">{{realisasi.detile.master_pph_uraian}} - {{realisasi.detile.master_pph_nilai}}%</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >PPH</td>
                                      <td class="">{{realisasi.detile.pph_nilai}}</td>
                                    </tr>
                                    <tr class="h_table_body">
                                      <td class="h_table_body1" >Realisasi PPH</td>
                                      <td class="">{{realisasi.detile.pph_realisasi}}</td>
                                    </tr>
                                  </table>
                                  <br>
                                </div>
                              </div>


                              <!-- =========== SPPD ========= -->

                              <div v-if="realisasi.kk_jenis == 2">
                                <div v-if="loading == true">
                                  <div class="col-12 col-md-12 frame_cari ">
                                    <span class="h_lable ">Detil Kegiatan</span>
                                    <table width="100%">
      
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" style="width:30%">Nama BKU</td>
                                        <td class="" style="width:70%">{{realisasi.detile.bku_uraian}}</td>
                                      </tr>
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >Nilai BKU Rincian Kegiatan</td>
                                        <td class="">{{realisasi.detile.bku_nilai_rincian_kegiatan}}</td>
                                      </tr>
  
  
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >Nomor</td>
                                        <td class="">{{realisasi.detile.no}}</td>
                                      </tr>
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >Penerima</td>
                                        <td class="">{{realisasi.detile.penerima}}</td>
                                      </tr>
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >Jumlah TBK</td>
                                        <td class="">{{realisasi.detile.nilai}}</td>
                                      </tr>
  
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >Tanggal (Dari Tanggal - Sampai Tanggal)</td>
                                        <td class="">{{realisasi.detile.dari_tgl}} - {{realisasi.detile.sampai_tgl}}</td>
                                      </tr>
                                      
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >Uang Harian</td>
                                        <td class="">{{realisasi.detile.nilai_harian}}</td>
                                      </tr>
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >Tiket Pergi</td>
                                        <td class="">{{realisasi.detile.nilai_tiket_pergi}}</td>
                                      </tr>
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >Tiket Pulang</td>
                                        <td class="">{{realisasi.detile.nilai_tiket_pulang}}</td>
                                      </tr>
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >Penginapan</td>
                                        <td class="">{{realisasi.detile.nilai_penginapan}}</td>
                                      </tr>
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >Airportex</td>
                                        <td class="">{{realisasi.detile.nilai_airportex}}</td>
                                      </tr>
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >Representasi</td>
                                        <td class="">{{realisasi.detile.representasi}}</td>
                                      </tr>
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >Realisasi Keuangan</td>
                                        <td class="">{{realisasi.detile.realisasi_keuangan}}</td>
                                      </tr>
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >Selisih Realisasi</td>
                                        <td class="">{{realisasi.detile.selisih_realisasi}}</td>
                                      </tr>
                                      
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >PPN</td>
                                        <td class="">{{realisasi.detile.ppn}}</td>
                                      </tr>
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >Realisasi PPN</td>
                                        <td class="">{{realisasi.detile.ppn}}</td>
                                      </tr>
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >Jenis PPH</td>
                                        <td class="">{{realisasi.detile.master_pph_uraian}} - {{realisasi.detile.master_pph_nilai}}%</td>
                                      </tr>
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >PPH</td>
                                        <td class="">{{realisasi.detile.pph_nilai}}</td>
                                      </tr>
                                      <tr class="h_table_body">
                                        <td class="h_table_body1" >Realisasi PPH</td>
                                        <td class="">{{realisasi.detile.pph_realisasi}}</td>
                                      </tr>
                                    </table>
                                    <br>
                                  </div>

                                </div>
                              </div>

                              <!-- =========== BATAS ============ -->
                            </div>



                            <hr class="hrpagin2">
                            <div>
                              <q-btn class="main1x_1" size="sm" icon="+" label="Tambah Lampiran" @click="mdl_add_lampiran=true" />
                            </div>
                            <hr class="hrpagin2">
                            

                            <span class="h_lable ">List Realisasi Keuangan</span>
                            <table width="100%">
                              <tr class="h_table_head main1x_1">
                                <th width="5%" class="text-center">No</th>
                                <th width="85%">Uraian</th>
                                <th width="10%" class="text-center">#</th>
                              </tr>
                              <tr class="h_table_body" v-for="(data, index) in list_lampiran" :key="data.id">
                                <td class="text-center">{{index+1}}.</td>
                                <td class="">{{data.uraian}}</td>
                                <td class="">
                                    <q-btn-group>
                                      <q-btn color="blue-5" text-color="white" icon="file_present" size="sm" @click="mdl_view_lampiran = true, selectLampiran(data)">
                                        <q-tooltip content-class="bg-blue-7" content-style="font-size: 13px">
                                          Click untuk melihat lampiran data ini
                                        </q-tooltip>
                                      </q-btn>
                                      <q-btn color="orange-6" text-color="white" size="sm" icon="create" @click="mdl_edit_lampiran= true, selectLampiran(data)">
                                        <q-tooltip content-class="bg-orange" content-style="font-size: 13px">
                                          Click untuk mengubah lampiran data ini
                                        </q-tooltip>
                                      </q-btn>
                                      <q-btn color="red-6" text-color="white" size="sm" icon="clear" @click="mdl_hapus_lampiran= true, selectLampiran(data)">
                                        <q-tooltip content-class="bg-red" content-style="font-size: 13px">
                                          Click untuk menghapus lampiran data ini
                                        </q-tooltip>
                                      </q-btn>
                                    </q-btn-group>
                                </td>
                              </tr>
                            </table>

                          </div>

                        </div>
                      </q-card-section>
                      <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn label="Kembali" color="negative" v-close-popup />
                      </q-card-actions>
                </q-card>
            </q-dialog>
          <!-- ================================================ MODAL LIST LAMPIRAN KEGIATAN ================================================ -->

          <!-- ================================================ MODAL TAMBAH LAMPIRAN KEGIATAN ================================================ -->
            <q-dialog v-model="mdl_add_lampiran" persistent>
                <q-card class="mdl-md ">
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Tambah Lampiran Pendukung</div>
                  </q-card-section>
                    <form @submit.prevent="addLampiran()">


                      <q-card-section class="q-pt-none">
                        <br>
                        <div class="row">


                            <div class="col-12 col-md-12 frame_cari frame_cari">
                              <span class="h_lable ">Uraian Lampiran</span>
                              <q-input v-model="lampiran.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                            </div>

                            <div class="col-12 col-md-12 frame_cari frame_cari">
                              <span class="h_lable ">File Lampiran</span>
                              <q-file v-model="lampiran.file" outlined square :dense="true" class="bg-white margin_btn">
                                <template v-slot:prepend>
                                  <q-icon name="attach_file" />
                                </template>
                              </q-file>
                            </div>

                            <div class="col-12 col-md-12 frame_cari frame_cari">
                              <span class="h_lable ">Keterangan</span>
                              <q-input v-model="lampiran.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>
                            </div>

                        </div>
                      </q-card-section>
                      <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn  color="primary" @click="addLampiran()" label="Simpan" />
                        <q-btn label="Batal" color="negative" v-close-popup />
                      </q-card-actions>
                    </form>
                </q-card>
            </q-dialog>
          <!-- ================================================ MODAL TAMBAH LAMPIRAN KEGIATAN ================================================ -->

          <!-- ================================================= MODAL EDIT LAMPIRAN KEGIATAN ================================================ -->
            <q-dialog v-model="mdl_edit_lampiran" persistent>
              <q-card class="mdl-md">
                <q-card-section class="bg-orange">
                  <div class="text-h6 h_modalhead">Edit Data Realisasi</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <br>
                  <div class="row">
                    <div class="col-12 col-md-12 frame_cari frame_cari">
                      <span class="h_lable ">Uraian Lampiran</span>
                      <q-input v-model="lampiran.uraian" outlined square :dense="true" class="bg-white margin_btn" /> 
                    </div>

                    <div class="col-12 col-md-12 frame_cari frame_cari">
                      <span class="h_lable ">File Lampiran</span>
                      <q-file v-model="lampiran.file" outlined square :dense="true" class="bg-white margin_btn">
                        <template v-slot:prepend>
                          <q-icon name="attach_file" />
                        </template>
                      </q-file>
                    </div>

                    <div class="col-12 col-md-12 frame_cari frame_cari">
                      <span class="h_lable ">Keterangan</span>
                      <q-input v-model="lampiran.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>
                    </div>
                    
                  </div>
                </q-card-section>

                <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                  
                    <q-btn color="primary" @click="editLampiran()" label="Simpan" />
                    <q-btn label="Batal" color="negative" v-close-popup />
            
                </q-card-actions>
              </q-card>
            </q-dialog>
          <!-- ================================================= MODAL EDIT LAMPIRAN KEGIATAN ================================================ -->

          <!-- ================================================ MODAL HAPUS LAMPIRAN KEGIATAN ================================================ -->
            <q-dialog v-model="mdl_hapus_lampiran" persistent>
                <q-card class="mdl-sm ">
                <q-card-section class="q-pt-none text-center orageGrad">
                    <form @submit.prevent="removeLampiran()">
                        <br>
                        <img src="img/alert.png" alt="" width="75"> <br>
                        <!-- <div class="h_notifikasi">Dengan menghapus data ini, maka rincian kegiatan akan ikut terhapus</div>
                        <br> -->
                        <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MENGHAPUS DATA LABEL INI??</span>
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
          <!-- ================================================ MODAL HAPUS LAMPIRAN KEGIATAN ================================================ -->



          <!-- ================================================ MODAL LIHAT LAMPIRAN KEGIATAN ================================================ -->
            <q-dialog v-model="mdl_view_lampiran" persistent>
                <q-card class="mdl-lg ">
                  <q-card-section class="bg-deep-purple-3">
                    <div class="text-h6 h_modalhead">Lihat Lampiran</div>
                  </q-card-section>

                      <q-card-section class="q-pt-none">
                        <br>
                        <pdfViewKu :type="lampiran.type" :pdfFile="$store.state.url.URL_APP+'uploads/'+lampiran.file_old"/>

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
import DATAMASTER from '../../library/dataMaster'
import UMUM from '../../library/umum'
import Kk_adm from '../../components/kertas_kerja/kk_adm.vue';
import Kk_kontrak from '../../components/kertas_kerja/kk_kontrak.vue';
import Kk_sppd from '../../components/kertas_kerja/kk_sppd.vue';
import Kk_hibah from '../../components/kertas_kerja/kk_hibah.vue';

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

      tag : {
        id : '',
        kegiatan_sub_kode : '',
        uraian : '',
        keterangan : '',
      },
      label : {
        id : '',
        kegiatan_sub_tag_id : '',
        uraian : '',
        rincian : [{
          uraian : '',
          koefisien : '',
          satuan : '',
          harga : 0,
          ppn : 0,
          jml : 0,
        }],
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
      realisasi_target_persen : 100,
      realisasi_target_capaian : 0,

      realisasi : {
        id : '',
        rincian_id  : '',
        realisasi_keuangan_serapan_id : '',
        uraian : '',
        realisasi  : '',
        // jns_realisasi : 
        dd : 0,
        mm : 0,
        yy : 0,
        tgl : '',
        kk_jenis : 2,
        keterangan : '',
        detile : null,
      },

      lampiran : {
        id : '',
        file : null,
        uraian : '',
        type : '',
        keterangan : '',
        fileref : '',
        filetable : 'realisasi_fisik',
        file_old: "",
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
      list_realisasi : [],
      list_lampiran : [],

      page_first: 1,
      page_last: 0,
      page_limit : 10,
      cari_value: "",
      cek_load_data : true,



      mdl_view_realisasi : false,
      mdl_add_realisasi : false,
      mdl_edit_realisasi : false,
      mdl_hapus_realisasi : false,

      mdl_list_lampiran : false,
      mdl_add_lampiran : false,
      mdl_edit_lampiran : false,
      mdl_hapus_lampiran : false,
      mdl_view_lampiran : false,

      loading : false,


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

    selectData : function(data){

        // console.log(data);
        this.form.kegiatan_kode = data.kode_full;
    },

    selectKegiatan : function(data){
      // console.log(data)
      this.form.kegiatan_id = data.kegiatan_id
      DATAMASTER.postMasterkegiatanSub(data.kode_full)
    },

    selectSubKegiatan : function(data){

      // console.log(data)
        this.kegiatanSub.tahun = data.tahun ;
        this.kegiatanSub.kegiatan_sub_id = data.kegiatan_sub_id ;

        this.tag.kegiatan_sub_kode = data.kode_full;
    },

    selectTag : function(data, data1){
        this.tag.id = data.id ;
        this.tag.kegiatan_sub_kode = data.kegiatan_sub_kode ;
        this.tag.uraian = data.uraian ;
        this.tag.keterangan = data.keterangan ;

        this.label.kegiatan_sub_tag_id = data.id;
        this.label.kegiatan_sub_kode = data1.kode_full


        // this.viewLabel(this.tag.id)
    },


    selectLabel : function(data, data2, data1){

      this.label.id = data.id ; 
        this.label.kegiatan_sub_tag_id = data.kegiatan_sub_label_id ; 
        this.label.uraian = data.uraian ; 

        this.label.kegiatan_sub_tag_id = data2.id;
        this.label.kegiatan_sub_kode = data1.kode_full
        this.label.rincian = data.rincian ; 


        this.rincian.kegiatan_sub_label_id = data.id
        this.rincian.kegiatan_sub_kode = data1.kode_full

        // console.log(data);
        // console.log(data1);
        // console.log(data2);

    },

    selectRincian : function(data, data3, data2, data1){
      
      console.log(data);
      console.log(data3);
      console.log(data2);
      console.log(data1);

        this.rincian.id = data.id ; 
        this.rincian.kegiatan_sub_label_id = data.kegiatan_sub_label_id ; 
        this.rincian.kegiatan_sub_kode = data.kegiatan_sub_kode ; 
        this.rincian.uraian = data.uraian ; 
        this.rincian.koefisien = data.koefisien ; 
        this.rincian.satuan = data.satuan ; 
        this.rincian.harga = data.harga ; 
        this.rincian.ppn = data.ppn ; 
        this.rincian.jml = data.jml ; 

        this.target.rincian_id = data.id


        this.kegiatanSub.uraian = data1.uraian
        this.kegiatanSub.kode_full = data1.kode_full
        this.kegiatanSub.master_sumber_dana_uraian = data1.master_sumber_dana_uraian


        this.tag.uraian = data2.uraian
        this.label.uraian = data3.uraian



        this.realisasi.rincian_id = this.rincian.id


        this.viewTarget();
        this.viewRealisasi();


        console.log("WOOOOOOOI");
        this.DATAMASTER.viewByRincianKegiatan(this.rincian.id)
    },

    pushRuncian : function(){
      this.label.rincian.push({
        kegiatan_sub_label_id : '',
        kegiatan_sub_kode : '',
        uraian : '',
        koefisien : '',
        satuan : '',
        harga : 0,
        ppn : 0,
        jml : 0,
      })
    },

    viewTarget : function(){
      // this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.CT_TARGET_KEUANGAN + "getOne", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.target)
      })
          .then(res => res.json())
          .then(res_data => {
              // console.log(res_data);

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



    viewRealisasi : function(){

      this.realisasi_target_capaian = 0;

      fetch(this.$store.state.url.CT_REALISASI_FISIK + "view", {
          method: "POST",
          headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify({
              rincian_id: this.realisasi.rincian_id,
          })
      })
          .then(res => res.json())
          .then(res_data => {
              this.list_realisasi = res_data;
              console.log(res_data);


              res_data.forEach(element => {
                this.realisasi_target_capaian = this.realisasi_target_capaian + parseFloat(element.realisasi)
              });

      });
    },



    // addRealisasi : function(){
    //   this.realisasi.dd = this.ReConvertFormatDate(this.realisasi.tgl).dd
    //   this.realisasi.mm = this.ReConvertFormatDate(this.realisasi.tgl).mm
    //   this.realisasi.yy = this.ReConvertFormatDate(this.realisasi.tgl).yy

    //   fetch(this.$store.state.url.CT_REALISASI_FISIK + "addData", {
    //       method: "POST",
    //       headers: {
    //         "content-type": "application/json",
    //         authorization: "kikensbatara " + localStorage.token
    //       },
    //       body: JSON.stringify(this.realisasi)
    //   }).then(res_data => {
    //       this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
    //       this.viewRealisasi();
    //   });


    //   // console.log(this.realisasi);
    //   // console.log(yy)
    // },

    editRealisasi : function(){
      this.realisasi.dd = this.ReConvertFormatDate(this.realisasi.tgl).dd
      this.realisasi.mm = this.ReConvertFormatDate(this.realisasi.tgl).mm
      this.realisasi.yy = this.ReConvertFormatDate(this.realisasi.tgl).yy

      fetch(this.$store.state.url.CT_REALISASI_FISIK + "editData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.realisasi)
      }).then(res_data => {
          this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
          this.viewRealisasi();
      });

      // console.log(this.label.rincian);
    },

    removeRealisasi : function(E){
      fetch(this.$store.state.url.CT_REALISASI_FISIK + "removeData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.realisasi)
      }).then(res_data => {
          this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
          this.viewRealisasi();
      });

    },

    selectRealisasi : function(data){
        // console.log(data)
        this.realisasi.id = data.id ;
        this.realisasi.rincian_id  = data.rincian_id ;
        this.realisasi.realisasi_keuangan_serapan_id = data.realisasi_keuangan_serapan_id;
        this.realisasi.uraian = data.uraian ;
        this.realisasi.realisasi  = data.realisasi ;
        this.realisasi.kk_jenis  = data.kk_jenis ;
        // this.realisasi.tgl = data.tgl ;
        this.realisasi.tgl = data.yy +'-'+UMUM.addZeroDate(data.mm)+'-'+UMUM.addZeroDate(data.dd) ;
        // console.log(UMUM.addZeroDate(data.mm))
        this.realisasi.keterangan = data.keterangan ;
        this.realisasi.detile = data.detile
        this.realisasi.nilai = data.nilai



        this.lampiran.fileref = data.id;
        this.viewLampiran();


        setTimeout(() => {
          this.loading =true
        }, 500);


    },



    viewLampiran : function(){

      // console.log(this.lampiran)


      fetch(this.$store.state.url.CT_LAMPIRAN + "view", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.lampiran)
      })
          .then(res => res.json())
          .then(res_data => {
              this.list_lampiran = res_data;
              console.log(res_data);

      });
    },



    addLampiran : function(){

        var formData = new FormData();
        formData.append('uraian', this.lampiran.uraian);
        formData.append('keterangan', this.lampiran.keterangan);
        formData.append('fileref', this.lampiran.fileref);
        formData.append('filetable', this.lampiran.filetable);
        formData.append('file', this.lampiran.file);

        fetch(this.$store.state.url.CT_LAMPIRAN + "addData", {
            method: "POST",
            headers: {
                authorization : 'kikensbatara '+localStorage.token
            },
            body: formData
        }).then(res => res.json()).then((data_urusan) => {
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
            this.viewLampiran();
        });



    },


    editLampiran : function(){
        var formData = new FormData();
        formData.append('id', this.lampiran.id);
        formData.append('uraian', this.lampiran.uraian);
        formData.append('keterangan', this.lampiran.keterangan);
        formData.append('fileref', this.lampiran.fileref);
        formData.append('filetable', this.lampiran.filetable);
        formData.append('file', this.lampiran.file);
        formData.append('file_old', this.lampiran.file_old);

        fetch(this.$store.state.url.CT_LAMPIRAN + "editData", {
            method: "POST",
            headers: {
                authorization : 'kikensbatara '+localStorage.token
            },
            body: formData
        }).then(res => res.json()).then((data_urusan) => {
            this.Notify('Sukses Mengubah Data', 'primary', 'check_circle_outline');
            this.viewLampiran();
        });

      // console.log(this.label.rincian);
    },

    removeLampiran : function(E){
      fetch(this.$store.state.url.CT_LAMPIRAN + "removeData", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
          },
          body: JSON.stringify(this.lampiran)
      }).then(res_data => {
          this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
          this.viewLampiran();
      });

    },


    selectLampiran : function(data){

      console.log(data)

        this.lampiran.id = data.id ;
        // this.lampiran.file = data.file ;
        this.lampiran.file_old = data.file;
        this.lampiran.uraian = data.uraian ;
        this.lampiran.type = data.type ;
        this.lampiran.keterangan = data.keterangan ;
        this.lampiran.fileref = data.fileref ;
    },







    // ====================================== CONTOH eDOC ====================================
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

    ReConvertFormatDate : function(data){
      const d = new Date(data)
      return {
        yy : d.getFullYear(),
        mm : d.getMonth() + 1,
        dd : d.getDate(),
      }

    },
    onChangex(data){
      // await DATAMASTER.postMasterUrusanBidang(val)
    },

    async AsyncKegiatan(){
      DATAMASTER.postMasterkegiatan(this.form.program_kode)
    },

    // ====================================== CONTOH eDOC ====================================

  // ====================================== CONTOH AUTOCOMPLETE ====================================
    autocomplete_sumber_dana_filter : function (val, update) {
        update(() => {
          if (val === '') {}
          else {DATAMASTER.postMasterSumberDanaAutoComplete(val)}
        })
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


          telaso : function(){
            console.log("halo Telasoooo");
          }


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
    // this.getView();
    this.onChangexInstansi(); 
  },
}
</script>




 