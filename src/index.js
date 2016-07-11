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
         * The 'init' life-cycle hook.
         * 
         * @return {void}
         */
        init() {
            // Perform a series of checks:
            // 1.) Check for a store "option" on the component.
            // 2.) Check for a store "object" on the root vue model.
            // 3.) Check to ensure the store "option" is not empty.
            if (typeof this.$options.store !== 'undefined' && typeof this.$root.store !== 'undefined') {

                // Initialize the computed option if it hasn't already been initialized.
                if (typeof this.$options.computed === 'undefined') {
                    this.$options.computed = {};
                }

                // Check if the store option is a non-empty array.
                if (Array.isArray(this.$options.store)) {

                    // Loop through the elements of the "store" option.
                    this.$options.store.forEach(property => {

                        // Create a computed property using our StoreAccessor helper class.
                        this.$options.computed[property] = new StoreAccessor(property);
                    });
                } else {

                    // Loop through the store options.
                    for (var key in this.$options.store) {

                        if (typeof this.$options.store[key] == 'function') {

                            // Handle a function
                            this.$options.computed[key] = new StoreAccessor(this.$options.store[key]());

                        } else if (typeof this.$options.store[key] == 'string') {

                            // Handle a string
                            this.$options.computed[key] = new StoreAccessor(this.$options.store[key]);
                        }
                    }
                }
            }
        }
    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;