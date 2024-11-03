import { createElement } from './utils.js';

export class ButtonManager {
    constructor(container, maxClicks = 6) {
        this.container = container;
        this.maxClicks = maxClicks;
        this.buttons = new Map();
    }

    createButton(text, callback) {
        const button = createElement('button', 'button');
        button.innerText = text;
        
        let clickCount = 0;
        
        button.onclick = (event) => {
            if (clickCount >= this.maxClicks) {
                console.log(`Кнопка "${text}" досягла ліміту натискань!`);
                button.disabled = true;
                return;
            }
            
            clickCount++;
            console.log(`Кнопка "${text}" натиснута ${clickCount} раз(ів). Залишилось натискань: ${this.maxClicks - clickCount}`);
            
            if (callback) {
                callback(event);
            }
        };
        
        this.container.appendChild(button);
        this.buttons.set(text, button);
        return button;
    }

    disableAllButtons() {
        this.buttons.forEach(button => button.disabled = true);
    }
}