import "./style.css";
import { loadVisualization } from "./components/loadVisualization.js";
import { navigationRender } from "./components/navigationRender.js";
import { algorithms, dataStructures } from "./data/data.js";
import javascriptLogo from "./javascript.svg";

document.querySelector("#app").innerHTML = `
      <header>
      <button id="burger-menu" aria-label="Toggle Navigation">&#9776;</button>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
          <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
        </a>
        <h1>Data Structure and Algorithms Visualization</h1>
        <a href="https://github.com/m1liaron/DAS-visualization" target="_blank" class="read-the-docs">
          Github repo
        </a>
      </header>
      <div style="display: flex">
          <nav id="sidebar">
              <h2>Visualization</h2>
          </nav>
          <main id="content">
                <div class="selected-das">
                </div>
                <div class="visualization-container">
                    <h1>Choose something to see visualization!</h1>
                </div>
              <!-- Visualization will be rendered here -->
          </main>
    </div>
      <div id="overlay"></div>
`;

navigationRender(algorithms, dataStructures);

document.getElementById("sidebar").addEventListener("click", (e) => {
	if (e.target?.matches("span[data-view]")) {
		const viewName = e.target.getAttribute("data-view");
		const viewType = e.target.getAttribute("data-type");
		loadVisualization(viewName, viewType);
	}
});

// Burger Menu

const burgerMenu = document.getElementById("burger-menu");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

burgerMenu.addEventListener("click", () => {
	sidebar.classList.toggle("open");
	overlay.classList.toggle("active");
});

// Optionally, clicking the overlay should close the sidebar
overlay.addEventListener("click", () => {
	sidebar.classList.remove("open");
	overlay.classList.remove("active");
});
