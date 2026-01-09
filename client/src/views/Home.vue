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



      <q-card-section class="biruSangatmudaGrad">
        <q-inner-loading :showing="loadingChart">
          <q-spinner color="primary" size="40px" />
        </q-inner-loading>

        <div id="chartMenu" style="height:500px;"></div>
      </q-card-section>


      <q-card-section class="biruSangatmudaGrad">
        <div class="abuhitam">HEATMAP KELENGKAPAN OPD</div>

        <q-inner-loading :showing="loadingHeatmap">
          <q-spinner color="primary" size="40px" />
        </q-inner-loading>

        <div style="overflow:auto">
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
                  :class="row.status[m] ? 'cell-ok' : 'cell-no'"
                >
                  <q-icon
                    v-if="row.status[m]"
                    name="check"
                    size="16px"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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


    onChangeTahun() {
      console.log('INPUT TAHUN:', val)
      this.filterku.tahun = val
      this.asyncFunc()
      this.loadChartMenu()
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

  },
}
</script>
