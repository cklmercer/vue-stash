import StoreAccessor from './store-accessor';

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    // Register a helper prototype property for store access.
    Object.defineProperty(Vue.prototype, '$store', {
        get() {
            return this.$root.store;
        }
    });

    // Register a global mixin to manage the getters/setters for our store.
    Vue.mixin({

        /**
         * The 'beforeCreate' life-cycle hook for Vue 2.0
         * 
         * @return {void}
         */
        beforeCreate() {
            registerStore(this)
        },

        /**
         * The 'init' life-cycle hook for Vue 1.0
         *
         * @return {void}
         */
        init() {
            registerStore(this)
        },
    });
}

function registerStore(vm) {
    // 1.) Check for a store "option" on the component.
    // 2.) Check for a store "object" on the root vue model.
    if (typeof vm.$options.store !== 'undefined' && typeof vm.$root.store !== 'undefined') {

        // Initialize the computed option if it hasn't already been initialized.
        if (typeof vm.$options.computed === 'undefined') {
            vm.$options.computed = {};
        }

        // Check if the store option is a non-empty array.
        if (Array.isArray(vm.$options.store)) {
            // Loop through the elements of the "store" option.
            vm.$options.store.forEach(property => {
                // Create a computed property using our StoreAccessor helper class.
                vm.$options.computed[property] = new StoreAccessor(property);
            });
        } else {
            // Loop through the store options.
            for (var key in vm.$options.store) {
                if (typeof vm.$options.store[key] == 'function') {
                    // Handle a function
                    vm.$options.computed[key] = new StoreAccessor(vm.$options.store[key]());
                } else if (typeof vm.$options.store[key] == 'string') {
                    // Handle a string
                    vm.$options.computed[key] = new StoreAccessor(vm.$options.store[key]);
                }
            }
        }
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;
