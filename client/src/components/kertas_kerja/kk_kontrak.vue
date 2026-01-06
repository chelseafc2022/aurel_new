<template>
    <div class="row">

        <div class="row">

            <div class="col-12 col-md-12 frame_cari">
                <span class="h_lable ">Nomor Kontrak</span>
                <q-input v-model="form.no" outlined square :dense="true" class="bg-white margin_btn" /> 
            </div>

            <div class="col-12 col-md-12 frame_cari">
                <span class="h_lable ">Nilai Kontrak</span>
                <q-input v-model="form.nilai" outlined square :dense="true" type="number" class="bg-white margin_btn" /> 
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
                <span class="h_lable ">No Bast / PHO / FHO</span>
                <q-input v-model="form.bast" outlined square :dense="true" class="bg-white margin_btn" /> 
            </div>

            <div class="col-12 col-md-12 frame_cari">
                <span class="h_lable ">Penyedia</span>
                <q-input v-model="form.penyedia" outlined square :dense="true" class="bg-white margin_btn" /> 
            </div>

            <div class="col-12 col-md-12 frame_cari">
                <span class="h_lable ">NIP Penanggung Jawab</span>
                <q-input v-model="form.penanggung_jawab_nip" outlined square :dense="true" class="bg-white margin_btn" /> 
            </div>


            <div class="col-12 col-md-12 frame_cari">
                <span class="h_lable ">Jabatan Penanggung Jawab</span>
                <select v-model="form.penanggung_jawab_jabatan_kegiatan" class="bg-white">
                    <option v-for="data in $store.state.list_master_pj" :key="data.id" :value="data.id">🔹 {{ data.uraian }}</option>
                </select>
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
                master_sumber_dana_id : 0,
                master_permintaan_id : 0,
                no : 0,
                nilai : 0,
                dari_tgl : 0,
                sampai_tgl : 0,
                bast : 0,
                penyedia : 0,
                penanggung_jawab_nip : 0,
                penanggung_jawab_jabatan_kegiatan : 0,
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
        DATAMASTER.getMasterPJ();


        console.log(this.realisasi);

        var dtx = this.realisasi.detile

        if (this.type == 2) {

            this.form.id = dtx.id ;
            this.form.realisasi_fisik_id = dtx.realisasi_fisik_id ;
            this.form.realisasi_keuangan_id = dtx.realisasi_keuangan_id ;
            this.form.jns_realisasi = dtx.jns_realisasi ;
            this.form.master_sumber_dana_id = dtx.master_sumber_dana_id ;
            this.form.master_permintaan_id = dtx.master_permintaan_id ;
            this.form.no = dtx.no ;
            this.form.nilai = dtx.nilai ;
            this.form.dari_tgl = dtx.dari_tgl ;
            this.form.sampai_tgl = dtx.sampai_tgl ;
            this.form.bast = dtx.bast ;
            this.form.penyedia = dtx.penyedia ;
            this.form.penanggung_jawab_nip = dtx.penanggung_jawab_nip ;
            this.form.penanggung_jawab_jabatan_kegiatan = dtx.penanggung_jawab_jabatan_kegiatan ;
            this.form.ppn = dtx.ppn ;
            this.form.ppn_realisasi = dtx.ppn_realisasi ;
            this.form.master_pph = dtx.master_pph ;
            this.form.pph_nilai = dtx.pph_nilai ;
            this.form.pph_realisasi = dtx.pph_realisasi ;

        } else {

            this.form = {
                id : '',
                realisasi_fisik_id : 0,
                realisasi_keuangan_id : 0,
                jns_realisasi : this.realisasi.kk_jenis,
                master_sumber_dana_id : 0,
                master_permintaan_id : 0,
                no : 0,
                nilai : 0,
                dari_tgl : 0,
                sampai_tgl : 0,
                bast : 0,
                penyedia : '',
                penanggung_jawab_nip : 0,
                penanggung_jawab_jabatan_kegiatan : 0,
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

