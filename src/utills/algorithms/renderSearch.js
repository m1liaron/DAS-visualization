

function render({ array, currentIndex, swapIndices }) {
    const maxNum = Math.max.apply(null, array);
    let html = `<div class="node-container">`;
    for (let i = 0; i < array.length; i++) {
        let highlightClass = "";
        if (swapIndices.includes(i) && i !== currentIndex) {
            highlightClass = "swap";
        } else if (i === currentIndex) {
            highlightClass = "current";
        }
        const num = array[i];
        const height = (num / maxNum) * 40 + 10;

        html += `            
            <div class="pillar-container">
                    <div class="square ${highlightClass}" style="height: ${height}vh;"></div>
                    <p>${num}</p>
            </div>
        `;
    }

    html += "<div></div>";
    return html;
}

export { render as renderSearch };
