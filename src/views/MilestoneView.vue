<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-xl font-bold text-[#e0e6f0]">里程碑追踪</h1>
      <p class="text-sm text-[#667799] mt-1">火星探索历史里程碑与未来计划时间线</p>
    </div>

    <!-- Agency Filter -->
    <div class="flex flex-wrap gap-2">
      <button v-for="f in agencyFilters" :key="f.value"
              @click="activeFilter = f.value"
              class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              :class="activeFilter === f.value
                ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30'
                : 'bg-[#1a1f35] text-[#667799] border border-[#2a3050] hover:text-[#e0e6f0]'">
        {{ f.label }}
      </button>
    </div>

    <!-- Timeline Chart -->
    <GlowCard>
      <h2 class="text-sm font-semibold text-[#00d4ff] mb-4">📅 火星探索时间线</h2>
      <div ref="timelineRef" style="width: 100%; height: 450px;"></div>
    </GlowCard>

    <!-- Milestone Lists -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- History -->
      <GlowCard>
        <h2 class="text-sm font-semibold text-[#00d4ff] mb-4">📜 历史里程碑</h2>
        <div class="space-y-2 max-h-96 overflow-y-auto pr-2">
          <div v-for="m in filteredHistory" :key="m.year + m.event"
               class="flex items-start gap-3 p-2 rounded-lg hover:bg-[#222845] transition-colors cursor-pointer"
               @click="selectedMilestone = m">
            <div class="flex flex-col items-center">
              <div class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: agencyColors[m.agency] || '#667799' }"></div>
              <div class="w-px h-full bg-[#2a3050] mt-1"></div>
            </div>
            <div class="flex-1 pb-3">
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold font-mono" :style="{ color: agencyColors[m.agency] || '#667799' }">{{ m.year }}</span>
                <span class="text-xs px-1.5 py-0.5 rounded bg-[#0d1225] text-[#667799]">{{ m.agency }}</span>
              </div>
              <div class="text-sm text-[#e0e6f0] mt-1">{{ m.event }}</div>
            </div>
          </div>
        </div>
      </GlowCard>

      <!-- Future -->
      <GlowCard>
        <h2 class="text-sm font-semibold text-[#00ff88] mb-4">🚀 未来计划</h2>
        <div class="space-y-2 max-h-96 overflow-y-auto pr-2">
          <div v-for="m in filteredFuture" :key="m.year + m.event"
               class="flex items-start gap-3 p-2 rounded-lg hover:bg-[#222845] transition-colors cursor-pointer"
               @click="selectedMilestone = m">
            <div class="flex flex-col items-center">
              <div class="w-2.5 h-2.5 rounded-full border-2" :style="{ borderColor: agencyColors[m.agency] || '#667799' }"></div>
              <div class="w-px h-full bg-[#2a3050] mt-1"></div>
            </div>
            <div class="flex-1 pb-3">
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold font-mono" :style="{ color: agencyColors[m.agency] || '#667799' }">{{ m.year }}</span>
                <span class="text-xs px-1.5 py-0.5 rounded bg-[#0d1225] text-[#667799]">{{ m.agency }}</span>
                <StatusBadge v-if="m.confidence" :status="m.confidence + '置信'" :text="m.confidence" />
              </div>
              <div class="text-sm text-[#e0e6f0] mt-1">{{ m.event }}</div>
            </div>
          </div>
        </div>
      </GlowCard>
    </div>

    <MilestoneDetail :visible="!!selectedMilestone" :milestone="selectedMilestone || {}" @close="selectedMilestone = null" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import GlowCard from '../components/common/GlowCard.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import MilestoneDetail from '../components/panels/MilestoneDetail.vue'
import milestonesData from '../data/milestones.json'

const agencyColors = { 'NASA': '#00d4ff', 'SpaceX': '#00ff88', 'CNSA': '#ff6b35', 'ESA': '#a855f7', 'SpaceX/多国': '#ffaa00' }

