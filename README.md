# vue-stash

A [Vue.js](http://vuejs.org) plugin that makes it easy to share reactive data between components.

## Installation

##### 1.) Install package via NPM

```
$ npm install vue-stash
```

##### 2.) Install plugin within project.
```
import Vue from 'vue';
import VueStash from 'vue-stash';

Vue.use(VueStash)
```

or

```
window.Vue = require('vue');
require('vue-stash');
```

## Usage

##### 1.) Initialize your store object.
Your store object is nothing more than a simple Javascript object set on your root vue model.
Make sure you pre-initialize any data you want to be reactive, just like always.

```
new Vue({
    el: '#app',
    data: {
        store: {
            user: null
        }
    }
})
```

_Alternatively, you can import your store from another file._
```
import store from './store';

new Vue({
    el: '#app',
    data: { store }
})
```

_store.js_
```
export default {
    user: null
}
```

##### 2.) Add a "store" option to any child components that need to access data from the store.
The store option is an array of keys/strings that match the names of properties in your store.
```
Vue.component('user-card', {
    template: '<p>{{ user.name }}</p>',
    store: ['user']
});
```

##### 3.) Access the store without setting a key in the store option.
This plugin adds a new prototype property to Vue which allows any component to access the store via `vm.$store`.
```
Vue.component('user-card', {
    ready() {
        console.log(this.$store.user.name)
    }
});
```

## License

[MIT](http://opensource.org/licenses/MIT)
