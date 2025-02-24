export function bubbleSort(arr) {
	if(arr.length < 1) return arr;
	const steps = [];
	const n = arr.length;
	const array = [...arr];

	steps.push({ array: [...array], currentIndex: 0, swapIndices: []})

	for (let i = 0; i < n - 1; i++) {
		let swapped = false;
		for (let j = 0; j < n - 1 - i; j++) {
			steps.push({ array: [...array], currentIndex: j, swapIndices: [] });
			if (array[j] > array[j + 1]) {
				[array[j], array[j + 1]] = [array[j + 1], array[j]];
				swapped = true;
				steps.push({
					array: [...array],
					currentIndex: j,
					swapIndices: [j, j + 1],
				});
			}
		}
		if (!swapped) break;
	}
	return steps;
}

export { renderSort as render } from '../utills/algorithms/algorithms.js';