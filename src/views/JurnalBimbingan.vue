<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import {
  BookOpenCheck, CalendarDays, Clock, MapPin, Video,
  Plus, Trash2, CalendarPlus, StickyNote, CalendarClock,
  Calendar, PenLine, CheckCircle2, CircleDashed, Gift, ChevronDown
} from 'lucide-vue-next'

const jadwal = ref([])
const isFormJadwalBuka = ref(false)
const formJadwal = ref({ topik: '', tanggal: '', waktu: '', tipe: 'Tatap Muka', lokasi: '', status: 'pending' })

const catatan = ref([])
const judulCatatan = ref('')
const isiCatatan = ref('')
const rewardCatatan = ref('') 
const tabCatatan = ref('revisi')

const dataKanban = ref([])


const isDropdownTipeBuka = ref(false)


const deleteModal = ref({ show: false, tipe: '', id: null, title: '', desc: '' })

const muatKanban = () => {
  const kanbanLokal = localStorage.getItem('kawalSkripsi_kanban')
  if (kanbanLokal) dataKanban.value = JSON.parse(kanbanLokal)
}

onMounted(() => {
  const dataJadwal = localStorage.getItem('kawalSkripsi_jadwal')
  if (dataJadwal) jadwal.value = JSON.parse(dataJadwal)

  const dataCatatan = localStorage.getItem('kawalSkripsi_catatan')
  if (dataCatatan) catatan.value = JSON.parse(dataCatatan)

  muatKanban()
  window.addEventListener('kawalSkripsi_update', muatKanban)
})

onUnmounted(() => {
  window.removeEventListener('kawalSkripsi_update', muatKanban)
})

watch(jadwal, (val) => {
  localStorage.setItem('kawalSkripsi_jadwal', JSON.stringify(val))
  window.dispatchEvent(new CustomEvent('kawalSkripsi_update'))
}, { deep: true })

watch(catatan, (val) => {
  localStorage.setItem('kawalSkripsi_catatan', JSON.stringify(val))
  window.dispatchEvent(new CustomEvent('kawalSkripsi_update'))
}, { deep: true })


const bukaPicker = (e) => {
  try {
    if (e.target && typeof e.target.showPicker === 'function') {
      e.target.showPicker()
    }
  } catch (error) {
 
  }
}

const pilihTipeJadwal = (tipe) => {
  formJadwal.value.tipe = tipe
  isDropdownTipeBuka.value = false
}

const tambahJadwal = () => {
  if (!formJadwal.value.topik || !formJadwal.value.tanggal) return
  jadwal.value.push({ id: Date.now(), ...formJadwal.value, status: 'pending' })
  jadwal.value.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
  formJadwal.value = { topik: '', tanggal: '', waktu: '', tipe: 'Tatap Muka', lokasi: '', status: 'pending' }
  isFormJadwalBuka.value = false
}

const ubahStatusJadwal = (id, statusBaru) => {
  const item = jadwal.value.find(j => j.id === id)
  if (item) item.status = statusBaru
}

