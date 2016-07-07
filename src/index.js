class StoreAccessor {
    constructor(key) {
        this.key = key;
    }

    get() {
        return this.$store[this.key];
    }

    set(value) {
        this.$store[this.key] = value;
    }
}

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    // Register a helper property to access the global store.
    Object.defineProperty(Vue.prototype, '$store', {
        get() {
            return this.$root.store;
        }
    });

    // Register a global mixin to manage the getters/setters for our store.
    Vue.mixin({
        init() {

            // Initialize the computed option if it hasn't already been initialized.
            if (typeof this.$options.computed === 'undefined') {
                this.$options.computed = {};
            }

            // Check for a "store" option.
            if (typeof this.$options.store !== 'undefined' && typeof this.$store !== 'undefined') {

                // Loop through the elements of the "store" option.
                this.$options.store.forEach(property => {
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