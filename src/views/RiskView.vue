<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-xl font-bold text-[#e0e6f0]">风险评估</h1>
      <p class="text-sm text-[#667799] mt-1">火星殖民主要风险的概率-影响分析与缓解策略</p>
    </div>

    <!-- Level Filter -->
    <div class="flex flex-wrap gap-2">
      <button v-for="f in levelFilters" :key="f.value"
              @click="activeFilter = f.value"
              class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              :class="activeFilter === f.value
                ? 'border border-opacity-30' : 'bg-[#1a1f35] text-[#667799] border border-[#2a3050] hover:text-[#e0e6f0]'"
              :style="activeFilter === f.value ? { backgroundColor: f.color + '20', color: f.color, borderColor: f.color + '50' } : {}">
        {{ f.label }} ({{ f.count }})
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Risk Matrix -->
      <GlowCard>
        <h2 class="text-sm font-semibold text-[#ff6b35] mb-4">🎯 风险矩阵</h2>
        <RiskMatrix :data="filteredRisks" :height="400" />
      </GlowCard>

      <!-- Risk List -->
      <GlowCard>
        <h2 class="text-sm font-semibold text-[#ff6b35] mb-4">📋 风险清单</h2>
        <div class="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          <div v-for="risk in filteredRisks" :key="risk.id"
               class="flex items-center gap-3 p-3 rounded-lg hover:bg-[#222845] transition-colors cursor-pointer border border-transparent hover:border-[#2a3050]"
               @click="selectedRisk = risk">
            <span class="text-2xl">{{ risk.icon }}</span>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-sm font-semibold text-[#e0e6f0]">{{ risk.name }}</span>
                <StatusBadge :status="risk.level" :text="risk.level" />
              </div>
              <p class="text-xs text-[#667799] mt-0.5 line-clamp-1">{{ risk.description }}</p>
              <div class="flex items-center gap-3 mt-1">
                <span class="text-xs text-[#667799]">严重 {{ risk.severity }}/5</span>
                <span class="text-xs text-[#667799]">可能 {{ risk.likelihood }}/5</span>
              </div>
            </div>
            <span class="text-[#00d4ff] text-sm">→</span>
          </div>
        </div>
      </GlowCard>
    </div>

    <!-- Risk Summary -->
    <GlowCard>
      <h2 class="text-sm font-semibold text-[#a855f7] mb-4">📈 风险分布统计</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="stat in riskStats" :key="stat.level" class="text-center p-3 rounded-lg" :style="{ backgroundColor: stat.color + '10' }">
          <div class="text-2xl font-bold" :style="{ color: stat.color }">{{ stat.count }}</div>
          <div class="text-xs text-[#667799] mt-1">{{ stat.level }}</div>
        </div>
      </div>
    </GlowCard>

    <RiskDetail :visible="!!selectedRisk" :risk="selectedRisk || {}" @close="selectedRisk = null" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import GlowCard from '../components/common/GlowCard.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import RiskMatrix from '../components/charts/RiskMatrix.vue'
import RiskDetail from '../components/panels/RiskDetail.vue'
import risksData from '../data/risks.json'

const selectedRisk = ref(null)
const activeFilter = ref('all')

const levelColors = { '严重': '#ff4444', '高': '#ff6b35', '中': '#ffaa00', '低': '#00ff88' }

const levelFilters = computed(() => [
  { label: '全部', value: 'all', color: '#00d4ff', count: risksData.length },
  ...Object.entries(levelColors).map(([level, color]) => ({
    label: level, value: level, color, count: risksData.filter(r => r.level === level).length
  }))
])

const filteredRisks = computed(() => {
  if (activeFilter.value === 'all') return risksData
  return risksData.filter(r => r.level === activeFilter.value)
})

const riskStats = computed(() =>
  Object.entries(levelColors).map(([level, color]) => ({
    level, color, count: risksData.filter(r => r.level === level).length
  }))
)
</script>
