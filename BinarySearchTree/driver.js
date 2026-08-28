import { Tree } from "./BST.js";

function randomArray(length) {
    let arr = [];

    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }

    return arr;
}

const numbers = randomArray(8);
const tree = new Tree(numbers);
tree.prettyPrint(tree.root)
console.log(tree.isBalanced());

console.log('level Order')
tree.levelOrderForEach((value) => {
    console.log(value);
})

console.log('-----------------------')

console.log('Pre Order')
tree.preOrderForEach((value) => {
    console.log(value);
})
console.log('-----------------------')

console.log('Post Order')
tree.postOrderForEach((value) => {
    console.log(value);
})
console.log('-----------------------')

console.log('In Order')
tree.inOrderForEach((value) => {
    console.log(value);
})
console.log(tree.isBalanced())
tree.insert(101);
tree.insert(102);
tree.insert(103);
console.log(tree.isBalanced())
tree.rebalance();
console.log(tree.isBalanced())

console.log('level Order')
tree.levelOrderForEach((value) => {
    console.log(value);
})

console.log('-----------------------')
console.log('Pre Order')
tree.preOrderForEach((value) => {
    console.log(value);
})

console.log('-----------------------')
console.log('Post Order')
tree.postOrderForEach((value) => {
    console.log(value);
})

console.log('-----------------------')
console.log('In Order')
tree.inOrderForEach((value) => {
    console.log(value);
})
