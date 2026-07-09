class LinkedList {
    constructor() {
        this.head = null;
    }

    append(value) {
        if (!this.head){
            this.head = value;
            return;
        }

        let currentNode = this.head;

        while (currentNode.nextNode !== null){
            currentNode = currentNode.nextNode;
        }
        currentNode.nextNode = value;
    }

    remove(key) {
        let currentNode = this.head
        let temp = null;

        while (currentNode !== null){
            if (currentNode.key === key){

                if (temp === null){
                    this.head = currentNode.nextNode;
                } else {
                    temp.nextNode = currentNode.nextNode;
                }

                return true;
            }

            temp = currentNode;
            currentNode = currentNode.nextNode;
        }

        return false;
    }

    size(){
        let count = 0;
        let currentNode = this.head;

        while (currentNode !== null){
            count += 1;
            currentNode = currentNode.nextNode;
        }

        return count;
    }

    getKeys(){
        const keysArr = [];
        let currentNode = this.head;

        while(currentNode !== null){
            keysArr.push(currentNode.key);
            currentNode = currentNode.nextNode;
        }

        return keysArr;
    }

    getValues(){
        const valuesArr = [];
        let currentNode = this.head;

        while(currentNode !== null){
            valuesArr.push(currentNode.value);
            currentNode = currentNode.nextNode;
        }

        return valuesArr;
    }

    getEntries(){
        const entriesArr = [];
        let currentNode = this.head;

        while(currentNode !== null){
            entriesArr.push([currentNode.key, currentNode.value]);
            currentNode = currentNode.nextNode;
        }

        return entriesArr;
    }
}

class Node {
    constructor(key = null, value = null, nextNode = null){
        this.key = key;
        this.value = value;
        this.nextNode = nextNode
    }
}

class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.buckets = new Array(this.capacity);
        this.resizeThreshold = this.capacity * this.loadFactor;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    } 

    set(key, value) {
        const index = this.hash(key);

        if (!this.buckets[index]) {
            this.buckets[index] = new LinkedList();
        }

        const bucket = this.buckets[index];

        let currentNode = bucket.head;

        while (currentNode !== null) {
            if (currentNode.key === key) {
                currentNode.value = value;
                return;
            }

            currentNode = currentNode.nextNode;
        }

        if (this.length() + 1 > this.resizeThreshold) {
            const originalPairs = this.entries();

            this.capacity *= 2;
            this.resizeThreshold = this.capacity * this.loadFactor;
            this.clear();

            for (let pair of originalPairs) {
                this.set(pair[0], pair[1]);
            }

            this.set(key, value);
            return;
        }

        bucket.append(new Node(key, value));
    }

    get(key) {
        const index = this.hash(key);

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (this.buckets[index]){
            let currentNode = this.buckets[index].head

            while (currentNode !== null){
                if (currentNode.key === key){
                    return currentNode.value;
                }
                currentNode = currentNode.nextNode;
            }

            return null;
        }

        return null;
    }

    has(key) {
        return this.get(key) !== null;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (!bucket) return false;

        return bucket.remove(key);
    }

    length(){
        let count = 0;

        for (let bucket of this.buckets) {
            if (bucket) {
                count += bucket.size();
            }
        }

        return count;
    }

    clear() {
        this.buckets = new Array(this.capacity);
        return 'Cleared buckets'
    }

    keys() {
        const keysArr = [];

        for (let bucket of this.buckets){
            if(bucket) {
                keysArr.push(...bucket.getKeys())
            }
        }

        return keysArr;
    }

    values() {
        const valuesArr = [];

        for (let bucket of this.buckets){
            if(bucket) {
                valuesArr.push(...bucket.getValues())
            }
        }

        return valuesArr;
    }

    entries() {
        const entriesArr = [];

        for (let bucket of this.buckets){
            if(bucket) {
                entriesArr.push(...bucket.getEntries())
            }
        }

        return entriesArr;
    }
}

export { HashMap };
