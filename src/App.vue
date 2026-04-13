<template>
  <div class="min-h-screen bg-[#0a0e1a]">
    <TopNav />
    <TabBar />
    <main class="max-w-7xl mx-auto px-4 py-6">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import TopNav from './components/layout/TopNav.vue'
import TabBar from './components/layout/TabBar.vue'
</script>
