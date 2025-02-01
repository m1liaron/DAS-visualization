export function navigationRender(algorithms, dataStructures) {
    const nav = document.getElementById("sidebar");
    nav.innerHTML = "<h2>Visualization</h2>";

    function createSection(titleText, items) {
        const section = document.createElement("section");

        const title = document.createElement("h3");
        title.textContent = titleText;
        section.appendChild(title);

        const listEl = document.createElement("ul");
        items.forEach(itemData => {
            const listItem = document.createElement("li");
            listItem.setAttribute("data-view", itemData.name);
            listItem.textContent = itemData.name;
            listEl.appendChild(listItem);
        });
        section.appendChild(listEl);
        return section;
    }

    const dataStructuresSection = createSection("Data Structures", dataStructures);

    nav.appendChild(dataStructuresSection);
    // nav.appendChild(algorithmsSection);
    return nav;
}