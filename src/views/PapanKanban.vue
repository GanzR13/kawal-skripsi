<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { KanbanSquare, GripVertical, CircleDashed, Timer, CheckCircle2, Plus, Edit2, Trash2, X, Gift } from 'lucide-vue-next'

const kolom = [
  { id: 'todo', judul: 'Belum Mulai', ikon: CircleDashed, warnaHeader: 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300', warnaBorder: 'border-slate-200 dark:border-slate-700' },
  { id: 'progress', judul: 'Sedang Dikerjakan', ikon: Timer, warnaHeader: 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400', warnaBorder: 'border-amber-200 dark:border-amber-500/30' },
  { id: 'done', judul: 'Selesai', ikon: CheckCircle2, warnaHeader: 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400', warnaBorder: 'border-emerald-200 dark:border-emerald-500/30' }
]

const tugas = ref([])
const isModalBuka = ref(false)
const isEditing = ref(false)


const isDeleteModalBuka = ref(false)
const tugasToDelete = ref(null)

const formTugas = ref({ id: null, judul: '', deskripsi: '', status: 'todo', reward: '' })

let isUpdatingFromStorage = false 

const muatDataKanban = () => {
  const dataLokal = localStorage.getItem('kawalSkripsi_kanban')
  if (dataLokal) {
    isUpdatingFromStorage = true 
    tugas.value = JSON.parse(dataLokal)
    setTimeout(() => { isUpdatingFromStorage = false }, 100)
  } else {
    tugas.value = [
      { id: 1, judul: 'Bab 1: Pendahuluan', deskripsi: 'Latar belakang dan rumusan masalah.', status: 'done', reward: 'Nonton Netflix 1 Film' },
      { id: 2, judul: 'Bab 2: Tinjauan Pustaka', deskripsi: 'Mencari referensi jurnal 5 tahun terakhir.', status: 'progress', reward: 'Beli Kopi Susu Gula Aren' },
      { id: 3, judul: 'Bab 3: Metodologi', deskripsi: 'Menentukan metode penelitian dan alur sistem.', status: 'todo', reward: 'Makan All You Can Eat' },
      { id: 4, judul: 'Bab 4: Implementasi & Pengujian', deskripsi: 'Coding aplikasi dan uji coba pengguna.', status: 'todo', reward: 'Beli Skin Game' },
      { id: 5, judul: 'Bab 5: Kesimpulan', deskripsi: 'Menarik kesimpulan dari hasil pengujian.', status: 'todo', reward: 'Jalan-jalan ke Mall Bebas Beban' }
    ]
  }
}

onMounted(() => {
  muatDataKanban()
  window.addEventListener('kawalSkripsi_update', muatDataKanban)
})

onUnmounted(() => {
  window.removeEventListener('kawalSkripsi_update', muatDataKanban)
})

watch(tugas, (nilaiBaru) => {
  if (!isUpdatingFromStorage) {
    localStorage.setItem('kawalSkripsi_kanban', JSON.stringify(nilaiBaru))
    window.dispatchEvent(new CustomEvent('kawalSkripsi_update'))
  }
}, { deep: true })

const startDrag = (event, item) => {
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('itemID', item.id)
}

const onDrop = (event, statusBaru) => {
  const itemID = event.dataTransfer.getData('itemID')
  const item = tugas.value.find((t) => t.id == itemID)
  if (item) {
    item.status = statusBaru
  }
}

const bukaModalTambah = (statusAwal = 'todo') => {
  isEditing.value = false
  formTugas.value = { id: null, judul: '', deskripsi: '', status: statusAwal, reward: '' }
  isModalBuka.value = true
}

const bukaModalEdit = (item) => {
  isEditing.value = true
  formTugas.value = { ...item } 

  if (formTugas.value.reward === undefined) formTugas.value.reward = ''
  isModalBuka.value = true
}

const simpanTugas = () => {
  if (!formTugas.value.judul.trim()) return
  if (isEditing.value) {
    const index = tugas.value.findIndex(t => t.id === formTugas.value.id)
    if (index !== -1) tugas.value[index] = { ...formTugas.value }
  } else {
    tugas.value.push({ 
      id: Date.now(), 
      judul: formTugas.value.judul, 
      deskripsi: formTugas.value.deskripsi, 
      status: formTugas.value.status,
      reward: formTugas.value.reward 
    })
  }
  isModalBuka.value = false
}

const hapusTugas = (id) => {
  tugasToDelete.value = id
  isDeleteModalBuka.value = true
}


const konfirmasiHapus = () => {
  if (tugasToDelete.value !== null) {
    tugas.value = tugas.value.filter(t => t.id !== tugasToDelete.value)
    isDeleteModalBuka.value = false
    tugasToDelete.value = null
  }
}

const batalHapus = () => {
  isDeleteModalBuka.value = false
  tugasToDelete.value = null
}
</script>

<template>
  <div class="space-y-8 h-full flex flex-col relative">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-300">
      <div>
        <h1 class="text-3xl font-bold text-slate-800 dark:text-white flex items-center">
          <KanbanSquare class="mr-3 text-emerald-500 w-8 h-8" />
          Papan Progres Skripsi
        </h1>
        <p class="text-slate-500 dark:text-slate-400 mt-2">Drag and drop kartu, tambahkan target dan hadiahmu!</p>
      </div>
      <button @click="bukaModalTambah('todo')" class="flex items-center px-5 py-2.5 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-all shadow-sm">
        <Plus class="w-5 h-5 mr-2" /> Tambah Tugas
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 items-start">
      <div v-for="kol in kolom" :key="kol.id" class="bg-slate-50/50 dark:bg-slate-800/30 rounded-2xl border flex flex-col overflow-hidden h-full min-h-75 transition-colors duration-300" :class="kol.warnaBorder" @drop="onDrop($event, kol.id)" @dragover.prevent @dragenter.prevent>
        <div class="p-4 border-b flex items-center justify-between transition-colors duration-300" :class="[kol.warnaHeader, kol.warnaBorder]">
          <div class="flex items-center font-bold">
            <component :is="kol.ikon" class="w-5 h-5 mr-2" /> {{ kol.judul }}
          </div>
          <div class="flex items-center gap-2">
          
            <button @click="bukaModalTambah(kol.id)" class="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <Plus class="w-4 h-4" />
            </button>
            <span class="bg-white/50 dark:bg-black/20 text-current px-2.5 py-0.5 rounded-full text-xs font-bold">
              {{ tugas.filter(t => t.status === kol.id).length }}
            </span>
          </div>
        </div>

        <div class="p-4 flex-1 flex flex-col overflow-y-auto">
          <div class="space-y-4 mb-4">
            <template v-for="item in tugas" :key="item.id">
              <div v-if="item.status === kol.id" draggable="true" @dragstart="startDrag($event, item)" class="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-500 transition-all cursor-grab active:cursor-grabbing group relative flex flex-col">
                <div class="absolute right-3 top-4 text-slate-300 dark:text-slate-600 group-hover:text-emerald-400 transition-colors">
                  <GripVertical class="w-5 h-5" />
                </div>
                <h3 class="font-bold text-slate-800 dark:text-white pr-6 transition-colors">{{ item.judul }}</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-3 line-clamp-2 transition-colors flex-1">{{ item.deskripsi }}</p>
                
                <div v-if="item.reward && item.reward.trim() !== ''" class="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-100 dark:border-rose-500/20 w-fit">
                  <Gift class="w-3.5 h-3.5 mr-1.5" /> {{ item.reward }}
                </div>

                <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button @click="bukaModalEdit(item)" class="p-1.5 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors" title="Edit"><Edit2 class="w-4 h-4" /></button>
                  <button @click="hapusTugas(item.id)" class="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors" title="Hapus"><Trash2 class="w-4 h-4" /></button>
                </div>
              </div>
            </template>
          </div>

       
          <button @click="bukaModalTambah(kol.id)" class="w-full mt-auto py-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-medium text-sm flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400 dark:hover:border-emerald-500/30 transition-all">
            <Plus class="w-4 h-4 mr-1.5" /> Tambah Tugas
          </button>
        </div>
      </div>
    </div>

 
    <transition name="fade">
      <div v-if="isModalBuka" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="isModalBuka = false"></div>
        <div class="bg-white dark:bg-slate-800 w-full max-w-md p-6 rounded-2xl shadow-xl relative z-10 transition-colors duration-300 animate-in zoom-in-95">
          <div class="flex justify-between items-center mb-5">
            <h2 class="text-xl font-bold text-slate-800 dark:text-white">{{ isEditing ? 'Edit Tugas' : 'Tambah Tugas Baru' }}</h2>
            <button @click="isModalBuka = false" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><X class="w-5 h-5" /></button>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Judul Tugas</label>
              <input v-model="formTugas.judul" type="text" placeholder="misal: Revisi Bab 1" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Deskripsi / Catatan</label>
              <textarea v-model="formTugas.deskripsi" rows="3" placeholder="Detail tugas..." class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none transition-colors"></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 items-center"><Gift class="w-4 h-4 mr-1 text-rose-500"/> Hadiah / Self Reward (Opsional)</label>
              <input v-model="formTugas.reward" type="text" placeholder="misal: Beli Matcha Latte" class="w-full px-4 py-2.5 bg-rose-50/50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800/50 text-slate-800 dark:text-white rounded-xl focus:ring-2 focus:ring-rose-400 outline-none transition-colors" />
            </div>

         
            <div v-if="isEditing">
              <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status Progres</label>
              <select v-model="formTugas.status" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-colors">
                <option value="todo">Belum Mulai</option>
                <option value="progress">Sedang Dikerjakan</option>
                <option value="done">Selesai</option>
              </select>
            </div>

            <div class="flex justify-end gap-3 mt-6 pt-2 border-t border-slate-100 dark:border-slate-700">
              <button @click="isModalBuka = false" class="px-4 py-2 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">Batal</button>
              <button @click="simpanTugas" :disabled="!formTugas.judul" class="px-6 py-2 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 disabled:opacity-50 transition-all">Simpan</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    
    <transition name="fade">
      <div v-if="isDeleteModalBuka" class="fixed inset-0 z-60 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="batalHapus"></div>
        <div class="bg-white dark:bg-slate-800 w-full max-w-sm p-6 rounded-3xl shadow-2xl relative z-10 transition-colors duration-300 animate-in zoom-in-95 text-center border border-slate-200 dark:border-slate-700">
          <div class="w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-5 text-red-500 border border-red-100 dark:border-red-500/20 shadow-inner">
            <Trash2 class="w-8 h-8" />
          </div>
          <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-2">Hapus Tugas?</h2>
          <p class="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed">Kartu tugas yang dihapus tidak dapat dikembalikan lagi. Yakin ingin menghapusnya?</p>
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
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>