<template>
  <header class="border-b border-[#2a3050] bg-[#0a0e1a]/80 backdrop-blur-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-3 h-3 rounded-full bg-red-500 pulse-glow"></div>
        <h1 class="text-lg font-bold tracking-wider text-[#00d4ff]">MARS COLONY MISSION CONTROL</h1>
        <span class="text-xs text-[#667799] hidden sm:inline">火星移民任务控制中心</span>
      </div>
      <div class="flex items-center gap-6">
        <div class="text-right">
          <div class="text-xs text-[#667799]">距发射</div>
          <div class="text-lg font-bold text-[#00ff88] font-mono">T-{{ countdownDays }}</div>
        </div>
        <div class="text-right hidden sm:block">
          <div class="text-xs text-[#667799]">当前日期</div>
          <div class="text-sm text-[#e0e6f0] font-mono">{{ currentDate }}</div>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-[#00ff88] pulse-glow"></div>
          <span class="text-xs text-[#00ff88] font-mono">LIVE</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const countdownDays = ref(1247)
const currentDate = ref('')

onMounted(() => {
  const now = new Date()
  currentDate.value = now.toISOString().split('T')[0].replace(/-/g, '.')

  // Calculate days to estimated first crewed Mars mission (2031-01-01)
  const target = new Date('2031-01-01')
  const diff = target - now
  countdownDays.value = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
})
</script>
