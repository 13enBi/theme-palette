import { createApp } from 'vue';
import App from './App.vue';
import mixin from './mixin';
import store from './store';

const app = createApp(App);

mixin(app).use(store);

app.mount('#app');
