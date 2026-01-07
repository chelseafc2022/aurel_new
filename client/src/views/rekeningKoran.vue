<template>
    <div class="about" style="padding:15px">
        <q-card bordered class="my-card">
            <q-card-section class="main1 text-white">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="text-h6 h_titleHead">REKENING KORAN</div>
                        <div class="text-subtitle2">LAPORAN REKENING KORAN</div>
                    </div>
                    <div class="col-12 col-md-2"></div>
                    <div class="col-12 col-md-4">
                        <div class="row">
                            <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true"
                                class="bg-white" style="width:90%" />
                            <q-btn glossy class="bg-orange-5" @click="mdl_add = true" dense flat icon="add"
                                style="width:10%">
                                <q-tooltip content-class="bg-orange-5" content-style="font-size: 13px">
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
                    
                </div>


                <hr class="hrpagin2">


                <div class="row q-col-gutter-md"> 
                    <div class="col-md-4 col-sm-6 col-12 flexing" v-for="(data, index) in list_data" :key="index">
                            <div class="row listDokRow" style="width: 100%; margin: 0;">
                                <div class="col-md-3 col-3 listDok text-center">
                                    <a @click="previewFile(data)" href="javascript:void(0);" class="h_clear1">
                                        <q-img
                                            style="width: 100%; max-width: 50px;"
                                            :src="'img/filetype/' + UMUM.imageFileType(data.file_type)"
                                            spinner-color="yellow"
                                        />
                                    </a>
                                </div>

                                <div class="col-md-9 col-9 listDok" style="padding-left: 10px;">
                                    <a @click="previewFile(data)" href="javascript:void(0);" class="h_listDok1 h_clear1">
                                        {{ data.nama_file }}
                                    </a>
                                    <div class="h_listDok2" style="font-size: 11px; line-height: 1.2;">
                                        {{ data.unit_kerja_uraian }}
                                    </div>
                                    <div class="h_listDok3">
                                        <q-icon name="event" /> {{ UMUM.tglConvert(data.createAt) }}
                                    </div>
                                </div>

                                <div class="listDok_setting">
                                    <q-btn icon="settings" flat round size="xs" color="grey-7">
                                        <q-menu transition-show="scale" transition-hide="scale">
                                            <q-list style="min-width: 100px">
                                                <q-item clickable v-close-popup @click="selectData(data), mdl_edit = true">
                                                    <q-item-section avatar><q-icon name="edit" color="blue" /></q-item-section>
                                                    <q-item-section>Edit</q-item-section>
                                                </q-item>
                                                <q-item clickable v-close-popup @click="selectData(data), mdl_hapus = true">
                                                    <q-item-section avatar><q-icon name="delete" color="red" /></q-item-section>
                                                    <q-item-section>Hapus</q-item-section>
                                                </q-item>
                                                <q-separator />
                                                <q-item clickable v-close-popup @click="downloadFile(data.file)">
                                                    <q-item-section avatar><q-icon name="download" color="green" /></q-item-section>
                                                    <q-item-section>Download</q-item-section>
                                                </q-item>
                                            </q-list>
                                        </q-menu>
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


        <div v-if="selected_file" class="q-mt-lg">
            <q-card bordered>
                <q-card-section class="bg-blue-grey-10 text-white row items-center">
                    <div class="text-subtitle1">
                        <q-icon name="description" /> Preview: {{ selected_file_name }} 
                        <span class="text-caption text-grey-4">({{ selected_file }})</span>
                    </div>
                    <q-space />
                    <q-btn icon="close" flat round dense @click="selected_file = null" />
                </q-card-section>
                
                <q-card-section class="q-pa-none" style="height: 600px;">
    
                    <iframe 
                        v-if="selected_file_type === 'application/pdf'"
                        :src="$store.state.url.URL_APP + 'uploads/' + selected_file" 
                        width="100%" 
                        height="100%" 
                        style="border: none;">
                    </iframe>

                    <iframe 
                        v-else-if="selected_file_type.includes('spreadsheet') || selected_file_type.includes('excel')"
                        :src="'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent($store.state.url.URL_APP + 'uploads/' + selected_file)" 
                        width="100%" 
                        height="100%" 
                        style="border: none;">
                    </iframe>

                    <div v-else-if="selected_file_type.includes('image')" class="flex flex-center" style="height: 100%;">
                        <img :src="$store.state.url.URL_APP + 'uploads/' + selected_file" style="max-width: 100%; max-height: 100%;" />
                    </div>

                    <div v-else class="text-center q-pa-xl">
                        <q-icon name="info" size="50px" color="grey" />
                        <div class="text-grey">Preview tidak tersedia untuk format ini.</div>
                        <q-btn label="Download File" color="primary" @click="downloadFile(selected_file)" flat icon="download" />
                    </div>

                </q-card-section>
            </q-card>
        </div>


        <!-- =================================================== MODAL =========================================================== -->


        <!-- ================================================= MODAL TAMBAH ================================================ -->
        <q-dialog v-model="mdl_add" persistent>
            <q-card class="mdl-md">
                <q-card-section class="main1">
                    <div class="text-h6 h_modalhead">Tambah Data Rekening Koran</div>
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
                                <span class="h_lable ">UPLOAD FILE (PDF)</span>
                                <q-file 
                                    outlined 
                                    v-model="form.file" 
                                    square 
                                    :dense="true" 
                                    class="bg-white margin_btn"
                                    accept=".pdf" 
                                >
                                    <template v-slot:prepend>
                                        <q-icon name="attach_file" />
                                    </template>
                                </q-file>
                            </div>

                            <!-- accept=".pdf, .xls, .xlsx" -->



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
                <q-card-section class="bg-orange text-white">
                    <div class="text-h6 h_modalhead">Edit Data Rekening Koran</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <br>
                    <div class="row q-col-gutter-sm">
                        <div class="col-12 frame_cari">
                            <span class="h_lable">Tahun</span>
                            <select class="bg-white margin_btn" v-model="form.tahun">
                                <option v-for="data in $store.state.list_tahun" :key="data.id" :value="data.id">{{ data.id }}</option>
                            </select>
                        </div>

                        <div class="col-12 frame_cari">
                            <span class="h_lable">Nama File</span>
                            <q-input v-model="form.nama_file" outlined square dense class="bg-white margin_btn" /> 
                        </div>

                        <div class="col-12 frame_cari">
                            <span class="h_lable">Keterangan</span>
                            <q-input v-model="form.keterangan" type="textarea" outlined square dense class="bg-white margin_btn" /> 
                        </div>

                        <div class="col-12 frame_cari">
                            <span class="h_lable">Update File (Kosongkan jika tidak diganti)</span>
                            <q-file outlined v-model="form.file" square dense class="bg-white margin_btn" accept=".pdf">
                                <template v-slot:prepend><q-icon name="attach_file" /></template>
                            </q-file>
                            <div class="text-caption text-grey">File saat ini: {{ form.file_old }}</div>
                        </div>
                    </div>
                </q-card-section>

                <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    <q-btn :loading="btn_add" color="primary" @click="editData()" label="Simpan Perubahan" />
                    <q-btn label="Batal" color="negative" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <!-- ================================================= MODAL EDIT ================================================ -->

        <!-- ================================================ MODAL HAPUS ================================================ -->
        <q-dialog v-model="mdl_hapus" persistent>
            <q-card class="mdl-sm">
                <q-card-section class="q-pt-none text-center orageGrad">
                    <form @submit.prevent="removeData">
                        <br>
                        <img src="img/alert.png" alt="" width="75"> <br>
                        <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MENGHAPUS DATA INI??</span>
                        <div class="text-caption text-red-9 q-mt-sm">{{ form.nama_file }}</div>
                        
                        <input type="submit" style="position: absolute; left: -9999px" />
                        <br>

                        <q-btn label="Batal" size="sm" color="negative" v-close-popup />
                        &nbsp;
                        <q-btn type="submit" label="Hapus" size="sm" color="primary" />
                    </form>
                </q-card-section>
            </q-card>
        </q-dialog> 

        <!-- ================================================ MODAL HAPUS ================================================ -->




        <!-- =================================================== MODAL =========================================================== -->




    </div>
