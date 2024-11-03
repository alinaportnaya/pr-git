export const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const createElement = (tag, className) => {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
};