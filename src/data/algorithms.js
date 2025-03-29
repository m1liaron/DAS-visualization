const algorithmsPath = "../algorithms/";

const algorithms = [
	{
		name: "sort",
		children: [
			{
				name: "bubbleSort",
				module: `${algorithmsPath}/sort/bubbleSort`,
			},
			{
				name: "selectionSort",
				module: `${algorithmsPath}/sort/selectionSort`,
			},
			{
				name: "insertionSort",
				module: `${algorithmsPath}/sort/insertionSort`,
			},
			{
				name: "mergeSort",
				module: `${algorithmsPath}/sort/mergeSort`,
			},
			{
				name: "quickSort",
				module: `${algorithmsPath}/sort/quickSort`,
			},
			{
				name: "countingSort",
				module: `${algorithmsPath}/sort/countingSort`,
			},
			{
				name: "bucketSort",
				module: `${algorithmsPath}/sort/bucketSort`,
			},
		],
	},
	{
		name: "search",
		children: [
			{
				name: "binarySearch",
				module: `${algorithmsPath}/search/binarySearch`,
			},
			{
				name: "linearSearch",
				module: `${algorithmsPath}/search/linearSearch`,
			}
		]
	}
];

export { algorithms };
