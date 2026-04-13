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
    trigger: 'item',
    backgroundColor: '#1a1f35',
    borderColor: '#2a3050',
    textStyle: { color: '#e0e6f0' },
  },
  legend: {
    bottom: 0,
    textStyle: { color: '#667799', fontSize: 11 },
    itemWidth: 12,
    itemHeight: 12,
  },
  series: props.data.map((item, index) => ({
    name: item.name,
    type: 'gauge',
    center: [`${(index * 2 + 1) * 100 / (props.data.length * 2)}%`, '45%'],
    radius: '65%',
    startAngle: 220,
    endAngle: -40,
    min: 0,
    max: 100,
    splitNumber: 5,
    axisLine: {
      lineStyle: {
        width: 8,
        color: [[item.progress / 100, item.color], [1, '#2a3050']]
      }
    },
    pointer: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: { show: false },
    title: {
      offsetCenter: [0, '70%'],
      fontSize: 11,
      color: '#667799'
    },
    detail: {
      valueAnimation: true,
      offsetCenter: [0, '40%'],
      fontSize: 18,
      fontWeight: 'bold',
      color: item.color,
      formatter: '{value}%'
    },
    data: [{ value: item.progress, name: item.icon + ' ' + item.name }]
  }))
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
