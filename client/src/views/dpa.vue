<template>
    <div class="about" style="padding:15px">
        <q-card bordered class="my-card">
            <q-card-section class="main1 text-white">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="text-h6 h_titleHead">DPA</div>
                        <div class="text-subtitle2">Dokumen Pelaksanaan Anggaran</div>
                    </div>
                    <div class="col-12 col-md-2"></div>
                    <div class="col-12 col-md-4">
                        <div class="row">
                            <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true"
                                class="bg-white" style="width:90%" />
                            <q-btn glossy class="bg-light-blue-10" @click="mdl_add = true" dense flat icon="add"
                                style="width:10%">
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
                    <div class="col-12 col-md-4 rowLeft">
                        <span class="h_lable ">Unit Kerja</span>
                        <select v-model="filterku.instansi" @change="onChangexUnitKerja()" class="bg-white">
                            <option value="">-- SEMUA UNIT KERJA --</option>
                            <option v-for="data in $store.state.list_instansi" :key="data.id" :value="data.id">🔹 {{
                                data.instansi }}</option>
                        </select>
                    </div>
                    <div class="col-12 col-md-4 ">
                        <span class="h_lable ">Sub Unit Kerja</span>
                        <select v-model="filterku.unit_kerja" @change="cari_data()" class="bg-white">
                            <option value="">-- SEMUA SUB-UNIT KERJA --</option>
                            <option v-for="data in $store.state.list_unit_kerja" :key="data.id" :value="data.id">🔸 {{
                                data.unit_kerja }}</option>
                        </select>
                    </div>
                    <div class="col-12 col-md-4 rowRight">
                        <span class="h_lable ">Tahun Anggaran</span>
                        <select v-model="filterku.tahun" @change="cari_data()" class="bg-white">
                            <option value="">-- Tahun --</option>
                            <option v-for="data in $store.state.list_tahun" :key="data.id" :value="data.id">{{ data.id }}
                            </option>
                        </select>
                    </div>
                    <!-- <div class="col-12 col-md-4 rowLeft">
                <span class="h_lable ">Filter Urusan</span>
                <select v-model="filterku.urusan_kode" @change="filterku.urusan_bidang_kode = '', asyncFetchUrusanBidang(filterku.urusan_kode), cari_data()" class="bg-white">
                    <option value="">-- SEMUA URUSAN --</option>
                    <option v-for="data in $store.state.list_urusan" :key="data.id" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
                </select>
            </div>
            <div class="col-12 col-md-4">
                <span class="h_lable ">Filter Bidang Urusan</span>
                <select v-model="filterku.urusan_bidang_kode" @change="cari_data()" class="bg-white">
                    <option value="">-- SEMUA BIDANG URUSAN --</option>
                    <option v-for="data in $store.state.list_urusan_bidang" :key="data.id" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
                </select>
            </div>
            <div class="col-12 col-md-4 rowRight">
                <span class="h_lable ">Unit Kerja</span>
                <select v-model="filterku.urusan_bidang_kode" @change="cari_data()" class="bg-white">
                    <option value="">-- SEMUA BIDANG URUSAN --</option>
                    <option v-for="data in $store.state.list_urusan_bidang" :key="data.id" :value="data.kode_full">[{{ data.kode_full }}]. {{ data.uraian }}</option>
                </select>
            </div> -->


                </div>


                <hr class="hrpagin2">


                <div class="row q-col-gutter-md">

                    <div class="col-md-6 col-12" v-for="(data, index) in list_data" :key="data.id + '-' + index">
                        <div class="listDokRow">

                            <!-- KIRI (ICON / KODE) -->
                            <div class="listDokIcon text-center">
                                <div class="h_kode">
                                    {{ data.kode_full }}
                                </div>
                                <div class="h_nomor">
                                    {{ indexing(index + 1) }}
                                </div>
                            </div>

                            <!-- TENGAH (ISI) -->
                            <div class="listDokContent">
                                <div class="h_listDok1">
                                    {{ data.uraian }}
                                </div>

                                <div class="h_listDok2">
                                    {{ data.unit_kerja_uraian }} ({{ data.tahun }})
                                </div>

                                <div class="h_listDok3">
                                    {{ data.keterangan }}
                                </div>
                            </div>

                            <!-- KANAN (AKSI) -->
                            <div class="listDokSetting">
                                <q-btn flat round color="negative" icon="delete_forever"
                                    @click="selectData(data), mdl_hapus = true">
                                    <q-tooltip content-class="bg-red">
                                        Hapus data
                                    </q-tooltip>
                                </q-btn>
                            </div>

                        </div>
                    </div>

                </div>

                <hr class="hrpagin">
                <br>
                <div class="flex flex-center">
                    <q-pagination @click="getView()" v-model="page_first" :max="page_last" :max-pages="4" color="grey-6"
                        :direction-links="true" :boundary-links="true" icon-first="skip_previous" icon-last="skip_next"
                        icon-prev="fast_rewind" icon-next="fast_forward">
                    </q-pagination>
                </div>




                <br>
            </q-card-section>
        </q-card>





        <!-- =================================================== MODAL =========================================================== -->


        <!-- ================================================= MODAL TAMBAH ================================================ -->
        <q-dialog v-model="mdl_add" persistent>
            <q-card class="mdl-md">
                <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Tambah Data DPA</div>
                </q-card-section>

                <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>

                        <div class="row">



                            <div class="col-12 col-md-12 frame_cari ">
                                <span class="h_lable ">Tahun</span>
                                <select class="bg-white margin_btn" v-model="form.tahun">
                                    <option v-for="data in $store.state.list_tahun" :key="data.id" :value="data.uraian">
                                        {{ data.uraian }}</option>
                                </select>
                            </div>

                            <div class="col-12 col-md-12 frame_cari ">
                              <span class="h_lable ">Nama File</span>
                              <q-input v-model="form.nama_file" outlined square :dense="true" class="bg-white margin_btn" /> 
                            </div>

                            <div class="col-12 col-md-12 frame_cari ">
                              <span class="h_lable ">Ketarangan</span>
                              <q-input v-model="form.keterangan" type="textarea" outlined square :dense="true" class="bg-white margin_btn" /> 
                            </div>

                            <div class="col-12 col-md-12 frame_cari ">
                                <span class="h_lable ">File (PDF)</span>
                                <q-file outlined v-model="form.file" square :dense="true" class="bg-white margin_btn">
                                <template v-slot:prepend>
                                    <q-icon name="attach_file" />
                                </template>
                                </q-file>
                            <!-- <span class="h_lable ">File (PDF)</span>
                              <q-input v-model="form.keterangan" type="textarea" outlined square :dense="true" class="bg-white margin_btn" />  -->
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


        <!-- ================================================= MODAL EDIT ================================================ -->
        <q-dialog v-model="mdl_edit" persistent>
            <q-card class="mdl-md">
                <q-card-section class="bg-orange">
                    <div class="text-h6 h_modalhead">Edit Data</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <br>
                    <div class="row">



                    </div>
                </q-card-section>

                <q-card-actions class="bg-grey-4 mdl-footer" align="right">

                    <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan" />
                    <q-btn label="Batal" color="negative" v-close-popup />

                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- ================================================= MODAL EDIT ================================================ -->

        <!-- ================================================ MODAL HAPUS ================================================ -->
        <q-dialog v-model="mdl_hapus" persistent>
            <q-card class="mdl-sm ">
                <q-card-section class="q-pt-none text-center orageGrad">
                    <form @submit.prevent="removeData">
                        <br>
                        <img src="img/alert.png" alt="" width="75"> <br>
                        <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MENGHAPUS DATA INI??</span>
                        <input type="submit" style="position: absolute; left: -9999px" />
                        <br>
                        <br>

                        <q-btn label="Batal" size="sm" color="negative" v-close-popup />
                        &nbsp;
                        <q-btn type="submit" label="Hapus" size="sm" color="primary" v-close-popup />

                    </form>
                </q-card-section>
            </q-card>
        </q-dialog>

        <!-- ================================================ MODAL HAPUS ================================================ -->




        <!-- =================================================== MODAL =========================================================== -->




    </div>
