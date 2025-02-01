export function navigationRender(algorithms, dataStructures) {
    const nav = document.getElementById("sidebar");
    nav.innerHTML = "<h2>Visualization</h2>";

    function createSection(titleText, items) {
        const section = document.createElement("section");

        const titleContainer = document.createElement("div");
        titleContainer.classList.add("flex");
        const title = document.createElement("h3");
        title.textContent = titleText;

        const arrowItem = document.createElement("span");
        arrowItem.className = 'material-symbols-outlined';
        arrowItem.textContent = "keyboard_arrow_down";
        arrowItem.setAttribute("data-view", titleText);

        titleContainer.appendChild(title);
        titleContainer.appendChild(arrowItem);

        section.appendChild(titleContainer);

        const listEl = document.createElement("ul");
        items.forEach(itemData => {
            const listContainer = document.createElement("div");
            listContainer.classList.add("flex");
            const listItem = document.createElement("li");
            listItem.setAttribute("data-view", itemData.name);
            listItem.textContent = itemData.name;

            const arrowItem = document.createElement("span");
            arrowItem.className = 'material-symbols-outlined';
            arrowItem.textContent = "keyboard_arrow_down";
            arrowItem.setAttribute("data-view", itemData.name);

            listContainer.appendChild(listItem);
            listContainer.appendChild(arrowItem);
            listEl.appendChild(listContainer);
        });
        section.appendChild(listEl);
        return section;
    }

    const dataStructuresSection = createSection("Data Structures", dataStructures);

    nav.appendChild(dataStructuresSection);
    // nav.appendChild(algorithmsSection);
    return nav;
}