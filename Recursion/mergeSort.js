/*Build a function mergeSort that takes in an array and returns a sorted array,
 using a recursive merge sort methodology.
 */
const mergeSortArr = [3, 2, 1, 13, 8, 5, 0, 1];

function mergeSort(inputArr) {
    if (inputArr.length === 0){
      return []
    }
    if (inputArr.length === 1){
      return [...inputArr]
    }


    let mergedArr = [];
    let tempArr = []

    const leftArr = mergeSort(inputArr.slice(0, inputArr.length / 2))
    const rightArr = mergeSort(inputArr.slice(inputArr.length / 2, inputArr.length))

    for (let i = 0; i < inputArr.length; i++){
      if (leftArr[0] < rightArr[0] || rightArr[0] === undefined){
        tempArr.push(leftArr[0])
        leftArr.splice(0,1);
      } else {
        tempArr.push(rightArr[0])
        rightArr.splice(0,1);
      }
    }
    mergedArr.push(...tempArr)
    
    return mergedArr
  }

console.log(mergeSort(mergeSortArr));