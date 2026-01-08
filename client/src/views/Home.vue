<template>
  <div class="about " style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="main1 text-white">
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="text-h6 h_titleHead">DASHBOARD MONITORING</div>
          </div>
          <div class="col-12 col-md-2"></div>
          <div class="col-12 col-md-4">
            <div class="row">
              <q-select v-model="filterku.tahun" :options="list_tahun" option-label="label" option-value="value"
                emit-value map-options outlined square :dense="true" class="bg-white" style="width:90%"
                label="Tahun Anggaran" @update:model-value="onChangeTahun" />
            </div>
          </div>

        </div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section class="biruSangatmudaGrad">
        <div class="row">

          <!-- TOTAL OPD -->
          <div class="col-12 col-md-4 frWidget">
            <div class="row shadow-5 frWidgetSub">
              <div class="col-4 frWidgetSub1 text-center main1 row items-center justify-center">
                <q-icon name="apartment" style="font-size:420%; color:white" />
              </div>
              <div class="col-8 frWidgetSub2 main1x">
                <span class="frWidgetText1">Total OPD</span><br>
                <span class="frWidgetText2">{{ dashboard_opd.total_opd }}</span>
              </div>
            </div>
          </div>

          <!-- OPD SUDAH UPLOAD -->
          <div class="col-12 col-md-4 frWidget">
            <div class="row shadow-5 frWidgetSub">
              <div class="col-4 frWidgetSub1 text-center main6x row items-center justify-center">
                <q-icon name="cloud_done" style="font-size:420%; color:#faf6ed" />
              </div>
              <div class="col-8 frWidgetSub2 main6">
                <span class="frWidgetText1Dark">OPD Sudah Upload</span><br>
                <span class="frWidgetText2Dark">{{ dashboard_opd.opd_sudah_upload }}</span>
              </div>
            </div>
          </div>

          <!-- OPD BELUM UPLOAD -->
          <div class="col-12 col-md-4 frWidget">
            <div class="row shadow-5 frWidgetSub">
              <div class="col-4 frWidgetSub1 text-center main3x row items-center justify-center">
                <q-icon name="cloud_off" style="font-size:420%; color:white" />
              </div>
              <div class="col-8 frWidgetSub2 main3">
                <span class="frWidgetText1Dark">OPD Belum Upload</span><br>
                <span class="frWidgetText2Dark">{{ dashboard_opd.opd_belum_upload }}</span>
              </div>
            </div>
          </div>

        </div>
      </q-card-section>



      <q-card-section class="biruSangatmudaGrad">
        <div class="row">
          <div class="col-12 col-md-6" style="padding:2%;">
            <div class="abuhitam">
              GLOBAL UPLOAD FILE BERDASARKAN BULAN TAHUN 2022
            </div>
            <br>
            <div id="chart1" style="height:500px"></div>
          </div>

          <div class="col-12 col-md-6" style="padding:2%;">
            <div class="abuhitam">
              JUMLAH UPLOAD GLOBAL OPD TAHUN 2023<br><br>
            </div>
            <div style="height:500px; overflow:auto;">
              <table style="width:100%">
                <thead style="background:#025464">
                  <tr class="h_table_head text-white">
                    <th class="text-left" style="width:80%" color="#faf6ed">Nama Unit Kerja</th>
                    <th class="text-center" style="width:20%">Jml File</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="data in list_opd_upload" :key="data.id">
                    <td>{{ data.unit_kerja }}</td>
                    <td class="text-center">{{ data.jml }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>





    <!-- =================================================== MODAL =========================================================== -->
    <!-- <q-dialog v-model="alert" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-primary">
                    <div class="text-h6 h_modalhead">Simpan Data</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                        <br>
                        <span class="h_lable ">Input Nama</span>
                        <q-input outlined square :dense="true" class="bg-white margin_btn" /> 

                        <span class="h_lable ">Input Nama</span>
                        <q-select v-model="model" :options="inputSelect" option-value="id" option-label="nama" outlined square :dense="true" class="bg-white margin_btn"/>

                        <span class="h_lable ">Cari File</span>
                        <q-file outlined v-model="model" square :dense="true" class="bg-white margin_btn">
                          <template v-slot:prepend>
                            <q-icon name="attach_file" />
                          </template>
</q-file>
</q-card-section>

<q-card-actions class="bg-grey-4 mdl-footer" align="right">

  <q-btn :loading="simpan1" color="primary" @click="simulateProgress(1)" label="Simpan" />
  <q-btn label="Batal" color="negative" v-close-popup />

</q-card-actions>
</q-card>
</q-dialog> -->




    <!-- =================================================== MODAL =========================================================== -->




  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'


import FETCHING from "../library/fetching";
import UMUM from "../library/umum.js";



export default {
  components: {
    // Logo,
    // VuetifyLogo
  },
  data() {
    return {
      filterku: {
        instansi_id: '',
        unit_kerja_id: '',
        direktori_id: '',
        tahun: new Date().getFullYear(),

      },

      list_tahun: [
        { label: '2022', value: 2022 },
        { label: '2023', value: 2023 },
        { label: '2024', value: 2024 },
        { label: '2025', value: 2025 },
        { label: '2026', value: 2026 },
      ],
      dashboard_opd: {
        total_opd: 0,
        opd_sudah_upload: 0,
        opd_belum_upload: 0,
      },

      trista_monev: 0,
      list_data: [],
      listChart: null,
      list_opd_upload: [],



      UMUM: UMUM,
      FETCHING: FETCHING,
    }
  },

  methods: {

    onChangeTahun() {
      // reload semua data dashboard berdasarkan tahun
      this.asyncFunc()
    },

    chart1: function (chartku, dn) {
      const chart = Highcharts.chart(chartku, {
        chart: {
          borderColor: '#efefef',
          borderWidth: 2,
        },
        title: {
          text: '-'
        },
        subtitle: {
          text: ' '
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        series: [{
          type: 'column',
          colorByPoint: true,
          data: [dn.jan, dn.feb, dn.mar, dn.apr, dn.mei, dn.jun, dn.jul, dn.agu, dn.sep, dn.okt, dn.nov, dn.des],
          showInLegend: false
        }]
      });


    },

    asyncFunc: async function () {
      const res = await this.FETCHING.dashboardPost(
        this.filterku.unit_kerja_id,
        this.trista_monev,
        'dashboardOPD',
        this.filterku.tahun
      )

      this.dashboard_opd.total_opd = res.total_opd
      this.dashboard_opd.opd_sudah_upload = res.opd_sudah_upload
      this.dashboard_opd.opd_belum_upload = res.opd_belum_upload
    }




  },

  mounted() {
    var get_profile = JSON.parse(localStorage.profile);
    this.filterku.instansi_id = get_profile.profile.instansi_id;
    this.filterku.unit_kerja_id = get_profile.profile.unit_kerja;
    this.trista_monev = get_profile.profile.trista_monev;


    this.asyncFunc();

  },
}
</script>
