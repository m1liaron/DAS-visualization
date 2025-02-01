
function createElement({
    elementName,
    className,
    textContent,
    attributes: { name, value },
}){
    const element = document.createElement(elementName);
    if(className) element.className = className;
    if(textContent) element.textContent = textContent;
    if(name) element.setAttribute(name, value);

    return element;
}

export { createElement };