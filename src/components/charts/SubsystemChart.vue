<template>
  <div ref="chartRef" :style="{ width: '100%', height: computedHeight + 'px' }"></div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: { type: Array, default: () => [] },
  height: { type: Number, default: 300 }
})

const chartRef = ref(null)
let chart = null
let isMobile = ref(false)

// Responsive: 2x3 grid on mobile, 1x6 on desktop
const computedHeight = computed(() => {
  return isMobile.value ? 420 : props.height
})

const getOption = () => {
  const count = props.data.length
  let centers = []
  
  if (isMobile.value) {
    // Mobile: 2 columns x 3 rows grid
    const cols = 2
    const rows = Math.ceil(count / cols)
    props.data.forEach((_, index) => {
      const col = index % cols
      const row = Math.floor(index / cols)
      centers.push([
        `${(col + 0.5) * 50}%`,  // 25% or 75%
        `${(row + 0.5) * (100 / rows)}%`  // distribute vertically
      ])
    })
  } else {
    // Desktop: single row
    props.data.forEach((_, index) => {
      centers.push([`${(index * 2 + 1) * 100 / (count * 2)}%`, '45%'])
    })
  }

  return {
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
      center: centers[index],
      radius: isMobile.value ? '55%' : '65%',
      startAngle: 220,
      endAngle: -40,
      min: 0,
      max: 100,
      splitNumber: 5,
      axisLine: {
        lineStyle: {
          width: isMobile.value ? 6 : 8,
          color: [[item.progress / 100, item.color], [1, '#2a3050']]
        }
      },
      pointer: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      title: {
        offsetCenter: [0, '70%'],
        fontSize: isMobile.value ? 10 : 11,
        color: '#667799'
      },
      detail: {
        valueAnimation: true,
        offsetCenter: [0, '40%'],
        fontSize: isMobile.value ? 14 : 18,
        fontWeight: 'bold',
        color: item.color,
        formatter: '{value}%'
      },
      data: [{ value: item.progress, name: item.icon + ' ' + item.name }]
    }))
  }
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
  if (chart) {
    chart.setOption(getOption(), { notMerge: true })
    chart.resize()
  }
}

onMounted(() => {
  checkMobile()
  chart = echarts.init(chartRef.value)
  chart.setOption(getOption())
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  chart?.dispose()
  window.removeEventListener('resize', checkMobile)
})

watch(() => props.data, () => {
  chart?.setOption(getOption(), { notMerge: true })
}, { deep: true })
</script>
