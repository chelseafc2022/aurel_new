<template>
  <div class="about " style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="main1 text-white">
        <div class="row">
          <div class="col-12 col-md-3">
            <div class="text-h6 h_titleHead">Home</div>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </div>
          <div class="col-12 col-md-3">
            <div class="row frame_cari">
              <span class="h_lable1 ">Dari Tgl</span>
              <input type="date" class="inputbs" placeholder="sadas">
            </div>

          </div>
          <div class="col-12 col-md-3">
            <div class="row frame_cari">
              <span class="h_lable1 ">Sampai Tgl</span>
              <input type="date" class="inputbs" placeholder="sadas">
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="row frame_cari">
              <span class="h_lable1 ">Pilih Instansi</span>
              <select name="" id="" class="inputbs">
                <option value="">Dinas Komunikasi Informatika dan Persandian</option>
              </select>
             </div>

          </div>
        </div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section class="biruSangatmudaGrad">

         <div class="row">
           <div class="col-12 col-md-3 frWidget ">
             <div class="row shadow-5 frWidgetSub">
                <div class="col-4 frWidgetSub1 text-center main1x  row items-center justify-center">
                  <q-icon class="vertical-middle" name="check_circle_outline" style="font-size:420%; color:white" />
                </div>
                <div class="col-8 frWidgetSub2 main1">
                  <span class="frWidgetText1">Pagu</span> <br>
                  <span class="frWidgetText2">150.000.000</span>
                </div>
             </div>
           </div>
           <div class="col-12 col-md-3 frWidget ">
             <div class="row shadow-5 frWidgetSub">
                <div class="col-4 frWidgetSub1 text-center main2x row items-center justify-center">
                  <q-icon name="block" style="font-size:420%; color:white" />
                </div>
                <div class="col-8 frWidgetSub2 main2">
                  <span class="frWidgetText1">Pagu Pembangunan</span> <br>
                  <span class="frWidgetText2">75.000.000</span>
                </div>
             </div>
           </div>

           <div class="col-12 col-md-3 frWidget">
             <div class="row shadow-5 frWidgetSub">
                <div class="col-4 frWidgetSub1 text-center main3x  row items-center justify-center">
                  <q-icon name="error_outline" style="font-size:420%; color:#646464" />
                </div>
                <div class="col-8 frWidgetSub2 main3">
                  <span class="frWidgetText1Dark">Realisasi Keuangan</span> <br>
                  <span class="frWidgetText2Dark">150.000.000</span>
                </div>
             </div>
           </div>
           
           <div class="col-12 col-md-3 frWidget">
             <div class="row shadow-5 frWidgetSub">
                <div class="col-4 frWidgetSub1 text-center main4x  row items-center justify-center">
                  <q-icon name="error_outline" style="font-size:420%; color:#646464" />
                </div>
                <div class="col-8 frWidgetSub2 main4">
                  <span class="frWidgetText1Dark">Realisasi Pembangunan</span> <br>
                  <span class="frWidgetText2Dark">75.000.000</span>
                </div>
             </div>
           </div>

          
           
         </div>

         <div class="row">

           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="SumberDanaPie" style="width:100%; height:400px;"></div>
             </div>
           </div>

           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="PaguPembangunanPie" style="width:100%; height:400px;"></div>
             </div>
           </div>

           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="realisasiFisikPie" style="width:100%; height:400px;"></div>
             </div>
           </div>

           <div class="col-12 col-md-6 padding1-5">
             <div class="frameChart shadow-5">
               <div id="realisasiKeuanganPie" style="width:100%; height:400px;"></div>
             </div>
           </div>





         </div>






      </q-card-section>
    </q-card>





          <!-- =================================================== MODAL =========================================================== -->
              <q-dialog v-model="alert" persistent>
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
                        <!-- <q-input outlined square :dense="true" class="bg-white margin_btn" />  -->

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
              </q-dialog>




          <!-- =================================================== MODAL =========================================================== -->




  </div>
</template>


