<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  TrendingUp, Target, Brain, BookOpenCheck,
  LibraryBig, CheckCircle2, CircleDashed, Timer,
  Star, PartyPopper, X, Gift
} from 'lucide-vue-next'

const dataKanban = ref([])
const dataJadwal = ref([])
const dataCatatan = ref([])
const totalSesiFokus = ref(0)
const totalReferensi = ref(0)

const showPerayaan = ref(false)
const dataPerayaan = ref({ tipe: '', judul: '', deskripsi: '', ikon: null, warna: '' })
const isInitialLoad = ref(true)
const levelTersimpan = ref(0)
const rewardTersimpan = ref([])
const kepinganConfetti = ref([])

const buatConfetti = () => {
  const warnaConfetti = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']
  const temp = []
  for (let i = 0; i < 70; i++) {
    temp.push({
      id: i,
      left: Math.random() * 100 + 'vw',
      bg: warnaConfetti[Math.floor(Math.random() * warnaConfetti.length)],
      delay: Math.random() * 0.5 + 's',
      durasi: Math.random() * 2 + 2 + 's',
      rotasiAwal: Math.random() * 360 + 'deg'
    })
  }
  kepinganConfetti.value = temp
}

const loadData = () => {
  const kanbanLokal = localStorage.getItem('kawalSkripsi_kanban')
  if (kanbanLokal) dataKanban.value = JSON.parse(kanbanLokal)

  const jadwalLokal = localStorage.getItem('kawalSkripsi_jadwal')
  if (jadwalLokal) dataJadwal.value = JSON.parse(jadwalLokal)

  const sesiLokal = localStorage.getItem('kawalSkripsi_sesi')
  if (sesiLokal) totalSesiFokus.value = parseInt(sesiLokal)

  const catatanLokal = localStorage.getItem('kawalSkripsi_catatan')
  if (catatanLokal) {
    const parsed = JSON.parse(catatanLokal)
    dataCatatan.value = parsed
  }

  const referensiLokal = localStorage.getItem('kawalSkripsi_referensi')
  if (referensiLokal) totalReferensi.value = JSON.parse(referensiLokal).length

  setTimeout(() => {
    const lvlSekarang = levelSaatIni.value
    const unlockedRewardIds = selfRewards.value.filter(r => r.terbuka).map(r => r.id)

    if (!isInitialLoad.value) {
      if (lvlSekarang > levelTersimpan.value) {
        tampilkanPerayaan('level', `Level Up! Level ${lvlSekarang}`, 'Luar biasa! Kamu semakin dekat dengan gelar sarjana.', Star, 'text-yellow-500 bg-yellow-100 dark:bg-yellow-500/20')
      } else {
        const newRewardIds = unlockedRewardIds.filter(id => !rewardTersimpan.value.includes(id))
        if (newRewardIds.length > 0) {
          const newReward = selfRewards.value.find(r => r.id === newRewardIds[0])
          tampilkanPerayaan('reward', `Self Reward Tuntas!`, `Selamat! Kamu berhak mendapatkan: ${newReward.nama}`, Gift, newReward.warna)
        }
      }
    }

    levelTersimpan.value = lvlSekarang
    rewardTersimpan.value = unlockedRewardIds
    isInitialLoad.value = false
  }, 100)
}

const tampilkanPerayaan = (tipe, judul, deskripsi, ikon, warna) => {
  dataPerayaan.value = { tipe, judul, deskripsi, ikon, warna }
  buatConfetti()
  showPerayaan.value = true
}

onMounted(() => {
  loadData()
  window.addEventListener('kawalSkripsi_update', loadData)
})

onUnmounted(() => {
  window.removeEventListener('kawalSkripsi_update', loadData)
})

const statsKanban = computed(() => {
  const total = dataKanban.value.length || 1
  const todo = dataKanban.value.filter(t => t.status === 'todo').length
  const progress = dataKanban.value.filter(t => t.status === 'progress').length
  const done = dataKanban.value.filter(t => t.status === 'done').length
  const persentase = Math.round((done / total) * 100) || 0
  return { total, todo, progress, done, persentase }
})

const pesanMotivasi = computed(() => {
  const p = statsKanban.value.persentase
  if (p === 0) return "Perjalanan ribuan mil dimulai dengan satu langkah. Ayo mulai bab 1!"
  if (p < 40) return "Progres yang bagus! Tetap konsisten dan jangan lupa istirahat."
  if (p < 80) return "Setengah jalan terlewati! Gelar sarjana sudah di depan mata."
  if (p < 100) return "Sedikit lagi selesai! Siapkan mental untuk sidang."
  return "Luar Biasa! Skripsi tuntas, selamat menyongsong wisuda! 🎉"
})

