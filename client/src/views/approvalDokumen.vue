<template>
  <div class="about" style="padding:15px">
    <q-card bordered class="my-card">
      <!-- HEADER SECTION -->
      <q-card-section class="main1 text-white">
        <div class="row items-center">
          <div class="col-12 col-md-5">
            <div class="text-h6 h_titleHead">APPROVAL DOKUMEN</div>
            <div class="text-subtitle2">Pusat Verifikasi & Persetujuan Berkas OPD</div>
          </div>
          <div class="col-12 col-md-7">
            <div class="row items-center justify-end" style="gap: 10px;">
              <!-- FILTER TAHUN ANGGARAN -->
              <div style="width: 120px;">
                <select v-model="filterku.tahun" @change="cari_data()" class="bg-white" style="height: 38px; border-radius: 4px;">
                  <option value="">-- Tahun --</option>
                  <option v-for="data in $store.state.list_tahun" :key="data.id" :value="data.id">
                    {{ data.id }}
                  </option>
                </select>
              </div>

              <!-- PENCARIAN -->
              <div style="flex: 1; max-width: 350px;">
                <q-input 
                  v-model="cari_value" 
                  @keyup="cari_data()" 
                  outlined 
                  square 
                  :dense="true"
                  class="bg-white" 
                  style="width:100%" 
                  placeholder="Cari nama file atau OPD..."
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator dark inset />

      <!-- FILTERS SECTION -->
      <q-card-section>
        <hr class="hrpagin">

        <div class="row">
          <!-- INSTANSI / UNIT KERJA -->
          <div class="col-12 col-md-4" style="padding: 0 5px;">
            <span class="h_lable">Unit Kerja</span>
            <select v-model="filterku.instansi" @change="onChangexUnitKerja()" class="bg-white">
              <option value="">-- SEMUA UNIT KERJA --</option>
              <option v-for="data in $store.state.list_instansi" :key="data.id" :value="data.id">
                🔹 {{ data.instansi }}
              </option>
            </select>
          </div>

          <!-- SUB UNIT KERJA / OPD -->
          <div class="col-12 col-md-4" style="padding: 0 5px;">
            <span class="h_lable">Sub Unit Kerja</span>
            <select v-model="filterku.unit_kerja" @change="cari_data()" class="bg-white">
              <option value="">-- SEMUA SUB-UNIT KERJA --</option>
              <option v-for="data in $store.state.list_unit_kerja" :key="data.id" :value="data.id">
                🔸 {{ data.unit_kerja }}
              </option>
            </select>
          </div>

          <!-- JENIS DOKUMEN -->
          <div class="col-12 col-md-2" style="padding: 0 5px;">
            <span class="h_lable">Jenis Dokumen</span>
            <select v-model="filterku.menu_key" @change="cari_data()" class="bg-white">
              <option value="">-- SEMUA JENIS --</option>
              <option v-for="m in list_menu_options" :key="m" :value="m">{{ m }}</option>
            </select>
          </div>

          <!-- STATUS APPROVAL -->
          <div class="col-12 col-md-2" style="padding: 0 5px;">
            <span class="h_lable">Status Approval</span>
            <select v-model="filterku.status_approval" @change="cari_data()" class="bg-white">
              <option value="">-- SEMUA STATUS --</option>
              <option value="0">⏳ Menunggu Verifikasi</option>
              <option value="1">🟢 Disetujui (Approved)</option>
              <option value="2">🔴 Ditolak (Rejected)</option>
            </select>
          </div>
        </div>

        <hr class="hrpagin2">

        <!-- LIST DOKUMEN GRID -->
        <div class="row q-col-gutter-md">
          <div class="col-md-4 col-sm-6 col-12 flexing" v-for="(data, index) in list_data" :key="index">
            <div class="row listDokRow" style="width: 100%; margin: 0;">
              
              <!-- FILE TYPE IMAGE -->
              <div class="col-md-3 col-3 listDok text-center">
                <a @click="previewFile(data)" href="javascript:void(0);" class="h_clear1">
                  <q-img 
                    style="width: 100%; max-width: 50px;"
                    :src="'img/filetype/' + UMUM.imageFileType(data.file_type)"
                    spinner-color="yellow" 
                  />
                </a>
              </div>

              <!-- FILE INFORMATION & STATUS -->
              <div class="col-md-9 col-9 listDok" style="padding-left: 10px; padding-right: 75px;">
                <q-badge color="blue-8" class="q-mb-xs">{{ data.menu_key }}</q-badge>
                
                <a @click="previewFile(data)" href="javascript:void(0);" class="h_listDok1 h_clear1">
                  {{ data.nama_file }}
                </a>
                <div class="h_listDok2" style="font-size: 11px; line-height: 1.2;">
                  {{ data.unit_kerja_nama || 'OPD' }}
                </div>
                <div class="h_listDok3">
                  <q-icon name="event" /> {{ UMUM.tglConvert(data.createAt) }}
                </div>

                <div v-if="data.status_approval === 2 && data.catatan_revisi" class="text-caption text-red-9 q-mt-xs" style="font-size: 10px;">
                  <strong>Revisi:</strong> {{ data.catatan_revisi }}
                </div>
              </div>

              <!-- STATUS BADGE SEBELAH KANAN -->
              <div style="position: absolute; top: 6px; right: 32px;">
                <q-chip v-if="data.status_approval === 0 || data.status_approval == null" color="orange-8" text-color="white" dense icon="hourglass_top" style="font-size:10px; margin: 0;">
                  Proses
                </q-chip>
                <q-chip v-else-if="data.status_approval === 1" color="green-8" text-color="white" dense icon="check_circle" style="font-size:10px; margin: 0;">
                  Disetujui
                </q-chip>
                <q-chip v-else-if="data.status_approval === 2" color="red-8" text-color="white" dense icon="cancel" style="font-size:10px; margin: 0;">
                  Ditolak
                </q-chip>
              </div>

              <!-- SETTINGS MENU DROPDOWN -->
              <div class="listDok_setting">
                <q-btn icon="settings" flat round size="xs" color="grey-7">
                  <q-menu transition-show="scale" transition-hide="scale">
                    <q-list style="min-width: 120px">
                      <q-item clickable v-close-popup @click="previewFile(data)">
                        <q-item-section avatar><q-icon name="visibility" color="blue" /></q-item-section>
                        <q-item-section>Preview</q-item-section>
                      </q-item>
                      
                      <q-item v-if="data.status_approval !== 1" clickable v-close-popup @click="selectData(data), mdl_approve = true">
                        <q-item-section avatar><q-icon name="check_circle" color="green" /></q-item-section>
                        <q-item-section>Setujui</q-item-section>
                      </q-item>
                      
                      <q-item v-if="data.status_approval !== 2" clickable v-close-popup @click="selectData(data), mdl_reject = true">
                        <q-item-section avatar><q-icon name="cancel" color="red" /></q-item-section>
                        <q-item-section>Tolak</q-item-section>
                      </q-item>

                      <q-separator />

                      <q-item clickable v-close-popup @click="downloadFile(data.file)">
                        <q-item-section avatar><q-icon name="download" color="grey-8" /></q-item-section>
                        <q-item-section>Download</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>

            </div>
          </div>
        </div>

        <div v-if="list_data.length === 0" class="text-center q-pa-xl text-grey-6">
          <q-icon name="folder_open" size="64px" />
          <div class="text-h6 q-mt-sm">Tidak ada dokumen ditemukan</div>
        </div>

        <hr class="hrpagin">
        <br>
      </q-card-section>

      <!-- MODAL APPROVE / SETUJUI -->
      <q-dialog v-model="mdl_approve" persistent>
        <q-card style="min-width: 450px;">
          <q-card-section class="bg-green-7 text-white row items-center">
            <div class="text-h6"><q-icon name="check_circle" /> Setujui Dokumen</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="q-pt-md text-center">
            <q-icon name="task_alt" size="64px" color="green-7" />
            <div class="text-subtitle1 text-bold q-mt-sm">
              Konfirmasi Persetujuan Dokumen
            </div>
            <div class="text-caption text-grey-8 q-mt-xs">
              Apakah Anda yakin ingin menyetujui dokumen <strong>"{{ selected_data ? selected_data.nama_file : '' }}"</strong> dari <strong>{{ selected_data ? selected_data.unit_kerja_nama : '' }}</strong>?
            </div>
          </q-card-section>

          <q-card-actions align="right" class="bg-grey-2 q-pa-md">
            <q-btn flat label="Batal" v-close-popup color="grey-8" />
            <q-btn color="green-7" icon="check" label="Ya, Setujui" @click="submitApprove()" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- MODAL REJECT / TOLAK -->
      <q-dialog v-model="mdl_reject" persistent>
        <q-card style="min-width: 450px;">
          <q-card-section class="bg-red-7 text-white row items-center">
            <div class="text-h6"><q-icon name="cancel" /> Tolak Dokumen</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="q-pt-md">
            <div class="text-subtitle2 text-grey-8 q-mb-sm">
              Dokumen: <strong>{{ selected_data ? selected_data.nama_file : '' }}</strong> ({{ selected_data ? selected_data.unit_kerja_nama : '' }})
            </div>

            <span class="h_lable">Alasan Penolakan / Catatan Revisi untuk OPD *</span>
            <q-input 
              v-model="catatan_revisi_input" 
              type="textarea" 
              outlined 
              dense 
              rows="4" 
              placeholder="Masukkan alasan penolakan agar OPD dapat melakukan perbaikan..." 
              class="bg-white margin_btn"
            />
          </q-card-section>

          <q-card-actions align="right" class="bg-grey-2 q-pa-md">
            <q-btn flat label="Batal" v-close-popup color="grey-8" />
            <q-btn color="red-7" icon="send" label="Kirim Penolakan" @click="submitReject()" />
          </q-card-actions>
        </q-card>
      </q-dialog>

    </q-card>

    <!-- PREVIEW SECTION INLINE BELOW -->
    <q-card bordered v-if="selected_file" class="q-mt-md">
      <q-card-section class="main1x text-white row items-center">
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
          style="border: none;"
        ></iframe>

        <iframe 
          v-else-if="selected_file_type.includes('spreadsheet') || selected_file_type.includes('excel')"
          :src="'https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent($store.state.url.URL_APP + 'uploads/' + selected_file)" 
          width="100%" 
          height="100%" 
          style="border: none;"
        ></iframe>

        <div v-else-if="selected_file_type.includes('image')" class="flex flex-center" style="height: 100%;">
          <img :src="$store.state.url.URL_APP + 'uploads/' + selected_file" style="max-width: 100%; max-height: 100%;" />
        </div>

        <div v-else class="text-center q-pa-xl">
          <div class="text-grey">Preview tidak tersedia untuk format ini.</div>
          <q-btn label="Download File" color="primary" @click="downloadFile(selected_file)" flat icon="download" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import DATAMASTER from '../library/dataMaster'
