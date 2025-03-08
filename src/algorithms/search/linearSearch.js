export function linearSearch(arr, value) {
    const array = [...arr].sort((a, b) => a - b);
    const steps = [];

    steps.push({
        array: [...array],
        currentIndex: null,
        swapIndices: []
    });
    for(let i = 0; i < array.length - 1; i++) {
        steps.push({
            array: [...array],
            currentIndex: i,
            swapIndices: []
        });
        if(array[i] === value) {
            return steps;
        }
    }

    return -1;
}

export { renderSearch as render } from "../../utills/algorithms/algorithms.js";