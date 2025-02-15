
export function bubbleSort(arr) {
    const steps = [];
    let n = arr.length;
    let array = [...arr];

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapped = true;
            }
        }
        steps.push([...array]);
        if(!swapped) break;
    }
    return steps;
}

export function render(arr) {
    let html = `<div class="node-container">`;
    for(let num of arr) {
        html += `            
            <div class="pillar-container">
                    <div class="pillar" style="height: ${num + 10}vh;"></div>
                    <p>${num}</p>
            </div>
        `
    }

    html += '<div></div>'
    return html
}