import UMUM from '../library/umum'

export default {
  name: 'ApprovalDokumen',
  data() {
    return {
      filterku: {
        instansi: '',
        unit_kerja: '',
        tahun: new Date().getFullYear(),
        status_approval: '',
        menu_key: ''
      },

      cari_value: '',
      list_data: [],
      list_menu_options: [
        'BKU', 'DPA', 'LPJ', 'LRA', 'SPP', 'SPM', 'SP2D', 'REKON PAJAK', 'REKENING KORAN'
      ],

      selected_file: null,
      selected_file_type: '',
      selected_file_name: '',

      selected_data: null,
      mdl_approve: false,
      mdl_reject: false,
      catatan_revisi_input: '',

      DATAMASTER: DATAMASTER,
      UMUM: UMUM
    }
  },

  methods: {
    previewFile(data) {
      this.selected_file = data.file;
      this.selected_file_type = data.file_type || 'application/pdf';
      this.selected_file_name = data.nama_file;

      setTimeout(() => {
        window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
      }, 100);
    },

    downloadFile(filename) {
      window.open(this.$store.state.url.URL_APP + 'uploads/' + filename, '_blank');
    },

    selectData(data) {
      this.selected_data = data;
    },

    Notify(message, positive, icon) {
      this.$q.notify({
        message: message,
        color: positive,
        icon: icon,
        position: 'top',
        timeout: 1000
      });
    },

    async onChangexInstansi() {
      await DATAMASTER.getInstansiAsync("");
      this.onChangexUnitKerja();
    },

    async onChangexUnitKerja() {
      await DATAMASTER.getUnitKerjaAsync(this.filterku.instansi);
      this.getView();
    },

    cari_data() {
      this.getView();
    },

    getView() {
      this.$store.commit("shoWLoading");
      const unitKerjaSearch = this.filterku.unit_kerja || this.filterku.instansi || '';

      fetch(this.$store.state.url.APPROVAL + 'list-dokumen', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: 'kikensbatara ' + localStorage.token
        },
        body: JSON.stringify({
          tahun: this.filterku.tahun,
          status_approval: this.filterku.status_approval,
          menu_key: this.filterku.menu_key,
          unit_kerja: unitKerjaSearch,
          cari: this.cari_value
        })
      })
        .then(res => res.json())
        .then(res_data => {
          let rows = res_data.data || [];
          if (this.cari_value.trim()) {
            const q = this.cari_value.toLowerCase();
            rows = rows.filter(x => 
              (x.nama_file && x.nama_file.toLowerCase().includes(q)) ||
              (x.unit_kerja_nama && x.unit_kerja_nama.toLowerCase().includes(q))
            );
          }
          this.list_data = rows;
          this.$store.commit("hideLoading");
        })
        .catch(err => {
          console.error(err);
          this.$store.commit("hideLoading");
          this.Notify('Gagal memuat data', 'negative', 'warning');
        });
    },

    openRejectModal(data) {
      this.selected_data = data;
      this.catatan_revisi_input = '';
      this.mdl_reject = true;
    },

    submitApprove() {
      if (!this.selected_data) return;
      this.updateStatus(this.selected_data.table_name, this.selected_data.id, 1, null);
      this.mdl_approve = false;
    },

    submitReject() {
      if (!this.catatan_revisi_input.trim()) {
        this.Notify('Alasan penolakan wajib diisi!', 'warning', 'warning');
        return;
      }
      this.updateStatus(
        this.selected_data.table_name,
        this.selected_data.id,
        2,
        this.catatan_revisi_input
      );
      this.mdl_reject = false;
    },

    updateStatus(table_name, id, status_approval, catatan_revisi) {
      this.$store.commit("shoWLoading");
      fetch(this.$store.state.url.APPROVAL + 'verify-dokumen', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: 'kikensbatara ' + localStorage.token
        },
        body: JSON.stringify({
          table_name: table_name,
          id: id,
          status_approval: status_approval,
          catatan_revisi: catatan_revisi
        })
      })
        .then(res => res.json())
        .then(data => {
          this.$store.commit("hideLoading");
          this.Notify(
            data.message || 'Status berhasil diperbarui',
            status_approval === 1 ? 'primary' : 'negative',
            status_approval === 1 ? 'check_circle_outline' : 'warning'
          );
          this.getView();
        })
        .catch(err => {
          console.error(err);
          this.$store.commit("hideLoading");
          this.Notify('Gagal memverifikasi dokumen', 'negative', 'warning');
        });
    }
  },

  mounted() {
    let profilex = JSON.parse(localStorage.profile);
    let profile = profilex.profile;

    this.filterku.instansi = '';
    this.filterku.unit_kerja = '';

    if (this.$route.query.status_approval !== undefined && this.$route.query.status_approval !== null) {
      this.filterku.status_approval = this.$route.query.status_approval;
    }
    if (this.$route.query.tahun) {
      this.filterku.tahun = parseInt(this.$route.query.tahun);
    }

    DATAMASTER.getTahun();
    this.onChangexInstansi();
    this.getView();
  }
}
</script>

<style scoped>
.listDokRow {
    border: 1px solid #e0e0e0;
    padding: 8px;
    margin-bottom: 5px;
    border-radius: 8px;
    position: relative;
    background: white;
    transition: 0.3s;
    min-height: 80px;
    display: flex;
    align-items: center;
}

.h_listDok1 {
    font-weight: bold;
    font-size: 13px;
    color: #1976D2;
    text-decoration: none;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.h_listDok2 {
    font-size: 10px;
    color: #616161;
    margin-top: 2px;
}

.h_listDok3 {
    font-size: 10px;
    color: #9E9E9E;
    margin-top: 2px;
}

.listDok_setting {
    position: absolute;
    top: 2px;
    right: 2px;
}
</style>
