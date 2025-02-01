import './style.css'
import javascriptLogo from './javascript.svg'
import {loadVisualization} from "./components/loadVisualization.js";
import {navigationRender} from "./components/navigationRender.js";
import {algorithms, dataStructures} from "./data/data.js";

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
          <h2>Visualization</h2>
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

// loadVisualization('bubbleSort', 'algorithms');
navigationRender(algorithms, dataStructures)