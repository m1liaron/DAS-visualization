const steps = [];

function merge(leftArray, rightArray) {
    const mergedSort = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        if (leftArray[leftIndex] < rightArray[rightIndex]) {
            mergedSort.push(leftArray[leftIndex]);
            leftIndex++;
        } else {
            mergedSort.push(rightArray[rightIndex]);
            rightIndex++;
        }
        steps.push({ array: [...mergedSort, ...leftArray.slice(leftIndex), ...rightArray.slice(rightIndex)], currentIndex: leftIndex, swapIndices: [] });
    }

    while (leftIndex < leftArray.length) {
        mergedSort.push(leftArray[leftIndex]);
        leftIndex++;
        steps.push({ array: [...mergedSort, ...leftArray.slice(leftIndex), ...rightArray.slice(rightIndex)], currentIndex: leftIndex, swapIndices: [] });
    }

    while (rightIndex < rightArray.length) {
        mergedSort.push(rightArray[rightIndex]);
        rightIndex++;
        steps.push({ array: [...mergedSort, ...leftArray.slice(leftIndex), ...rightArray.slice(rightIndex)], currentIndex: rightIndex, swapIndices: [] });
    }

    return mergedSort;
}

export function mergeSort(arr) {
    steps.length = 0;
    mergeSortHelper([...arr]);
    return steps;
}

function mergeSortHelper(array) {
    if(array.length <= 1) {
        return array;
    }

    steps.push({ array: [...array], currentIndex: 0, swapIndices: []});
    const mid = Math.floor(array.length / 2);
    const leftArray = mergeSortHelper(array.slice(0, mid));
    const rightArray = mergeSortHelper(array.slice(mid));

    return merge(leftArray, rightArray);
}

export { renderSort as render } from '../utills/algorithms/algorithms.js';