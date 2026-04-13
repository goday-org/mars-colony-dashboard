<template>
  <div class="relative inline-flex items-center justify-center">
    <svg :width="size" :height="size" class="transform -rotate-90">
      <circle :cx="size/2" :cy="size/2" :r="radius" fill="none" :stroke="'#2a3050'" :stroke-width="strokeWidth" />
      <circle
        :cx="size/2" :cy="size/2" :r="radius" fill="none"
        :stroke="color" :stroke-width="strokeWidth"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        stroke-linecap="round"
        class="transition-all duration-1000 ease-out"
      />
    </svg>
    <div class="absolute flex flex-col items-center justify-center">
      <span class="text-xl font-bold" :style="{ color }">{{ progress }}%</span>
      <span v-if="label" class="text-[10px] text-[#667799] mt-0.5">{{ label }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  progress: { type: Number, default: 0 },
  size: { type: Number, default: 100 },
  strokeWidth: { type: Number, default: 6 },
  color: { type: String, default: '#00d4ff' },
  label: { type: String, default: '' }
})

const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => circumference.value - (props.progress / 100) * circumference.value)
</script>
