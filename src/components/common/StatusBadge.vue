<template>
  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="bgClass">
    <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="dotClass"></span>
    {{ text }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: { type: String, default: 'normal' },
  text: { type: String, default: '' }
})

const statusMap = {
  '运行成熟': { bg: 'bg-[#00ff88]/10', dot: 'bg-[#00ff88]' },
  '开发中': { bg: 'bg-[#00d4ff]/10', dot: 'bg-[#00d4ff]' },
  '研发阶段': { bg: 'bg-[#ffaa00]/10', dot: 'bg-[#ffaa00]' },
  '概念设计': { bg: 'bg-[#a855f7]/10', dot: 'bg-[#a855f7]' },
  '早期验证': { bg: 'bg-[#ff6b35]/10', dot: 'bg-[#ff6b35]' },
  '严重': { bg: 'bg-[#ff4444]/10', dot: 'bg-[#ff4444]' },
  '高': { bg: 'bg-[#ff6b35]/10', dot: 'bg-[#ff6b35]' },
  '中': { bg: 'bg-[#ffaa00]/10', dot: 'bg-[#ffaa00]' },
  '低': { bg: 'bg-[#00ff88]/10', dot: 'bg-[#00ff88]' },
  '高置信': { bg: 'bg-[#00ff88]/10', dot: 'bg-[#00ff88]' },
  '中置信': { bg: 'bg-[#ffaa00]/10', dot: 'bg-[#ffaa00]' },
  '低置信': { bg: 'bg-[#ff6b35]/10', dot: 'bg-[#ff6b35]' },
}

const bgClass = computed(() => statusMap[props.status]?.bg || 'bg-[#667799]/10')
const dotClass = computed(() => statusMap[props.status]?.dot || 'bg-[#667799]')
</script>
