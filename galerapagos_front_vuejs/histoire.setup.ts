import { createPinia } from 'pinia';
import { defineSetupVue3 } from '@histoire/plugin-vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

export const setupVue3 = defineSetupVue3(({ app, story, variant }) => {
  // Vue plugin
  //app.use(createPinia());
  app.use(ElementPlus);

  // Global component
  //app.component('GlobalComponent', MyGlobalComponent)

  // Global property
  //app.config.globalProperties.$t = key => translate(key)

  // Provide
  app.provide('key', 'meow');
});
