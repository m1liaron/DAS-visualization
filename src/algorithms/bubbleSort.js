
export function bubbleSort(arr) {
    const steps = [];
    let n = arr.length;
    let array = [...arr];

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            steps.push({ array: [...array], currentIndex: j, swapIndices: [] });
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapped = true;
                steps.push({ array: [...array], currentIndex: j, swapIndices: [j, j + 1]});
            }
        }
        if(!swapped) break;
    }
    return steps;
}

export function render({ array, currentIndex, swapIndices }) {
    let html = `<div class="node-container">`;
    for(let i = 0; i < array.length; i++) {
        let highlightClass = "";
        if (swapIndices.includes(i)) {
            highlightClass = "swap"; // Highlight swapped elements
        } else if (i === currentIndex) {
            highlightClass = "current"; // Highlight current checked item
        }
        const num = array[i];

        html += `            
            <div class="pillar-container">
                    <div class="pillar ${highlightClass}" style="height: ${num + 10}vh;"></div>
                    <p>${num}</p>
            </div>
        `
    }

    html += '<div></div>'
    return html
}