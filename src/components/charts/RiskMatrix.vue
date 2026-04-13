<template>
  <div ref="chartRef" :style="{ width: '100%', height: height + 'px' }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: { type: Array, default: () => [] },
  height: { type: Number, default: 400 }
})

const chartRef = ref(null)
let chart = null

const levelColors = {
  '严重': '#ff4444',
  '高': '#ff6b35',
  '中': '#ffaa00',
  '低': '#00ff88'
}

const getOption = () => ({
  tooltip: {
    backgroundColor: '#1a1f35',
    borderColor: '#2a3050',
    textStyle: { color: '#e0e6f0', fontSize: 12 },
    formatter: (params) => {
      const d = props.data[params.dataIndex]
      if (!d) return ''
      return `<strong>${d.icon} ${d.name}</strong><br/>
        严重程度: ${d.severity}/5<br/>
        可能性: ${d.likelihood}/5<br/>
        等级: <span style="color:${d.levelColor}">${d.level}</span>`
    }
  },
  grid: {
    left: 60, right: 30, top: 30, bottom: 50
  },
  xAxis: {
    name: '可能性 →',
    nameLocation: 'center',
    nameGap: 30,
    nameTextStyle: { color: '#667799', fontSize: 12 },
    min: 0, max: 6,
    axisLine: { lineStyle: { color: '#2a3050' } },
    axisTick: { show: false },
    axisLabel: { color: '#667799', fontSize: 11 },
    splitLine: { lineStyle: { color: '#1a1f35', type: 'dashed' } }
  },
  yAxis: {
    name: '严重程度 →',
    nameLocation: 'center',
    nameGap: 40,
    nameTextStyle: { color: '#667799', fontSize: 12 },
    min: 0, max: 6,
    axisLine: { lineStyle: { color: '#2a3050' } },
    axisTick: { show: false },
    axisLabel: { color: '#667799', fontSize: 11 },
    splitLine: { lineStyle: { color: '#1a1f35', type: 'dashed' } }
  },
  series: [{
    type: 'scatter',
    symbolSize: (val, params) => {
      const d = props.data[params.dataIndex]
      return d ? 20 + d.severity * 4 : 20
    },
    data: props.data.map(d => ({
      value: [d.likelihood, d.severity],
      itemStyle: { color: d.levelColor, opacity: 0.85 },
      name: d.name
    })),
    emphasis: {
      itemStyle: { opacity: 1, shadowBlur: 15, shadowColor: 'rgba(0,212,255,0.5)' }
    },
    label: {
      show: true,
      formatter: (params) => props.data[params.dataIndex]?.icon || '',
      position: 'inside',
      fontSize: 16
    }
  }],
  // Background zones
  graphic: [
    // High-high zone (top-right)
    { type: 'rect', left: '65%', top: '5%', shape: { width: '30%', height: '30%' }, style: { fill: 'rgba(255,68,68,0.05)' } },
    // Low-low zone (bottom-left)
    { type: 'rect', left: '10%', top: '65%', shape: { width: '30%', height: '30%' }, style: { fill: 'rgba(0,255,136,0.05)' } },
  ]
})

onMounted(() => {
  chart = echarts.init(chartRef.value)
  chart.setOption(getOption())
  window.addEventListener('resize', () => chart?.resize())
})

onUnmounted(() => {
  chart?.dispose()
  window.removeEventListener('resize', () => chart?.resize())
})

watch(() => props.data, () => {
  chart?.setOption(getOption(), { notMerge: true })
}, { deep: true })
</script>
