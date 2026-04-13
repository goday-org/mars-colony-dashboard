<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-xl font-bold text-[#e0e6f0]">预算与资源</h1>
      <p class="text-sm text-[#667799] mt-1">火星任务预算分配与未来基地资源储备监控</p>
    </div>

    <!-- Budget Overview Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <GlowCard v-for="item in budgetCards" :key="item.label">
        <div class="text-xs text-[#667799] mb-1">{{ item.label }}</div>
        <div class="text-xl font-bold font-mono" :style="{ color: item.color }">{{ item.value }}</div>
        <div class="text-xs text-[#667799] mt-1">{{ item.sub }}</div>
      </GlowCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- NASA Budget Breakdown -->
      <GlowCard>
        <h2 class="text-sm font-semibold text-[#00d4ff] mb-4">🇺🇸 NASA FY2026 火星预算分配</h2>
        <BudgetPie :data="budgetData.nasaBreakdown" :height="320" />
      </GlowCard>

      <!-- Historical Mission Costs -->
      <GlowCard>
        <h2 class="text-sm font-semibold text-[#ff6b35] mb-4">📊 历史火星任务成本</h2>
        <BudgetTrend :data="budgetData.historicalMissions" :height="320" />
      </GlowCard>
    </div>

    <!-- Agency Budgets Table -->
    <GlowCard>
      <h2 class="text-sm font-semibold text-[#a855f7] mb-4">🏛️ 各机构火星计划预算</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-[#2a3050]">
              <th class="text-left py-2 px-3 text-[#667799] font-medium">机构</th>
              <th class="text-right py-2 px-3 text-[#667799] font-medium">预算</th>
              <th class="text-right py-2 px-3 text-[#667799] font-medium">年度</th>
              <th class="text-left py-2 px-3 text-[#667799] font-medium">说明</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in budgetData.agencies" :key="i" class="border-b border-[#1a1f35] hover:bg-[#222845] transition-colors">
              <td class="py-2.5 px-3 text-[#e0e6f0] font-medium">{{ item.name }}</td>
              <td class="py-2.5 px-3 text-right font-mono" :style="{ color: agencyColors[item.name] || '#00d4ff' }">{{ item.budget }} {{ item.unit }}</td>
              <td class="py-2.5 px-3 text-right text-[#667799]">{{ item.year }}</td>
              <td class="py-2.5 px-3 text-[#667799]">{{ item.detail }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </GlowCard>

    <!-- Resources Section -->
    <GlowCard>
      <h2 class="text-sm font-semibold text-[#00ff88] mb-4">📦 火星基地资源储备（模拟）</h2>
      <p class="text-xs text-[#667799] mb-4">基于未来火星基地的资源储备状态预估</p>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div v-for="res in budgetData.resources" :key="res.name" class="text-center p-3 rounded-lg bg-[#0d1225] border border-[#2a3050]">
          <div class="text-2xl mb-2">{{ res.icon }}</div>
          <div class="text-xs text-[#667799] mb-1">{{ res.name }}</div>
          <div class="relative mx-auto" style="width: 70px; height: 70px;">
            <svg width="70" height="70" class="transform -rotate-90">
              <circle cx="35" cy="35" r="28" fill="none" stroke="#2a3050" stroke-width="5" />
              <circle cx="35" cy="35" r="28" fill="none" :stroke="res.color" stroke-width="5"
                      :stroke-dasharray="175.9" :stroke-dashoffset="175.9 - (res.value / 100 * 175.9)"
                      stroke-linecap="round" class="transition-all duration-1000" />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-sm font-bold" :style="{ color: res.color }">{{ res.value }}%</span>
            </div>
          </div>
          <div class="text-xs text-[#667799] mt-1">目标: {{ res.target }}{{ res.unit }}</div>
        </div>
      </div>
    </GlowCard>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import GlowCard from '../components/common/GlowCard.vue'
import BudgetPie from '../components/charts/BudgetPie.vue'
import BudgetTrend from '../components/charts/BudgetTrend.vue'
import budgetData from '../data/budget.json'

const agencyColors = { 'NASA': '#00d4ff', 'SpaceX': '#00ff88', 'ESA': '#a855f7', 'CNSA': '#ff6b35' }

const budgetCards = computed(() => [
  { label: 'NASA 火星专项', value: '$10亿', sub: 'FY2026', color: '#00d4ff' },
  { label: 'NASA 总预算', value: '$188亿', sub: 'FY2026', color: '#00d4ff' },
  { label: 'SpaceX 火星计划', value: '$1000亿+', sub: '长期估算', color: '#00ff88' },
  { label: 'ESA 火星活动', value: '€6亿', sub: '年度', color: '#a855f7' },
])
</script>
