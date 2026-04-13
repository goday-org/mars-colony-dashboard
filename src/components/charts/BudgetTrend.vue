<template>
  <div ref="chartRef" :style="{ width: '100%', height: height + 'px' }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: { type: Array, default: () => [] },
  height: { type: Number, default: 300 }
})

const chartRef = ref(null)
let chart = null

const getOption = () => ({
  tooltip: {
    backgroundColor: '#1a1f35',
    borderColor: '#2a3050',
    textStyle: { color: '#e0e6f0' },
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  grid: { left: 60, right: 20, top: 20, bottom: 40 },
  xAxis: {
    type: 'category',
    data: props.data.map(d => d.name),
    axisLine: { lineStyle: { color: '#2a3050' } },
    axisTick: { show: false },
    axisLabel: { color: '#667799', fontSize: 10, rotate: 20 }
  },
  yAxis: {
    type: 'value',
    name: '亿美元',
    nameTextStyle: { color: '#667799', fontSize: 11 },
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: { color: '#667799', fontSize: 11 },
    splitLine: { lineStyle: { color: '#1a1f35', type: 'dashed' } }
  },
  series: [{
    type: 'bar',
    data: props.data.map((d, i) => ({
      value: d.cost,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#00d4ff' },
          { offset: 1, color: '#0066aa' }
        ]),
        borderRadius: [4, 4, 0, 0]
      }
    })),
    barWidth: '50%',
    label: {
      show: true,
      position: 'top',
      color: '#e0e6f0',
      fontSize: 10,
      formatter: (params) => params.value + (props.data[params.dataIndex]?.currency === '亿欧元' ? '€' : '$')
    }
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
