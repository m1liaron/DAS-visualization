
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
        if(!this.head) {
            this.head = newNode;
        } else {
            let current = this.head
            while(current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
    }

    toArray() {
        const result = [];
        let current = this.head;
        while(current) {
            result.push(current.data);
            current = current.next;
        }
        return result;
    }
}

export function render(data, newNodeValue = null) {
    if(!data.head) return "<p>The data is empty, add something!🔴🔴</p>";

    let current = data.head;
    let html = `<div class="node-container">`;

    while(current) {
        let highlightClass = current.data === newNodeValue ? "new-node" : "";
        html += `
            <div class="node ${highlightClass}">
                <p class="square right-border">${current.data}</p>
                <p class="square">${current.next ? current.next.data : "null"}</p>
                ${current.next ? `<span class="material-symbols-outlined">arrow_right_alt</span>` : ""}
            </div>`;
        current = current.next;
    }

    html += '<div></div>'
    return html;
}


export { LinkedList }