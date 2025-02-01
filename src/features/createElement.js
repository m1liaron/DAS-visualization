
function createElement({
    elementName,
    className,
    textContent,
    attributes: { name, value },
    placeHolder
}){
    const element = document.createElement(elementName);
    if(className) element.className = className;
    if(textContent) element.textContent = textContent;
    if(name) element.setAttribute(name, value);
    if(placeHolder) element.placeHolder = placeHolder;

    return element;
}

export { createElement };