<template>
  <div class="glow-card p-4" :class="{ 'cursor-pointer': clickable }" @click="$emit('click')">
    <slot />
  </div>
</template>

<script setup>
defineProps({
  clickable: { type: Boolean, default: false }
})
defineEmits(['click'])
</script>