</template>


<script>

import DATAMASTER from '../library/dataMaster'
import UMUM from '../library/umum'

export default {
    data() {
        return {

            form: {
                unit_kerja: '',
                tahun: new Date().getFullYear(),
                nama_file: '',
                keterangan: '',
                file: null,
                file_type: ''
            },
            filterku: {
                tahun: '',
                unit_kerja: '',
                instansi: '',
            },

            selected_file: null, 
            selected_file_type: '',
            selected_file_name: '',




            list_data: [],

            page_first: 1,
            page_last: 0,
            page_limit: 10,
            cari_value: "",


            mdl_add: false,
            mdl_edit: false,
            mdl_hapus: false,
            btn_add: false,

            DATAMASTER: DATAMASTER,
            UMUM: UMUM,
        }
    },
    methods: {

        previewFile(data) {
            this.selected_file = data.file;
            this.selected_file_type = data.file_type;
            this.selected_file_name = data.nama_file;
            
            setTimeout(() => {
                window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
            }, 100);
        },
        downloadFile(filename) {
            window.open(this.$store.state.url.URL_APP + 'uploads/' + filename, '_blank');
        },


        getView: function () {
            this.$store.commit("shoWLoading");
            fetch(this.$store.state.url.DATA_REK + "view", {
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
                })
            })
            .then(res => {
                if (!res.ok) throw new Error("Server Error");
                return res.json();
            })
            .then(res_data => {
                this.list_data = res_data.data || [];
                this.page_last = res_data.jml_data || 0;
                this.$store.commit("hideLoading");
            })
            .catch(err => {
                console.error("Fetch Error:", err);
                this.$store.commit("hideLoading");
                this.Notify('Gagal memuat data', 'negative', 'warning');
            });
        },


        addData: function () {

            let fd = new FormData();
            fd.append('form', JSON.stringify(this.form));
            fd.append('file', this.form.file);

            fetch(this.$store.state.url.DATA_REK + "addData", {
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
                this.$store.commit("shoWLoading");
                this.btn_add = true;

                let fd = new FormData();
                fd.append('form', JSON.stringify(this.form));
                // Jika user memilih file baru, masukkan ke FormData
                if (this.form.file) {
                    fd.append('file', this.form.file);
                }

                fetch(this.$store.state.url.DATA_REK + "editData", {
                    method: "POST",
                    headers: {
                        authorization: "kikensbatara " + localStorage.token
                    },
                    body: fd
                })
                .then(res => res.json())
                .then(res_data => {
                    this.btn_add = false;
                    this.$store.commit("hideLoading");
                    this.Notify('Sukses Memperbarui Data', 'warning', 'check_circle_outline');
                    this.mdl_edit = false;
                    this.getView(); // Refresh list
                })
                .catch(err => {
                    this.btn_add = false;
                    this.$store.commit("hideLoading");
                    console.error(err);
                });
            },

            removeData: function () {
                this.$store.commit("shoWLoading");
                
                // Mengambil ID dan Nama File dari form yang sudah diisi saat klik tombol hapus di list
                let data_hapus = {
                    id: this.form.id,
                    file: this.form.file_old 
                };

                fetch(this.$store.state.url.DATA_REK + "hapusData", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        authorization: "kikensbatara " + localStorage.token
                    },
                    body: JSON.stringify(data_hapus)
                })
                .then(res => res.json())
                .then(res_data => {
                    this.$store.commit("hideLoading");
                    this.Notify('Data berhasil dihapus', 'negative', 'delete');
                    this.mdl_hapus = false; // Menutup modal
                    this.getView(); // Refresh data di halaman
                })
                .catch(err => {
                    this.$store.commit("hideLoading");
                    console.error(err);
                });
            },

        selectData: function (data) {
          
            this.form.id = data.id;
            this.form.tahun = data.tahun;
            this.form.nama_file = data.nama_file;
            this.form.keterangan = data.keterangan;
            this.form.unit_kerja = data.unit_kerja;
            this.form.file_old = data.file; 
            this.form.file = null; 
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

        cari_data: function () {
            this.page_first = 1;
            this.getView();
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

        // console.log(profile)


        DATAMASTER.getTahun();
        //   DATAMASTER.postMasterUrusan('')
        this.onChangexInstansi();
        // this.getView();

    },
}
</script>
<style scoped>
.listDokRow {
    border: 1px solid #e0e0e0;
    padding: 8px; /* Dikurangi dari 10px */
    margin-bottom: 5px;
    border-radius: 8px;
    position: relative;
    background: white;
    transition: 0.3s;
    min-height: 80px; /* Menjaga tinggi tetap seragam */
    display: flex;
    align-items: center;
}

.h_listDok1 {
    font-weight: bold;
    font-size: 13px; /* Ukuran teks diperkecil agar pas 3 kolom */
    color: #1976D2;
    text-decoration: none;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* Agar teks panjang tidak merusak layout */
}

.h_listDok2 {
    font-size: 10px; /* Ukuran teks keterangan diperkecil */
    color: #616161;
    margin-top: 2px;
}

.listDok_setting {
    position: absolute;
    top: 2px;
    right: 2px;
}
</style>