import { App, Plugin } from "vue";

const mixins: Plugin[] = [];

export const register = (...plugins: Plugin[]) => mixins.push(...plugins.filter((plugin) => "install" in plugin));

export default (app: App) => mixins.reduce((app, plugin) => app.use(plugin), app);
