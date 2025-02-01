import { algorithms, dataStructures } from "../data/data.js";

export async function loadVisualization(viewName, type) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const selectedData = type === 'algorithms' ? algorithms : dataStructures;
    let selected = findItemByName(viewName, selectedData);

    if (!selected) {
        content.innerHTML = `<p>Error: No ${type.slice(0, -1)} found for "${viewName}"</p>`;
        return;
    }

    try {
        const module = await import(selected.module);
        content.innerHTML = module.render ? module.render() : module.default.render();
  } catch (error) {
    console.error(`Error loading ${viewName}:`, error);
    content.innerHTML = `<p>Error loading ${viewName} visualization</p>`;
  }
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