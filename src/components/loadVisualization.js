import { algorithms, dataStructures } from "../data/data.js";
import {LinkedList} from "../dataStructures/linkedList.js";

const dataStructureInstances = {};

function createInstance(type, viewName) {
    if(!dataStructureInstances[viewName]) {
        switch (viewName) {
            case "linkedList":
                dataStructureInstances[viewName] = new LinkedList();
                break
            default:
                dataStructureInstances[viewName] = null;
        }
    }
    return dataStructureInstances[viewName]
}

function findItemByName (viewName, data) {
    for(let item of data) {
        if(item.name === viewName && item.module) {
            return item;
        }

        if(item.children) {
            if (item.children) {
                const found = findItemByName(name, item.children);
                if (found) return found;
            }
        }
    }
    return null
}

const linkedList = new LinkedList();
linkedList.append(5);
linkedList.append(10);
linkedList.append(15);
linkedList.append(9);

export async function loadVisualization(viewName, type) {
    const content = document.querySelector('.visualization-container');
    const selectedDasContainer = document.querySelector('.selected-das');
    selectedDasContainer.innerHTML = ''
    const title = document.createElement('h1');
    content.innerHTML = '';

    const selectedData = type === 'algorithms' ? algorithms : dataStructures;
    let selected = findItemByName(viewName, selectedData);

    if (!selected) {
        content.innerHTML = `<p>Error: No ${type.slice(0, -1)} found for "${viewName}"</p>`;
        return;
    }

    try {
        const module = await import(/* @vite-ignore */selected.module);
        const dataInstance = createInstance(type, viewName);

        title.textContent = `Visualize: ${selected.name}`;
        selectedDasContainer.appendChild(title)
        content.innerHTML = module.render ? module.render(dataInstance) : module.default.render(dataInstance);

        const inputContainer = document.createElement("div");
        inputContainer.classList.add('input-container')
        const input = document.createElement("input");
        input.classList.add("add-input");
        input.placeholder = "Data..."

        let value = '';
        input.addEventListener("change", (e) => {
            value += e.target.value;
        })

        const addButton = document.createElement("button");
        addButton.textContent = "Add Data";
        addButton.classList.add("add-button");

        addButton.addEventListener('click', () => {
            if(value.length) {
                if(dataInstance && typeof dataInstance.append === "function") {
                    dataInstance.append(value);
                    content.innerHTML = module.render ? module.render(dataInstance) : module.default.render(dataInstance);
                }
                value = '';
                input.value = ''
            } else {
                alert("Fill up input")
            }
        });

        inputContainer.appendChild(input);
        inputContainer.appendChild(addButton);
        selectedDasContainer.appendChild(inputContainer);
  } catch (error) {
    console.error(`Error loading ${viewName}:`, error);
    content.innerHTML = `<p>Error loading ${viewName} visualization</p>`;
  }
}