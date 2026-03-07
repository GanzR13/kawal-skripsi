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
  <div class="min-h-screen bg-slate-950 font-sans text-slate-50 selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
    
    <div class="fixed inset-0 z-0 pointer-events-none flex justify-center overflow-hidden">
      <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/15 blur-[120px] rounded-full animate-pulse-slow"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full"></div>
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwYzAgMTEuMDQ2IDguOTU0IDIwIDIwIDIwcy0yMC04Ljk1NC0yMC0yMGMwLTExLjA0NiA4Ljk1NC0yMCAyMC0yMHMyMCA4Ljk1NCAyMCAyMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')] [mask-image:linear-gradient(to_bottom,white_10%,transparent_90%)]"></div>
    </div>

    <nav class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-6xl bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 rounded-2xl px-5 py-2.5 flex items-center justify-between shadow-lg">
      <div class="flex items-center gap-3">
        <img src="/logo.png" alt="Logo KawalSkripsi" class="w-6 h-6 object-contain" />
        <span class="text-lg font-bold tracking-tight text-white">
          Kawal<span class="text-emerald-400">Skripsi</span>
        </span>
      </div>
      <div class="flex items-center gap-5">
        <button @click="scrollToFeatures" class="hidden md:block text-xs font-medium text-slate-300 hover:text-white transition-colors">Fitur Web</button>
        <button @click="mulaiSekarang" class="group flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-[0_0_15px_rgba(52,211,153,0.3)] hover:scale-105">
          Masuk App <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </nav>

    <section class="relative z-10 flex items-center px-6 max-w-7xl mx-auto min-h-[90vh] pt-16">
      <div class="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
        
        <div class="flex-1 text-center lg:text-left mt-8 lg:mt-0">
          <div class="inline-flex items-center px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-bold mb-5 animate-fade-in-up">
            <Sparkles class="w-3 h-3 mr-1.5" />
            Proyek Unggulan WDC IFest 2026
          </div>
          
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-[1.1] tracking-tight animate-fade-in-up animation-delay-100 text-white">
            Lulus Tepat Waktu. <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Tanpa Drama.</span>
          </h1>
          
          <p class="text-sm lg:text-base text-slate-400 mb-6 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
            Ubah beban skripsi yang menumpuk menjadi alur kerja yang jelas. Dilengkapi timer <b>Pomodoro</b>, papan <b>Kanban</b>, dan sistem <b>Self-Reward</b> untuk menjagamu tetap semangat.
          </p>
          
          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 animate-fade-in-up animation-delay-300">
            <button @click="mulaiSekarang" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm transition-all hover:-translate-y-1 shadow-[0_10px_25px_rgba(16,185,129,0.3)] flex items-center justify-center">
              Mulai Fokus Sekarang <Zap class="w-4 h-4 ml-1.5" />
            </button>
            <button @click="scrollToFeatures" class="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-white font-medium text-sm transition-all flex items-center justify-center backdrop-blur-md">
              Eksplorasi Fitur <ChevronRight class="w-4 h-4 ml-1.5 opacity-70" />
            </button>
          </div>
        </div>

        <div class="flex-1 relative w-full hidden md:flex items-center justify-center animate-fade-in-up animation-delay-400 transform lg:scale-95 origin-right">
          
          <div class="relative w-full max-w-[460px] bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transform lg:-rotate-2 lg:rotate-y-12 hover:rotate-0 transition-transform duration-700 ease-out perspective-1000">
            
            <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"></div>

            <div class="h-8 bg-slate-800/50 border-b border-slate-700/50 flex items-center px-4 gap-1.5">
              <div class="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <div class="mx-auto text-[9px] text-slate-500 font-medium tracking-widest uppercase">KawalSkripsi App</div>
            </div>

            <div class="p-5 grid grid-cols-2 gap-3">
              <div class="col-span-2 bg-slate-800/40 border border-slate-700/50 p-3.5 rounded-xl">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-[11px] font-bold text-slate-300">Target Hari Ini</span>
                  <span class="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">Selesai</span>
                </div>
                <h4 class="font-bold text-white text-[13px] mb-1">Bab 3: Pembuatan Dataset</h4>
                <p class="text-[11px] text-slate-400 mb-2">Mengumpulkan citra termal kelapa sawit.</p>
                <div class="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div class="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 w-full"></div>
                </div>
              </div>

              <div class="bg-slate-800/40 border border-slate-700/50 p-3.5 rounded-xl text-center flex flex-col justify-center items-center relative overflow-hidden">
                <div class="absolute -right-4 -top-4 w-12 h-12 bg-cyan-500/10 blur-xl rounded-full"></div>
                <Timer class="w-5 h-5 text-cyan-400 mb-1.5 relative z-10" />
                <div class="text-xl font-black text-white font-mono relative z-10">24:59</div>
                <p class="text-[8px] text-slate-400 uppercase tracking-widest mt-1 relative z-10">Fokus Aktif</p>
              </div>

              <div class="bg-gradient-to-br from-emerald-900/30 to-slate-800/40 border border-emerald-500/20 p-3.5 rounded-xl flex flex-col justify-center items-center">
                <Gift class="w-5 h-5 text-emerald-400 mb-1.5" />
                <p class="text-[8px] text-emerald-400 uppercase tracking-widest mb-0.5">Reward Tuntas</p>
                <h4 class="font-bold text-white text-[13px] text-center">Nonton Netflix</h4>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section id="features-section" class="relative z-10 py-20 bg-slate-950/50 border-t border-slate-800/50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <h2 class="text-emerald-400 font-bold tracking-widest uppercase text-[11px] mb-2">Ekosistem Produktivitas</h2>
          <h3 class="text-3xl font-black text-white tracking-tight">Semua Fitur yang Kamu Butuhkan.</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div class="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] hover:bg-slate-800/80 hover:border-emerald-500/30 transition-all duration-300 group">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
              <KanbanSquare class="w-5 h-5" />
            </div>
            <h4 class="text-lg font-bold text-white mb-2">Kanban Drag & Drop</h4>
            <p class="text-slate-400 text-sm leading-relaxed">Catatan revisi dari dosen akan otomatis masuk ke Kanban. Geser tugasmu secara visual untuk melihat progres.</p>
          </div>

          <div class="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] hover:bg-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 group">
            <div class="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 transition-transform">
              <Brain class="w-5 h-5" />
            </div>
            <h4 class="text-lg font-bold text-white mb-2">Timer Pomodoro</h4>
            <p class="text-slate-400 text-sm leading-relaxed">Fokus 25 menit penuh, istirahat 5 menit. Kumpulkan data sesi fokusmu dan dapatkan EXP untuk naik level.</p>
          </div>

          <div class="bg-slate-900/50 border border-slate-800 p-6 rounded-[2rem] hover:bg-slate-800/80 hover:border-teal-500/30 transition-all duration-300 group">
            <div class="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-4 text-teal-400 group-hover:scale-110 transition-transform">
              <Gift class="w-5 h-5" />
            </div>
            <h4 class="text-lg font-bold text-white mb-2">Sistem Self-Reward</h4>
            <p class="text-slate-400 text-sm leading-relaxed">Tulis hadiah (seperti Beli Kopi) saat membuat catatan revisi. Hadiah akan terbuka setelah tugas selesai dikerjakan.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative z-10 py-20 bg-slate-900/30 border-t border-slate-800/50">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-14">
          <h2 class="text-3xl font-black text-white tracking-tight">3 Langkah Menuju Gelar Sarjana</h2>
          <p class="text-slate-400 text-sm mt-3">Alur sederhana untuk mengatasi kebingungan saat revisi.</p>
        </div>

        <div class="flex flex-col md:flex-row gap-8 relative">
          <div class="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 z-0"></div>

          <div class="flex-1 relative z-10 flex flex-col items-center text-center group">
            <div class="w-16 h-16 rounded-full bg-slate-950 border-2 border-emerald-500 flex items-center justify-center mb-4 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform">
              <FileText class="w-7 h-7" />
            </div>
            <h4 class="font-bold text-white text-lg mb-2">1. Catat Revisi</h4>
            <p class="text-sm text-slate-400 px-4">Tulis masukan dosen dan tentukan <b>Self Reward</b> apa yang ingin kamu dapatkan jika tugas itu selesai.</p>
          </div>

          <div class="flex-1 relative z-10 flex flex-col items-center text-center group">
            <div class="w-16 h-16 rounded-full bg-slate-950 border-2 border-cyan-500 flex items-center justify-center mb-4 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover:scale-110 transition-transform">
              <Rocket class="w-7 h-7" />
            </div>
            <h4 class="font-bold text-white text-lg mb-2">2. Eksekusi Tugas</h4>
            <p class="text-sm text-slate-400 px-4">Pindahkan catatan otomatis ke Papan Kanban. Nyalakan timer Pomodoro dan mulai fokus bekerja.</p>
          </div>

          <div class="flex-1 relative z-10 flex flex-col items-center text-center group">
            <div class="w-16 h-16 rounded-full bg-slate-950 border-2 border-teal-500 flex items-center justify-center mb-4 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.2)] group-hover:scale-110 transition-transform">
              <Trophy class="w-7 h-7" />
            </div>
            <h4 class="font-bold text-white text-lg mb-2">3. Nikmati Hasilnya</h4>
            <p class="text-sm text-slate-400 px-4">Geser tugas ke 'Selesai'. Dapatkan tambahan EXP, saksikan animasi selebrasi, dan klaim hadiahmu!</p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative z-10 py-16 bg-gradient-to-b from-slate-900/30 to-slate-950 border-t border-slate-800/50 text-center">
      <div class="max-w-3xl mx-auto px-6">
        <h2 class="text-2xl md:text-3xl font-black text-white mb-4">Siap Mempercepat Proses Skripsimu?</h2>
        <p class="text-slate-400 mb-8 text-sm">Berhenti membuang waktu. Gunakan sistem cerdas ini dan bergabunglah bersama mahasiswa produktif lainnya.</p>
        <button @click="mulaiSekarang" class="px-8 py-3.5 rounded-full bg-white text-slate-950 font-black text-sm hover:bg-slate-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-105">
          Buka KawalSkripsi Sekarang
        </button>
      </div>
    </section>

    <footer class="relative z-10 border-t border-slate-800/80 bg-slate-950 py-6 text-center">
      <p class="text-slate-500 text-[11px] font-medium tracking-wide">
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
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animation-delay-100 { animation-delay: 100ms; }
.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-300 { animation-delay: 300ms; }
.animation-delay-400 { animation-delay: 400ms; }


@keyframes pulseSlow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
}
.animate-pulse-slow {
  animation: pulseSlow 6s ease-in-out infinite;
}
</style>