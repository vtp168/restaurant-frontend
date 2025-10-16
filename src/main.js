import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import { createPinia } from 'pinia';
import axios from 'axios';
// import CKEditor from '@ckeditor/ckeditor5-vue'
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
// Initialize auth state after Pinia and router are available
import { useAuthStore } from './stores/auth';

// material icons
import materialSymbolsPlugin from '@dbetka/vue-material-symbols';
import 'material-symbols/index.css'; // Import the Material Symbols CSS

const app= createApp(App);
// app.use(CKEditor)
const pinia = createPinia();
app.use(axios);
app.use(pinia);
app.use(router);
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
    toastClassName: "custom-toast" // use customize

});


const authStore = useAuthStore();
authStore.initializeAuth();

app.use(materialSymbolsPlugin, {
     // Optional: Configure default options for all icons
     // defaultType: 'outlined',
     // defaultWeight: '300',
     // defaultGrade: 'medium',
     // defaultSize: 24,
     // defaultFilled: false,
   });

app.mount('#app');
