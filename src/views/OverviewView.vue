<template>
  <div class="space-y-6">
    <!-- KPI Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <GlowCard v-for="kpi in kpis" :key="kpi.label">
        <div class="text-xs text-[#667799] mb-1">{{ kpi.label }}</div>
        <div class="text-2xl font-bold font-mono" :style="{ color: kpi.color }">{{ kpi.value }}</div>
        <div class="text-xs text-[#667799] mt-1">{{ kpi.sub }}</div>
      </GlowCard>
    </div>

    <!-- Subsystem Overview Chart -->
    <GlowCard>
      <h2 class="text-sm font-semibold text-[#00d4ff] mb-4">🛸 子系统进度概览</h2>
      <SubsystemChart :data="subsystems" :height="280" />
    </GlowCard>

    <!-- Bottom Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Recent Milestones -->
      <GlowCard>
        <h2 class="text-sm font-semibold text-[#00d4ff] mb-4">🏁 近期里程碑</h2>
        <div class="space-y-3">
          <div v-for="m in recentMilestones" :key="m.year + m.event"
               class="flex items-start gap-3 p-2 rounded-lg hover:bg-[#222845] transition-colors cursor-pointer"
               @click="showMilestone(m)">
            <span class="text-lg font-bold font-mono mt-0.5" :style="{ color: agencyColors[m.agency] || '#667799' }">{{ m.year }}</span>
            <div class="flex-1 min-w-0">
              <div class="text-sm text-[#e0e6f0] truncate">{{ m.event }}</div>
              <div class="text-xs text-[#667799]">{{ m.agency }}</div>
            </div>
            <StatusBadge v-if="m.confidence" :status="m.confidence + '置信'" :text="m.confidence" />
          </div>
        </div>
      </GlowCard>

      <!-- Risk Alerts -->
      <GlowCard>
        <h2 class="text-sm font-semibold text-[#ff6b35] mb-4">⚠️ 风险预警</h2>
        <div class="space-y-2">
          <div v-for="risk in topRisks" :key="risk.id"
               class="flex items-center gap-3 p-2 rounded-lg hover:bg-[#222845] transition-colors cursor-pointer"
               @click="selectedRisk = risk">
            <span class="text-lg">{{ risk.icon }}</span>
            <div class="flex-1">
              <div class="text-sm text-[#e0e6f0]">{{ risk.name }}</div>
              <div class="text-xs text-[#667799]">严重 {{ risk.severity }}/5 · 可能 {{ risk.likelihood }}/5</div>
            </div>
            <StatusBadge :status="risk.level" :text="risk.level" />
          </div>
        </div>
      </GlowCard>
    </div>

    <MilestoneDetail :visible="!!selectedMilestone" :milestone="selectedMilestone || {}" @close="selectedMilestone = null" />
    <RiskDetail :visible="!!selectedRisk" :risk="selectedRisk || {}" @close="selectedRisk = null" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import GlowCard from '../components/common/GlowCard.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import SubsystemChart from '../components/charts/SubsystemChart.vue'
import MilestoneDetail from '../components/panels/MilestoneDetail.vue'
import RiskDetail from '../components/panels/RiskDetail.vue'
import subsystemsData from '../data/subsystems.json'
import milestonesData from '../data/milestones.json'
import risksData from '../data/risks.json'

const subsystems = subsystemsData

const kpis = computed(() => {
  const avgProgress = Math.round(subsystems.reduce((s, x) => s + x.progress, 0) / subsystems.length)
  const highRisks = risksData.filter(r => r.level === '严重').length
  return [
    { label: '距发射', value: 'T-1247', sub: '天', color: '#00ff88' },
    { label: '总体进度', value: avgProgress + '%', sub: '子系统加权平均', color: '#00d4ff' },
    { label: '活跃风险', value: highRisks, sub: '项严重风险', color: '#ff6b35' },
    { label: '已投入预算', value: '$42B', sub: 'NASA + SpaceX 累计', color: '#a855f7' },
  ]
})

const allMilestones = [...milestonesData.history.reverse().slice(0, 3), ...milestonesData.future.slice(0, 3)]
const recentMilestones = allMilestones

const topRisks = computed(() => risksData.filter(r => r.level === '严重').slice(0, 3))

const selectedMilestone = ref(null)
const selectedRisk = ref(null)

const showMilestone = (m) => { selectedMilestone.value = m }

const agencyColors = { 'NASA': '#00d4ff', 'SpaceX': '#00ff88', 'CNSA': '#ff6b35', 'ESA': '#a855f7', 'SpaceX/多国': '#ffaa00' }
</script>
