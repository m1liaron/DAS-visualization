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

function createList(items, childKey, nestedClass = '') {
    const ul = document.createElement("ul");
    items.forEach((item) => {
        const li = document.createElement("li");
        if(nestedClass) {
            li.classList.add(nestedClass);
        }
        li.setAttribute("data-view", item.name);
        li.textContent = item.name;

        if(item[childKey] && Array.isArray(item[childKey]) && item[childKey].length) {
            const nestedUl = createList(item[childKey], childKey, 'nested-item');
            li.appendChild(nestedUl);
        }
        ul.appendChild(li);
    })
    return ul;
}