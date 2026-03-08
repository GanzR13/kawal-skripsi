<script setup>
import { FileQuestion, Home, ArrowLeft } from 'lucide-vue-next'
import { useRouter } from 'vue-router'


const router = useRouter()
</script>

<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 animate-in fade-in zoom-in duration-500">
    
    <div class="w-32 h-32 bg-slate-100 rounded-full flex items-center justify-center mb-8 relative">
      <div class="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-75"></div>
      <FileQuestion class="w-16 h-16 text-emerald-500 relative z-10 animate-bounce" />
    </div>
    
    <h1 class="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
      404 - Nyasar Bos!
    </h1>
    
    <p class="text-slate-500 text-lg md:text-xl max-w-lg mb-10">
      Waduh, halaman yang kamu cari tidak ditemukan. Sepertinya halaman ini menghilang secara misterius, persis seperti dosen pembimbing saat mau ditagih tanda tangan ACC.
    </p>

    <div class="flex flex-col sm:flex-row gap-4">
      <button 
        @click="router.back()"
        class="flex items-center justify-center px-6 py-3 bg-white text-slate-700 font-medium rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
      >
        <ArrowLeft class="w-5 h-5 mr-2 text-slate-500" />
        Kembali Dulu
      </button>
      
      <router-link 
        to="/"
        class="flex items-center justify-center px-6 py-3 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 hover:-translate-y-0.5 transition-all shadow-sm shadow-emerald-500/30"
      >
        <Home class="w-5 h-5 mr-2" />
        Ke Halaman Utama
      </router-link>
    </div>

  </div>
</template>