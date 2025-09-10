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

app.mount('#app');
