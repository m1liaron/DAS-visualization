class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
	}

	append(data) {
		const newNode = new Node(data);
		if (!this.head) {
			this.head = newNode;
		} else {
			let current = this.head;
			while (current.next) {
				current = current.next;
			}
			current.next = newNode;
		}
	}

	toArray() {
		const result = [];
		let current = this.head;
		while (current) {
			result.push(current.data);
			current = current.next;
		}
		return result;
	}
}

export function render(data, newNodeValue = null) {
	if (!data.head) return "<p>The data is empty, add something!🔴🔴</p>";

	let current = data.head;
	let html = `<div class="node-container">`;

	while (current) {
		const highlightClass = current.data === newNodeValue ? "new-node" : "";
		html += `
            <div>
                <p>node</p>
                <div class="node ${highlightClass}">
                    <div class="square right-border">
                        <p class="node-data">${current.data}</p>
                        <p>data</p>
                    </div>
                    <div class="square">
                        <p class="node-data">${current.next ? current.next.data : "null"}</p>
                        <p>next</p>
                    </div>
                    ${current.next ? `<span class="material-symbols-outlined">arrow_right_alt</span>` : ""}
                </div>
            </div>        
        `;
		current = current.next;
	}

	html += "<div></div>";
	return html;
}

export { LinkedList };
