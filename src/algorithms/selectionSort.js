
export function selectionSort(arr) {
    const steps = [];
    const array = [...arr];
    const n = array.length;

    for(let i = 0; i < n-1; i++) {
        let minIdx = i;
        for(let j = i + 1; j < n; j++) {
            if(array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        if(minIdx !== i) {
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
        }
        steps.push({ array: [...array], currentIndex: i, swapIndices: [i, minIdx] });
    }
    return steps;
}

export { renderSort as render } from '../utills/algorithms/algorithms.js';