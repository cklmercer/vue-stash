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
Your store object is nothing more than a simple Javascript object set within your root vue model's `$data` option; Think of it as your "shared data option". Make sure you pre-initialize any properties that you want to be reactive, just like always.

```
new Vue({
    el: '#app',
    data: {
        store: {
            user: {
                name: 'cody'
            }
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
    user: {
        name: 'cody'
    }
}
```

##### 2.) Add a "store" option to any child components that need to access data from the store.

*Example 1: Simplest usage*
```
Vue.component('user-card', {
    store: ['user'],
    ready() {
        console.log(this.user.name); // logs: 'cody'
        this.user.name = 'john doe'; // updates this.$root.store.user.name to 'john doe'.
        console.log(this.user.name); // logs: 'john doe'
    }
});
```

*Example 2: Object store*

```
Vue.component('user-card', {
    store: {
        user: 'user'
    },
    ready() {
        console.log(this.user.name); // logs: 'cody'
        this.user.name = 'john doe'; // updates this.$root.store.user.name to 'john doe'.
        console.log(this.user.name); // logs: 'john doe'
    }
});
```

*Example 3: Access nested store property*

```
Vue.component('user-card', {
    store: {
        name: 'user.name'
    },
    ready() {
        console.log(this.name); // logs: 'cody'
        this.name = 'john doe'; // updates this.$root.store.user.name to 'john doe'.
        console.log(this.name); // logs: 'john doe'
    }
});
```

*Example 4: Dynamic store access*

```
Vue.component('user-card', {
    store: {
        name() {
            return 'user.name';
        }
    },
    ready() {
        console.log(this.name); // logs: 'cody'
        this.name = 'john doe'; // updates this.$root.store.user.name to john doe.
        console.log(this.name); // logs: 'john doe'
    }
});
```

*Note: The end result of examples 1-4 are equivalent.*

##### 3.) Access the store directly.
This plugin sets `Vue.prototype.$store` which allows any component to access the store via `vm.$store`.
```
Vue.component('user-card', {
    ready() {
        console.log(this.$store.user.name); // logs: 'cody';
        this.$store.user.name = 'john doe'; // updates this.$root.store.user.name to 'john doe';
        console.log(this.$store.user.name); // logs: 'john doe';
    }
});
```

## Demo
If you'd like to demo `vue-stash` try [vue-stack-2.0](https://github.com/cklmercer/vue-stack-2.0)

## License

[MIT](http://opensource.org/licenses/MIT)
