
export function insertionSort(arr) {
    const n = arr.length;
    const steps = [];
    const array = [...arr];

    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;

        // Capture initial state before sorting this iteration
        steps.push({ array: [...array], currentIndex: i, swapIndices: [] });

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j]; // Shift element to the right
            steps.push({ array: [...array], currentIndex: i, swapIndices: [j, j + 1] });
            j = j - 1;
        }

        array[j + 1] = key; // Place the key in its correct position

        // Capture final step for this iteration
        steps.push({ array: [...array], currentIndex: i, swapIndices: [j + 1, i] });
    }

    return steps;
}

export { renderSort as render } from '../utills/algorithms/algorithms.js';