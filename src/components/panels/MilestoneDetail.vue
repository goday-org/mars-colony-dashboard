<template>
  <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
    <div class="relative bg-[#1a1f35] border border-[#2a3050] rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl" style="animation: slideIn 0.3s ease-out">
      <button @click="$emit('close')" class="absolute top-4 right-4 text-[#667799] hover:text-[#e0e6f0] text-xl">&times;</button>

      <div class="flex items-center gap-3 mb-4">
        <span class="text-2xl font-bold font-mono" :style="{ color: agencyColor }">{{ milestone.year }}</span>
        <div>
          <h2 class="text-lg font-bold text-[#e0e6f0]">{{ milestone.event }}</h2>
          <span class="text-xs text-[#667799]">{{ milestone.agency }}</span>
        </div>
      </div>

      <p class="text-sm text-[#e0e6f0]/80 leading-relaxed mb-3">{{ milestone.detail }}</p>

      <div v-if="milestone.confidence" class="flex items-center gap-2">
        <span class="text-xs text-[#667799]">置信度:</span>
        <StatusBadge :status="milestone.confidence + '置信'" :text="milestone.confidence" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StatusBadge from '../common/StatusBadge.vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  milestone: { type: Object, default: () => ({}) }
})
defineEmits(['close'])

const agencyColors = { 'NASA': '#00d4ff', 'SpaceX': '#00ff88', 'CNSA': '#ff6b35', 'ESA': '#a855f7', 'SpaceX/多国': '#ffaa00' }
const agencyColor = computed(() => agencyColors[props.milestone.agency] || '#667799')
</script>

<style scoped>
@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>
