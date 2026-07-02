/*
Write a function fibs which takes a number and 
returns an array containing that many numbers from the 
Fibonacci sequence. 

Using an example input of 8, this function 
should return the array [0, 1, 1, 2, 3, 5, 8, 13].

Now write another function fibsRec which solves the same problem
recursively.

Test both versions of your functions by passing in various lengths 
as arguments.
*/

//solve iterative fibs function
function fibs(inputNum) {

    if (inputNum === 0) return [];
    if (inputNum === 1) return [0];

    const curArr = [0,1];
    for (let i = 2; i < inputNum; i++){
        
        let temp = curArr[i - 1] + curArr[i - 2];
        curArr.push(temp);
    }
    return curArr;
}

console.log(fibs(5))

//solve recursive fibsRec function
function fibRec(inputNum) {
    if (inputNum === 0) return [];
    if (inputNum === 1) return [0];
    if (inputNum === 2) return [0,1];
    
    const curArray = fibRec(inputNum - 1)
    
    const nextNumber =
        curArray[curArray.length - 1] + 
        curArray[curArray.length - 2];
    
    curArray.push(nextNumber);

    return curArray;
}

console.log(fibRec(5));