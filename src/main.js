import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/global.css'

const app = createApp(App)
app.use(router)

// GitHub Pages SPA routing fix
// Must run AFTER router is installed but BEFORE mount
const redirect = new URLSearchParams(window.location.search).get('p')
if (redirect) {
  const base = import.meta.env.BASE_URL
  const correctUrl = base + redirect.replace(/^\//, '')
  window.history.replaceState(null, '', correctUrl)
}

app.mount('#app')
