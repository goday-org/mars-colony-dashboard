<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
    <div class="relative bg-[#1a1f35] border border-[#2a3050] rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl" style="animation: slideIn 0.3s ease-out">
      <button @click="$emit('close')" class="absolute top-4 right-4 text-[#667799] hover:text-[#e0e6f0] text-xl">&times;</button>

      <div class="flex items-center gap-3 mb-4">
        <span class="text-3xl">{{ risk.icon }}</span>
        <div>
          <h2 class="text-xl font-bold" :style="{ color: risk.levelColor }">{{ risk.name }}</h2>
          <div class="flex items-center gap-2 mt-1">
            <StatusBadge :status="risk.level" :text="risk.level" />
            <span class="text-xs text-[#667799]">严重 {{ risk.severity }}/5 · 可能 {{ risk.likelihood }}/5</span>
          </div>
        </div>
      </div>

      <p class="text-sm text-[#e0e6f0]/80 mb-4 leading-relaxed">{{ risk.description }}</p>

      <div class="mb-4">
        <h3 class="text-sm font-semibold text-[#ff6b35] mb-2">影响分析</h3>
        <p class="text-sm text-[#e0e6f0]/70 leading-relaxed">{{ risk.impact }}</p>
      </div>

      <div class="mb-4">
        <h3 class="text-sm font-semibold text-[#00ff88] mb-2">缓解措施</h3>
        <ul class="space-y-1">
          <li v-for="m in risk.mitigation" :key="m" class="text-sm text-[#e0e6f0]/70 flex items-start gap-2">
            <span class="text-[#00ff88] mt-0.5">✓</span>{{ m }}
          </li>
        </ul>
      </div>

      <div v-if="risk.data" class="mt-4 pt-4 border-t border-[#2a3050]">
        <h3 class="text-sm font-semibold text-[#a855f7] mb-2">关键数据</h3>
        <div class="grid grid-cols-2 gap-2">
          <div v-for="(val, key) in risk.data" :key="key" class="bg-[#0d1225] rounded-lg p-2">
            <div class="text-xs text-[#667799]">{{ key }}</div>
            <div class="text-sm text-[#e0e6f0] font-mono">{{ val }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StatusBadge from '../common/StatusBadge.vue'

defineProps({
  visible: { type: Boolean, default: false },
  risk: { type: Object, default: () => ({}) }
})
defineEmits(['close'])
</script>

<style scoped>
@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
