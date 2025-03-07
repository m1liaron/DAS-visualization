export function countingSort(arr) {
	if (!arr.length) return [];

	const steps = [];
	const array = [...arr];
	const n = arr.length;

	const min = Math.min(...array);
	const max = Math.max(...array);
	const range = max - min + 1;
	const countArray = new Array(range).fill(0);
	const outputArray = new Array(n);

	steps.push({ array: [...array], currentIndex: -1, swapIndices: [] });
	for (const num of arr) {
		countArray[num - min]++;
		steps.push({
			array: [...countArray],
			currentIndex: num - min,
			swapIndices: [],
		});
	}

	for (let i = 1; i < countArray.length; i++) {
		countArray[i] += countArray[i - 1];
		steps.push({ array: [...countArray], currentIndex: i, swapIndices: [] });
	}

	for (let i = n - 1; i >= 0; i--) {
		const num = arr[i];
		const correctPos = countArray[num - min] - 1;
		outputArray[countArray[num - min] - 1] = num;
		countArray[num - min]--;
		steps.push({
			array: [...outputArray],
			currentIndex: i,
			swapIndices: [correctPos, i],
		});
	}

	steps.push({ array: [...outputArray], currentIndex: -1, swapIndices: [] });

	return steps;
}

export { renderSort as render } from "../../utills/algorithms/algorithms.js";
