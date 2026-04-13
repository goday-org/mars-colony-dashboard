import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/global.css'

// GitHub Pages SPA routing fix
// When GitHub Pages redirects 404 to index.html, the original path is in ?p=
const redirect = new URLSearchParams(window.location.search).get('p')
if (redirect) {
  const correctPath = redirect.startsWith('/') ? redirect : '/' + redirect
  window.history.replaceState(null, '', correctPath)
}

const app = createApp(App)
app.use(router)
app.mount('#app')
