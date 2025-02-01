const dataStructuresPath = '../dataStructures/';

const dataStructures = [
    {
        name: 'linkedList',
        module: `${dataStructuresPath}linkedList.js`,
        children: [
            { name: 'doubly', module: `${dataStructuresPath}doublyLinkedList.js` },
            { name: 'circular', module: `${dataStructuresPath}circularLinkedList.js` }
        ]
    },
    {
        name: 'queue',
        module: `${dataStructuresPath}queue.js`,
        children: [
            { name: 'priority queue', module: `${dataStructuresPath}priorityQueue.js` }
        ]
    },
    { name: 'stack', module: `${dataStructuresPath}stack.js` },
    { name: 'heap', module: `${dataStructuresPath}heap.js` }
];


export { dataStructures }