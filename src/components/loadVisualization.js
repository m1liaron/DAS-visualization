const algorithmsPath = '../algorithms/'

const data = {
    algorithms: [
        {
            name: 'bubbleSort', module: `${algorithmsPath}bubbleSort`
        },
        {
            name: 'selectionSort', module: `${algorithmsPath}selectionSort`
        },
        {
            name: 'insertionSort', module: `${algorithmsPath}insertionSort`
        },
    ]
}


async function loadVisualization(viewName, type ) {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const selected = data[type].find(item => item.name === viewName);

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