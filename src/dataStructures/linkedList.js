
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
}

export function render() {
    return `
    <div class="visualization linked-list">
      <div class="node-container">
        <div class="node">Head</div>
        <div class="node">Node 1</div>
        <div class="node">Node 2</div>
        <div class="node">Tail</div>
      </div>
    </div>
  `;
}