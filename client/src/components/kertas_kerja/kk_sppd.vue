<template>
    <div class="row">

        <div class="row">

            <div class="col-12 col-md-12 frame_cari">
                <span class="h_lable ">Nomor</span>
                <q-input v-model="form.no" outlined square :dense="true" class="bg-white margin_btn" /> 
            </div>
            
            <div class="col-12 col-md-12 frame_cari">
                <span class="h_lable ">Penerima</span>
                <q-input v-model="form.penerima" outlined square :dense="true" class="bg-white margin_btn" /> 
            </div>

            <div class="col-12 col-md-12 frame_cari">
                <span class="h_lable ">Jumlah TBK</span>
                <q-input v-model="form.nilai" outlined square :dense="true" class="bg-white margin_btn" /> 
            </div>

            <div class="col-12 col-md-6 frame_cari">
                <span class="h_lable ">Dari Tanggal</span>
                <q-input v-model="form.dari_tgl" outlined square :dense="true" type="date" class="bg-white margin_btn" /> 
            </div>
            <div class="col-12 col-md-6 frame_cari">
                <span class="h_lable ">Sampai Tanggal</span>
                <q-input v-model="form.sampai_tgl" outlined square :dense="true" type="date" class="bg-white margin_btn" /> 
            </div>

            <div class="col-12 col-md-12 frame_cari">
                <span class="h_lable ">Uang Harian</span>
                <q-input v-model="form.nilai_harian" outlined square :dense="true" class="bg-white margin_btn" /> 
            </div>

            <div class="col-12 col-md-6 frame_cari">
                <span class="h_lable ">Tiket Pergi</span>
                <q-input v-model="form.nilai_tiket_pergi" outlined square :dense="true" class="bg-white margin_btn" /> 
            </div>

            <div class="col-12 col-md-6 frame_cari">
                <span class="h_lable ">Tiket Pulang</span>
                <q-input v-model="form.nilai_tiket_pulang" outlined square :dense="true" class="bg-white margin_btn" /> 
            </div>

            <div class="col-12 col-md-6 frame_cari">
                <span class="h_lable ">Penginapan</span>
                <q-input v-model="form.nilai_penginapan" outlined square :dense="true" class="bg-white margin_btn" /> 
            </div>

            <div class="col-12 col-md-6 frame_cari">
                <span class="h_lable ">Airportex</span>
                <q-input v-model="form.nilai_airportex" outlined square :dense="true" class="bg-white margin_btn" /> 
            </div>

            <div class="col-12 col-md-12 frame_cari">
                <span class="h_lable ">Representasi</span>
                <q-input v-model="form.representasi" outlined square :dense="true" class="bg-white margin_btn" /> 
            </div>

            <div class="col-12 col-md-12 frame_cari">
                <span class="h_lable ">Realisasi Keuangan</span>
                <q-input v-model="form.realisasi_keuangan" outlined square :dense="true" class="bg-white margin_btn" /> 
            </div>

            <div class="col-12 col-md-12 frame_cari">
                <span class="h_lable ">Selisih Realisasi</span>
                <q-input v-model="form.selisih_realisasi" outlined square :dense="true" class="bg-white margin_btn" /> 
            </div>



            <div class="col-12 col-md-6 frame_cari">
                <span class="h_lable ">PPN (%)</span>
                <q-input v-model="form.ppn" outlined square :dense="true" type="number" class="bg-white margin_btn" /> 
            </div>

            <div class="col-12 col-md-6 frame_cari">
                <span class="h_lable ">Realisasi PPN (Rp)</span>
                <q-input v-model="form.ppn_realisasi" outlined square :dense="true" type="number" class="bg-white margin_btn" /> 
            </div>

            <div class="col-12 col-md-12 frame_cari">
                <span class="h_lable ">Jenis PPH</span>
                <select v-model="form.master_pph" class="bg-white">
                    <option v-for="data in $store.state.list_master_pph" :key="data.id" :value="data.id">🔹 {{ data.uraian }} ({{ data.nilai }}%)</option>
                </select>
            </div>

            <div class="col-12 col-md-6 frame_cari">
                <span class="h_lable ">Nilai PPH (%)</span>
                <q-input v-model="form.pph_nilai" outlined square :dense="true" type="number" class="bg-white margin_btn" /> 
            </div>
            <div class="col-12 col-md-6 frame_cari">
                <span class="h_lable ">Realisasi PPH (Rp)</span>
                <q-input v-model="form.pph_realisasi" outlined square :dense="true" type="number" class="bg-white margin_btn" /> 
            </div>

            <div class="col-12 frame_cari">
                <hr class="hrpagin">
            </div>

            <div class="col-12 col-md-12 frame_cari">

                <q-card-actions v-if="type == 1" class="bg-grey-4 mdl-footer" align="right">
                    <q-btn  color="primary" @click="addRealisasi()" label="Simpan" />
                    <q-btn label="Batal" color="negative" v-close-popup />
                </q-card-actions>


                <q-card-actions v-if="type == 2" class="bg-grey-4 mdl-footer" align="right">
                  <q-btn color="primary" @click="editRealisasi()" label="Simpan" />
                  <q-btn label="Batal" color="negative" v-close-popup />
                </q-card-actions>

            </div>
            
        </div>




    </div>
