export function linearSearch(arr, value) {
    const array = [...arr].sort((a, b) => a - b);
    const steps = [];

    steps.push({
        array: [...array],
        currentIndex: null,  // No mid selected yet.
        swapIndices: []
    });
    for(let i = 0; i < array.length; i++) {
        steps.push({
            array: [...array],
            currentIndex: i,  
            swapIndices: []
        });
        if(array[i] === value) {
            steps.push({
                array: [...array],
                currentIndex: i,
                swapIndices: []
            });
            return steps; // return id in default algorithm
        }
    }
}

export { renderSearch as render } from "../../utills/algorithms/algorithms.js";