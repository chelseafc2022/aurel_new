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
              <q-select
                v-model="filterku.tahun"
                :options="list_tahun"
                option-label="label"
                option-value="value"
                emit-value
                map-options
                outlined
                square
                dense
                class="bg-white"
                style="width:90%"
                label="Tahun Anggaran"
              />


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
              <div class="col-4 frWidgetSub1 text-center main5x row items-center justify-center">
                <q-icon name="cloud_done" style="font-size:420%; color:#faf6ed" />
              </div>
              <div class="col-8 frWidgetSub2 main5">
                <span class="frWidgetText1">OPD Sudah Upload</span><br>
                <span class="frWidgetText2">{{ dashboard_opd.opd_sudah_upload }}</span>
              </div>
            </div>
          </div>

          <!-- OPD BELUM UPLOAD -->
          <div class="col-12 col-md-4 frWidget">
            <div class="row shadow-5 frWidgetSub">
              <div class="col-4 frWidgetSub1 text-center main6x row items-center justify-center">
                <q-icon name="cloud_off" style="font-size:420%; color:white" />
              </div>
              <div class="col-8 frWidgetSub2 main6">
                <span class="frWidgetText1Dark">OPD Belum Upload</span><br>
                <span class="frWidgetText2Dark">{{ dashboard_opd.opd_belum_upload }}</span>
              </div>
            </div>
          </div>

        </div>
      </q-card-section>

      <!-- MONITORING STATUS DOKUMEN (KHUSUS ADMINISTRATOR & INSPEKTORAT) -->
      <q-card-section class="biruSangatmudaGrad q-pt-none" v-if="isApprovalAdmin">
        <div class="row">

          <!-- PENDING / PROSES -->
          <div class="col-12 col-sm-6 col-md-3 frWidget cursor-pointer" @click="goToApproval('0')">
            <div class="row shadow-5 frWidgetSub">
              <div class="col-4 frWidgetSub1 text-center main6x row items-center justify-center">
                <q-icon name="hourglass_top" style="font-size:350%; color:white" />
              </div>
              <div class="col-8 frWidgetSub2 main6">
                <span class="frWidgetText1Dark">Menunggu Verifikasi</span><br>
                <span class="frWidgetText2Dark">{{ dashboard_opd.doc_pending || 0 }} Berkas</span>
              </div>
            </div>
          </div>

          <!-- APPROVED / DISETUJUI -->
          <div class="col-12 col-sm-6 col-md-3 frWidget cursor-pointer" @click="goToApproval('1')">
            <div class="row shadow-5 frWidgetSub">
              <div class="col-4 frWidgetSub1 text-center main5x row items-center justify-center">
                <q-icon name="check_circle" style="font-size:350%; color:#faf6ed" />
              </div>
              <div class="col-8 frWidgetSub2 main5">
                <span class="frWidgetText1">Dokumen Disetujui</span><br>
                <span class="frWidgetText2">{{ dashboard_opd.doc_approved || 0 }} Berkas</span>
              </div>
            </div>
          </div>

          <!-- REJECTED / DITOLAK -->
          <div class="col-12 col-sm-6 col-md-3 frWidget cursor-pointer" @click="goToApproval('2')">
            <div class="row shadow-5 frWidgetSub">
              <div class="col-4 frWidgetSub1 text-center bg-red-9 row items-center justify-center">
                <q-icon name="cancel" style="font-size:350%; color:white" />
              </div>
              <div class="col-8 frWidgetSub2 bg-red-7">
                <span class="frWidgetText1">Ditolak / Revisi</span><br>
                <span class="frWidgetText2">{{ dashboard_opd.doc_rejected || 0 }} Berkas</span>
              </div>
            </div>
          </div>

          <!-- TOTAL DOKUMEN UPLOAD -->
          <div class="col-12 col-sm-6 col-md-3 frWidget cursor-pointer" @click="goToApproval('')">
            <div class="row shadow-5 frWidgetSub">
              <div class="col-4 frWidgetSub1 text-center main1 row items-center justify-center">
                <q-icon name="description" style="font-size:350%; color:white" />
              </div>
              <div class="col-8 frWidgetSub2 main1x">
                <span class="frWidgetText1">Total Berkas Upload</span><br>
                <span class="frWidgetText2">{{ dashboard_opd.doc_total || 0 }} Berkas</span>
              </div>
            </div>
          </div>

        </div>
      </q-card-section>

      <q-card-section class="biruSangatmudaGrad">
        <div class="heatmap-title">HEATMAP KELENGKAPAN OPD</div>

        <q-inner-loading :showing="loadingHeatmap">
          <q-spinner color="primary" size="40px" />
        </q-inner-loading>

        <div style="overflow:auto">
          <div class="heatmap-wrapper">

            <table class="heatmap-table">
              <thead>
                <tr>
                  <th>OPD</th>
                  <th v-for="m in heatmap.menus" :key="m">{{ m }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in heatmap.data" :key="row.opd">
                  <td class="opd-name">{{ row.opd }}</td>
  
                  <td
                    v-for="m in heatmap.menus"
                    :key="m"
                    :class="row.status[m] === 1 ? 'cell-ok' : (row.status[m] === 0 ? 'cell-pending' : (row.status[m] === 2 ? 'cell-rejected' : 'cell-no'))"
                  >
                    <!-- Disetujui (1) -->
                    <q-icon
                      v-if="row.status[m] === 1"
                      name="check_circle"
                      size="18px"
                      color="green-7"
                    >
                      <q-tooltip content-class="bg-green-7" content-style="font-size: 12px">Disetujui</q-tooltip>
                    </q-icon>

                    <!-- Menunggu Verifikasi / Pending (0) -->
                    <q-icon
                      v-else-if="row.status[m] === 0"
                      name="hourglass_top"
                      size="18px"
                      color="orange-8"
                    >
                      <q-tooltip content-class="bg-orange-8" content-style="font-size: 12px">Menunggu Verifikasi (Proses)</q-tooltip>
                    </q-icon>

                    <!-- Ditolak (2) -->
                    <q-icon
                      v-else-if="row.status[m] === 2"
                      name="cancel"
                      size="18px"
                      color="red-7"
                    >
                      <q-tooltip content-class="bg-red-7" content-style="font-size: 12px">Ditolak (Perlu Revisi)</q-tooltip>
                    </q-icon>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </q-card-section>



      <q-card-section class="biruSangatmudaGrad">
        <q-inner-loading :showing="loadingChart">
          <q-spinner color="primary" size="40px" />
        </q-inner-loading>

        <div id="chartMenu" style="height:500px;"></div>
      </q-card-section>


      




    </q-card>





  </div>
</template>

<script>


import FETCHING from "../library/fetching";
import UMUM from "../library/umum.js";



export default {
  components: {
  },
  data() {
    return {

      heatmap: {
      menus: [],
      data: []
        },
      loadingHeatmap: false,
      
      chartMenu: null,
      loadingChart: false,

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
        doc_pending: 0,
        doc_approved: 0,
        doc_rejected: 0,
        doc_total: 0,
      },

      trista_monev: 0,
      list_data: [],
      listChart: null,
      list_opd_upload: [],

      UMUM: UMUM,
      FETCHING: FETCHING,
    }
  },

  computed: {
    isApprovalAdmin() {
      try {
        if (!localStorage.profile) return false;
        const profilex = JSON.parse(localStorage.profile);
        const profile = profilex.profile;
        const menuKlpId = parseInt(profile.aurel_new);
        return menuKlpId === 4 || menuKlpId === 16;
      } catch (e) {
        return false;
      }
    }
  },

  methods: {
    goToApproval(status) {
      this.$router.push({
        path: '/approvalDokumen',
        query: { status_approval: status, tahun: this.filterku.tahun }
      });
    },

    async loadHeatmap () {
      this.loadingHeatmap = true
      try {
        const res = await fetch(
          this.$store.state.url.DASHBOARD + 'heatmap-opd',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              authorization: 'kikensbatara ' + localStorage.token
            },
            body: JSON.stringify({
              tahun: this.filterku.tahun
            })
          }
        )

        const data = await res.json()
        this.heatmap = data

      } catch (e) {
        console.error('Gagal load heatmap', e)
      } finally {
        this.loadingHeatmap = false
      }
    },


    onChangeTahun(val) {
      console.log('INPUT TAHUN:', val)
      this.filterku.tahun = val
      this.asyncFunc()
      this.loadChartMenu()
      this.loadHeatmap()
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

    async asyncFunc () {
      console.log('REQUEST OPD DASHBOARD TAHUN:', this.filterku.tahun)
      try {
        const res = await fetch(
          this.$store.state.url.DASHBOARD + "opdDashboard",
          {
            method: 'POST',
            headers: {
              "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
              tahun: this.filterku.tahun
            })
          }
        )

        const data = await res.json()

        this.dashboard_opd.total_opd = data.total_opd
        this.dashboard_opd.opd_sudah_upload = data.opd_sudah_upload
        this.dashboard_opd.opd_belum_upload = data.opd_belum_upload
        this.dashboard_opd.doc_pending = data.doc_pending
        this.dashboard_opd.doc_approved = data.doc_approved
        this.dashboard_opd.doc_rejected = data.doc_rejected
        this.dashboard_opd.doc_total = data.doc_total

      } catch (err) {
        console.error('Gagal load dashboard OPD', err)
      }
    },

    async loadChartMenu () {
      console.log('REQUEST CHART MENU TAHUN:', this.filterku.tahun)
      this.loadingChart = true

      try {
        const res = await fetch(
          this.$store.state.url.DASHBOARD + "menu-drilldown",
          {
            method: 'POST',
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
              tahun: this.filterku.tahun
            })
          }
        )

        const data = await res.json()

        this.$nextTick(() => {
          this.renderChartMenu(data)
        })

      } catch (err) {
        console.error('Gagal load chart menu', err)
      } finally {
        this.loadingChart = false
      }
    },

  renderChartMenu (chartData) {
    if (this.chartMenu) {
      this.chartMenu.destroy()
    }

    this.chartMenu = Highcharts.chart('chartMenu', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Upload Dokumen OPD per Menu'
      },
      subtitle: {
        text: `Tahun ${this.filterku.tahun}`
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Jumlah OPD'
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> OPD<br/>'
      },

      series: chartData.series,
      drilldown: chartData.drilldown
    })
  }




  },

  watch: {
      'filterku.tahun': {
        immediate: false,
        handler (val, oldVal) {
          console.log('WATCH TAHUN:', oldVal, '→', val)
          this.asyncFunc()
          this.loadChartMenu()
          this.loadHeatmap()
        }
      }
    },

  mounted() {
    var get_profile = JSON.parse(localStorage.profile);
    this.filterku.instansi_id = get_profile.profile.instansi_id;
    this.filterku.unit_kerja_id = get_profile.profile.unit_kerja;
    this.trista_monev = get_profile.profile.trista_monev;

    this.asyncFunc();
    this.loadChartMenu()
    this.loadHeatmap()

  },
}
</script>

<style scoped>
.heatmap-title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 12px;
  color: #1976D2;
}
.heatmap-wrapper {
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 10px;
}
.heatmap-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}
.heatmap-table th, .heatmap-table td {
  padding: 8px 6px;
  border: 1px solid #e2e8f0;
}
.opd-name {
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  white-space: nowrap;
}
.cell-ok {
  background-color: #e8f5e9;
}
.cell-pending {
  background-color: #fff3e0;
}
.cell-rejected {
  background-color: #ffebee;
}
.cell-no {
  background-color: #f8fafc;
}
</style>
