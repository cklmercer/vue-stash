export default function(key) {
    return {
        get() {
            return key.split('.').reduce((pValue, cValue) => {
                return pValue[cValue];
            }, this.$root.store)
        },

        set(value) {
            var path = key.split('.');
            var length = path.length - 1;
            var store = this.$root.store;

            for (var i = 0; i < length; i++) {
                if (store.hasOwnProperty(path[i])) {
                    store = store[path[i]];
                }
            }

            store[path[i]] = value;
        }
    }
}