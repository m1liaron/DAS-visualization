function render({ array, currentIndex, swapIndices }) {
    let html = `<div class="node-container">`;
    for (let i = 0; i < array.length; i++) {
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
        `;
    }

    html += "<div></div>";
    return html;
}

export { render as renderSort }