</template>

<script>


import FETCHING from '../../library/fetching'
import DATAMASTER from '../../library/dataMaster'
import UMUM from '../../library/umum'





export default {
    props: ['realisasi', 'type'],
    // props: {
    //     realisasi : Object,
    //     refreshz : Function

    // },
    
    data() {
        return {
            key: 'value',
            form : {
                id : '',
                realisasi_fisik_id : 0,
                realisasi_keuangan_id : 0,
                jns_realisasi : this.realisasi.kk_jenis,

                no : '',
                nilai : 0,
                
                dari_tgl : 0,
                sampai_tgl : 0,
                penerima : '',
                nilai_harian : 0,
                nilai_tiket_pergi : 0,
                nilai_tiket_pulang : 0,
                nilai_penginapan : 0,
                nilai_airportex : 0,
                representasi : 0,
                realisasi_keuangan : 0,
                selisih_realisasi : 0,

                ppn : 0,
                ppn_realisasi : 0,
                master_pph : 0,
                pph_nilai : 0,
                pph_realisasi : 0,

            },
            FETCHING : FETCHING,
            DATAMASTER : DATAMASTER,
            UMUM : UMUM,
        }
    },
    methods: {




        addRealisasi : function(){
            this.realisasi.dd = this.ReConvertFormatDate(this.realisasi.tgl).dd
            this.realisasi.mm = this.ReConvertFormatDate(this.realisasi.tgl).mm
            this.realisasi.yy = this.ReConvertFormatDate(this.realisasi.tgl).yy

            fetch(this.$store.state.url.CT_REALISASI_FISIK + "addData", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({
                    realisasi : this.realisasi,
                    form : this.form
                })
            }).then(res_data => {
                this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
                // this.viewRealisasi();
                this.$emit('refreshz');
            });

            // this.$emit('refreshz');


            // this.refreshz();


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
                body: JSON.stringify({
                    realisasi : this.realisasi,
                    form : this.form
                })
            }).then(res_data => {
                this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
                this.$emit('refreshz');
            });

        // console.log(this.label.rincian);
        },

        ReConvertFormatDate : function(data){
            const d = new Date(data)
            return {
                yy : d.getFullYear(),
                mm : d.getMonth() + 1,
                dd : d.getDate(),
            }
        },

        Notify : function(message, positive, icon){
          this.$q.notify({
            message: message,
            color: positive,
            icon: icon,
            position : 'top',
            timeout: 500,
          })
        },




    },


    mounted () {
        DATAMASTER.getMasterPPH(); 


        console.log(this.realisasi);


        if (this.type == 2) {

            var dtx = this.realisasi.detile

            this.form = {
                id : dtx.id,
                realisasi_fisik_id : dtx.realisasi_fisik_id,
                jns_realisasi : this.realisasi.kk_jenis,

                no : dtx.no,
                nilai : dtx.nilai,

                dari_tgl : dtx.dari_tgl,
                sampai_tgl : dtx.sampai_tgl,
                penerima : dtx.penerima,
                nilai_harian : dtx.nilai_harian,
                nilai_tiket_pergi : dtx.nilai_tiket_pergi,
                nilai_tiket_pulang : dtx.nilai_tiket_pulang,
                nilai_penginapan : dtx.nilai_penginapan,
                nilai_airportex : dtx.nilai_airportex,
                representasi : dtx.representasi,
                realisasi_keuangan : dtx.realisasi_keuangan,
                selisih_realisasi : dtx.selisih_realisasi,


                ppn : dtx.ppn,
                ppn_realisasi : dtx.ppn_realisasi,
                master_pph : dtx.master_pph,
                pph_nilai : dtx.pph_nilai,
                pph_realisasi : dtx.pph_realisasi,

            }
            
        } else {

            this.form = {
                id : '',
                realisasi_fisik_id : 0,
                realisasi_keuangan_id : 0,
                jns_realisasi : this.realisasi.kk_jenis,

                no : '',
                nilai : 0,
                
                penerima : '',
                dari_tgl : '',
                sampai_tgl : '',
                nilai_harian : 0,
                nilai_tiket_pergi : 0,
                nilai_tiket_pulang : 0,
                nilai_penginapan : 0,
                nilai_airportex : 0,
                representasi : 0,
                realisasi_keuangan : 0,
                selisih_realisasi : 0,

                ppn : 0,
                ppn_realisasi : 0,
                master_pph : 0,
                pph_nilai : 0,
                pph_realisasi : 0,

            }
            
        }

        // console.log("dari props");
        // console.log(this.realisasi);
        // console.log("dari props");
    },


}
</script>