const agencyFilters = [
  { label: '全部', value: 'all' },
  { label: 'NASA', value: 'NASA' },
  { label: 'SpaceX', value: 'SpaceX' },
  { label: 'CNSA', value: 'CNSA' },
  { label: 'ESA', value: 'ESA' },
]

const activeFilter = ref('all')
const selectedMilestone = ref(null)
const timelineRef = ref(null)
let timelineChart = null

const filteredHistory = computed(() => {
  let data = [...milestonesData.history].reverse()
  if (activeFilter.value !== 'all') data = data.filter(m => m.agency.includes(activeFilter.value))
  return data
})

const filteredFuture = computed(() => {
  let data = [...milestonesData.future]
  if (activeFilter.value !== 'all') data = data.filter(m => m.agency.includes(activeFilter.value))
  return data
})

const buildTimelineOption = () => {
  const historyData = milestonesData.history.map(m => ({
    value: [m.year, 0, m.event, m.agency],
    itemStyle: { color: agencyColors[m.agency] || '#667799' }
  }))
  const futureData = milestonesData.future.map(m => ({
    value: [m.year, 1, m.event, m.agency],
    symbol: 'diamond',
    symbolSize: 12,
    itemStyle: { color: agencyColors[m.agency] || '#667799', opacity: 0.7 },
    label: { show: true, formatter: m.event.substring(0, 8) + '...', position: 'right', color: '#667799', fontSize: 9 }
  }))

  return {
    tooltip: {
      backgroundColor: '#1a1f35',
      borderColor: '#2a3050',
      textStyle: { color: '#e0e6f0' },
      formatter: (params) => {
        const d = params.data.value
        return `<strong>${d[0]}</strong><br/>${d[2]}<br/><span style="color:${agencyColors[d[3]] || '#667799'}">${d[3]}</span>`
      }
    },
    grid: { left: 80, right: 40, top: 20, bottom: 40 },
    xAxis: {
      type: 'value',
      name: '年份',
      nameTextStyle: { color: '#667799' },
      min: 1960,
      max: 2055,
      axisLine: { lineStyle: { color: '#2a3050' } },
      axisTick: { show: false },
      axisLabel: { color: '#667799', fontSize: 10 },
      splitLine: { lineStyle: { color: '#1a1f35', type: 'dashed' } }
    },
    yAxis: {
      type: 'category',
      data: ['未来计划', '历史里程碑'],
      axisLine: { lineStyle: { color: '#2a3050' } },
      axisTick: { show: false },
      axisLabel: { color: '#667799', fontSize: 11 }
    },
    series: [
      {
        type: 'scatter',
        data: historyData,
        symbolSize: 10,
        label: { show: true, formatter: (params) => params.data.value[2].substring(0, 10) + '...', position: 'right', color: '#e0e6f0', fontSize: 9 },
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,212,255,0.5)' } }
      },
      {
        type: 'scatter',
        data: futureData,
        emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,255,136,0.5)' } }
      }
    ],
    markLine: {
      silent: true,
      data: [{ xAxis: 2026, label: { formatter: '现在', color: '#ff6b35' }, lineStyle: { color: '#ff6b35', type: 'dashed' } }]
    }
  }
}

onMounted(() => {
  timelineChart = echarts.init(timelineRef.value)
  timelineChart.setOption(buildTimelineOption())
  window.addEventListener('resize', () => timelineChart?.resize())
})

onUnmounted(() => {
  timelineChart?.dispose()
  window.removeEventListener('resize', () => timelineChart?.resize())
})

watch(activeFilter, () => {
  // Rebuild chart with filter
  const opt = buildTimelineOption()
  if (activeFilter.value !== 'all') {
    const color = agencyColors[activeFilter.value] || '#667799'
    opt.series.forEach(s => {
      s.data = s.data.filter(d => d.value[3].includes(activeFilter.value))
    })
  }
  timelineChart?.setOption(opt, { notMerge: true })
})
</script>
