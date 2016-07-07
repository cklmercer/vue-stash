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
            if (typeof this.$options.store !== 'undefined' && typeof this.$root.store !== 'undefined' && this.$root.store.length) {

                // Initialize the computed option if it hasn't already been initialized.
                if (typeof this.$options.computed === 'undefined') {
                    this.$options.computed = {};
                }

                // Loop through the elements of the "store" option.
                this.$options.store.forEach(property => {
                    // Create a computed property using our StoreAccessor helper class.
                    this.$options.computed[property] = new StoreAccessor(property);
                });
            }
        }
    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

export default plugin;