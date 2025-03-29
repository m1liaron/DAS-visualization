import { insertionSort } from "./insertionSort";

export function bucketSort(arr, bucketSize = 5) {
    const n = arr.length;
    let array = [...arr];
    const steps = [];
    const minValue = Math.min(...array);
    const maxValue = Math.max(...array);

    steps.push({ array: [...array], currentIndex: 0, swapIndices: [] });

    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    const buckets = Array.from({ length: bucketCount}, () => []);
  
    for (let i = 0; i < n; i++) {
        const bucketIndex = Math.floor((array[i] - minValue) / bucketSize);
        buckets[bucketIndex].push(array[i]);
        steps.push({ array: [...array], currentIndex: i, swapIndices: [] });
    }

    steps.push({ array: [...array], currentIndex: null, swapIndices: [] });
    
    array = []
    for(let i = 0; i < buckets.length; i++) {
        if(buckets[i].length > 0) {
            steps.push({ array: [...array], currentIndex: i, swapIndices: [] });
            const insertionSteps = insertionSort(buckets[i]);
            insertionSteps.forEach((step) => {
                steps.push({ ...step, currentIndex: i, swapIndices: []});
            });
            steps.push({ array: [...buckets[i]], currentIndex: i, swapIndices: []});
            array = array.concat(buckets[i]);
            steps.push({ array: [...array], currentIndex: i, swapIndices: []});
        }
    }
    steps.push({ array: [...array], currentIndex: null, swapIndices: []});
    return steps;
}

export { renderSort as render } from "../../utills/algorithms/algorithms.js";