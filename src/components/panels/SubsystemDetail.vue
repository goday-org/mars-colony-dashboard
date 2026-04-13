<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
    <div class="relative bg-[#1a1f35] border border-[#2a3050] rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl" style="animation: slideIn 0.3s ease-out">
      <button @click="$emit('close')" class="absolute top-4 right-4 text-[#667799] hover:text-[#e0e6f0] text-xl">&times;</button>

      <div class="flex items-center gap-3 mb-4">
        <span class="text-3xl">{{ subsystem.icon }}</span>
        <div>
          <h2 class="text-xl font-bold" :style="{ color: subsystem.color }">{{ subsystem.name }}</h2>
          <div class="flex items-center gap-2 mt-1">
            <StatusBadge :status="subsystem.status" :text="subsystem.status" />
            <span class="text-xs text-[#667799]">TRL {{ subsystem.trl }}</span>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <div class="flex items-center justify-between mb-1">
          <span class="text-sm text-[#667799]">开发进度</span>
          <span class="text-sm font-bold" :style="{ color: subsystem.color }">{{ subsystem.progress }}%</span>
        </div>
        <div class="w-full h-2 bg-[#0d1225] rounded-full overflow-hidden">
          <div class="h-full rounded-full progress-animated" :style="{ width: subsystem.progress + '%', background: `linear-gradient(90deg, ${subsystem.color}, ${subsystem.color}88)` }"></div>
        </div>
      </div>

      <p class="text-sm text-[#e0e6f0]/80 mb-4 leading-relaxed">{{ subsystem.description }}</p>

      <div class="mb-4">
        <h3 class="text-sm font-semibold text-[#00d4ff] mb-2">关键挑战</h3>
        <ul class="space-y-1">
          <li v-for="challenge in subsystem.challenges" :key="challenge" class="text-sm text-[#e0e6f0]/70 flex items-start gap-2">
            <span class="text-[#ff6b35] mt-0.5">▸</span>{{ challenge }}
          </li>
        </ul>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-[#00d4ff] mb-2">近期进展</h3>
        <div class="space-y-2">
          <div v-for="item in subsystem.recentProgress" :key="item.date" class="flex items-start gap-3 text-sm">
            <span class="text-[#667799] font-mono text-xs mt-0.5 whitespace-nowrap">{{ item.date }}</span>
            <span class="text-[#e0e6f0]/70">{{ item.event }}</span>
          </div>
        </div>
      </div>

      <div class="mt-4 pt-4 border-t border-[#2a3050]">
        <span class="text-xs text-[#667799]">负责机构: {{ subsystem.agency }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import StatusBadge from '../common/StatusBadge.vue'

defineProps({
  visible: { type: Boolean, default: false },
  subsystem: { type: Object, default: () => ({}) }
})
defineEmits(['close'])
</script>

<style scoped>
@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
