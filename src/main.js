import Vue from 'vue'
import App from './App.vue'
import {Card, Form, FormItem,
  Input, Select, Option, Button,
  Row, Col, Progress,
Message} from 'element-ui';

Vue.config.productionTip = false
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Progress);
Vue.prototype.$message = Message;

new Vue({
  render: h => h(App),
}).$mount('#app')