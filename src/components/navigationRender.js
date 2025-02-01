export function navigationRender(algorithms, dataStructures) {
    const nav = document.getElementById("sidebar");
    nav.innerHTML = "";

    const dsSection = document.createElement("section");
    dsSection.classList.add("nav-section");
    const dsTitle = document.createElement("h3");
    dsTitle.textContent = "Data Structures";
    dsSection.appendChild(dsTitle);

    // Create a nested list for data structures
    const dsList = createList(dataStructures, "children");
    dsSection.appendChild(dsList);

    // --- Algorithms Section ---
    const algSection = document.createElement("section");
    algSection.classList.add("nav-section");
    const algTitle = document.createElement("h3");
    algTitle.textContent = "Algorithms";
    algSection.appendChild(algTitle);

    // Create a nested list for algorithms
    const algList = createList(algorithms, "children");
    algSection.appendChild(algList);


    nav.appendChild(dsSection);
    nav.appendChild(algSection);
    return nav;
}

/**
 * Recursively creates an unordered list from an array of items.
 * Each item is expected to have a `name` and optionally a nested array of children
 * under the property specified by childKey.
 *
 * @param {Array} items - Array of objects with at least a `name` property.
 * @param {String} childKey - The property name that holds nested children (if any).
 * @param {String} nestedClass - The class if it nested child
 * @returns {HTMLElement} - The UL element containing list items.
 */
function createList(items, childKey, nestedClass = '') {
    const ul = document.createElement("ul");
    items.forEach((item) => {
        const li = document.createElement("li");
        if(nestedClass) li.classList.add(nestedClass);
        li.setAttribute("data-view", item.name);

        const itemContainer = document.createElement("div");
        itemContainer.classList.add("item-container");

        const itemText = document.createElement("span");
        itemContainer.textContent = item.name;
        itemContainer.appendChild(itemText);

        if(item[childKey] && Array.isArray(item[childKey]) && item[childKey].length) {
            const nestedUl = createList(item[childKey], childKey, 'nested-item');
            nestedUl.classList.add("hide")

            const arrow = document.createElement("span");
            arrow.classList.add("material-symbols-outlined");
            arrow.textContent = "keyboard_arrow_down";

            arrow.addEventListener("click" , (e) => {
                e.stopPropagation();
                nestedUl.classList.toggle("hide");
                arrow.classList.toggle("rotated");
            });
            itemContainer.insertBefore(arrow, itemText);
            itemContainer.appendChild(nestedUl)

        }
        li.appendChild(itemContainer);

        ul.appendChild(li);

    })
    return ul;
}