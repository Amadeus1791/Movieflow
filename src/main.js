import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Platzhalter fuer einen Monitoring-Dienst: vorerst nur in die Konsole
function sendToMonitoring(error, info) {
  console.error('[MovieFlow]', error, info)
}

const app = createApp(App)

app.config.errorHandler = (error, instance, info) => {
  sendToMonitoring(error, info)
}

app.use(createPinia())
app.use(router)
app.mount('#app')
