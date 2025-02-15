
export function bubbleSort(arr) {
    const steps = [];
    let n = arr.length;
    let array = [...arr];

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                steps.push([...array]); 
            }
        }
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