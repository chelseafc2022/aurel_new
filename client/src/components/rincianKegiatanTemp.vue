<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="main1 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">List Sub-Kegiatan</div>
            <div class="text-subtitle2">Penyesuaian Serapan</div>
          </div>
          <div class="col-12 col-md-2"></div>
          <div class="col-12 col-md-4">
            <div class="row">
              <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white"
                style="width:90%" />
              <q-btn glossy class="bg-light-blue-10" dense flat icon="add" style="width:10%">
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


        <div class="row">

          <!-- <div class="col-12 col-md-4 rowRight">
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
          </div> -->

        </div>


        <hr class="hrpagin2">


        <div class="tbl_responsive">
          <!-- =================================================== KONTENT =========================================================== -->
          <table width="100%">
            <tr class="h_table_head main1">
              <th class="text-center">No</th>
              <th class="text-center">Kode</th>
              <th>Program / Kegiatan</th>
              <th>Pagu (Rp.)</th>
              <th>Realisasi (Rp.)</th>
              <th>Selisih (Rp.)</th>
            </tr>

            <div>

            </div>
            <!-- PROGRAM -->
            <template v-for="(prog, pIndex) in list_data">
              <tr class="h_table_body main1xx_1">
                <td>{{ indexing(pIndex + 1) }}</td>
                <td class="h_nip">{{ prog.kode_full }}</td>
                <td>
                  <b>{{ prog.uraian }}</b>
                  <div class="h_nip">{{ prog.program_uraian }}</div>
                </td>
                <td class="h_nip">{{ UMUM.Rupiah(prog.jml) }}</td>
                <td class="h_nip">{{ UMUM.Rupiah(0) }}</td>
                <td class="h_nip">{{ UMUM.Rupiah(prog.jml) }}</td>
              </tr>


              <!-- SUB KEGIATAN -->
              <template v-for="(sub, sIndex) in prog.sub_kegiatan">
                <tr class="h_table_body bg-white">
                  <td></td>
                  <td class="h_nip1">{{ sub.kode_full }}</td>
                  <td>
                    {{ sub.uraian }}
                    <div class="h_nip1">( SUMBER DANA : {{ sub.master_sumber_dana_uraian }} )</div>
                  </td>
                  <td class="h_nip1">{{ UMUM.Rupiah(sub.jml) }}</td>
                  <td class="h_nip1">{{ UMUM.Rupiah(0) }}</td>
                  <td class="h_nip1">{{ UMUM.Rupiah(sub.jml) }}</td>
                </tr>


                <!-- HEADER RINCIAN (SEKALI PER SUB) -->
                <tr v-if="sub.rincian && sub.rincian.length" class="h_table_head1 softGrey">
                  <th></th>
                  <th></th>
                  <th>Uraian</th>
                  <th>Pagu</th>
                  <th>Realisasi</th>
                  <th>Serapan</th>
                </tr>

                <!-- RINCIAN -->
                <template v-for="(rin, rIndex) in sub.rincian">
                  <tr class="h_table_body bg-white">
                    <td></td>
                    <td></td>
                    <!-- <td class="h_nip4">{{ rin.uraian }}</td> -->
                    <td class="h_nip4">
                      <a class="h_nip4 clear_underline" href="javascript:void(0)"
                        @click="mdl_view_sub_kegiatan_rincian = true, selectRincian(rin, sub)">
                        {{ rin.uraian }}
                      </a>
                    </td>

                    <td class="h_nip4">{{ UMUM.Rupiah(rin.jml) }}</td>
                    <td class="h_nip3">{{ UMUM.Rupiah(rin.total_jml_realisasi_keuangan || 0) }}</td>
                    <td>
                      <input type="number" step="0.25" v-model.number="rin.serapan" />
                    </td>
                  </tr>
                </template>

              </template>
            </template>



            <tr class="bg-white">
              <th width="5%" class="text-center bg-white"></th>
              <th width="5%" class="text-center bg-white"></th>
              <th width="40%"></th>
              <th width="20%"></th>
              <th width="20%"></th>
              <th width="10%"></th>
            </tr>

          </table>

          <!-- =================================================== KONTENT =========================================================== -->
        </div>
        <hr class="hrpagin">
        <br>
        <div class="flex flex-center">
          <q-btn @click="addData()" color="white" text-color="black" label="SIMPAN DATA" />

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
                      [{{ kegiatanSub.kode_full }}] {{ kegiatanSub.uraian }}
                      <div class="h_nip">{{ kegiatanSub.master_sumber_dana_uraian }}</div>
                    </td>
                  </tr>

                  <tr class="h_table_body">
                    <td class="h_table_body1">Rincian</td>
                    <td class="">{{ rincian.uraian }}</td>
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
                    <th width="50%">Jml (Rp.)</th>
                  </tr>
                  <tr class="h_table_body">
                    <td class="text-center">1.</td>
                    <td class="">Januari</td>
                    <td class="">{{ UMUM.Rupiah(target.jan) }}</td>
                  </tr>
                  <tr class="h_table_body">
                    <td class="text-center">2.</td>
                    <td class="">Februari</td>
                    <td class="">{{ UMUM.Rupiah(target.feb) }}</td>
                  </tr>
                  <tr class="h_table_body">
                    <td class="text-center">3.</td>
                    <td class="">Maret</td>
                    <td class="">{{ UMUM.Rupiah(target.mar) }}</td>
                  </tr>
                  <tr class="h_table_body">
                    <td class="text-center">4.</td>
                    <td class="">April</td>
                    <td class="">{{ UMUM.Rupiah(target.apr) }}</td>
                  </tr>
                  <tr class="h_table_body">
                    <td class="text-center">5.</td>
                    <td class="">Mei</td>
                    <td class="">{{ UMUM.Rupiah(target.mei) }}</td>
                  </tr>
                  <tr class="h_table_body">
                    <td class="text-center">6.</td>
                    <td class="">Juni</td>
                    <td class="">{{ UMUM.Rupiah(target.jun) }}</td>
                  </tr>
                  <tr class="h_table_body">
                    <td class="text-center">7.</td>
                    <td class="">Juli</td>
                    <td class="">{{ UMUM.Rupiah(target.jul) }}</td>
                  </tr>
                  <tr class="h_table_body">
                    <td class="text-center">8.</td>
                    <td class="">Agustus</td>
                    <td class="">{{ UMUM.Rupiah(target.agu) }}</td>
                  </tr>
                  <tr class="h_table_body">
                    <td class="text-center">9.</td>
                    <td class="">September</td>
                    <td class="">{{ UMUM.Rupiah(target.sep) }}</td>
                  </tr>
                  <tr class="h_table_body">
                    <td class="text-center">10.</td>
                    <td class="">Oktober</td>
                    <td class="">{{ UMUM.Rupiah(target.okt) }}</td>
                  </tr>
                  <tr class="h_table_body">
                    <td class="text-center">11.</td>
                    <td class="">November</td>
                    <td class="">{{ UMUM.Rupiah(target.nov) }}</td>
                  </tr>
                  <tr class="h_table_body">
                    <td class="text-center">12.</td>
                    <td class="">Desember</td>
                    <td class="">{{ UMUM.Rupiah(target.des) }}</td>
                  </tr>

                </table>

              </div>
              <div class="col-12 col-md-6 frame_cari ">
                <hr class="hrpagin2">
                <span class="h_lable ">Jumlah Pagu</span>
                <div class="h_ket" style="color:#9c9c9c">
                  Rp. {{ UMUM.Rupiah(rincian.jml) }}
                </div>
                <hr class="hrpagin2">
              </div>
              <div class="col-12 col-md-6 frame_cari ">
                <hr class="hrpagin2">
                <span class="h_lable ">Total Target</span>
                <div class="h_ket" style="color:#9c9c9c">
                  Rp. {{ UMUM.Rupiah(countMount(target)) }}
                </div>
                <hr class="hrpagin2">
              </div>


            </div>

          </q-card-section>

          <q-card-actions class="bg-grey-4 mdl-footer" align="right">
            <q-btn color="primary" @click="addTarget()" label="Simpan" />
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


