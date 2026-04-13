import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/global.css'

// GitHub Pages SPA routing fix
// When GitHub Pages redirects 404 to index.html, the original path is in ?p=
const redirect = new URLSearchParams(window.location.search).get('p')
if (redirect) {
  const base = import.meta.env.BASE_URL
  // Build the correct URL with base path
  const correctUrl = base + redirect.replace(/^\//, '')
  window.history.replaceState(null, '', correctUrl)
}

const app = createApp(App)
app.use(router)
app.mount('#app')
