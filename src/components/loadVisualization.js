import { bubbleSort } from "../algorithms/bubbleSort.js";
import { algorithms, dataStructures } from "../data/data.js";
import { LinkedList } from "../dataStructures/linkedList.js";

const dataStructureInstances = {};
const arrayAlgoritms = {
	array: [5, 2, 20, 0, 10, 24, 1, 55, 99, 88, 76, 21, 45],
	currentIndex: 0,
	swapIndices: [],
};
let animationsSteps = [];
let animationStepIndex = 0;

function createInstance(viewName) {
	if (!dataStructureInstances[viewName]) {
		switch (viewName) {
			case "linkedList":
				dataStructureInstances[viewName] = new LinkedList();
				break;
			default:
				dataStructureInstances[viewName] = null;
		}
	}
	return dataStructureInstances[viewName];
}

function findItemByName(viewName, data) {
	for (const item of data) {
		if (item.name === viewName && item.module) {
			return item;
		}

		if (item.children) {
			if (item.children) {
				const found = findItemByName(viewName, item.children);
				if (found) return found;
			}
		}
	}
	return null;
}

export async function loadVisualization(viewName, type) {
	const content = document.querySelector(".visualization-container");
	const selectedDasContainer = document.querySelector(".selected-das");
	selectedDasContainer.innerHTML = "";
	const title = document.createElement("h1");
	content.innerHTML = "";

	const selectedData = type === "algorithms" ? algorithms : dataStructures;
	const isDataStructures = type === "dataStructures";
	const selected = findItemByName(viewName, selectedData);

	if (!selected) {
		content.innerHTML = `<p>Error: No ${type.slice(0, -1)} found for "${viewName}"</p>`;
		return;
	}

	try {
		const module = await import(/* @vite-ignore */ selected.module);
		const dataInstance = createInstance(viewName);

		title.textContent = `Visualize: ${selected.name}`;
		selectedDasContainer.appendChild(title);
		if (!isDataStructures) {
			content.innerHTML = module.render
				? module.render(arrayAlgoritms)
				: module.default.render(arrayAlgoritms);
		} else {
			content.innerHTML = module.render
				? module.render(dataInstance)
				: module.default.render(dataInstance);
		}

		let isAnimationGoes = false;
		let animationInterval = null;
		clearInterval(animationInterval)
		animationsSteps = [];
		animationStepIndex = 0;

		const inputContainer = document.createElement("div");
		inputContainer.classList.add("input-container");
		const input = document.createElement("input");
		input.classList.add("add-input");
		input.placeholder = "Data...";

		let value = "";
		input.addEventListener("change", (e) => {
			value += e.target.value;
		});

		const addButton = document.createElement("button");
		addButton.textContent = "Add Data";
		addButton.classList.add("add-button");

		const skipFirstPrevButton = document.createElement("span");
		skipFirstPrevButton.classList.add("material-symbols-outlined");
		skipFirstPrevButton.textContent = "restart_alt";

		const skipPrevButton = document.createElement("span");
		skipPrevButton.classList.add("material-symbols-outlined");
		skipPrevButton.textContent = "skip_previous";

		const stopAndStartButton = document.createElement("span");
		stopAndStartButton.classList.add("material-symbols-outlined");
		stopAndStartButton.textContent = "play_arrow";

		const skipNextButton = document.createElement("span");
		skipNextButton.classList.add("material-symbols-outlined");
		skipNextButton.textContent = "skip_next";

		const animationsStepsText = document.createElement("p");
		animationsStepsText.textContent = `Step: ${animationStepIndex + 1}/${animationsSteps.length}`;

		const speedInputRange = document.createElement("input");
		speedInputRange.type = "range";
		speedInputRange.min = "100";
		speedInputRange.max = "5000";
		speedInputRange.value = "1000"
		const speedText = document.createElement("p");
		speedText.textContent = `${speedInputRange.value / 1000}s`;

		speedInputRange.addEventListener("change", (e) => {
			speedText.textContent = `${e.target.value / 1000}s`;
		});

		function updateAnimationStatus() {
			animationsStepsText.textContent = `Step: ${animationStepIndex + 1}/${animationsSteps.length}`;
		}

		function renderContentHtml() {
			content.innerHTML = module.render
				? module.render(animationsSteps[animationStepIndex])
				: module.default.render(animationsSteps[animationStepIndex]);
			updateAnimationStatus();
		}

		skipFirstPrevButton.addEventListener("click", () => {
			animationStepIndex = 0;
			renderContentHtml();
		});

		skipPrevButton.addEventListener("click", () => {
			if (animationStepIndex > 0) {
				animationStepIndex--;
				renderContentHtml();
				isAnimationGoes = false;
			}
		});

		stopAndStartButton.addEventListener("click", (e) => {
			isAnimationGoes = !isAnimationGoes;
			if (isAnimationGoes) {
				e.target.textContent = "pause";
				const algorithmFunction = module[viewName];
				animationsSteps = algorithmFunction(...[arrayAlgoritms.array]);
				renderContentHtml();

				if (
					isAnimationGoes &&
					animationStepIndex < animationsSteps.length - 1
				) {
					animationInterval = setInterval(() => {
						skipNextStep();
					}, Number(speedInputRange.value));
				}
			} else {
				e.target.textContent = "play_arrow";
				clearInterval(animationInterval);
			}
		});

		function skipNextStep() {
			if (animationStepIndex < animationsSteps.length - 1) {
				animationStepIndex += 1;
				renderContentHtml();
			} else {
				clearInterval(animationInterval);
				isAnimationGoes = false;
				stopAndStartButton.textContent = "play_arrow";
			}
		}

		skipNextButton.addEventListener("click", skipNextStep);

		addButton.addEventListener("click", () => {
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
								content.innerHTML = module.render
									? module.render(dataInstance)
									: module.default.render(dataInstance);
							}, 800);
						}
					});

					dataInstance.append(value);
					content.innerHTML = module.render
						? module.render(dataInstance, value)
						: module.default.render(dataInstance, value);
				}
				value = "";
				input.value = "";
			} else {
				alert("Fill up input");
			}
		});

		if (isDataStructures) {
			inputContainer.appendChild(input);
			inputContainer.appendChild(addButton);
			selectedDasContainer.appendChild(inputContainer);
		} else {
			selectedDasContainer.appendChild(skipFirstPrevButton)
			selectedDasContainer.appendChild(skipPrevButton);
			selectedDasContainer.appendChild(stopAndStartButton);
			selectedDasContainer.appendChild(skipNextButton);
			selectedDasContainer.appendChild(animationsStepsText);

			selectedDasContainer.appendChild(speedInputRange);
			selectedDasContainer.appendChild(speedText);
		}
	} catch (error) {
		console.error(`Error loading ${viewName}:`, error);
		content.innerHTML = `<p>Error loading ${viewName} visualization</p>`;
	}
}