const tambahKeGCal = (item) => {
  const waktuMulai = new Date(`${item.tanggal}T${item.waktu}:00`);
  const waktuSelesai = new Date(waktuMulai.getTime() + (60 * 60 * 1000));
  const formatGCal = (date) => date.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const start = formatGCal(waktuMulai);
  const end = formatGCal(waktuSelesai);
  const judul = encodeURIComponent(`Bimbingan Skripsi: ${item.topik}`);
  const detail = encodeURIComponent(`Pengingat otomatis dari KawalSkripsi.\nTipe: ${item.tipe}`);
  const lokasi = encodeURIComponent(item.lokasi);

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${judul}&dates=${start}/${end}&details=${detail}&location=${lokasi}`;
  window.open(url, '_blank');
}

const tambahCatatan = () => {
  if (!judulCatatan.value.trim() || !isiCatatan.value.trim()) return
  
  catatan.value.unshift({
    id: Date.now(),
    judul: judulCatatan.value,
    isi: isiCatatan.value,
    reward: tabCatatan.value === 'revisi' ? rewardCatatan.value : '', 
    tipe: tabCatatan.value,
    tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  })

  if (tabCatatan.value === 'revisi') {
    const kanbanLokal = localStorage.getItem('kawalSkripsi_kanban')
    let currentKanban = kanbanLokal ? JSON.parse(kanbanLokal) : []
    
    currentKanban.push({
      id: Date.now() + 1,
      judul: '[Revisi] ' + judulCatatan.value,
      deskripsi: isiCatatan.value,
      status: 'progress' 
    })
    
    localStorage.setItem('kawalSkripsi_kanban', JSON.stringify(currentKanban))
    window.dispatchEvent(new CustomEvent('kawalSkripsi_update'))
    muatKanban() 
  }

  judulCatatan.value = ''; 
  isiCatatan.value = '';
  rewardCatatan.value = '';
}

const catatanTampil = computed(() => {
  return catatan.value.filter(c => {
    const tipeCatatan = c.tipe || 'revisi'
    return tipeCatatan === tabCatatan.value
  })
})

const isCatatanSelesai = (item) => {
  if (item.tipe !== 'revisi') return false
  const judulDiKanban = '[Revisi] ' + item.judul
  const task = dataKanban.value.find(t => t.judul === judulDiKanban)
  return task && task.status === 'done'
}

const formatTanggal = (tgl) => new Date(tgl).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })


const zonaWaktuLokal = computed(() => {
  const offset = new Date().getTimezoneOffset();
  

  if (offset === -420) return 'WIB';  
  if (offset === -480) return 'WITA'; 
  if (offset === -540) return 'WIT';  
  

  try {
    const waktuString = new Date().toLocaleTimeString('id-ID', { timeZoneName: 'short' });
    const parts = waktuString.split(' ');
    return parts.length > 1 ? parts[parts.length - 1] : 'WIB';
  } catch (error) {
    return 'WIB'; 
  }
});

const bukaModalHapusJadwal = (id) => {
  deleteModal.value = {
    show: true,
    tipe: 'jadwal',
    id: id,
    title: 'Hapus Agenda?',
    desc: 'Agenda bimbingan yang dihapus tidak dapat dikembalikan. Yakin ingin menghapusnya?'
  }
}

const bukaModalHapusCatatan = (id) => {
  deleteModal.value = {
    show: true,
    tipe: 'catatan',
    id: id,
    title: 'Hapus Catatan?',
    desc: 'Catatan ini akan dihapus secara permanen. Yakin ingin melanjutkannya?'
  }
}

const konfirmasiHapus = () => {
  if (deleteModal.value.tipe === 'jadwal') {
    jadwal.value = jadwal.value.filter(j => j.id !== deleteModal.value.id)
  } else if (deleteModal.value.tipe === 'catatan') {
    catatan.value = catatan.value.filter(c => c.id !== deleteModal.value.id)
  }
  batalHapus()
}

const batalHapus = () => {
  deleteModal.value.show = false
  setTimeout(() => {
    deleteModal.value.id = null
    deleteModal.value.tipe = ''
  }, 300)
}


</script>

<template>
  <div class="space-y-12">

    <div class="border-b border-slate-200 dark:border-slate-700 pb-6 transition-colors duration-300">
      <h1 class="text-3xl font-bold text-slate-800 dark:text-white flex items-center">
        <BookOpenCheck class="mr-3 text-emerald-500 w-8 h-8" />
        Jurnal Bimbingan
      </h1>
      <p class="text-slate-500 dark:text-slate-400 mt-2">Atur jadwal bimbingan dan catatan. Tentukan <b>Self Reward</b> untuk setiap revisi agar tetap semangat!</p>
    </div>

    <section>
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-slate-800 dark:text-white flex items-center">
          <CalendarDays class="w-6 h-6 mr-2 text-slate-400 dark:text-slate-500" /> Agenda Terdekat
        </h2>
        <button @click="isFormJadwalBuka = !isFormJadwalBuka" class="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors">
          {{ isFormJadwalBuka ? 'Tutup Form' : '+ Jadwal Baru' }}
        </button>
      </div>

      <div v-show="isFormJadwalBuka" class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-emerald-200 dark:border-emerald-500/30 mb-6 animate-in fade-in slide-in-from-top-4 transition-colors duration-300">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input v-model="formJadwal.topik" type="text" placeholder="Topik (misal: Cek Bab 4)" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none md:col-span-2 transition-colors" />
          
        
          <div class="relative group">
            <div class="w-full h-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl transition-colors group-focus-within:ring-2 group-focus-within:ring-emerald-500 group-hover:border-emerald-300 dark:group-hover:border-emerald-600">
              <span class="flex items-center text-sm font-medium" :class="formJadwal.tanggal ? '' : 'text-slate-400 dark:text-slate-500'">
                <CalendarDays class="w-4 h-4 mr-2 opacity-70" />
                {{ formJadwal.tanggal || 'Pilih Tanggal' }}
              </span>
            </div>
          
            <input v-model="formJadwal.tanggal" type="date" @click="bukaPicker" @focus="bukaPicker" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer dark:scheme-dark z-10" />
          </div>
          
       
          <div class="relative group">
            <div class="w-full h-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl transition-colors group-focus-within:ring-2 group-focus-within:ring-emerald-500 group-hover:border-emerald-300 dark:group-hover:border-emerald-600">
              <span class="flex items-center text-sm font-medium" :class="formJadwal.waktu ? '' : 'text-slate-400 dark:text-slate-500'">
                <Clock class="w-4 h-4 mr-2 opacity-70" />
                {{ formJadwal.waktu ? formJadwal.waktu + ' ' + zonaWaktuLokal : 'Pilih Waktu' }}
              </span>
            </div>
      
            <input v-model="formJadwal.waktu" type="time" @click="bukaPicker" @focus="bukaPicker" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer dark:scheme-dark z-10" />
          </div>
          
     
          <div class="relative z-20">
        
            <div v-if="isDropdownTipeBuka" @click="isDropdownTipeBuka = false" class="fixed inset-0 z-10"></div>
            
            <div class="relative z-20 h-full">
              <button 
                type="button" 
                @click="isDropdownTipeBuka = !isDropdownTipeBuka" 
                class="w-full h-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              >
                <span class="font-medium">{{ formJadwal.tipe }}</span>
                <ChevronDown class="w-4 h-4 text-slate-400 transition-transform duration-300" :class="{ 'rotate-180': isDropdownTipeBuka }" />
              </button>

              <transition name="fade">
                <div v-if="isDropdownTipeBuka" class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden py-1 z-30">
                  <button
                    type="button"
                    @click="pilihTipeJadwal('Tatap Muka')"
                    class="w-full flex items-center px-4 py-2.5 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    :class="formJadwal.tipe === 'Tatap Muka' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-700 dark:text-slate-300'"
                  >
                    Tatap Muka
                  </button>
                  <button
                    type="button"
                    @click="pilihTipeJadwal('Online')"
                    class="w-full flex items-center px-4 py-2.5 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    :class="formJadwal.tipe === 'Online' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-700 dark:text-slate-300'"
                  >
                    Online
                  </button>
                </div>
              </transition>
            </div>
          </div>
      

          <input v-model="formJadwal.lokasi" type="text" placeholder="Lokasi/Link" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-colors" />
          
          <div class="md:col-span-2 flex justify-end mt-2">
            <button @click="tambahJadwal" class="px-6 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-white transition-all">
              Simpan Jadwal
            </button>
          </div>
        </div>
      </div>

      <div v-if="jadwal.length === 0" class="text-center py-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm transition-colors duration-300">
        Belum ada jadwal bimbingan.
      </div>
      
      <div v-else class="flex overflow-x-auto pb-4 gap-4 snap-x">
        <div v-for="item in jadwal" :key="item.id" class="snap-start shrink-0 w-80 bg-white dark:bg-slate-800 rounded-2xl border shadow-sm flex flex-col overflow-hidden transition-colors duration-300" :class="(item.status || 'pending') === 'selesai' ? 'border-emerald-200 dark:border-emerald-700/50 opacity-70' : 'border-slate-200 dark:border-slate-700'">
          <div class="h-1.5 w-full" :class="item.tipe === 'Online' ? 'bg-blue-400 dark:bg-blue-500' : 'bg-emerald-400 dark:bg-emerald-500'"></div>
          <div class="p-5 flex-1">
            <div class="flex justify-between items-start mb-3">
              <span class="text-xs font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors">
                {{ formatTanggal(item.tanggal) }}
              </span>
              <span v-if="(item.status || 'pending') === 'selesai'" class="text-xs font-bold px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-colors">
                Selesai
              </span>
              <span v-else class="text-xs font-bold px-2 py-1 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 transition-colors">
                Pending
              </span>
            </div>

            <h3 class="font-bold text-slate-800 dark:text-white mb-2 truncate transition-colors" :class="(item.status || 'pending') === 'selesai' ? 'line-through decoration-slate-400' : ''">{{ item.topik }}</h3>
            
            <div class="text-xs text-slate-500 dark:text-slate-400 space-y-1.5 font-medium transition-colors">
              <div class="flex items-center"><Clock class="w-3.5 h-3.5 mr-1.5" />{{ item.waktu }} {{ zonaWaktuLokal }}</div>
              <div class="flex items-center">
                <component :is="item.tipe === 'Online' ? Video : MapPin" class="w-3.5 h-3.5 mr-1.5" />
                <span class="truncate">{{ item.lokasi }}</span>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between gap-2 items-center transition-colors">
              <button @click="tambahKeGCal(item)" class="flex items-center text-xs font-medium text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-500/10 px-2 py-1.5 rounded transition-colors" title="Google Calendar">
                <Calendar class="w-3.5 h-3.5 mr-1" /> Google Calendar
              </button>
              
              <div class="flex gap-1.5">
                <button v-if="(item.status || 'pending') !== 'selesai'" @click="ubahStatusJadwal(item.id, 'selesai')" class="p-1.5 text-slate-400 dark:text-slate-500 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded transition-colors" title="Tandai Selesai">
                  <CheckCircle2 class="w-4 h-4" />
                </button>
                <button v-if="(item.status || 'pending') === 'selesai'" @click="ubahStatusJadwal(item.id, 'pending')" class="p-1.5 text-emerald-500 dark:text-emerald-400 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded transition-colors" title="Batalkan / Tandai Pending">
                  <CircleDashed class="w-4 h-4" />
                </button>
                <button type="button" @click="bukaModalHapusJadwal(item.id)" class="p-1.5 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors" title="Hapus">
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 class="text-xl font-bold text-slate-800 dark:text-white flex items-center transition-colors">
          <PenLine class="w-6 h-6 mr-2 text-slate-400 dark:text-slate-500" /> Buku Catatan
        </h2>
        
        <div class="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 w-fit transition-colors">
          <button @click="tabCatatan = 'revisi'" class="px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center" :class="tabCatatan === 'revisi' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'">
            <StickyNote class="w-4 h-4 mr-2"/> Revisi Dosen
          </button>
          <button @click="tabCatatan = 'umum'" class="px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center" :class="tabCatatan === 'umum' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'">
            <BookOpenCheck class="w-4 h-4 mr-2"/> Catatan Biasa
          </button>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border mb-6 transition-colors duration-300" :class="tabCatatan === 'revisi' ? 'border-slate-200 dark:border-slate-700' : 'border-blue-100 dark:border-blue-900/50'">
        <div class="space-y-3">
          <input v-model="judulCatatan" type="text" :placeholder="tabCatatan === 'revisi' ? 'Topik Revisi (misal: Perbaikan Bab 3)' : 'Judul Catatan (misal: Ide Judul Skripsi)'" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 rounded-xl outline-none transition-colors" :class="tabCatatan === 'revisi' ? 'focus:ring-2 focus:ring-emerald-500' : 'focus:ring-2 focus:ring-blue-500'" />
            
          <textarea v-model="isiCatatan" rows="2" :placeholder="tabCatatan === 'revisi' ? 'Detail masukan dari dosen...' : 'Tuliskan idemu di sini...'" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 dark:text-white dark:placeholder-slate-500 rounded-xl outline-none resize-none transition-colors" :class="tabCatatan === 'revisi' ? 'focus:ring-2 focus:ring-emerald-500' : 'focus:ring-2 focus:ring-blue-500'"></textarea>
          
          <div v-if="tabCatatan === 'revisi'" class="flex items-center gap-3">
            <Gift class="w-5 h-5 text-rose-400 shrink-0" />
            <input v-model="rewardCatatan" type="text" placeholder="Self Reward jika tuntas (misal: Beli Kopi / Main Game 2 Jam)" class="w-full px-4 py-2 bg-rose-50/50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800/50 text-slate-800 dark:text-white placeholder-rose-400/70 rounded-xl outline-none focus:ring-2 focus:ring-rose-400 transition-colors" />
          </div>
            
          <div class="flex justify-end pt-2">
            <button @click="tambahCatatan" :disabled="!judulCatatan || !isiCatatan" class="px-6 py-2.5 text-white font-medium rounded-xl disabled:opacity-50 transition-all" :class="tabCatatan === 'revisi' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-500 hover:bg-blue-600'">
              Simpan {{ tabCatatan === 'revisi' ? 'Revisi (Otomatis masuk Kanban)' : 'Catatan' }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="catatanTampil.length === 0" class="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-medium transition-colors duration-300">
        {{ tabCatatan === 'revisi' ? 'Skripsimu aman! Belum ada catatan revisi' : 'Belum ada catatan' }}
      </div>
      
      <TransitionGroup v-else name="list" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in catatanTampil" :key="item.id" class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all relative group flex flex-col" :class="[
          item.tipe === 'umum' ? 'border-l-4 border-l-blue-400 dark:border-l-blue-500' : 'border-l-4 border-l-emerald-400 dark:border-l-emerald-500',
          isCatatanSelesai(item) ? 'opacity-60 grayscale' : ''
        ]">
          
          <div v-if="isCatatanSelesai(item)" class="absolute top-4 right-4 text-emerald-500 bg-emerald-100 dark:bg-emerald-500/20 px-2 py-1 rounded text-xs font-bold flex items-center">
            <CheckCircle2 class="w-3 h-3 mr-1" /> Tuntas
          </div>

          <h3 class="font-bold text-lg text-slate-800 dark:text-white mb-2 transition-colors pr-16" :class="isCatatanSelesai(item) ? 'line-through decoration-slate-400' : ''">{{ item.judul }}</h3>
          <p class="text-slate-600 dark:text-slate-300 text-sm whitespace-pre-wrap flex-1 transition-colors" :class="item.reward ? 'mb-4' : 'mb-6'">{{ item.isi }}</p>
          
          <div v-if="item.reward" class="mb-5 mt-auto bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 px-3 py-2 rounded-lg text-xs font-medium flex items-center border border-rose-100 dark:border-rose-500/20">
            <Gift class="w-3.5 h-3.5 mr-2" />
            Reward: {{ item.reward }}
          </div>
          
          <div class="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700 transition-colors" :class="!item.reward ? 'mt-auto' : ''">
            <span class="text-xs text-slate-400 dark:text-slate-500 flex items-center">
              <CalendarClock class="w-3 h-3 mr-1" />{{ item.tanggal }}
            </span>
            <button type="button" @click="bukaModalHapusCatatan(item.id)" class="text-slate-300 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1.5 rounded hover:bg-red-50 dark:hover:bg-red-500/10">
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </TransitionGroup>
    </section>

    
    <transition name="fade">
      <div v-if="deleteModal.show" class="fixed inset-0 z-60 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="batalHapus"></div>
        <div class="bg-white dark:bg-slate-800 w-full max-w-sm p-6 rounded-3xl shadow-2xl relative z-10 transition-colors duration-300 animate-in zoom-in-95 text-center border border-slate-200 dark:border-slate-700">
          <div class="w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-5 text-red-500 border border-red-100 dark:border-red-500/20 shadow-inner">
            <Trash2 class="w-8 h-8" />
          </div>
          <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-2">{{ deleteModal.title }}</h2>
          <p class="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed">{{ deleteModal.desc }}</p>
          <div class="flex gap-3">
            <button @click="batalHapus" class="flex-1 py-3 px-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors">
              Batal
            </button>
            <button @click="konfirmasiHapus" class="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.23)] hover:-translate-y-0.5">
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<style scoped>
.list-enter-active, .list-leave-active { transition: all 0.4s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateY(20px) scale(0.95); }
.overflow-x-auto::-webkit-scrollbar { display: none; }
.overflow-x-auto { -ms-overflow-style: none; scrollbar-width: none; }


.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>