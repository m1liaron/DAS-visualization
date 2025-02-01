
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

export function render() {
    return `
    <div class="visualization linked-list">
      <div class="node-container">
        <div class="node">
            <p class="square right-border">1</p>
            <p class="square">2</p>
            <span class="material-symbols-outlined">
                arrow_right_alt
            </span>
        </div>
        <div class="node">
            <p class="square right-border">2</p>
            <p class="square">7</p>
            <span class="material-symbols-outlined">
                arrow_right_alt
            </span>
        </div>
        <div class="node">
            <p class="square right-border">7</p>
            <p class="square">15</p>
            <span class="material-symbols-outlined">
                arrow_right_alt
            </span>
        </div>
        <div class="node">
            <p class="square right-border">15</p>
            <p class="square">null</p>
        </div>
      </div>
    </div>
  `;
}