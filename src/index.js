import Vue from 'vue'
import App from './app.vue'
import './assets/styles/global.scss'

const root = document.createElement('div');
document.body.appendChild(root);
new Vue({
    //通过render函数挂载到app
    render: (h) => h(App)
}).$mount(root)