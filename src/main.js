import { createApp } from 'vue'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'

const vuetify = createVuetify({
    components
})

window.Office.onReady(() => {
    createApp(App).use(vuetify).mount('#app');
});