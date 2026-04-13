<template>
  <div ref="chartRef" :style="{ width: '100%', height: height + 'px' }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: { type: Array, default: () => [] },
  height: { type: Number, default: 350 }
})

const chartRef = ref(null)
let chart = null

const colors = ['#00d4ff', '#ff6b35', '#a855f7', '#00ff88', '#ffaa00', '#ec4899']

const getOption = () => ({
  tooltip: {
    backgroundColor: '#1a1f35',
    borderColor: '#2a3050',
    textStyle: { color: '#e0e6f0' },
    formatter: (params) => `${params.name}<br/>${params.value} ${props.data[params.dataIndex]?.unit || ''}<br/>占比: ${params.percent}%`
  },
  legend: {
    orient: 'vertical',
    right: 20,
    top: 'center',
    textStyle: { color: '#667799', fontSize: 11 },
    itemWidth: 12,
    itemHeight: 12,
  },
  series: [{
    type: 'pie',
    radius: ['40%', '70%'],
    center: ['35%', '50%'],
    avoidLabelOverlap: true,
    itemStyle: { borderRadius: 6, borderColor: '#0a0e1a', borderWidth: 2 },
    label: { show: false },
    emphasis: {
      label: { show: true, fontSize: 14, fontWeight: 'bold', color: '#e0e6f0' },
      itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' }
    },
    data: props.data.map((item, i) => ({
      name: item.category || item.name,
      value: item.amount || item.budget,
      itemStyle: { color: colors[i % colors.length] }
    }))
  }]
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
