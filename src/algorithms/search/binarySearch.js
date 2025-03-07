

export function binarySearch(arr, value) {
    const array = [...arr];
    const steps = [];

    let low = 0;
    let high = array.length - 1;
    let mid;
    steps.push({
        array: [...array],
        currentIndex: null,  // No mid selected yet.
        swapIndices: Array.from({ length: high - low + 1 }, (_, i) => i + low)
    });
    while(high >= low) {
        mid = low + Math.floor((high - low) / 2);
        steps.push({
            array: [...array],
            currentIndex: mid,
            swapIndices: Array.from({ length: high - low + 1 }, (_, i) => i + low)
        });

        if(arr[mid] === value) {
            return mid;
        }
        if (arr[mid] > value) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return steps;
}

export { renderSearch as render } from "../../utills/algorithms/algorithms.js";