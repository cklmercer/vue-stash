# vue-stash

A [Vue.js](http://vuejs.org) plugin that adds a global store, so that you may easily share data between components.

## Installation

##### 1) Install package via NPM
```
$ npm install vue-stash
```

##### 2) Install within project
```
import Vue from 'vue';
import VueStash from 'vue-stash';

Vue.use(VueStash)
```

or

```
import Vue from 'vue';
window.Vue = Vue;
require('vue-stash');
```

##### 3) Initialize your store object.
A store object is nothing more than a simple Javascript object.
Make sure you pre-initialize any data you want to be reactive.

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

Alternatively, you can import your store from another file.
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

##### 4) By adding a 'store' option to our child components we can access reactive data from the store.
```
Vue.component('user-card', {
    template: '<p>{{ user.name }}</p>',
    store: ['user']
});
```

## License

[MIT](http://opensource.org/licenses/MIT)