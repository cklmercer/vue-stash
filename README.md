# vue-stash

This plugin for [Vue.js](http://vuejs.org) provides a simple "global store" that can be used to share data across components.

## Installation

1. Install via NPM
```
$ npm install vue-stash
```

2. Install within project
```
import Vue from 'vue';
import VueStash from 'vue-stash';

Vue.use(VueStash)
```

3. Create a store object and set it on your root vue model.
```
new Vue({
    el: '#app',
    data: {
        store: {
            // pre-initialize reactive properties here
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

4. Add a 'store' property to your child components to access properties from your global store.
```
Vue.component('user-card', {
    template: '<p>{{ user.name }}</p>',
    store: ['user']
});
```

## License

[MIT](http://opensource.org/licenses/MIT)