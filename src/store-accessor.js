class StoreAccessor {
    constructor(key) {
        this.key = key;
    }

    get() {
        return this.$root.store[this.key];
    }

    set(value) {
        this.$root.store[this.key] = value;
    }
}

export default StoreAccessor;