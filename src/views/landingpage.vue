<script setup>
import { ref } from 'vue'
import {
  ArrowRight, Brain, KanbanSquare, Gift,
  Sparkles, Zap, ChevronRight, CheckCircle2, Timer,
  FileText, Rocket, Trophy
} from 'lucide-vue-next'

const emit = defineEmits(['masuk-dashboard'])

const mulaiSekarang = () => {
  emit('masuk-dashboard')
}

const scrollToFeatures = () => {
  const featuresSection = document.getElementById('features-section')
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden relative">


    <div class="fixed inset-0 z-0 pointer-events-none flex justify-center overflow-hidden">
      <div
        class="absolute -top-[10%] -left-[10%] w-75 md:w-125 h-75 md:h-125 bg-emerald-600/20 blur-[100px] md:blur-[120px] rounded-full animate-pulse-slow">
      </div>
      <div
        class="absolute -bottom-[10%] -right-[10%] w-75 md:w-125 h-75 md:h-125 bg-cyan-600/15 blur-[100px] md:blur-[120px] rounded-full">
      </div>
      <div
        class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwYzAgMTEuMDQ2IDguOTU0IDIwIDIwIDIwcy0yMC04Ljk1NC0yMC0yMGMwLTExLjA0NiA4Ljk1NC0yMCAyMC0yMHMyMCA4Ljk1NCAyMCAyMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] mask-[linear-gradient(to_bottom,white_10%,transparent_90%)]">
      </div>
    </div>


    <section
      class="relative z-10 flex items-center px-4 sm:px-6 max-w-7xl mx-auto min-h-screen pt-24 lg:pt-0 pb-16 lg:pb-0">
      <div class="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">


        <div class="flex-1 text-center lg:text-left mt-8 lg:mt-0 z-20">
          <div
            class="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] sm:text-[11px] font-bold mb-6 animate-fade-in-up">
            <Sparkles class="w-3 h-3 mr-1.5" />
            Proyek WDC IFest 2026
          </div>

          <h1
            class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-5 leading-[1.15] tracking-tight animate-fade-in-up animation-delay-100 text-white">
            Lulus Tepat Waktu <br class="hidden sm:block" />
            <span class="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400">Tanpa
              Drama</span>
          </h1>

          <p
            class="text-sm sm:text-base text-slate-400 mb-8 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
            Ubah beban skripsi yang menumpuk menjadi alur kerja yang jelas dengan <b class="text-slate-300">Kawal</b> <b
              class="text-slate-300">Skripsi</b>. Dilengkapi timer <b class="text-slate-300">Pomodoro</b>, papan <b
              class="text-slate-300">Kanban</b>, dan sistem <b class="text-slate-300">Self-Reward</b> untuk menjagamu
            tetap semangat.
          </p>

          <div
            class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up animation-delay-300">
            <button @click="mulaiSekarang"
              class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(16,185,129,0.4)] shadow-[0_10px_25px_rgba(16,185,129,0.25)] flex items-center justify-center">
              Mulai Fokus Sekarang
              <Zap class="w-4 h-4 ml-2" />
            </button>
            <button @click="scrollToFeatures"
              class="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white font-medium text-sm transition-all hover:-translate-y-1 flex items-center justify-center backdrop-blur-md">
              Eksplorasi Fitur
              <ChevronRight class="w-4 h-4 ml-2 opacity-70" />
            </button>
          </div>
        </div>


        <div
          class="flex-1 relative w-full flex items-center justify-center animate-fade-in-up animation-delay-400 perspective-1000 mt-4 lg:mt-0 z-10">


          <div
            class="relative w-full max-w-85 sm:max-w-105 lg:max-w-120 bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700 ease-out lg:transform-[rotateY(-12deg)_rotateX(5deg)] lg:hover:transform-[rotateY(0deg)_rotateX(0deg)]">

            <div
              class="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-emerald-400/50 to-transparent">
            </div>

            <div class="h-8 bg-slate-800/80 border-b border-slate-700/50 flex items-center px-4 gap-1.5">
              <div class="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <div class="mx-auto text-[9px] text-slate-500 font-medium tracking-widest uppercase">Kawal Skripsi</div>
            </div>

            <div class="p-4 sm:p-5 grid grid-cols-2 gap-3 sm:gap-4">
              <div class="col-span-2 bg-slate-800/40 border border-slate-700/50 p-3.5 sm:p-4 rounded-xl">
                <div class="flex justify-between items-center mb-2 sm:mb-3">
                  <span class="text-[11px] sm:text-xs font-bold text-slate-300">Target Hari Ini</span>
                  <span
                    class="text-[9px] sm:text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">Selesai</span>
                </div>
                <h4 class="font-bold text-white text-[13px] sm:text-sm mb-1">Bab 1: Pendahuluan</h4>
                <p class="text-[11px] sm:text-xs text-slate-400 mb-3">Selesaikan Skripsimu !</p>
                <div class="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-linear-to-r from-emerald-400 to-cyan-400 w-full shadow-[0_0_10px_rgba(52,211,153,0.5)]">
                  </div>
                </div>
              </div>

              <div
                class="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl text-center flex flex-col justify-center items-center relative overflow-hidden group">
                <div
                  class="absolute -right-4 -top-4 w-12 h-12 bg-cyan-500/20 blur-xl rounded-full group-hover:bg-cyan-500/30 transition-colors">
                </div>
                <Timer class="w-6 h-6 text-cyan-400 mb-2 relative z-10" />
                <div class="text-xl sm:text-2xl font-black text-white font-mono relative z-10 tracking-wider">24:59
                </div>
                <p class="text-[9px] text-slate-400 uppercase tracking-widest mt-1 relative z-10">Fokus Aktif</p>
              </div>

              <div
                class="bg-linear-to-br from-emerald-900/40 to-slate-800/40 border border-emerald-500/30 p-4 rounded-xl flex flex-col justify-center items-center">
                <Gift class="w-6 h-6 text-emerald-400 mb-2" />
                <p class="text-[9px] text-emerald-400/80 uppercase tracking-widest mb-1">Reward Tuntas</p>
                <h4 class="font-bold text-white text-[13px] sm:text-sm text-center">Nonton Netflix</h4>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>


    <section id="features-section" class="relative z-10 py-20 lg:py-28 bg-slate-950/50 border-t border-slate-800/50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-emerald-400 font-bold tracking-widest uppercase text-[11px] mb-3">Ekosistem Produktivitas</h2>
          <h3 class="text-3xl sm:text-4xl font-black text-white tracking-tight">Semua Fitur yang Kamu Butuhkan.</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

          <div
            class="bg-slate-900/50 border border-slate-800 p-6 sm:p-8 rounded-4xl hover:bg-slate-800 hover:border-emerald-500/30 hover:-translate-y-2 transition-all duration-300 group shadow-lg shadow-black/20">
            <div
              class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 text-emerald-400 group-hover:scale-110 transition-transform">
              <KanbanSquare class="w-6 h-6" />
            </div>
            <h4 class="text-xl font-bold text-white mb-3">Kanban Drag & Drop</h4>
            <p class="text-slate-400 text-sm leading-relaxed">Catatan revisi dari dosen akan otomatis masuk ke Kanban.
              Geser tugasmu secara visual untuk melihat progres.</p>
          </div>


          <div
            class="bg-slate-900/50 border border-slate-800 p-6 sm:p-8 rounded-4xl hover:bg-slate-800 hover:border-cyan-500/30 hover:-translate-y-2 transition-all duration-300 group shadow-lg shadow-black/20">
            <div
              class="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5 text-cyan-400 group-hover:scale-110 transition-transform">
              <Brain class="w-6 h-6" />
            </div>
            <h4 class="text-xl font-bold text-white mb-3">Timer Pomodoro</h4>
            <p class="text-slate-400 text-sm leading-relaxed">Fokus 25 menit penuh, istirahat 5 menit. Kumpulkan data
              sesi fokusmu dan dapatkan EXP untuk naik level.</p>
          </div>


          <div
            class="bg-slate-900/50 border border-slate-800 p-6 sm:p-8 rounded-4xl hover:bg-slate-800 hover:border-teal-500/30 hover:-translate-y-2 transition-all duration-300 group shadow-lg shadow-black/20">
            <div
              class="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-5 text-teal-400 group-hover:scale-110 transition-transform">
              <Gift class="w-6 h-6" />
            </div>
            <h4 class="text-xl font-bold text-white mb-3">Sistem Self-Reward</h4>
            <p class="text-slate-400 text-sm leading-relaxed">Tulis hadiah (seperti Beli Kopi) saat membuat catatan
              revisi. Hadiah akan terbuka setelah tugas selesai dikerjakan.</p>
          </div>
        </div>
      </div>
    </section>


    <section class="relative z-10 py-20 lg:py-28 bg-slate-900/40 border-t border-slate-800/50">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-black text-white tracking-tight">3 Langkah Menuju Gelar Sarjana</h2>
          <p class="text-slate-400 text-sm sm:text-base mt-4 max-w-xl mx-auto">Alur sederhana untuk mengatasi
            kebingungan dan kemalasan saat masa revisi.</p>
        </div>

        <div class="flex flex-col md:flex-row gap-12 md:gap-8 relative">

          <div
            class="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-linear-to-r from-emerald-500/20 via-cyan-500/30 to-teal-500/20 z-0">
          </div>


          <div
            class="md:hidden absolute left-1/2 top-10 bottom-10 w-0.5 -translate-x-1/2 bg-linear-to-b from-emerald-500/20 via-cyan-500/30 to-teal-500/20 z-0">
          </div>


          <div class="flex-1 relative z-10 flex flex-col items-center text-center group">
            <div
              class="w-20 h-20 rounded-full bg-slate-950 border-2 border-emerald-500 flex items-center justify-center mb-5 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform duration-300">
              <FileText class="w-8 h-8" />
            </div>
            <h4 class="font-bold text-white text-xl mb-3">1. Catat Revisi</h4>
            <p
              class="text-sm text-slate-400 px-2 sm:px-6 leading-relaxed bg-slate-900/40 md:bg-transparent py-2 md:py-0 rounded-xl">
              Tulis masukan dosen dan tentukan <b class="text-emerald-300">Self Reward</b> apa yang ingin kamu dapatkan
              jika tugas itu selesai.</p>
          </div>


          <div class="flex-1 relative z-10 flex flex-col items-center text-center group">
            <div
              class="w-20 h-20 rounded-full bg-slate-950 border-2 border-cyan-500 flex items-center justify-center mb-5 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)] group-hover:scale-110 transition-transform duration-300">
              <Rocket class="w-8 h-8" />
            </div>
            <h4 class="font-bold text-white text-xl mb-3">2. Eksekusi Tugas</h4>
            <p
              class="text-sm text-slate-400 px-2 sm:px-6 leading-relaxed bg-slate-900/40 md:bg-transparent py-2 md:py-0 rounded-xl">
              Pindahkan catatan otomatis ke Papan Kanban. Nyalakan timer <b class="text-cyan-300">Pomodoro</b> dan mulai
              fokus bekerja.</p>
          </div>


          <div class="flex-1 relative z-10 flex flex-col items-center text-center group">
            <div
              class="w-20 h-20 rounded-full bg-slate-950 border-2 border-teal-500 flex items-center justify-center mb-5 text-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.2)] group-hover:scale-110 transition-transform duration-300">
              <Trophy class="w-8 h-8" />
            </div>
            <h4 class="font-bold text-white text-xl mb-3">3. Nikmati Hasilnya</h4>
            <p
              class="text-sm text-slate-400 px-2 sm:px-6 leading-relaxed bg-slate-900/40 md:bg-transparent py-2 md:py-0 rounded-xl">
              Geser tugas ke 'Selesai'. Dapatkan tambahan <b class="text-teal-300">EXP</b>, saksikan animasi selebrasi,
              dan klaim hadiahmu!</p>
          </div>
        </div>
      </div>
    </section>


    <section
      class="relative z-10 py-20 lg:py-24 bg-linear-to-b from-slate-900/30 to-slate-950 border-t border-slate-800/50 text-center px-4">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">Siap Mempercepat Proses
          Skripsimu?</h2>
        <p class="text-slate-400 mb-10 text-sm sm:text-base max-w-xl mx-auto">Berhenti membuang waktu. Gunakan sistem
          cerdas ini dan bergabunglah bersama mahasiswa produktif lainnya.</p>
        <button @click="mulaiSekarang"
          class="w-full sm:w-auto px-8 sm:px-10 py-4 rounded-xl sm:rounded-full bg-white text-slate-950 font-black text-sm hover:bg-emerald-50 hover:text-emerald-700 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 flex items-center justify-center mx-auto">
          Buka KawalSkripsi Sekarang
          <ArrowRight class="w-4 h-4 ml-2" />
        </button>
      </div>
    </section>


    <footer class="relative z-10 border-t border-slate-800/80 bg-slate-950 py-8 text-center px-4">
      <p class="text-slate-500 text-xs font-medium tracking-wide">
        Didesain eksklusif untuk <span class="text-emerald-400 font-bold">WDC IFest UAJY #14</span> (2026).
      </p>
    </footer>

  </div>
</template>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}


@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animation-delay-100 {
  animation-delay: 100ms;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-400 {
  animation-delay: 400ms;
}

@keyframes pulseSlow {

  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }

  50% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

.animate-pulse-slow {
  animation: pulseSlow 8s ease-in-out infinite;
}
</style>