<script setup>
import { BookOpenCheck, KanbanSquare, Timer, LibraryBig, TrendingUp, Sun, Moon } from 'lucide-vue-next'
import { useRoute } from 'vue-router'


import { isDark, toggleTheme } from '@/composables/useTheme.js'

const route = useRoute()

const menus = [
  { name: 'Jurnal Bimbingan', path: '/jurnal', icon: BookOpenCheck },
  { name: 'Papan Progres', path: '/kanban', icon: KanbanSquare },
  { name: 'Waktu Fokus', path: '/fokus', icon: Timer },
  { name: 'Pusat Referensi', path: '/referensi', icon: LibraryBig },
  { name: 'Grafik Capaian', path: '/progres', icon: TrendingUp },
]
</script>

<template>
  <aside class="w-64 bg-slate-900 dark:bg-slate-950 text-slate-300 flex flex-col h-full transition-all duration-300 shadow-2xl md:shadow-none border-r border-slate-800">
    
    <div class="h-16 md:h-20 flex items-center px-6 md:px-8 border-b border-slate-800">
      <div class="w-8 h-8 rounded bg-emerald-50 mr-3 flex items-center justify-center shadow-lg shadow-emerald-500/30">
        <img src="/logo.png" alt="Logo" class="w-full h-full object-contain">
      </div>
      <h1 class="text-xl font-bold text-white tracking-wide">Kawal<span class="text-emerald-400">Skripsi</span></h1>
    </div>

    <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
      <p class="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Menu Utama</p>
      
      <router-link 
        v-for="menu in menus" :key="menu.path" :to="menu.path"
        class="flex items-center px-4 py-3 rounded-xl transition-all duration-200 group"
        :class="route.path === menu.path ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-slate-800 hover:text-white'"
      >
        <component :is="menu.icon" class="w-5 h-5 mr-3 transition-colors" :class="route.path === menu.path ? 'text-emerald-400' : 'text-slate-500 group-hover:text-white'" />
        <span class="font-medium">{{ menu.name }}</span>
      </router-link>
    </nav>

    <div class="p-6 border-t border-slate-800 flex items-center justify-between">
      <p class="text-sm text-slate-500 font-medium">WDC 2026</p>
      
      <button 
        @click="toggleTheme" 
        class="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-emerald-400 transition-colors"
        title="Ganti Tema"
      >
        <Sun v-if="isDark" class="w-5 h-5" />
        <Moon v-else class="w-5 h-5" />
      </button>
    </div>
  </aside>
</template>