import FETCHING from '../library/fetching'
import DATAMASTER from '../library/dataMaster'
import UMUM from '../library/umum'

export default {
  props: ["realisasi_keuangan_id", "unit_kerja"],
  data() {
    return {

      form: {

        id: '',
        program_kode: '',
        kegiatan_kode: [],
        unit_kerja: '',
        tahun: '',
        kegiatan_id: '',

      },
      kegiatanSub: {

        kegiatan_sub_kode: [],
        unit_kerja: '',
        tahun: '',
        kegiatan_sub_id: '',
        sumber_dana: '',
        uraian: '',
        kode_full: '',
        master_sumber_dana_uraian: '',

      },

      tag: {

        id: '',
        kegiatan_sub_kode: '',
        uraian: '',
        keterangan: '',

      },
      label: {

        id: '',
        kegiatan_sub_tag_id: '',
        uraian: '',
        rincian: [{
          uraian: '',
          koefisien: '',
          satuan: '',
          harga: 0,
          ppn: 0,
          jml: 0,
        }],

      },
      rincian: {

        id: '',
        kegiatan_sub_label_id: '',
        kegiatan_sub_kode: '',
        uraian: '',
        koefisien: '',
        satuan: '',
        harga: 0,
        ppn: 0,
        jml: 0,

      },

      target: {

        id: 0,
        rincian_id: 0,
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        mei: 0,
        jun: 0,
        jul: 0,
        agu: 0,
        sep: 0,
        okt: 0,
        nov: 0,
        des: 0,
        thn: 0,
        status: 0,

      },


      // ====================================== CONTOH AUTOCOMPLETE ====================================
      autocomplete_db: '',
      // ====================================== CONTOH AUTOCOMPLETE ====================================

      filterku: {
        program_kode: '',
        tahun: '',
        unit_kerja: '',
      },

      list_data: [],
      list_label: [],

      page_first: 1,
      page_last: 0,
      page_limit: 10,
      cari_value: "",
      cek_load_data: true,



      mdl_view_sub_kegiatan_rincian: false,
      mdl_add_sub_kegiatan_rincian: false,
      mdl_edit_sub_kegiatan_rincian: false,
      mdl_hapus_sub_kegiatan_rincian: false,


      FETCHING: FETCHING,
      DATAMASTER: DATAMASTER,
      UMUM: UMUM,
    }
  },

  methods: {


    getView: function () {
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.CT_KEGIATAN + "viewWithoutPagin", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify({
          data_ke: this.page_first,
          cari_value: this.cari_value,
          page_limit: this.page_limit,
          unit_kerja: this.unit_kerja,
          program_kode: this.filterku.program_kode,
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


    addData: function () {

      var list = this.list_data
      var data = []


      list.forEach(kegiatan => {

        kegiatan.sub_kegiatan.forEach(sub => {
          sub.rincian.forEach(rin => {
            if (rin.serapan > 0) {
              rin.realisasi_keuangan_id = this.realisasi_keuangan_id
              data.push(rin)
            }
          })
        })
      });


      console.log(data);

      fetch(this.$store.state.url.CT_REALISASI_KEUANGAN_SERAPAN + "addData", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
        body: JSON.stringify(data)
      }).then(res_data => {
        this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
        this.getView();
      });
    },


    editData: function () {
      fetch(this.$store.state.url.CT_REALISASI_KEUANGAN_SERAPAN + "editData", {
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

    removeData: function (E) {
      fetch(this.$store.state.url.CT_REALISASI_KEUANGAN_SERAPAN + "removeData", {
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

    selectData: function (data) {

      console.log(data);
      this.form.kegiatan_kode = data.kode_full;
    },

    selectKegiatan: function (data) {
      console.log(data)
      this.form.kegiatan_id = data.kegiatan_id
      DATAMASTER.postMasterkegiatanSub(data.kode_full)
    },

    selectSubKegiatan: function (data) {

      console.log(data)
      this.kegiatanSub.tahun = data.tahun;
      this.kegiatanSub.kegiatan_sub_id = data.kegiatan_sub_id;

      this.tag.kegiatan_sub_kode = data.kode_full;
    },



    selectRincian(rin, sub) {

      // === RINCIAN ===
      this.rincian.id = rin.id
      this.rincian.kegiatan_sub_kode = sub.kode_full
      this.rincian.uraian = rin.uraian
      this.rincian.jml = rin.jml

      // === SUB KEGIATAN (UNTUK REFERENSI MODAL) ===
      this.kegiatanSub.kode_full = sub.kode_full
      this.kegiatanSub.uraian = sub.uraian
      this.kegiatanSub.master_sumber_dana_uraian = sub.master_sumber_dana_uraian

      // === TARGET ===
      this.target.rincian_id = rin.id

      this.viewTarget()
    },


    viewTarget: function () {
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

    addTarget: function () {
      fetch(this.$store.state.url.CT_TARGET_KEUANGAN + "addData", {
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

    selectTarget: function (data) {
      this.target.rincian_id = data.rincian_id;
      this.target.jan = data.jan;
      this.target.feb = data.feb;
      this.target.mar = data.mar;
      this.target.apr = data.apr;
      this.target.mei = data.mei;
      this.target.jun = data.jun;
      this.target.jul = data.jul;
      this.target.agu = data.agu;
      this.target.sep = data.sep;
      this.target.okt = data.okt;
      this.target.nov = data.nov;
      this.target.des = data.des;
      this.target.thn = data.thn;
      this.target.status = data.status;
    },

    countMount: function (data) {
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
    onChangex(data) {
      // await DATAMASTER.postMasterUrusanBidang(val)
    },

    async AsyncKegiatan() {
      DATAMASTER.postMasterkegiatan(this.form.program_kode)
    },

    // ====================================== CONTOH eDOC ====================================

    // ====================================== CONTOH AUTOCOMPLETE ====================================
    autocomplete_sumber_dana_filter: function (val, update) {
      update(() => {
        if (val === '') { }
        else { DATAMASTER.postMasterSumberDanaAutoComplete(val) }
      })
    },

    selisih: function (data1, data2) {

      var selisih = 0
      if (data2 == null || data2 == undefined) {
        selisih = 0
      } else {
        selisih = parseFloat(data1) - parseFloat(data2)

      }


      return selisih
    },

    // ====================================== CONTOH AUTOCOMPLETE ====================================








    // ====================================== PAGINATE ====================================
    Notify: function (message, positive, icon) {
      this.$q.notify({
        message: message,
        color: positive,
        icon: icon,
        position: 'top',
        timeout: 500,
      })
    },
    btn_prev: function () {
      this.cek_load_data = true;
      if (this.page_first > 1) {
        this.page_first--
      } else {
        this.page_first = 1;
      }
      this.getView();
    },

    btn_next: function () {
      if (this.page_first >= this.page_last) {
        this.page_first == this.page_last
      } else {
        this.page_first++;
      }
      this.getView();
    },

    cari_data: function () {
      this.page_first = 1;
      this.getView();
    },

    indexing: function (index) {
      var idx = ((this.page_first - 1) * this.page_limit) + index
      return idx
    },


    // ====================================== PAGINATE ====================================







  },

  mounted() {


    let profilex = JSON.parse(localStorage.profile);
    let profile = profilex.profile;
    this.form.unit_kerja = profile.unit_kerja;
    this.kegiatanSub.unit_kerja = profile.unit_kerja;
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
    this.getView();
  },
}
</script>