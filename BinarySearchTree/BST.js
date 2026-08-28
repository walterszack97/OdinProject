class Node {
    constructor(data = null, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(inputArr) {
        this.inputArr = inputArr;
        const orderedSortedArr = [...new Set([...inputArr].sort((a, b) => a - b))];
        this.root = this.buildTree(orderedSortedArr);
    }

    buildTree(Arr){
        if (Arr.length === 0) {
            return;
        }

        let mid = Math.floor(Arr.length / 2);

        const newNode = new Node(Arr[mid]);

        newNode.left = this.buildTree(Arr.slice(0, mid));
        newNode.right = this.buildTree(Arr.slice(mid + 1));

        return newNode;
    }

    includes(value) {
        let currentNode = this.root;

        if (!this.root){
            return false;
        }

        while (currentNode) {
            if (value === currentNode.data) {
                return true;
            }

            if (value < currentNode.data){
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

        return false;
    }

    insert(value) {
        let currentNode = this.root;
        let parentNode = null;

        if (!this.root) {
            this.root = new Node(value);
            //this.prettyPrint(this.root)
            return;
        }

        while (currentNode) {
            if (value === currentNode.data){
                return;
            }

            parentNode = currentNode;

            if (value < currentNode.data){
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

        const newNode = new Node(value);

        if (value < parentNode.data) {
            parentNode.left = newNode;
        } else {
            parentNode.right = newNode;
        }
        
        //this.prettyPrint(this.root)
    }

    deleteItem(value) {
        let currentNode = this.root;
        let previousNode = null;

        if (!this.root){
            return;
        }

        //find node to delete
        while (currentNode && currentNode.data !== value){
            previousNode = currentNode;
            if (value < currentNode.data){
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

        //if value not found
        if (!currentNode){
            return;
        }

        //two children
        if (currentNode.left && currentNode.right){
            let successor = currentNode.right;
            let successorParent = currentNode;

            //find inorder successor
            while(successor.left){
                successorParent = successor;
                successor = successor.left;
            }

            //replace node to delete with inorder successor value
            currentNode.data = successor.data;

            //cut the successor from the branch
            if (successor === successorParent.left){
                successorParent.left = successor.right
            } else {
                currentNode.right = successor.right
            }

            return;
        }

        //one or zero children
        let existingChild = currentNode.left || currentNode.right;

        if (!previousNode){
            this.root = existingChild;
        } else if (previousNode.left === currentNode){
            previousNode.left = existingChild
        } else {
            previousNode.right = existingChild
        }
    }

    levelOrderForEach(callback){
        let currentNode = this.root;
        let queue = [];

        if (typeof callback !== "function") {
            throw new Error("Callback function is required!");
        }

        if (!this.root) {
            return;
        }

        queue.push(currentNode);

        while (queue.length > 0){
            let queuedNode = queue.shift();
            if (queuedNode.left) {queue.push(queuedNode.left)};
            if (queuedNode.right) {queue.push(queuedNode.right)};
            callback(queuedNode.data)
        } 
    }

    inOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback function is required!");
        }

        if (!this.root) {
            return;
        }

        function traverse(inputNode) {
            if (!inputNode) {
                return;
            }

            traverse(inputNode.left);
            callback(inputNode.data);
            traverse(inputNode.right);
        }

        traverse(this.root);
    }

    preOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback function is required!");
        }

        if (!this.root) {
            return;
        }

        function traverse(inputNode) {
            if (!inputNode) {
                return;
            }

            callback(inputNode.data);
            traverse(inputNode.left);
            traverse(inputNode.right);
        }

        traverse(this.root);
    }

    postOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Callback function is required!");
        }

        if (!this.root) {
            return;
        }

        function traverse(inputNode) {
            if (!inputNode) {
                return;
            }

            traverse(inputNode.left);
            traverse(inputNode.right);
            callback(inputNode.data);
            
        }

        traverse(this.root);
    }

    height(value) {
        if (!this.root) {
            return undefined;
        }

        let currentNode = this.root;

        while (currentNode && value !== currentNode.data) {
            if (value < currentNode.data) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

        if (!currentNode) {
            return undefined;
        }

        function getHeight(inputNode) {
            if (!inputNode) {
                return -1;
            }

            let leftVal = getHeight(inputNode.left);
            let rightVal = getHeight(inputNode.right);

            return Math.max(leftVal, rightVal) + 1;
        }

        return getHeight(currentNode);
    }

    depth(value) {
        if (!this.root) {
            return undefined;
        }

        let count = 0;
        let currentNode = this.root;

        while (currentNode && value !== currentNode.data) {
            if (value < currentNode.data) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
            count++;
        }

        if (!currentNode){
            return undefined;
        }

        return count;
    }

    isBalanced(){
        if (!this.root){
            return true;
        }

        function checkBalance(inputNode) {
            if (!inputNode){
                return 0;
            }

            let leftVal = 0;
            let rightVal = 0;

            leftVal = checkBalance(inputNode.left);
            if (leftVal === false) {
                return false;
            }
            rightVal = checkBalance(inputNode.right);
            if (rightVal === false){
                return false
            }

            if (Math.abs(leftVal - rightVal) > 1) {
                return false
            } else {
                return (Math.max(leftVal, rightVal) + 1)
            }
        }

        return checkBalance(this.root) !== false;
    }

    rebalance() {
        if (!this.root) {
            return
        }

        if (this.isBalanced()){
            return
        }

        let newArr = [];

        this.inOrderForEach((value) => {
            newArr.push(value);
        });

        
        this.root = this.buildTree(newArr)
        //this.prettyPrint(this.root);
    }

    prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node === null || node === undefined) {
            return;
        }

        this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }

}

function randomArray(length) {
    let arr = [];

    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }

    return arr;
}




export { Node, Tree };