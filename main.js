// Завдання 1
const firstRow = 'Slow and steady wins the race';
const secondRow = 'You can say that again';

// Функція для підрахунку конкретної літери у рядку
function countLetter(str, letter) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i).toLowerCase() === letter.toLowerCase()) {
            count++;
        }
    }
    return count;
}

// Функція порівняння рядків
function getRow(firstRow, secondRow) {
    const firstCount = countLetter(firstRow, 'a');
    const secondCount = countLetter(secondRow, 'a');
    
    return firstCount > secondCount ? firstRow : secondRow;
}
// Тести для першого завдання
console.log(getRow(firstRow, secondRow)); // 'You can say that again'

// Інтерактивна версія першого завдання
function interactiveLetterCount() {
    const text1 = prompt('Введіть перший рядок:');
    const text2 = prompt('Введіть другий рядок:');
    const letterToCount = prompt('Яку літеру порахувати?');
    
    const count1 = countLetter(text1, letterToCount);
    const count2 = countLetter(text2, letterToCount);
    
    const result = count1 > count2 ? text1 : text2;
    alert(`Рядок з більшою кількістю літери '${letterToCount}': ${result}`);
}

// Завдання 2
function formattedPhone(phone) {
    let cleanPhone = phone.replace(/\D/g, '');

    if (cleanPhone.length === 10) {  // формат 0671234567
        cleanPhone = '38' + cleanPhone;
    } else if (cleanPhone.length === 11 && cleanPhone.startsWith('8')) {  // формат 80671234567
        cleanPhone = '3' + cleanPhone;
    }
    
    // Перевіряємо, чи маємо правильну довжину після обробки
    if (cleanPhone.length !== 12) {
        return 'Неправильний формат номера';
    }
    
    // Перевіряємо, чи починається з 380
    if (!cleanPhone.startsWith('380')) {
        return 'Неправильний формат номера';
    }
    
    // Форматуємо номер
    return `+${cleanPhone.slice(0, 2)} (${cleanPhone.slice(2, 5)}) ${cleanPhone.slice(5, 8)}-${cleanPhone.slice(8, 10)}-${cleanPhone.slice(10)}`;
}

// Тести для другого завдання
console.log(formattedPhone('+380664567890')); // +38 (066) 456-78-90
console.log(formattedPhone('80664567890'));   // +38 (066) 456-78-90
console.log(formattedPhone('0664567890'));    // +38 (066) 456-78-90
console.log(formattedPhone('380664567890'));  // +38 (066) 456-78-90

// Інтерактивна версія другого завдання
function interactivePhoneFormat() {
    const phoneNumber = prompt('Введіть номер телефону:');
    const formatted = formattedPhone(phoneNumber);
    alert(formatted);
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.style.textAlign = 'center';
    container.style.marginTop = '20px';

    const button1 = document.createElement('button');
    button1.textContent = 'Порахувати літери';
    button1.onclick = interactiveLetterCount;
    button1.style.margin = '10px';

    const button2 = document.createElement('button');
    button2.textContent = 'Форматувати телефон';
    button2.onclick = interactivePhoneFormat;
    button2.style.margin = '10px';

    container.appendChild(button1);
    container.appendChild(button2);
    document.body.appendChild(container);
});