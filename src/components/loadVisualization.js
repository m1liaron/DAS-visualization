import { bubbleSort } from "../algorithms/bubbleSort.js";
import { algorithms, dataStructures } from "../data/data.js";
import {LinkedList} from "../dataStructures/linkedList.js";

const dataStructureInstances = {};
const arrayAlgoritms = { array: [5,2,20,0,10,24, 1], currentIndex: 0, swapIndices: []};
let animationsSteps = [];
let animationStepIndex = 0;

function addVisualization(data, newValue) {

}

function createInstance(viewName) {
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
                const found = findItemByName(viewName, item.children);
                if (found) return found;
            }
        }
    }
    return null
}

export async function loadVisualization(viewName, type) {
    const content = document.querySelector('.visualization-container');
    const selectedDasContainer = document.querySelector('.selected-das');
    selectedDasContainer.innerHTML = ''
    const title = document.createElement('h1');
    content.innerHTML = '';

    const selectedData = type === 'algorithms' ? algorithms : dataStructures;
    const isDataStructures = type === 'dataStructures';
    let selected = findItemByName(viewName, selectedData);

    if (!selected) {
        content.innerHTML = `<p>Error: No ${type.slice(0, -1)} found for "${viewName}"</p>`;
        return;
    }

    try {
        const module = await import(/* @vite-ignore */selected.module);
        const dataInstance = createInstance(viewName);

        title.textContent = `Visualize: ${selected.name}`;
        selectedDasContainer.appendChild(title)
        if(!isDataStructures) {
            content.innerHTML = module.render ? module.render(arrayAlgoritms) : module.default.render(arrayAlgoritms);
        } else {
            content.innerHTML = module.render ? module.render(dataInstance) : module.default.render(dataInstance);
        }

        const inputContainer = document.createElement("div");
        inputContainer.classList.add('input-container')
        const input = document.createElement("input");
        input.classList.add("add-input");
        input.placeholder = "Data..."

        let value = '';
        input.addEventListener("change", (e) => {
            value += e.target.value;
        })

        let isAnimationGoes = false;
        const addButton = document.createElement("button");
        addButton.textContent = "Add Data";
        addButton.classList.add("add-button");

        const skipPrevButton = document.createElement("span");
        skipPrevButton.classList.add("material-symbols-outlined");
        skipPrevButton.textContent = "skip_previous";

        const stopAndStartButton = document.createElement("span");
        stopAndStartButton.classList.add("material-symbols-outlined");
        stopAndStartButton.textContent = "play_arrow";

        const skipNextButton = document.createElement("span");
        skipNextButton.classList.add("material-symbols-outlined");
        skipNextButton.textContent = "skip_next";

        function renderContentHtml () {
            content.innerHTML = module.render ? module.render(animationsSteps[animationStepIndex]) : module.default.render(animationsSteps[animationStepIndex]);
        }

        skipPrevButton.addEventListener("click", () => {
            if(animationStepIndex > 0) {
                animationStepIndex--;
                renderContentHtml();
            }
        });

        let animationInterval = null;

        stopAndStartButton.addEventListener("click", (e) => {
            if(isAnimationGoes) {
                e.target.textContent = "pause";
                animationsSteps = bubbleSort(arrayAlgoritms.array);
                renderContentHtml();

                if(isAnimationGoes && animationStepIndex < animationsSteps.length - 1) {
                    animationInterval = setInterval(() => {
                        skipNextStep();
                    }, 100);
                }
            } else {
                console.log('stop animation in addEvent')
                e.target.textContent = "play_arrow";
                clearInterval(animationInterval);
            }
            isAnimationGoes = !isAnimationGoes
        })

        function skipNextStep() {
            if(animationStepIndex < animationsSteps.length - 1) {
                animationStepIndex += 1;
                renderContentHtml();
            } else {
                console.log('stop animation in next step')
                clearInterval(animationInterval);
                isAnimationGoes = false;
                stopAndStartButton.textContent = "play_arrow";
            }
        }

        skipNextButton.addEventListener("click", skipNextStep);

        addButton.addEventListener('click', () => {
            if (value.length) {
                if (dataInstance && typeof dataInstance.append === "function") {
                    const floatingNode = document.createElement("div");
                    floatingNode.classList.add("floating-node");
                    floatingNode.textContent = value;
                    document.body.appendChild(floatingNode);

                    // Get input position
                    const inputRect = input.getBoundingClientRect();
                    floatingNode.style.left = `${inputRect.left}px`;
                    floatingNode.style.top = `${inputRect.top}px`;

                    requestAnimationFrame(() => {
                        const nodes = document.querySelectorAll(".node");
                        if (nodes.length) {
                            const lastNode = nodes[nodes.length - 1];
                            const lastNodeRect = lastNode.getBoundingClientRect();

                            // Move floating node to last node position
                            floatingNode.style.transform = `translate(${lastNodeRect.left - inputRect.left}px, ${lastNodeRect.top - inputRect.top}px)`;
                            floatingNode.style.transition = "transform 0.8s ease-in-out";

                            // Remove floating node and update list after animation
                            setTimeout(() => {
                                floatingNode.remove();
                                content.innerHTML = module.render ? module.render(dataInstance) : module.default.render(dataInstance);
                            }, 800);
                        }
                    });

                    dataInstance.append(value);
                    content.innerHTML = module.render ? module.render(dataInstance, value) : module.default.render(dataInstance, value);
                }
                value = '';
                input.value = ''
            } else {
                alert("Fill up input")
            }
        });

        if(isDataStructures) {
            inputContainer.appendChild(input);
            inputContainer.appendChild(addButton);
            selectedDasContainer.appendChild(inputContainer);
        } else {
            selectedDasContainer.appendChild(skipPrevButton)
            selectedDasContainer.appendChild(stopAndStartButton)
            selectedDasContainer.appendChild(skipNextButton)
        }
    } catch (error) {
        console.error(`Error loading ${viewName}:`, error);
    content.innerHTML = `<p>Error loading ${viewName} visualization</p>`;
  }
}