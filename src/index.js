import Vue from 'vue';
import VeeValidate from 'vee-validate';

import { store } from './_store';
import { router } from './_helpers';
import alertBox from './component/Alert';
import App from './app/App';
Vue.use(VeeValidate);

Vue.component('alert-box', alertBox, {name:'alert-box'});
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});