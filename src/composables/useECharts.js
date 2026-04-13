import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

export function useECharts(options) {
  const chartRef = ref(null)
  let chartInstance = null

  const initChart = () => {
    if (chartRef.value) {
      chartInstance = echarts.init(chartRef.value, null, { renderer: 'canvas' })
      if (options.value) {
        chartInstance.setOption(options.value)
      }
    }
  }

  const updateChart = (newOptions) => {
    if (chartInstance && newOptions) {
      chartInstance.setOption(newOptions, { notMerge: true })
    }
  }

  const resizeChart = () => {
    if (chartInstance) {
      chartInstance.resize()
    }
  }

  watch(options, (newVal) => {
    updateChart(newVal)
  }, { deep: true })

  onMounted(() => {
    initChart()
    window.addEventListener('resize', resizeChart)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', resizeChart)
    if (chartInstance) {
      chartInstance.dispose()
      chartInstance = null
    }
  })

  return {
    chartRef,
    chartInstance,
    initChart,
    updateChart,
    resizeChart,
  }
}
