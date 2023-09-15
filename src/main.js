import './assets/main.css';
import { createApp } from 'vue';
import {createPinia} from 'pinia';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');

let swLocation = './services/sw.js';

if(navigator.serviceWorker){
    navigator.serviceWorker.register(swLocation);
}