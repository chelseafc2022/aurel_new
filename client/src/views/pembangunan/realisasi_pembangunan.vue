<template>
    <div class="about" style="padding:15px">
      <q-card bordered class="my-card">
        <q-card-section class="main1 text-white">
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="text-h6 h_titleHead">Realisasi Pembangunan</div>
              <div class="text-subtitle2">Pembangunan</div>
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
  
  
          <hr class="hrpagin2">
  
  
          <div class="tbl_responsive">
            <!-- =================================================== KONTENT =========================================================== -->
                <table width="100%">
                    <tr class="h_table_head main1x_1">
                        <th width="5%" class="text-center">No</th>
                        <th width="35%">Paket</th>
                        <th width="25%">Kegiatan/sub/Unit Kerja</th>
                        <th width="10%">Nilai (Rp)</th>
                        <th width="10%">Realisasi (%)</th>
                        <th width="5%"></th>
                    </tr>
                    <tr class="h_table_body" v-for="(data, i) in list_data" :key="data.id+'a'+i">
                        <td class="text-center">{{indexing(i+1)}}.</td>
                        <td>
                            <div>
                              {{data.nama_paket}}
                              <q-icon v-if="data.jml_target == 0" class="icon_indicator" name="warning" color="orange"/>
                              <!-- <q-icon v-if="data.jml_target >0" class="icon_indicator" name="check" color="light-green"/> -->
                            </div>
                            <div style="margin-top:5px" v-if="data.kegiatan_sub_rincian_uraian != null && data.kegiatan_sub_rincian_uraian != ''" class="h_nip">Rincian Keg : {{data.kegiatan_sub_rincian_uraian}}</div>
                            <!-- <div style="margin-top:5px" v-if="data.kegiatan_sub_rincian_uraian == null || data.kegiatan_sub_rincian_uraian == ''" class="h_nip"  @click="mdl_sync_rincian_kegiatan = true, selectData(data), getViewKegiatanSubTag()">Rincian Keg : <span class="h_syncx">Mohon di Sync</span> </div> -->
                        </td>
                        <td>
                            <div class="h_nip">Kegiatan : {{data.kegiatan_uraian}}</div>
                            <div class="h_nip1">Sub-Kegiatan : {{data.kegiatan_sub_uraian}}</div>
                            <div class="h_nip2">{{data.nama_satker}}</div>
                        
                        </td>
                        <td>{{UMUM.Rupiah(data.pagu)}}</td>
                        <td class="text-center">{{UMUM.Rupiah(data.total_jml_realisasi_fisik)}} %</td>
                        <td class="text-center">

                            <q-btn-dropdown round dense color="deep-purple-4" size="md" label="" icon="settings" title="Setting Kegiatan">
                                <q-list>
                                    <q-item clickable v-close-popup @click="mdl_view_detile_paket = true, selectData(data)">
                                        <q-item-section>
                                        <q-item-label>Detile Paket</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item clickable v-close-popup @click="mdl_view_realisasi = true, selectData(data), viewRealisasi()">
                                        <q-item-section>
                                        <q-item-label>Detile Realisasi</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                    <q-item clickable v-close-popup @click="mdl_view_detile_target = true, selectData(data), viewTarget()">
                                        <q-item-section>
                                        <q-item-label>Review Target</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </q-btn-dropdown>




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
  
          <hr class="hrpagin2">
          <br>
        </q-card-section>
      </q-card>
  
  
  
  
  
            <!-- =================================================== MODAL =========================================================== -->
  
            <!-- ================================================= MODAL LIHAT DETILE PAKET KEGIATAN ================================================ -->
              <q-dialog v-model="mdl_view_detile_paket" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Detile Paket Kegiatan</div>
                  </q-card-section>


                    <q-card-section class="q-pt-none">
                        <br>

                        <div class="row">

                            <div class="col-12 col-md-12 frame_cari ">
                              <span class="h_lable ">Referensi</span>
                              <table width="100%">

                                
                                <tr class="h_table_body">
                                  <td class="h_table_body1">Kegiatan</td>
                                  <td class="">
                                    <div class="h_nip">[{{form.kegiatan_kode}}] {{form.kegiatan_uraian}}</div>
                                  </td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="h_table_body1">Sub-Kegiatan</td>
                                  <td class="">
                                    <div class="h_nip">[{{form.kegiatan_sub_kode}}] {{form.kegiatan_sub_uraian}}</div>
                                  </td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="h_table_body1">Rincian-Kegiatan</td>
                                  <td class="">
                                    <div class="h_nip">-</div>
                                  </td>
                                </tr>
                                

                  
                              </table>
                              <br>

                            </div>




                            <div class="col-12 col-md-12 frame_cari ">
                              <span class="h_lable ">Detile Paket Kegiatan</span>
                              <table width="100%">
                                <tr class="h_table_head main1x_1">
                                  <th width="40%">Uraian</th>
                                  <th width="60%">Value</th>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="">Unit Kerja / Satker</td>
                                  <td class="h_nip">
                                    {{form.nama_satker}}
                                  </td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="">Nama PPK</td>
                                  <td class="">
                                  {{form.nama_ppk}}
                                    <div class="h_nip">NIP. {{form.nip_ppk}}</div>
                                  </td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="">Tahun Anggaran</td>
                                  <td class="">{{form.tahun_anggaran}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="">Kode RUP</td>
                                  <td class="">{{form.kd_rup}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="">Nama Paket</td>
                                  <td class="">{{form.uraian_pekerjaan}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="">Volume Paket</td>
                                  <td class="">{{form.volume_pekerjaan}}</td>
                                </tr>
                                
                                <tr class="h_table_body">
                                  <td class="">Pagu</td>
                                  <td class="">{{UMUM.Rupiah(form.pagu)}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="">Metode Pengadaan</td>
                                  <td class="">{{form.metode_pengadaan}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="">Tipe Paket</td>
                                  <td class="">{{form.tipe_paket}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="">Tgl Awal kontrak</td>
                                  <td class="">{{form.tgl_awal_kontrak}}</td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="">Tgl Akhir Kontrak</td>
                                  <td class="">{{form.tgl_akhir_kontrak}}</td>
                                </tr>
                               
                                
                                
                              </table>

                            </div>


                            
                         

                        </div>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn label="Batal" color="negative" v-close-popup />
                    </q-card-actions>

                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL LIHAT DETILE PAKET KEGIATAN ================================================ -->
           
           
            <!-- ================================================= MODAL SYNC RINCIAN KEGIATAN ================================================ -->
              <q-dialog v-model="mdl_sync_rincian_kegiatan" persistent>
                <q-card class="mdl-lgx">
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Sync Rincian Kegiatan</div>
                  </q-card-section>


                    <q-card-section class="q-pt-none">
                        <br>

                        <div class="row">

                            <div class="col-12 col-md-12 frame_cari ">
                              <span class="h_lable ">Referensi</span>
                              <table width="100%">

                                
                                <tr class="h_table_body">
                                  <td style="width:30%" class="h_table_body1">Kegiatan</td>
                                  <td style="width:60%" class="">
                                    <div class="h_nip">[{{form.kegiatan_kode}}] {{form.kegiatan_uraian}}</div>
                                  </td>
                                </tr>
                                <tr class="h_table_body">
                                  <td class="h_table_body1">Sub-Kegiatan</td>
                                  <td class="">
                                    <div class="h_nip">[{{form.kegiatan_sub_kode}}] {{form.kegiatan_sub_uraian}}</div>
                                  </td>
                                </tr>
                               
                                

                  
                              </table>
                              <br>

                            </div>




                            <div class="col-12 col-md-12 frame_cari ">
                              <span class="h_lable ">Detile Rincian Kegiatan</span>
                              <table width="100%">


                                <template v-for="(data, i) in list_tag">
                                  <tr class="h_table_head main1x_1" :key="data.id+'a'+i">
                                    <th colspan="4" class="text-center">Uraian</th>
                                    <th>Volume</th>
                                    <th>Anggaran</th>
                                    <th class="text-center">Value</th>
                                  </tr>
                                  
                                  <tr class="h_table_body">
                                    <td class="h_nip2">[#]</td>
                                    <td class="h_nip2" colspan="6">{{data.uraian}}</td>
                                  </tr>

                                  <template v-for="(data1, j) in data.label">
                                    
                                    <tr class="h_table_body" :key="data1.id+'a'+i+'b'+j">
                                      <td class=""></td>
                                      <td class="h_nip1">[-]</td>
                                      <td class="h_nip1" colspan="5">{{data1.uraian}}</td>
                                    </tr>

                                    <template v-for="(data2, k) in data1.rincian">
                                      <tr class="h_table_body" :key="data2.id+'a'+i+'b'+j+'c'+k">
                                        <td class=""></td>
                                        <td class=""></td>
                                        <td class="">-</td>
                                        <td class="">{{data2.uraian}}</td>
                                        <td class="">{{data2.koefisien}} {{ data2.satuan }}</td>
                                        <td class="">{{UMUM.Rupiah(data2.jml)}}</td>
                                        <td class="text-center">

                                          <q-btn size="sm" color="purple-3" icon="check" label="sync" @click="syncRincian(data2)"/>

                                        </td>
                                      </tr>
                                    </template>

                                  </template>

                                </template>



                                <tr class="">
                                  <td width="2%"></td>
                                  <td width="2%"></td>
                                  <td width="2%"></td>
                                  <td width="54%"></td>
                                  <td width="15%"></td>
                                  <td width="15%"></td>
                                  <td width="10%"></td>
                                </tr>

                              </table>

                            </div>


                            
                         

                        </div>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn label="Batal" color="negative" v-close-popup />
                    </q-card-actions>

                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL SYNC RINCIAN KEGIATAN ================================================ -->

  
            <!-- ================================================= MODAL LIHAT TARGET KEGIATAN ================================================ -->
              <q-dialog v-model="mdl_view_detile_target" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Detile Target Paket Kegiatan</div>
                  </q-card-section>

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
                        <q-btn label="Batal" color="negative" v-close-popup />
                    </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL LIHAT TARGET KEGIATAN ================================================ -->



            <!-- ================================================= MODAL LIHAT REALISASI KEGIATAN ================================================ -->
              <q-dialog v-model="mdl_view_realisasi" persistent>
                <q-card class="mdl-lgx">
                  <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Detile Realisasi Paket Kegiatan</div>
                  </q-card-section>
                    <q-card-section class="q-pt-none">
                        <br>

                        <div class="row">

                            <div class="col-12 col-md-12 frame_cari ">
                              <span class="h_lable ">Referensi</span>
                              <table width="100%">

                                <tr class="h_table_body">
                                  <td style="width:30%" class="h_table_body1">Kegiatan</td>
                                  <td style="width:70%" class="">
                                    [{{form.kegiatan_kode}}] {{form.kegiatan_uraian}}
                                  </td>
                                </tr>
                                <tr class="h_table_body">
                                  <td style="width:30%" class="h_table_body1">Sub-Kegiatan</td>
                                  <td style="width:70%" class="">
                                    [{{form.kegiatan_sub_kode}}] {{form.kegiatan_sub_uraian}}
                                  </td>
                                </tr>
                                
                                <tr class="h_table_body">
                                  <td class="h_table_body1">Paket-Kegiatan</td>
                                  <td class="">[-] {{form.nama_paket}}</td>
                                </tr>

                  
                              </table>
                              <br>

                            </div>




                            <div class="col-12 col-md-12 frame_cari ">
                              <hr class="hrpagin2">
                              <div>
                                <q-btn class="main1x_1" size="sm" icon="+" label="Tambah Datax" @click="mdl_add_realisasi=true" />
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
                        <q-btn label="Batal" color="negative" @click="getView()" v-close-popup />
                    </q-card-actions>

                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL LIHAT REALISASI KEGIATAN ================================================ -->

            <!-- ================================================ MODAL TAMBAH REALISASI KEGIATAN ================================================ -->
              <q-dialog v-model="mdl_add_realisasi" persistent>
                  <q-card class="mdl-md ">
                    <q-card-section class="main1">
                      <div class="text-h6 h_modalhead">Tambah Data Realisasi Paket Kegiatan</div>
                    </q-card-section>
                      <form @submit.prevent="addRealisasi()">


                        <q-card-section class="q-pt-none">
                          <br>
                          <div class="row">

                              <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable ">Jenis Realisasi</span>
                                <select v-model="realisasi.kk_jenis" class="bg-white margin_btn">
                                    <option v-for="data in $store.state.kk" :key="data.id" :value="data.id">🔹 {{ data.uraian }}</option>
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

                              


                              <!-- <div class="col-12 frame_cari">
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
                                </div>
                                <div v-if="realisasi.kk_jenis == 4">
                                  <Kk_hibah :realisasi="realisasi" :type="1" @refreshz="viewRealisasi()"/>
                                </div>
                              
                              
                              </div> -->



                              <div class="col-12 col-md-12 frame_cari frame_cari">
                                <span class="h_lable ">Keterangan</span>
                                <q-input v-model="realisasi.keterangan" outlined square :dense="true" class="bg-white margin_btn" type="textarea"/>
                              </div>

                          </div>
                        </q-card-section>
                        <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                          <q-btn  color="primary" @click="addRealisasi()" label="Simpan" />
                          <q-btn label="Batal" color="negative" v-close-popup />
                        </q-card-actions>
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

                    </div>
                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn color="primary" @click="editRealisasi()" label="Simpan" />
                      <q-btn label="Batal" color="negative" v-close-popup />
              
                  </q-card-actions>
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

                        <q-card-section class="q-pt-none">
                          <br>
                          <div class="row">

                            <div class="col-12 col-md-12 frame_cari ">
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
          pembangunan_list_id : 0,
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
        realisasi : {
          id : '',
          rincian_id  : '',
          pembangunan_list_id  : '',
          uraian : '',
          realisasi  : '',
          dd : 0,
          mm : 0,
          yy : 0,
          tgl : '',
          keterangan : '',
          kk_jenis : 1,
        },

        realisasi_target_persen : 100,
        realisasi_target_capaian : 0,

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

        filterku : {
            program_kode : '',
            tahun : '',
            unit_kerja : '',
            instansi : '',
        },

        target_persen : 100,
  
        // ====================================== CONTOH AUTOCOMPLETE ====================================
        autocomplete_db : '',
        // ====================================== CONTOH AUTOCOMPLETE ====================================
        
  
  
      
        list_data : [],
        list_tag : [],
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
  
  
        mdl_view_detile_target : false,
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
        fetch(this.$store.state.url.CT_TARGET_PEMBANGUNAN + "view", {
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




          this.target.rincian_id = data.kegiatan_sub_rincian ;
          this.target.pembangunan_list_id = data.pembangunan_list_id ;
          this.realisasi.pembangunan_list_id = data.pembangunan_list_id ;
          this.realisasi.rincian_id = data.kegiatan_sub_rincian ;
          this.target.thn = data.tahun_anggaran;

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




      viewRealisasi : function(){

        this.realisasi_target_capaian = 0;

        fetch(this.$store.state.url.CT_REALISASI_FISIK + "viewV2", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
                pembangunan_list_id: this.realisasi.pembangunan_list_id,
            })
        })
            .then(res => res.json())
            .then(res_data => {
                this.list_realisasi = res_data;
                // console.log(res_data);


                res_data.forEach(element => {
                  this.realisasi_target_capaian = this.realisasi_target_capaian + parseFloat(element.realisasi)
                });

        });
      },

      addRealisasi : function(){
        this.realisasi.dd = this.ReConvertFormatDate(this.realisasi.tgl).dd
        this.realisasi.mm = this.ReConvertFormatDate(this.realisasi.tgl).mm
        this.realisasi.yy = this.ReConvertFormatDate(this.realisasi.tgl).yy

        fetch(this.$store.state.url.CT_REALISASI_FISIK + "addDataV2", {
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


        // console.log(this.realisasi);
        // console.log(yy)
      },

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
            this.Notify('Sukses Mengubah Data', 'primary', 'check_circle_outline');
            this.viewRealisasi();
            this.mdl_edit_realisasi = false;
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
          this.realisasi.uraian = data.uraian ;
          this.realisasi.realisasi  = data.realisasi ;
          // this.realisasi.tgl = data.tgl ;
          this.realisasi.tgl = data.yy +'-'+UMUM.addZeroDate(data.mm)+'-'+UMUM.addZeroDate(data.dd) ;


          // console.log(UMUM.addZeroDate(data.mm))

          this.realisasi.keterangan = data.keterangan ;


          this.lampiran.fileref = data.id;
          this.viewLampiran();


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
      
      ReConvertFormatDate : function(data){
        const d = new Date(data)
        return {
          yy : d.getFullYear(),
          mm : d.getMonth() + 1,
          dd : d.getDate(),
        }

      },
      
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
  
  
  
  
   