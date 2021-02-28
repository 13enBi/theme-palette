import { createApp } from 'vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import 'element-plus/lib/theme-chalk/index.css';

const app = createApp(App);
//ignore warn
app.config.warnHandler = () => null;
app.config.performance = true;
app.mount('#app');