</template>


<script>


import FETCHING from '../library/fetching'
import DATAMASTER from '../library/dataMaster'

export default {
    data() {
        return {

            mdl_add_file: false,
            btn_add_file: false,

            form: {
                unit_kerja: '',
                tahun: new Date().getFullYear(),
                nama_file: '',
                keterangan: '',
                file: null,
                file_type: ''
            },

            // ====================================== CONTOH AUTOCOMPLETE ====================================
            autocomplete_db: '',
            // ====================================== CONTOH AUTOCOMPLETE ====================================

            filterku: {
                urusan_kode: '',
                tahun: '',
                unit_kerja: '',
                instansi: '',
            },




            list_data: [],

            page_first: 1,
            page_last: 0,
            page_limit: 10,
            cari_value: "",
            cek_load_data: true,


            mdl_add: false,
            mdl_edit: false,
            mdl_hapus: false,
            btn_add: false,


            FETCHING: FETCHING,
            DATAMASTER: DATAMASTER,
        }
    },
    methods: {


        getView: function () {
            this.$store.commit("shoWLoading");
            fetch(this.$store.state.url.CT_PROGRAM + "view", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({
                    data_ke: this.page_first,
                    cari_value: this.cari_value,
                    page_limit: this.page_limit,
                    instansi: this.filterku.instansi,
                    unit_kerja: this.filterku.unit_kerja,
                    tahun: this.filterku.tahun,
                    urusan_kode: this.filterku.urusan_kode,
                    urusan_bidang_kode: this.filterku.urusan_bidang_kode,
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

            let fd = new FormData();
            fd.append('form', JSON.stringify(this.form));
            fd.append('file', this.form.file);

            fetch(this.$store.state.url.DATA_DPA + "addData", {
                method: "POST",
                headers: {
                    authorization: "kikensbatara " + localStorage.token
                },
                body: fd
            })
            .then(res => res.json())
            .then(res_data => {
                this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
                this.mdl_add = false;
                this.getView();
            });

        },



        editData: function () {
            fetch(this.$store.state.url.CT_PROGRAM + "editData", {
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
            fetch(this.$store.state.url.CT_PROGRAM + "removeData", {
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
            this.form.id = data.id;
            this.form.program_id = data.program_id;
            this.form.program_kode = data.program_kode;
            this.form.tahun = data.tahun

            this.asyncFetchUrusanBidang(this.form.urusan_kode)
        },


        // ====================================== CONTOH eDOC ====================================
        async onChangexInstansi() {
            await DATAMASTER.getInstansiAsync("");
            this.onChangexUnitKerja();
        },
        async onChangexUnitKerja() {
            // console.log("yyyyyyyyyyyy");
            var unitkerjax = await DATAMASTER.getUnitKerjaAsync(this.filterku.instansi)
            // console.log("xxxxxxxxxxxxx");
            console.log(unitkerjax[0].id);
            this.filterku.unit_kerja = unitkerjax[0].id
            // console.log("xxxxxxxxxxxxx");
            console.log(this.filterku.unit_kerja);
            this.getView();
        },


        // async asyncFetchUrusan(){
        //   await DATAMASTER.postMasterUrusan('');
        //   this.form.urusan_kode = this.$store.state.list_urusan[0].kode;
        //   this.asyncFetchUrusanBidang(this.form.urusan_kode)
        // },
        // async asyncFetchUrusanBidang(val){
        //   await DATAMASTER.postMasterUrusanBidang(val)
        // },
        // ====================================== CONTOH eDOC ====================================

        // ====================================== CONTOH AUTOCOMPLETE ====================================
        autocomplete_program_filter: function (val, update) {
            update(() => {
                if (val === '') { }
                else { DATAMASTER.postMasterProgramAutoComplete(val, this.form.unit_kerja) }
            })
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
        this.filterku.instansi = profile.instansi_id;
        // this.filterku.unit_kerja = profile.unit_kerja;

        const d = new Date();
        let year = d.getFullYear();
        this.form.tahun = year;
        this.filterku.tahun = year;

        console.log(profile)


        DATAMASTER.getTahun();


        DATAMASTER.postMasterProgramAutoComplete("", this.form.unit_kerja)

        // this.asyncFetchUrusan();
        //   DATAMASTER.postMasterUrusan('')
        this.onChangexInstansi();
        // this.getView();

    },
}
</script>