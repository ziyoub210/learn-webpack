
import Vue from 'vue'
import App from './App'
import a from './a'

class AClass {

  constructor(name) {
    this.name = name
  }
}
const test= new AClass('chenyanquan');
console.log(test.name)

new Vue({
  render: h => h(App)
}).$mount('#app')
console.log('main.js')

