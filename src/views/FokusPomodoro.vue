<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Timer, Play, Pause, RotateCcw, Coffee, Brain, Trophy, PartyPopper } from 'lucide-vue-next'

const MODES = {
  pomodoro: { nama: 'Fokus Skripsi', waktu: 25 * 60, ikon: Brain, warna: 'bg-emerald-500', teks: 'text-emerald-500' },
  shortBreak: { nama: 'Rebahan Bentar', waktu: 5 * 60, ikon: Coffee, warna: 'bg-blue-500', teks: 'text-blue-500' },
  longBreak: { nama: 'Istirahat Panjang', waktu: 15 * 60, ikon: Coffee, warna: 'bg-indigo-500', teks: 'text-indigo-500' }
}

const modeAktif = ref('pomodoro')
const waktuTersisa = ref(MODES.pomodoro?.waktu || 1500)
const isBerjalan = ref(false)
const sesiSelesai = ref(0)
let interval = null

const isWaktuHabis = ref(false)
let audioAlarm = null 

onMounted(() => {
  const dataSesi = localStorage.getItem('kawalSkripsi_sesi')
  if (dataSesi) sesiSelesai.value = parseInt(dataSesi)
})

watch(sesiSelesai, (nilaiBaru) => {
  localStorage.setItem('kawalSkripsi_sesi', nilaiBaru.toString())
  // Memberitahu pantauprogres.vue bahwa ada update sesi!
  window.dispatchEvent(new CustomEvent('kawalSkripsi_update'))
})

const formatWaktu = computed(() => {
  const sisa = waktuTersisa.value || 0 
  const menit = Math.floor(sisa / 60)
  const detik = sisa % 60
  return `${menit.toString().padStart(2, '0')}:${detik.toString().padStart(2, '0')}`
})

const mainkanSuara = () => {
  audioAlarm = new Audio('/audio/alarm.mp3')
  audioAlarm.volume = 1.0;
  audioAlarm.loop = true 
  audioAlarm.play().catch(error => console.log('Suara diblokir browser:', error))
}

const ubahMode = (mode) => {
  if (!MODES[mode]) return
  modeAktif.value = mode
  waktuTersisa.value = MODES[mode].waktu
  hentikanTimer()
}

const mulaiTimer = () => {
  if (isBerjalan.value) return
  isBerjalan.value = true
  
  interval = setInterval(() => {
    if (waktuTersisa.value > 0) {
      waktuTersisa.value--
    } else {
      hentikanTimer()
      mainkanSuara() 
      isWaktuHabis.value = true 
      if (modeAktif.value === 'pomodoro') {
        sesiSelesai.value++
      }
    }
  }, 1000)
}

const hentikanTimer = () => {
  isBerjalan.value = false
  if (interval) clearInterval(interval)
}

const resetTimer = () => {
  hentikanTimer()
  waktuTersisa.value = MODES[modeAktif.value]?.waktu || 1500
}

const tutupLayarSelesai = () => {
  isWaktuHabis.value = false
  resetTimer()
  if (audioAlarm) {
    audioAlarm.pause()
    audioAlarm.currentTime = 0 
  }
}

onUnmounted(() => {
  hentikanTimer()
  if (audioAlarm) {
    audioAlarm.pause()
  }
})
</script>

<template>
  <div class="space-y-8 flex flex-col items-center justify-center min-h-[80vh] relative">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-slate-800 dark:text-white flex items-center justify-center transition-colors">
        <Timer class="mr-3 w-8 h-8" :class="MODES[modeAktif]?.teks" /> Waktu Fokus
      </h1>
      <p class="text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto transition-colors">Gunakan teknik Pomodoro untuk menjaga konsentrasi saat menyusun skripsi tanpa merasa kelelahan.</p>
    </div>

    <div class="bg-white dark:bg-slate-800 p-6 sm:p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-200 dark:border-slate-700 w-full max-w-lg text-center transition-all duration-500 relative overflow-hidden" :class="isBerjalan ? 'shadow-lg scale-[1.02]' : ''">
      <div v-if="isBerjalan" class="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none animate-pulse" :class="MODES[modeAktif]?.warna"></div>

      <div class="flex flex-wrap justify-center gap-2 mb-8 md:mb-10 relative z-10">
        <button v-for="(config, kunci) in MODES" :key="kunci" @click="ubahMode(kunci)" class="px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center" :class="modeAktif === kunci ? `${config.warna} text-white shadow-md` : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'">
          <component :is="config.ikon" class="w-4 h-4 md:mr-2" />
          <span class="hidden md:inline">{{ config.nama }}</span>
        </button>
      </div>

      <div class="relative z-10 font-mono text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 md:mb-10 transition-colors duration-500" :class="MODES[modeAktif]?.teks">{{ formatWaktu }}</div>

      <div class="flex items-center justify-center gap-4 relative z-10">
        <button v-if="!isBerjalan" @click="mulaiTimer" class="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white hover:scale-105 transition-all shadow-md">
          <Play class="w-6 h-6 md:w-8 md:h-8 ml-1" />
        </button>
        <button v-else @click="hentikanTimer" class="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-500 text-white hover:bg-red-600 hover:scale-105 transition-all shadow-md animate-pulse">
          <Pause class="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button @click="resetTimer" class="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 hover:rotate-180 transition-all duration-300" title="Reset Waktu">
          <RotateCcw class="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </div>

    <div class="flex items-center bg-amber-50 dark:bg-amber-500/10 px-6 py-4 rounded-2xl border border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-400 transition-colors">
      <Trophy class="w-6 h-6 mr-3 text-amber-500 dark:text-amber-400" />
      <div>
        <p class="text-sm font-medium opacity-80">Total Sesi Fokus Selesai</p>
        <p class="text-xl font-bold">{{ sesiSelesai }} Sesi</p>
      </div>
    </div>

    <transition name="layar-selesai">
      <div v-if="isWaktuHabis" class="fixed inset-0 z-100 flex flex-col items-center justify-center text-white p-6 text-center transition-colors duration-500" :class="MODES[modeAktif]?.warna">
        <div class="animate-in zoom-in slide-in-from-bottom-8 duration-700 flex flex-col items-center">
          <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 animate-bounce"><PartyPopper class="w-12 h-12 text-white" /></div>
          <h1 class="text-5xl md:text-7xl font-black mb-4 tracking-tight drop-shadow-lg">Waktu Selesai!</h1>
          <p class="text-lg md:text-2xl font-medium opacity-90 mb-10 max-w-md drop-shadow-md">{{ modeAktif === 'pomodoro' ? 'Kerja bagus! Sesi fokusmu telah selesai. Jangan lupa peregangan ya!' : 'Waktu istirahat habis. Ayo kembali fokus mengerjakan skripsi!' }}</p>
          <button @click="tutupLayarSelesai" class="px-8 py-4 bg-white text-slate-900 font-bold text-lg rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all">Tutup & Lanjut</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.layar-selesai-enter-active, .layar-selesai-leave-active { transition: all 0.5s ease; }
.layar-selesai-enter-from, .layar-selesai-leave-to { opacity: 0; transform: scale(1.05); }
</style>