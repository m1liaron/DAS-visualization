import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Data Structure and Algorithms Visualization</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <a href="https://github.com/m1liaron/DAS-visualization" target="_blank" class="read-the-docs">
      Github repo
    </a>
  </div>
`

setupCounter(document.querySelector('#counter'))
