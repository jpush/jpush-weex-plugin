import Vue from 'vue';

import weex from 'weex-vue-render';

// import JpushWeexPlugin from '../src/index';
// import JPush from './index.js';

// weex.init(Vue);

// weex.install(JpushWeexPlugin)
// weex.install(JPush);
const App = require('./index.vue');
App.el = '#root';
new Vue(App);