const totalAgendaSelesai = computed(() => {
  return dataJadwal.value.filter(j => (j.status || 'pending') === 'selesai').length
})

const totalEXP = computed(() => {
  return (statsKanban.value.done * 50) + (totalSesiFokus.value * 20) + (totalAgendaSelesai.value * 30)
})

const levelSaatIni = computed(() => Math.floor(totalEXP.value / 200) + 1)
const expProgress = computed(() => totalEXP.value - ((levelSaatIni.value - 1) * 200))
const persentaseLevel = computed(() => Math.round((expProgress.value / 200) * 100))

const totalRevisi = computed(() => {
  return dataCatatan.value.filter(c => c.tipe === 'revisi').length
})

const selfRewards = computed(() => {
  const fromCatatan = dataCatatan.value
    .filter(c => c.tipe === 'revisi' && c.reward && c.reward.trim() !== '')
    .map(c => {
      const judulKanban = '[Revisi] ' + c.judul
      const task = dataKanban.value.find(t => t.judul === judulKanban)
      const isSelesai = task && task.status === 'done'
      return {
        id: 'rev_' + c.id,
        nama: c.reward,
        deskripsi: `Revisi: ${c.judul}`,
        terbuka: isSelesai,
        warna: 'text-rose-500 bg-rose-100 dark:bg-rose-500/20'
      }
    })

  const fromKanban = dataKanban.value
    .filter(t => t.reward && t.reward.trim() !== '' && !t.judul.startsWith('[Revisi]'))
    .map(t => {
      return {
        id: 'kan_' + t.id,
        nama: t.reward,
        deskripsi: `Tugas: ${t.judul}`,
        terbuka: t.status === 'done',
        warna: 'text-violet-500 bg-violet-100 dark:bg-violet-500/20'
      }
    })

  return [...fromCatatan, ...fromKanban]
})
</script>

