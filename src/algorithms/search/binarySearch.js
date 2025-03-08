export function binarySearch(arr, value) {
    const array = [...arr].sort((a, b) => a - b);
    const steps = [];

    let low = 0;
    let high = array.length - 1;
    steps.push({
        array: [...array],
        currentIndex: null,  // No mid selected yet.
        swapIndices: Array.from({ length: high - low + 1 }, (_, i) => i + low)
    });
    while(high >= low) {
        let mid = low + Math.floor((high - low) / 2);
        steps.push({
            array: [...array],
            currentIndex: mid,
            swapIndices: Array.from({ length: high - low + 1 }, (_, i) => i + low)
        });

        if(array[mid] === value) {
            steps.push({
                array: [...array],
                currentIndex: mid,
                swapIndices: []
            });
            return steps;
        }
        if (array[mid] > value) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return steps;
}

export { renderSearch as render } from "../../utills/algorithms/algorithms.js";