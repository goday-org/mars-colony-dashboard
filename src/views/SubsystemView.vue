<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-xl font-bold text-[#e0e6f0]">子系统进度</h1>
      <p class="text-sm text-[#667799] mt-1">火星移民计划 6 大核心子系统的开发状态与技术成熟度</p>
    </div>

    <!-- Subsystem Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <GlowCard v-for="sub in subsystems" :key="sub.id" :clickable="true" @click="selectedSubsystem = sub">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="text-2xl">{{ sub.icon }}</span>
            <div>
              <h3 class="text-sm font-bold" :style="{ color: sub.color }">{{ sub.name }}</h3>
              <StatusBadge :status="sub.status" :text="sub.status" />
            </div>
          </div>
          <ProgressRing :progress="sub.progress" :size="64" :strokeWidth="5" :color="sub.color" />
        </div>

        <div class="space-y-2">
          <div class="flex justify-between text-xs">
            <span class="text-[#667799]">技术成熟度 (TRL)</span>
            <span class="text-[#e0e6f0] font-mono">{{ sub.trl }}/9</span>
          </div>
          <div class="w-full h-1.5 bg-[#0d1225] rounded-full overflow-hidden">
            <div class="h-full rounded-full progress-animated" :style="{ width: (sub.trl / 9 * 100) + '%', background: sub.color }"></div>
          </div>
        </div>

        <p class="text-xs text-[#667799] mt-3 line-clamp-2">{{ sub.description }}</p>

        <div class="mt-3 pt-3 border-t border-[#2a3050] flex items-center justify-between">
          <span class="text-xs text-[#667799]">{{ sub.agency }}</span>
          <span class="text-xs text-[#00d4ff] hover:underline">查看详情 →</span>
        </div>
      </GlowCard>
    </div>

    <!-- Radar Chart -->
    <GlowCard>
      <h2 class="text-sm font-semibold text-[#00d4ff] mb-4">📊 子系统综合能力对比</h2>
      <div ref="radarRef" style="width: 100%; height: 350px;"></div>
    </GlowCard>

    <SubsystemDetail :visible="!!selectedSubsystem" :subsystem="selectedSubsystem || {}" @close="selectedSubsystem = null" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import GlowCard from '../components/common/GlowCard.vue'
import ProgressRing from '../components/common/ProgressRing.vue'
import StatusBadge from '../components/common/StatusBadge.vue'
import SubsystemDetail from '../components/panels/SubsystemDetail.vue'
import subsystemsData from '../data/subsystems.json'

const subsystems = subsystemsData
const selectedSubsystem = ref(null)
const radarRef = ref(null)
let radarChart = null

onMounted(() => {
  radarChart = echarts.init(radarRef.value)
  const option = {
    tooltip: {
      backgroundColor: '#1a1f35',
      borderColor: '#2a3050',
      textStyle: { color: '#e0e6f0' }
    },
    legend: {
      bottom: 0,
      textStyle: { color: '#667799', fontSize: 11 },
      itemWidth: 12,
      itemHeight: 12,
    },
    radar: {
      indicator: subsystems.map(s => ({ name: s.icon + ' ' + s.name, max: 100 })),
      shape: 'polygon',
      splitNumber: 5,
      axisName: { color: '#667799', fontSize: 11 },
      splitLine: { lineStyle: { color: '#2a3050' } },
      splitArea: { areaStyle: { color: ['rgba(0,212,255,0.02)', 'rgba(0,212,255,0.04)'] } },
      axisLine: { lineStyle: { color: '#2a3050' } }
    },
    series: [{
      type: 'radar',
      data: [{
        value: subsystems.map(s => s.progress),
        name: '开发进度',
        areaStyle: { color: 'rgba(0,212,255,0.15)' },
        lineStyle: { color: '#00d4ff', width: 2 },
        itemStyle: { color: '#00d4ff' }
      }, {
        value: subsystems.map(s => Math.round(s.trl / 9 * 100)),
        name: '技术成熟度',
        areaStyle: { color: 'rgba(168,85,247,0.15)' },
        lineStyle: { color: '#a855f7', width: 2 },
        itemStyle: { color: '#a855f7' }
      }]
    }]
  }
  radarChart.setOption(option)
  window.addEventListener('resize', () => radarChart?.resize())
})

onUnmounted(() => {
  radarChart?.dispose()
  window.removeEventListener('resize', () => radarChart?.resize())
})
</script>
