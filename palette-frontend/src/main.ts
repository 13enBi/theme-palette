import { createApp } from 'vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);

//ignore warn
app.config.warnHandler = () => null;

app.mount('#app');
