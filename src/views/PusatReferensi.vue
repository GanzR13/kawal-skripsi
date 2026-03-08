<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { LibraryBig, Plus, Trash2, ExternalLink, Search, BookText, Code2, Globe, ChevronDown } from 'lucide-vue-next'

const referensi = ref([])
const kataKunci = ref('')
const kategoriAktif = ref('Semua')

const isFormBuka = ref(false)
const form = ref({ judul: '', url: '', kategori: 'Jurnal' })


const isDropdownBuka = ref(false)


const deleteModal = ref({ show: false, id: null })

const KATEGORI = [
  { nama: 'Jurnal', ikon: BookText, warna: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/50' },
  { nama: 'Repositori', ikon: Code2, warna: 'bg-slate-800 dark:bg-slate-700 text-white border-slate-700 dark:border-slate-600' },
  { nama: 'Artikel', ikon: Globe, warna: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50' }
]

onMounted(() => {
  const dataLokal = localStorage.getItem('kawalSkripsi_referensi')
  if (dataLokal) {
    referensi.value = JSON.parse(dataLokal)
  } else {
    referensi.value = [
      { id: 1, judul: 'IEEE Xplore: Machine Learning for Data Analytics', url: 'https://ieeexplore.ieee.org/', kategori: 'Jurnal' },
      { id: 2, judul: 'Vue.js 3 Official Documentation', url: 'https://vuejs.org/', kategori: 'Artikel' },
      { id: 3, judul: 'Express.js Boilerplate Auth', url: 'https://github.com/', kategori: 'Repositori' }
    ]
  }
})

watch(referensi, (nilaiBaru) => {
  localStorage.setItem('kawalSkripsi_referensi', JSON.stringify(nilaiBaru))
}, { deep: true })

const tambahReferensi = () => {
  if (!form.value.judul || !form.value.url) return
  
  let linkTujuan = form.value.url
  if (!linkTujuan.startsWith('http://') && !linkTujuan.startsWith('https://')) {
    linkTujuan = 'https://' + linkTujuan
  }

  referensi.value.unshift({
    id: Date.now(),
    judul: form.value.judul,
    url: linkTujuan,
    kategori: form.value.kategori
  })
  
  form.value = { judul: '', url: '', kategori: 'Jurnal' }
  isFormBuka.value = false
}

const pilihKategoriForm = (nama) => {
  form.value.kategori = nama
  isDropdownBuka.value = false
}


const hapusReferensi = (id) => {
  deleteModal.value = { show: true, id: id }
}

const konfirmasiHapus = () => {
  if (deleteModal.value.id !== null) {
    referensi.value = referensi.value.filter(item => item.id !== deleteModal.value.id)
  }
  batalHapus()
}

const batalHapus = () => {
  deleteModal.value.show = false
  setTimeout(() => {
    deleteModal.value.id = null
  }, 300)
}


const referensiTampil = computed(() => {
  return referensi.value.filter(item => {
    const cocokKategori = kategoriAktif.value === 'Semua' || item.kategori === kategoriAktif.value
    const cocokPencarian = item.judul.toLowerCase().includes(kataKunci.value.toLowerCase())
    return cocokKategori && cocokPencarian
  })
})

const getKategoriStyle = (namaKategori) => {
  return KATEGORI.find(k => k.nama === namaKategori) || KATEGORI[2]
}
</script>

<template>
  <div class="space-y-8">
    
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-slate-800 dark:text-white flex items-center transition-colors">
          <LibraryBig class="mr-3 text-emerald-500 w-8 h-8" />
          Pusat Referensi
        </h1>
        <p class="text-slate-500 dark:text-slate-400 mt-2 transition-colors">Simpan semua tautan jurnal, artikel, dan referensi kodemu di sini.</p>
      </div>

      <div class="relative w-full md:w-72">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
        <input 
          v-model="kataKunci" 
          type="text" 
          placeholder="Cari referensi..." 
          class="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm"
        />
      </div>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-4 bg-slate-100 dark:bg-slate-800/50 p-2 rounded-2xl border border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div class="flex flex-wrap gap-2">
        <button 
          @click="kategoriAktif = 'Semua'"
          class="px-4 py-2 rounded-xl text-sm font-medium transition-all"
          :class="kategoriAktif === 'Semua' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'"
        >
          Semua
        </button>
        <button 
          v-for="kat in KATEGORI" 
          :key="kat.nama"
          @click="kategoriAktif = kat.nama"
          class="px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center"
          :class="kategoriAktif === kat.nama ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'"
        >
          <component :is="kat.ikon" class="w-4 h-4 mr-1.5" />
          {{ kat.nama }}
        </button>
      </div>

      <button 
        @click="isFormBuka = !isFormBuka"
        class="flex items-center px-4 py-2 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-all shadow-sm"
      >
        <Plus class="w-4 h-4 mr-1.5" :class="isFormBuka ? 'rotate-45' : ''" style="transition: transform 0.3s;" />
        {{ isFormBuka ? 'Batal' : 'Tambah Baru' }}
      </button>
    </div>

    <div v-show="isFormBuka" class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-emerald-200 dark:border-emerald-500/30 animate-in fade-in slide-in-from-top-4 duration-300 transition-colors">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 relative">
        <div class="md:col-span-5">
          <input v-model="form.judul" type="text" placeholder="Judul Referensi" class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-colors" />
        </div>
        <div class="md:col-span-4">
          <input v-model="form.url" type="text" placeholder="https://..." class="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-colors" />
        </div>
        
      
        <div class="md:col-span-2 relative">
      
          <div v-if="isDropdownBuka" @click="isDropdownBuka = false" class="fixed inset-0 z-10"></div>
          
          <div class="relative z-20 h-full">
            <button 
              type="button" 
              @click="isDropdownBuka = !isDropdownBuka" 
              class="w-full h-full flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            >
              <span class="flex items-center font-medium">
                <component :is="getKategoriStyle(form.kategori).ikon" class="w-4 h-4 mr-2 opacity-70" />
                {{ form.kategori }}
              </span>
              <ChevronDown class="w-4 h-4 text-slate-400 transition-transform duration-300" :class="{ 'rotate-180': isDropdownBuka }" />
            </button>

            <transition name="fade">
              <div v-if="isDropdownBuka" class="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden py-1 z-30">
                <button
                  v-for="kat in KATEGORI"
                  :key="kat.nama"
                  type="button"
                  @click="pilihKategoriForm(kat.nama)"
                  class="w-full flex items-center px-4 py-2.5 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  :class="form.kategori === kat.nama ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-700 dark:text-slate-300'"
                >
                  <component :is="kat.ikon" class="w-4 h-4 mr-2" :class="form.kategori === kat.nama ? 'opacity-100' : 'opacity-60'" />
                  {{ kat.nama }}
                </button>
              </div>
            </transition>
          </div>
        </div>
     

        <div class="md:col-span-1">
          <button @click="tambahReferensi" class="w-full h-full min-h-11 flex items-center justify-center bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-white transition-all">
            Simpan
          </button>
        </div>
      </div>
    </div>

    <div v-if="referensiTampil.length === 0" class="text-center py-16 bg-white dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 transition-colors duration-300">
      <p class="text-slate-500 dark:text-slate-400 font-medium text-lg">Tidak ada referensi yang ditemukan.</p>
    </div>

    <TransitionGroup v-else name="grid" tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="item in referensiTampil" 
        :key="item.id"
        class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-500 shadow-sm hover:shadow-md transition-all group flex flex-col overflow-hidden"
      >
        <div class="p-5 flex-1">
          <div class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border mb-4 transition-colors" :class="getKategoriStyle(item.kategori).warna">
            <component :is="getKategoriStyle(item.kategori).ikon" class="w-3 h-3 mr-1.5" />
            {{ item.kategori }}
          </div>
          
          <h3 class="font-bold text-slate-800 dark:text-white text-lg leading-tight mb-2 transition-colors">{{ item.judul }}</h3>
          <p class="text-sm text-slate-400 dark:text-slate-500 truncate transition-colors">{{ item.url }}</p>
        </div>

        <div class="bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 p-3 flex justify-between items-center transition-colors">
          <button type="button" @click="hapusReferensi(item.id)" class="p-2 text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors" title="Hapus">
            <Trash2 class="w-4 h-4" />
          </button>
          
          <a :href="item.url" target="_blank" rel="noopener noreferrer" class="flex items-center px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:border-emerald-500 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all shadow-sm">
            Kunjungi
            <ExternalLink class="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </TransitionGroup>

   
    <transition name="fade">
      <div v-if="deleteModal.show" class="fixed inset-0 z-60 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="batalHapus"></div>
        <div class="bg-white dark:bg-slate-800 w-full max-w-sm p-6 rounded-3xl shadow-2xl relative z-10 transition-colors duration-300 animate-in zoom-in-95 text-center border border-slate-200 dark:border-slate-700">
          <div class="w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-5 text-red-500 border border-red-100 dark:border-red-500/20 shadow-inner">
            <Trash2 class="w-8 h-8" />
          </div>
          <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-2">Hapus Referensi?</h2>
          <p class="text-slate-500 dark:text-slate-400 mb-8 text-sm leading-relaxed">Tautan referensi ini akan dihapus dari daftarmu. Yakin ingin menghapusnya?</p>
          <div class="flex gap-3">
            <button type="button" @click="batalHapus" class="flex-1 py-3 px-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors">
              Batal
            </button>
            <button type="button" @click="konfirmasiHapus" class="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-[0_4px_14px_0_rgba(239,68,68,0.39)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.23)] hover:-translate-y-0.5">
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<style scoped>
.grid-enter-active,
.grid-leave-active,
.grid-move {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}
.grid-leave-active {
  position: absolute; 
}


.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>