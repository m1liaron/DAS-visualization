import './style.css'
import javascriptLogo from './javascript.svg'

document.querySelector('#app').innerHTML = `
  <div>
      <header>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
          <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
        </a>
        <h1>Data Structure and Algorithms Visualization</h1>
        <a href="https://github.com/m1liaron/DAS-visualization" target="_blank" class="read-the-docs">
          Github repo
        </a>
      </header>
      <nav id="sidebar">
            <h2>Algorithms & Data Structures</h2>
            <ul>
              <li data-view="bubbleSort">Bubble Sort</li>
              <li data-view="quickSort">Quick Sort</li>
              <li data-view="stack">Stack</li>
              <li data-view="queue">Queue</li>
              <!-- Add more items as needed -->
            </ul>
      </nav>
      <main id="content">
          <!-- Visualization will be rendered here -->
      </main>
  </div>
`

document.getElementById('sidebar').addEventListener('click', (e) => {
  if (e.target && e.target.matches('li[data-view]')) {
    const viewName = e.target.getAttribute('data-view');
    loadVisualization(viewName, 'algorithms');
  }
});

loadVisualization('bubbleSort', 'algorithms');