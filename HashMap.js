export class HashMap {
    constructor() {
        /**
         * @type {number}
         * @private
         */
        this.LOAD_FACTOR = 0.75;
        /**
         * @type {number} current maxSize of bucket
         * @private
         */
        this.maxSize = 16;
        /**
         * @type {number} current size of bucket
         * @private
         */
        this.size = 0;
        /**
         * @type {{key:string,value:any}[][]} it's a list of arrays that is hash indexed, same indexes are stores in another array
         * @private
         */
        this.buckets = Array.from({ length: this.maxSize }).map(() => []);
    }

    /**
     * internal hash function
     * @param {string} key hey to hash
     * @returns {number} a index that can be used in the bucket
     * @private
     */
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.maxSize;
        }
        return hashCode;
    }
    /**
     * Double the size of the bucket
     * @private
     */
    doubleBucketSize() {
        const oldValues = this.entries();
        this.maxSize *= 2;
        this.buckets = Array.from({ length: this.maxSize }).map(() => []);
        this.size = 0;
        for (const [key, value] of oldValues) {
            this.set(key, value);
        }
    }

    /**
     *set a value to a corresponding key
     * @param {string} key key of the hashMap
     * @param {any} value value of the hashmap
     */
    set(key, value) {
        if (this.size / this.maxSize > this.LOAD_FACTOR) {
            this.doubleBucketSize();
        }

        const hashKey = this.hash(key);
        const values = this.buckets[hashKey];

        const keyIndex = values.findIndex((val) => val.key === key);
        if (keyIndex !== -1) {
            values[keyIndex].value = value;
        } else {
            this.size += 1;
            values.push({ key, value });
        }
    }

    /**
     * takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null.
     * @param {string} key key argument
     * @returns {null | any} the value of corresponding to the key
     */
    get(key) {
        const hashKey = this.hash(key);
        const values = this.buckets[hashKey];
        const keyIndex = values.findIndex((val) => val.key === key);
        if (keyIndex !== -1) {
            return values[keyIndex].value;
        } else {
            return null;
        }
    }
    /**
     * takes a key as an argument and returns true or false based on whether or not the key is in the hash map.
     * @param {string} key key argument
     * @returns {boolean} true if have key
     */
    has(key) {
        const hashKey = this.hash(key);
        const values = this.buckets[hashKey];
        const keyIndex = values.findIndex((val) => val.key === key);
        if (keyIndex !== -1) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * Remove the entry with that key and return true otherwise false
     * @param {string} key key argument
     * @returns {boolean} true if have key
     */
    remove(key) {
        const hashKey = this.hash(key);
        const values = this.buckets[hashKey];
        const keyIndex = values.findIndex((val) => val.key === key);
        if (keyIndex !== -1) {
            values.splice(keyIndex, 1);
            this.size -= 1;
            return true;
        } else {
            return false;
        }
    }
    /**
     * length
     * @returns {number} the number of stored keys in the hash map
     */
    length() {
        return this.size;
    }
    /**
     * removes all entries in the hash map.
     */
    clear() {
        this.maxSize = 16;
        this.size = 0;
        this.buckets = Array.from({ length: this.maxSize }).map(() => []);
    }
    /**
     * returns an array containing all the keys inside the hash map.
     * @returns {string[]} a array of keys
     */
    keys() {
        let res = [];
        for (const bucket of this.buckets) {
            for (const key of bucket) {
                res.push(key.key);
            }
        }
        return res;
    }
    /**
     * returns an array containing all the values.
     * @returns {any[]} a array of values
     */
    values() {
        let res = [];
        for (const bucket of this.buckets) {
            for (const key of bucket) {
                res.push(key.value);
            }
        }
        return res;
    }
    /**
     * returns an array that contains each key, value pair.
     * @returns {[string,any][]} Example: [[firstKey, firstValue], [secondKey, secondValue]]
     */
    entries() {
        /** @type {[string,any][]} */
        let res = [];
        for (const bucket of this.buckets) {
            for (const { key, value } of bucket) {
                res.push([key, value]);
            }
        }
        return res;
    }
}
