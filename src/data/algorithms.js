const algorithmsPath = "../algorithms/";

const algorithms = [
	{
		name: "sort",
		children: [
			{
				name: "bubbleSort",
				module: `${algorithmsPath}bubbleSort`,
			},
			{
				name: "selectionSort",
				module: `${algorithmsPath}selectionSort`,
			},
			{
				name: "insertionSort",
				module: `${algorithmsPath}insertionSort`,
			},
		],
	},
];

export { algorithms };