<template>
  <div class="space-y-8 pb-10 relative">

    <div class="transition-colors duration-300">
      <h1 class="text-3xl font-bold text-slate-800 dark:text-white flex items-center">
        <TrendingUp class="mr-3 text-emerald-500 w-8 h-8" />
        Grafik Capaian & Prestasi
      </h1>
      <p class="text-slate-500 dark:text-slate-400 mt-2">Pantau level produktivitas dan daftar Self Reward-mu di sini.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:-translate-y-1 transition-all duration-300">
        <div>
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Sesi Fokus</p>
          <h3 class="text-3xl font-bold text-slate-800 dark:text-white">{{ totalSesiFokus }}</h3>
        </div>
        <div
          class="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-500 dark:text-blue-400 flex items-center justify-center">
          <Brain class="w-6 h-6" />
        </div>
      </div>

      <div
        class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:-translate-y-1 transition-all duration-300">
        <div>
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Catatan Revisi</p>
          <h3 class="text-3xl font-bold text-slate-800 dark:text-white">{{ totalRevisi }}</h3>
        </div>
        <div
          class="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-500 dark:text-amber-400 flex items-center justify-center">
          <BookOpenCheck class="w-6 h-6" />
        </div>
      </div>

      <div
        class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:-translate-y-1 transition-all duration-300">
        <div>
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Pusat Referensi</p>
          <h3 class="text-3xl font-bold text-slate-800 dark:text-white">{{ totalReferensi }}</h3>
        </div>
        <div
          class="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center">
          <LibraryBig class="w-6 h-6" />
        </div>
      </div>

      <div
        class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:-translate-y-1 transition-all duration-300">
        <div>
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Tugas Tuntas</p>
          <h3 class="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {{ statsKanban.done }} <span class="text-lg text-slate-400 dark:text-slate-500">/ {{ statsKanban.total
              }}</span>
          </h3>
        </div>
        <div
          class="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 flex items-center justify-center">
          <CheckCircle2 class="w-6 h-6" />
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        class="bg-slate-900 dark:bg-slate-800 p-8 rounded-3xl shadow-sm text-white relative overflow-hidden transition-all duration-300 hover:shadow-lg group">
        <div
          class="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-[80px] opacity-40 group-hover:scale-125 transition-transform duration-700">
        </div>
        <div class="relative z-10 flex items-center gap-6 mb-8">
          <div
            class="w-20 h-20 rounded-full bg-slate-800 dark:bg-slate-700 border-4 border-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <span class="text-3xl font-black text-emerald-400">{{ levelSaatIni }}</span>
          </div>
          <div>
            <h2 class="text-2xl font-bold">Level Peneliti</h2>
            <p class="text-slate-400 text-sm mt-1">Total EXP: <span class="font-bold text-white">{{ totalEXP }}</span>
            </p>
          </div>
        </div>
        <div class="space-y-3 relative z-10">
          <div class="flex justify-between text-sm font-medium">
            <span class="text-emerald-400 animate-pulse">Progres ke Level {{ levelSaatIni + 1 }}</span>
            <span class="text-slate-300">{{ expProgress }} / 200 EXP</span>
          </div>

          <div class="w-full h-4 bg-slate-800 dark:bg-slate-900/60 rounded-full overflow-hidden shadow-inner relative">
            <div
              class="h-full bg-linear-to-r from-emerald-400 to-emerald-600 transition-all duration-1000 ease-out absolute left-0 top-0"
              :style="{ width: `${persentaseLevel}%` }"></div>
          </div>
          <p class="text-xs text-slate-400 text-right mt-2">EXP diraih dari Sesi Fokus, Tugas Kanban, dan Bimbingan
            Selesai!</p>
        </div>
      </div>

      <div
        class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
          <Gift class="w-6 h-6 mr-2 text-rose-500" /> Self Reward Tracker
        </h2>

        <div v-if="selfRewards.length === 0"
          class="text-center py-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium px-4">Belum ada Reward yang
            ditentukan.<br>Coba isi di form Kanban atau Revisi!</p>
        </div>

        <div v-else class="grid grid-cols-2 gap-4 max-h-64 overflow-y-auto pr-2">
          <div v-for="reward in selfRewards" :key="reward.id"
            class="p-4 rounded-2xl border transition-all flex flex-col items-center text-center group relative overflow-hidden h-full"
            :class="reward.terbuka ? 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-500/5' : 'border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 grayscale opacity-60'">

            <div class="w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-transform duration-500"
              :class="[reward.warna, reward.terbuka ? 'group-hover:rotate-12 group-hover:scale-110' : '']">
              <Gift class="w-6 h-6" />
            </div>

            <h3 class="font-bold text-sm text-slate-800 dark:text-white mb-1">{{ reward.nama }}</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{{ reward.deskripsi }}</p>


            <div v-if="!reward.terbuka"
              class="absolute inset-0 flex items-center justify-center bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-[1px]">
              <span
                class="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest bg-white/70 dark:bg-slate-800/90 px-2 py-1 rounded text-center leading-tight border border-slate-200 dark:border-slate-700 shadow-sm">Selesaikan<br>Tugasnya!</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div
        class="lg:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <div class="flex items-start justify-between mb-8">
          <div>
            <h2 class="text-xl font-bold text-slate-800 dark:text-white flex items-center">
              <Target class="w-6 h-6 mr-2 text-emerald-500 dark:text-emerald-400" />
              Penyelesaian Skripsi
            </h2>
            <p class="text-slate-500 dark:text-slate-400 mt-1 text-sm">{{ pesanMotivasi }}</p>
          </div>
          <div class="text-4xl font-black text-emerald-500 dark:text-emerald-400">{{ statsKanban.persentase }}%</div>
        </div>
        <div
          class="relative w-full h-8 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner transition-colors">

          <div
            class="absolute top-0 left-0 h-full bg-linear-to-r from-emerald-400 to-emerald-600 transition-all duration-1000 ease-out flex items-center justify-end pr-4"
            :style="{ width: `${statsKanban.persentase}%` }">
            <div class="absolute inset-0 bg-white/20 w-full h-full"
              style="background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent); background-size: 1rem 1rem;">
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-6">Status Pengerjaan</h2>
        <div class="space-y-5">
          <div>
            <div class="flex justify-between text-sm font-medium mb-2">
              <span class="text-slate-600 dark:text-slate-300 flex items-center">
                <CircleDashed class="w-4 h-4 mr-2 text-slate-400 dark:text-slate-500" /> Belum Mulai
              </span>
              <span class="text-slate-800 dark:text-white">{{ statsKanban.todo }}</span>
            </div>
            <div class="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden transition-colors">
              <div class="h-full bg-slate-400 dark:bg-slate-500 transition-all duration-1000"
                :style="{ width: `${(statsKanban.todo / statsKanban.total) * 100}%` }"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm font-medium mb-2">
              <span class="text-amber-700 dark:text-amber-400 flex items-center">
                <Timer class="w-4 h-4 mr-2 text-amber-500 dark:text-amber-400" /> Sedang Dikerjakan
              </span>
              <span class="text-amber-800 dark:text-amber-300">{{ statsKanban.progress }}</span>
            </div>
            <div class="w-full h-2 bg-amber-100 dark:bg-amber-500/20 rounded-full overflow-hidden transition-colors">
              <div class="h-full bg-amber-500 transition-all duration-1000 delay-300"
                :style="{ width: `${(statsKanban.progress / statsKanban.total) * 100}%` }"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm font-medium mb-2">
              <span class="text-emerald-700 dark:text-emerald-400 flex items-center">
                <CheckCircle2 class="w-4 h-4 mr-2 text-emerald-500 dark:text-emerald-400" /> Selesai
              </span>
              <span class="text-emerald-800 dark:text-emerald-300">{{ statsKanban.done }}</span>
            </div>
            <div
              class="w-full h-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-full overflow-hidden transition-colors">
              <div class="h-full bg-emerald-500 transition-all duration-1000 delay-500"
                :style="{ width: `${(statsKanban.done / statsKanban.total) * 100}%` }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div v-if="showPerayaan" class="fixed inset-0 z-100 flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" @click="showPerayaan = false"></div>

      <div class="absolute inset-0 pointer-events-none">
        <div v-for="konfeti in kepinganConfetti" :key="konfeti.id" class="confetti-piece"
          :style="{ left: konfeti.left, backgroundColor: konfeti.bg, animationDelay: konfeti.delay, animationDuration: konfeti.durasi, transform: `rotate(${konfeti.rotasiAwal})` }">
        </div>
      </div>

      <div
        class="modal-bounce bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center relative overflow-hidden border border-slate-200 dark:border-slate-700 mx-4 z-10">

        <div
          class="absolute top-4 left-1/2 -translate-x-1/2 w-48 h-48 bg-[conic-gradient(from_0deg,transparent_0_15deg,rgba(250,204,21,0.2)_15deg_30deg,transparent_30deg_45deg,rgba(250,204,21,0.2)_45deg_60deg,transparent_60deg_75deg,rgba(250,204,21,0.2)_75deg_90deg,transparent_90deg_105deg,rgba(250,204,21,0.2)_105deg_120deg,transparent_120deg_135deg,rgba(250,204,21,0.2)_135deg_150deg,transparent_150deg_165deg,rgba(250,204,21,0.2)_165deg_180deg,transparent_180deg_195deg,rgba(250,204,21,0.2)_195deg_210deg,transparent_210deg_225deg,rgba(250,204,21,0.2)_225deg_240deg,transparent_240deg_255deg,rgba(250,204,21,0.2)_255deg_270deg,transparent_270deg_285deg,rgba(250,204,21,0.2)_285deg_300deg,transparent_300deg_315deg,rgba(250,204,21,0.2)_315deg_330deg,transparent_330deg_345deg,rgba(250,204,21,0.2)_345deg_360deg)] rounded-full animate-spin-slow">
        </div>

        <button @click="showPerayaan = false"
          class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 z-20 transition-colors">
          <X class="w-5 h-5" />
        </button>

        <div class="relative z-20 flex flex-col items-center">
          <div class="w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-inner icon-pop"
            :class="dataPerayaan.warna">
            <component :is="dataPerayaan.ikon" class="w-12 h-12" />
          </div>
          <h2 class="text-2xl font-black text-slate-800 dark:text-white mb-2">{{ dataPerayaan.judul }}</h2>
          <p class="text-slate-500 dark:text-slate-400 font-medium mb-8 leading-relaxed">{{ dataPerayaan.deskripsi }}
          </p>

          <button @click="showPerayaan = false"
            class="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all hover:scale-105 hover:-translate-y-1 shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] flex justify-center items-center">
            Klaim Hadiah
            <PartyPopper class="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.modal-bounce {
  animation: bounceIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes bounceIn {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }

  50% {
    transform: scale(1.05);
    opacity: 1;
  }

  70% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.icon-pop {
  animation: popIcon 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s both;
}

@keyframes popIcon {
  0% {
    transform: scale(0) rotate(-45deg);
    opacity: 0;
  }

  80% {
    transform: scale(1.2) rotate(10deg);
  }

  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.confetti-piece {
  position: absolute;
  top: -20px;
  width: 10px;
  height: 20px;
  opacity: 0;
  border-radius: 2px;
  animation: fallDown linear forwards;
}

@keyframes fallDown {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }

  100% {
    transform: translateY(110vh) rotate(720deg);
    opacity: 0;
  }
}

.animate-spin-slow {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from {
    transform: translateX(-50%) rotate(0deg);
  }

  to {
    transform: translateX(-50%) rotate(360deg);
  }
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}


:global(.dark) ::-webkit-scrollbar-thumb {
  background: #475569;
}
</style>