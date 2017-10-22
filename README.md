# vue-stash

A [Vue.js](http://vuejs.org) plugin that makes it easy to share reactive data between components.

This plugin is best suited for the rapid development of prototypes. This plugin is not intended to be used for complex applications.
For complex applications I would recommend the official VueJS state management plugin, [Vuex](https://github.com/vuejs/vuex)

## Installation

##### 1.) Install package via NPM

```
$ npm install vue-stash
```

##### 2.) Install plugin within project.
```js
import Vue from 'vue';
import VueStash from 'vue-stash';

Vue.use(VueStash)
```

or

```js
window.Vue = require('vue');
require('vue-stash');
```

## Usage

##### 1.) Initialize your store object.
Your store object is nothing more than a simple Javascript object set within your root vue model's `$data` option; Think of it as your "shared data option". Make sure you pre-initialize any properties that you want to be reactive, just like always.

```js
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
```js
import store from './store';

new Vue({
    el: '#app',
    data: { store }
})
```

_store.js_
```js
export default {
    user: {
        name: 'cody'
    }
}
```

##### 2.) Add a "store" option to any child components that need to access data from the store.

*Example 1: Simplest usage*
```js
Vue.component('user-card', {
    store: ['user'],
    // Use `ready` for Vue 1.x
    mounted() {
        console.log(this.user.name); // 'cody'
        this.user.name = 'john doe';
        console.log(this.user.name); // 'john doe'
    }
});
```

*Example 2: Object store*

```js
Vue.component('user-card', {
    store: {
        user: 'user'
    },
    // Use `ready` for Vue 1.x
    mounted() {
        console.log(this.user.name); // 'cody'
        this.user.name = 'john doe';
        console.log(this.user.name); // 'john doe'
    }
});
```

*Example 3: Access nested store property*

```js
Vue.component('user-card', {
    store: {
        name: 'user.name'
    },
    // Use `ready` for Vue 1.x
    mounted() {
        console.log(this.name); // 'cody'
        this.name = 'john doe';
        console.log(this.name); // 'john doe'
    }
});
```

*Example 4: Dynamic store access*

```js
Vue.component('user-card', {
    store: {
        name() {
            return 'user.name';
        }
    },
    // Use `ready` for Vue 1.x
    mounted() {
        console.log(this.name); // 'cody'
        this.name = 'john doe';
        console.log(this.name); // 'john doe'
    }
});
```

*Note: The end result of examples 1-4 are equivalent.*

##### 3.) Access the store directly.
This plugin sets `Vue.prototype.$store` which allows any component to access the store via `vm.$store`.
```js
Vue.component('user-card', {
    // Use `ready` for Vue 1.x
    mounted() {
        console.log(this.$store.user.name); // 'cody';
        this.$store.user.name = 'john doe';
        console.log(this.$store.user.name); // 'john doe';
    }
});
```

## Demo
If you'd like to demo `vue-stash` try [vue-mix](https://github.com/cklmercer/vue-mix)

## License

[MIT](http://opensource.org/licenses/MIT)
