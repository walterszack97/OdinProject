class LinkedList {
    constructor(){
        this.head = null;
    }

    append(value) {
        const newNode = new Node(value);

        if (this.head === null){
            this.head = newNode;
            return;
        }

        let currentNode = this.head;

        while (currentNode.nextNode !== null){
            currentNode = currentNode.nextNode
        }
        
        currentNode.nextNode = newNode
    }

    prepend(value) {
        const newNode = new Node(value);

        let currentNode = newNode
        let nextNode = this.head

        this.head = currentNode
        currentNode.nextNode = nextNode
    }

    size() {
        let count = 1;
        let currentNode = this.head;

        if (this.head === null) return 0;

         while (currentNode.nextNode !== null){
            count++;
            currentNode = currentNode.nextNode;
        }

        return count
    }

    getHead() {
        return this.head === null ? undefined : this.head.value;
    }

    getTail() {

        if (this.head === null){
            return undefined
        }

        let currentNode = this.head;

        while (currentNode.nextNode !== null){
            currentNode = currentNode.nextNode
        }

        return currentNode.value
    }

    at(index) {

        if (index < 0) return undefined;

        let currentNode = this.head

        for (let i = 0; i < index; i++){
            if (currentNode === null) return undefined;

            currentNode = currentNode.nextNode;

        }

        return currentNode === null ? undefined : currentNode.value;
    }

    pop() {

        if (this.head === null) {
            return undefined
        }

        let poppedNode = this.head

        this.head = this.head.nextNode;
        
        return poppedNode.value
    }

    contains(value) {
        let currentNode = this.head

        while (currentNode !== null){
            if (currentNode.value === value){
                return true;
            }
            currentNode = currentNode.nextNode;
        }
        return false;
    }

    findIndex(value) {
        let currentNode = this.head
        let count = 0;

        while (currentNode !== null){
            if (currentNode.value === value){
                return count;
            }
            currentNode = currentNode.nextNode;
            count++;
        }
        return -1;
    }

    toString() {
        let currentNode = this.head;
        let newString = '';

        while (currentNode !== null) {
            newString += `( ${currentNode.value} ) -> `;
            currentNode = currentNode.nextNode;
        }

        if (newString === '') {
            return '';
        }

        newString += 'null';
        return newString;
    }

    insertAt(index, ...values) {
        if (index < 0 || index > this.size()) {
            throw new RangeError(`must be between 0 and ${this.size()}`);
        }

        if (values.length === 0) {
            return this.toString();
        }

        // inserting at the beginning
        if (index === 0) {
            let oldHead = this.head;

            for (let j = values.length - 1; j >= 0; j--) {
                let newNode = new Node(values[j]);
                newNode.nextNode = oldHead;
                oldHead = newNode;
            }

            this.head = oldHead;
            return this.toString();
        }

        // inserting anywhere after the head
        let currentNode = this.head;

        for (let i = 0; i < index - 1; i++) {
            currentNode = currentNode.nextNode;
        }

        let secondNode = currentNode.nextNode;

        for (let j = 0; j < values.length; j++) {
            let newNode = new Node(values[j]);

            currentNode.nextNode = newNode;
            newNode.nextNode = secondNode;

            currentNode = newNode;
        }

        return this.toString();
    }

    removeAt(index) {
        if (index < 0 || index >= this.size()) {
            throw new RangeError(`must be between 0 and ${this.size()}`);
        }

        if (index === 0){
            this.head = this.head.nextNode
            return this.toString()
        }

        let previousNode = this.head

        for (let i = 0; i < index - 1; i++){
            previousNode = previousNode.nextNode
        }
        
        previousNode.nextNode = previousNode.nextNode.nextNode;

        return this.toString();

    }

}

class Node {
    constructor(value = null, nextNode = null){
        this.value = value;
        this.nextNode = nextNode
    }
}

// example uses class syntax - adjust as necessary
const list = new LinkedList();

console.log(list.pop());
list.append("dog");
console.log(list.pop());
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
list.prepend("hi")


console.log(list.toString());
console.log(list.size());
console.log(list.getHead());
console.log(list.getTail());
console.log(list.at(7));
console.log(list.pop());
console.log(list.toString());
console.log(list.contains("hamster"));
console.log(list.findIndex("snake"));
console.log(list.insertAt(1, "poop", "doop"));
console.log(list.removeAt(6));