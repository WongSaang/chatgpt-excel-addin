import { createApp } from 'vue'
import App from './App.vue'

window.Office.onReady(() => {
    createApp(App).mount('#app');
});