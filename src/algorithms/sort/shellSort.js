export function shellSort(arr) {
	const steps = [];
	const n = arr.length;
	const array = [...arr];
	for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
		for (let i = gap; i < n; i += 1) {
			const temp = array[i];
			let j;
			for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
				array[j] = array[j - gap];
			}

			array[j] = temp;
			steps.push({ array: [...array], currentIndex: i, swapIndices: [j, i] });
		}
	}
	return steps;
}

export { renderSort as render } from "../../utills/algorithms/algorithms.js";
