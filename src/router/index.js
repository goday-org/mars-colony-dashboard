import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'overview', component: () => import('../views/OverviewView.vue'), meta: { title: '总览' } },
  { path: '/subsystems', name: 'subsystems', component: () => import('../views/SubsystemView.vue'), meta: { title: '子系统进度' } },
  { path: '/milestones', name: 'milestones', component: () => import('../views/MilestoneView.vue'), meta: { title: '里程碑追踪' } },
  { path: '/risks', name: 'risks', component: () => import('../views/RiskView.vue'), meta: { title: '风险评估' } },
  { path: '/budget', name: 'budget', component: () => import('../views/BudgetView.vue'), meta: { title: '预算与资源' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
