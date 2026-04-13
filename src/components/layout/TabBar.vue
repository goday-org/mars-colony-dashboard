<template>
  <nav class="border-b border-[#2a3050] bg-[#0d1220]/60 backdrop-blur-sm sticky top-[57px] z-40">
    <div class="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto">
      <router-link
        v-for="tab in tabs"
        :key="tab.path"
        :to="tab.path"
        class="px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2"
        :class="isActive(tab.path)
          ? 'text-[#00d4ff] border-[#00d4ff]'
          : 'text-[#667799] border-transparent hover:text-[#e0e6f0] hover:border-[#667799]'"
      >
        <span class="mr-1.5">{{ tab.icon }}</span>
        {{ tab.label }}
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const tabs = [
  { path: '/', label: '总览', icon: '📊' },
  { path: '/subsystems', label: '子系统进度', icon: '🔧' },
  { path: '/milestones', label: '里程碑追踪', icon: '🏁' },
  { path: '/risks', label: '风险评估', icon: '⚠️' },
  { path: '/budget', label: '预算与资源', icon: '💰' },
]

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>
