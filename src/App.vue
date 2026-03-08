<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, Sun, Moon, GraduationCap, Sparkles } from 'lucide-vue-next'
import Sidebar from '@/components/Sidebar.vue'
import LandingPage from 'src/views/Landingpage.vue'


import { isDark, initTheme, toggleTheme } from '@/composables/useTheme.js'

initTheme() 

const isMobileMenuBuka = ref(false)
const route = useRoute()
watch(() => route.path, () => { isMobileMenuBuka.value = false })


const currentView = ref('landing') 
const isShowLoading = ref(false)  
const progressLoading = ref(0)


const teksLoading = computed(() => {
  if (progressLoading.value < 30) return "Menyiapkan ruang kerja..."
  if (progressLoading.value < 60) return "Menyusun papan Kanban..."
  if (progressLoading.value < 90) return "Mengunci target kelulusan..."
  return "Siap menuju gelar Sarjana!"
})


const masukKeDashboard = () => {
  isShowLoading.value = true 
  progressLoading.value = 0


  const interval = setInterval(() => {
    progressLoading.value += Math.floor(Math.random() * 10) + 5 
    
    if (progressLoading.value >= 100) {
      progressLoading.value = 100
      clearInterval(interval)
      

      setTimeout(() => {
        isShowLoading.value = false 
        
   
        setTimeout(() => {
          currentView.value = 'dashboard'
        }, 300)

      }, 800) 
    }
  }, 400) 
}
</script>

<template>
  <div class="relative w-full h-full">

    <transition name="fade">
      <div v-if="isShowLoading" class="fixed inset-0 z-9999 flex items-center justify-center px-4 bg-slate-950/80 backdrop-blur-sm">
        
        <div class="bg-slate-900 border border-slate-700/50 p-8 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-sm w-full relative overflow-hidden">
          
          <div class="absolute top-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full"></div>

          <div class="relative mb-6 z-10 animate-float-toga">
            <GraduationCap class="w-16 h-16 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]" />
            <Sparkles class="absolute -top-1 -right-1 w-4 h-4 text-cyan-300 animate-pulse-slow" />
          </div>

          <h2 class="text-xl font-bold text-white mb-2 z-10 transition-colors duration-300">
            {{ teksLoading }}
          </h2>
          <p class="text-slate-400 text-xs mb-8 z-10 font-medium">
            Mohon tunggu sebentar...
          </p>

          <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden z-10">
            <div class="h-full bg-linear-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-300 ease-out" :style="{ width: progressLoading + '%' }"></div>
          </div>
          
          <div class="mt-3 text-xs font-bold text-emerald-400 z-10 font-mono">
            {{ progressLoading }}%
          </div>

        </div>
      </div>
    </transition>


    <transition name="page-fade" mode="out-in">
      
      <LandingPage v-if="currentView === 'landing'" @masuk-dashboard="masukKeDashboard" />

      <div v-else key="dashboard-screen" class="flex h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900 overflow-hidden transition-colors duration-300">

        <transition name="fade">
          <div v-if="isMobileMenuBuka" @click="isMobileMenuBuka = false" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 md:hidden"></div>
        </transition>

        <div class="fixed inset-y-0 left-0 z-50 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out" :class="isMobileMenuBuka ? 'translate-x-0' : '-translate-x-full'">
          <Sidebar />
        </div>

        <main class="flex-1 h-screen overflow-y-auto w-full relative">
          <header class="md:hidden bg-white dark:bg-slate-800 shadow-sm h-16 flex items-center justify-between px-4 sticky top-0 z-30 transition-colors duration-300">
            <div class="flex items-center">
              <img src="/logo.png" alt="Logo" class="w-10 h-10 mr-2 object-contain" />
              <h1 class="text-lg font-bold text-slate-800 dark:text-white">Kawal<span class="text-emerald-500">Skripsi</span></h1>
            </div>

            <div class="flex items-center gap-2">
              <button @click="toggleTheme" class="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <Sun v-if="isDark" class="w-5 h-5" />
                <Moon v-else class="w-5 h-5" />
              </button>

              <button @click="isMobileMenuBuka = true" class="p-2 -mr-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <Menu class="w-6 h-6" />
              </button>
            </div>
          </header>

          <div class="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <keep-alive>
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </main>
      </div>
      
    </transition>

  </div>
</template>

<style>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.6s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}


@keyframes floatToga {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
}
.animate-float-toga {
  animation: floatToga 4s ease-in-out infinite;
}


@keyframes pulseSlow {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
.animate-pulse-slow {
  animation: pulseSlow 3s ease-in-out infinite;
}
</style>