<script>
export default {
  data() {
    return {
      alert: false,
      simpan1: false,
      model :'',
      inputSelect : [
        {id : '1', nama : 'kiken', alamat : 'beringin'},
        {id : '2',nama : 'Alung', alamat : 'Anawai'},
      ],
      date : '',
    }
  },
  methods: {
    simulateProgress (number) {
      // we set loading state
      this[`simpan${number}`] = true
      // simulate a delay
      setTimeout(() => {
        // we're done, we reset loading state
        this[`simpan${number}`] = false
      }, 3000)
    },

    SumberDanaPie : function(){
      

      Highcharts.chart('SumberDanaPie', {
      chart: {
          type: 'pie',
          backgroundColor: 'transparent',
          options3d: {
              enabled: true,
              alpha: 45,
              beta: 0
          }
      },
      title: {
          text: 'SUMBER DANA'
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              depth: 35,
              dataLabels: {
                  enabled: true,
                  format: '{point.name}'
              }
          }
          },
          series: [{
              type: 'pie',
              name: 'Persentase',
              data: [
                  {
                    name: 'DAU',
                    y: 52.08,
                    color:'#888bc5',
                    // sliced: true,
                    // selected: true
                  }, 
                  {
                    name: 'DAK',
                    y: 22.92,
                    color:'#FEADB6',
                  },
                  {
                    name: 'DBH',
                    y: 25.00,
                    color:'#ffd99f',
                  },
              ]
          }]
      });


    },

    PaguPembangunanPie : function(){
      

      Highcharts.chart('PaguPembangunanPie', {
      chart: {
          type: 'pie',
          backgroundColor: 'transparent',
          options3d: {
              enabled: true,
              alpha: 45,
              beta: 0
          }
      },
      title: {
          text: 'ANGGARAN PEMBANGUNAN'
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              depth: 35,
              dataLabels: {
                  enabled: true,
                  format: '{point.name}'
              }
          }
          },
          series: [{
              type: 'pie',
              name: 'Persentase',
              data: [
                  {
                    name: 'PEMBANGUNAN',
                    y: 60,
                    color:'#888bc5',
                    // sliced: true,
                    // selected: true
                  }, 
                  {
                    name: 'LAINNYA',
                    y: 40,
                    color:'#FEADB6',
                  },
              ]
          }]
      });


    },

    realisasiFisikPie : function(){
      // Highcharts.chart('realisasiFisikPie', {
      // chart: {
      //     type: 'pie',
      //     backgroundColor: 'transparent'
      // },
      // title: {
      //     text: 'REALISASI FISIK'
      // },
      // tooltip: {
      //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      // },
      // accessibility: {
      //     point: {
      //         valueSuffix: '%'
      //     }
      // },
      // plotOptions: {
      // pie: {
      //     allowPointSelect: true,
      //     cursor: 'pointer',
      //     dataLabels: {
      //         enabled: false
      //     },
      //     showInLegend: true
      // }
      // },
      // series: [{
      //     name: 'Persentase',
      //     colorByPoint: true,
      //     data: [
      //       {
      //         name: 'Hadir',
      //         y: 52.08,
      //         color:'#1e88e5',
      //         // sliced: true,
      //         // selected: true
      //       }, 
      //       {
      //         name: 'Izin',
      //         y: 22.92,
      //         color:'#7cb342',
      //       },
      //       {
      //         name: 'Tanpa Keterangan',
      //         y: 25.00,
      //         color:'#ff8a65',
      //       },
          
      //     ]
      //   }]
      // });



      Highcharts.chart('realisasiFisikPie', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Persentase Realisasi Fisik'
        },
        subtitle: {
            text: '<a href="" ' +
                'target="_blank">Rerata berdasarkan data keseluruhan</a>'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            accessibility: {
                description: 'Months of the year'
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                format: '{value}%'
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: 'Target',
            marker: {
                symbol: 'square'
            },
            data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, {
                y: 26.4,
                // marker: {
                //     symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
                // },
                accessibility: {
                    description: 'Sunny symbol, this is the warmest point in the chart.'
                }
            }, 22.8, 17.5, 12.1, 7.6]

        }, {
            name: 'Realisasi',
            marker: {
                symbol: 'diamond'
            },
            data: [{
                y: 1.5,
                // marker: {
                //     symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
                // },
                accessibility: {
                    description: 'Snowy symbol, this is the coldest point in the chart.'
                }
            }, 1.6, 3.3, 5.9, 10.5, 13.5, 14.5, 14.4, 11.5, 8.7, 4.7, 2.6]
        }]
      });



      



    },

    realisasiKeuanganPie : function(){
      

      // Highcharts.chart('realisasiKeuanganPie', {
      // chart: {
      //     type: 'pie',
      //     backgroundColor: 'transparent',
      //     options3d: {
      //         enabled: true,
      //         alpha: 45,
      //         beta: 0
      //     }
      // },
      // title: {
      //     text: 'REALISASI KEUANGAN'
      // },
      // accessibility: {
      //     point: {
      //         valueSuffix: '%'
      //     }
      // },
      // tooltip: {
      //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      // },
      // plotOptions: {
      //     pie: {
      //         allowPointSelect: true,
      //         cursor: 'pointer',
      //         depth: 35,
      //         dataLabels: {
      //             enabled: true,
      //             format: '{point.name}'
      //         }
      //     }
      //     },
      //     series: [{
      //         type: 'pie',
      //         name: 'Persentase',
      //         data: [
      //             {
      //               name: 'Hadir',
      //               y: 52.08,
      //               color:'#1e88e5',
      //               // sliced: true,
      //               // selected: true
      //             }, 
      //             {
      //               name: 'Izin',
      //               y: 22.92,
      //               color:'#7cb342',
      //             },
      //             {
      //               name: 'Tanpa Keterangan',
      //               y: 25.00,
      //               color:'#ff8a65',
      //             },
      //         ]
      //     }]
      // });

      Highcharts.chart('realisasiKeuanganPie', {
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Persentase Realisasi Keuangan'
        },
        subtitle: {
            text: '<a href="" ' +
                'target="_blank">Rerata berdasarkan data keseluruhan</a>'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            accessibility: {
                description: 'Months of the year'
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            labels: {
                format: '{value}%'
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: 'Target',
            marker: {
                symbol: 'square'
            },
            data: [5.2, 5.7, 8.7, 13.9, 18.2, 21.4, 25.0, {
                y: 26.4,
                // marker: {
                //     symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
                // },
                accessibility: {
                    description: 'Sunny symbol, this is the warmest point in the chart.'
                }
            }, 22.8, 17.5, 12.1, 7.6]

        }, {
            name: 'Realisasi',
            marker: {
                symbol: 'diamond'
            },
            data: [{
                y: 1.5,
                // marker: {
                //     symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
                // },
                accessibility: {
                    description: 'Snowy symbol, this is the coldest point in the chart.'
                }
            }, 1.6, 3.3, 5.9, 10.5, 13.5, 14.5, 14.4, 11.5, 8.7, 4.7, 2.6]
        }]
      });









    },

    



    

    async button(){
      await setTimeout(() => {
        console.log('ini query pembacaannya')
      }, 2000);
      console.log('telASO')
    }







  },

  mounted () {
    this.SumberDanaPie();
    this.PaguPembangunanPie();
    this.realisasiFisikPie();
    this.realisasiKeuanganPie();
    this.button();
  },
}
</script>




