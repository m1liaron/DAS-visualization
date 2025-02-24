
const steps = [];

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for(let j = low; j < high; j++) {
        if(arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            steps.push({ array: [...arr], currentIndex: j, swapIndices: [i, j] });
        } else {
            steps.push({ array: [...arr], currentIndex: j, swapIndices: [] });
        }
    }

    [arr[i+1], arr[high]] = [arr[high], arr[i+1]];
    steps.push({ array: [...arr], currentIndex: high, swapIndices: [i+1, high] });
    return i+1;
}

export function quickSort(arr, low = 0, high = arr.length - 1) {
    if(low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }

    return steps;
}

export { renderSort as render } from '../utills/algorithms/algorithms.js';