import { insertionSort } from "./insertionSort";

export function bucketSort(arr, bucketSize = 5) {
    const n = arr.length;
    let array = [...arr];
    const steps = [];
    const minValue = Math.min(...array);
    const maxValue = Math.max(...array);

    // Initial state render
    steps.push({ array: [...array], currentIndex: 0, swapIndices: [] });

    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    const buckets = Array.from({ length: bucketCount }, () => []);
  
    // Distribute each element into its bucket and render after each addition.
    for (let i = 0; i < n; i++) {
        const bucketIndex = Math.floor((array[i] - minValue) / bucketSize);
        buckets[bucketIndex].push(array[i]);

        // Render the updated bucket state.
        renderBucket({ array: [...array], currentIndex: bucketIndex, swapIndices: [] });
        steps.push({ array: [...array], currentIndex: i, swapIndices: [] });
    }

    // Render state after bucketing is complete.
    steps.push({ array: [...array], currentIndex: null, swapIndices: [] });
    
    array = [];
    // Process each bucket individually.
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i].length > 0) {
            // Render the current empty state for this bucket before sorting.
            renderBucket({ array: [...array], currentIndex: i, swapIndices: [] });
            steps.push({ array: [...array], currentIndex: i, swapIndices: [] });

            // Sort the bucket with insertionSort and render each step.
            const insertionSteps = insertionSort(buckets[i]);
            insertionSteps.forEach((step) => {
                renderBucket({ array: step.array, currentIndex: i, swapIndices: step.swapIndices });
                steps.push({ ...step, currentIndex: i, swapIndices: step.swapIndices });
            });

            // Render the sorted bucket.
            renderBucket({ array: [...buckets[i]], currentIndex: i, swapIndices: [] });
            steps.push({ array: [...buckets[i]], currentIndex: i, swapIndices: [] });

            // Merge the sorted bucket back to the main array.
            array = array.concat(buckets[i]);
            renderBucket({ array: [...array], currentIndex: i, swapIndices: [] });
            steps.push({ array: [...array], currentIndex: i, swapIndices: [] });
        }
    }

    // Final render showing the completely sorted array.
    renderBucket({ array: [...array], currentIndex: null, swapIndices: [] });
    steps.push({ array: [...array], currentIndex: null, swapIndices: [] });
    return steps;
}

export function renderBucket({ array, currentIndex }) {
    const bucketCount = 5;
    const buckets = Array.from({ length: bucketCount }, () => []);
    
    array.forEach(num => {
        const bucketIndex = Math.floor(num / 5);
        if(buckets[bucketIndex]) {
            buckets[bucketIndex].push(num);
        }
    });
    
    let html = `<div class="buckets">`;
    
    for(let i = 0; i < buckets.length; i++) {
        html += `
        <div class="bucket">
            <p>${i}</p>
            <div class="flex">
                ${buckets[i].map((num, index) => `<p class="square ${currentIndex == index ? "active" : ""}">${num}</p>`).join('')}
            </div>
        </div>
        `;
    }
    
    html += `</div>`;
    const container = document.querySelector('.visualization-container');
    if (container) {
        container.insertAdjacentHTML('beforeend', html);
    }
}


export { renderSort as render } from "../../utills/algorithms/algorithms.js";