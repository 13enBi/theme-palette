import { createApp, reactive, ref } from 'vue';
import App from './App.vue';
import mixin from './mixin';
import store from './store';

const app = createApp(App);

//ignore warn
app.config.warnHandler = () => null;

mixin(app).use(store);

app.mount('#app');

