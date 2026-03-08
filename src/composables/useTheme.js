import { ref, watch, onMounted } from 'vue'

export const isDark = ref(false)

export const initTheme = () => {
  onMounted(() => {
    const temaLokal = localStorage.getItem('kawalSkripsi_tema')
    if (temaLokal === 'dark' || (!temaLokal && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      isDark.value = true
      document.documentElement.classList.add('dark')
    }
  })

  watch(isDark, (nilaiBaru) => {
    if (nilaiBaru) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('kawalSkripsi_tema', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('kawalSkripsi_tema', 'light')
    }
  })
}

export const toggleTheme = () => {
  isDark.value = !isDark.value
}