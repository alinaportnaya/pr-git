// Об'єкти покемонів
const character = {
    name: "Pikachu",
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    attacks: {
        thunderJolt: 20,
        electroBall: 35
    }
};

const enemy = {
    name: "Charmander",
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    attacks: {
        fireBall: 25,
        flameCharge: 30
    }
};

// Створюємо кнопки
function createButtons() {
    const control = document.querySelector('.control');
    control.innerHTML = '';

    const thunderJoltBtn = document.createElement('button');
    thunderJoltBtn.classList.add('button');
    thunderJoltBtn.innerText = 'Thunder Jolt';
    
    const electroBallBtn = document.createElement('button');
    electroBallBtn.classList.add('button');
    electroBallBtn.innerText = 'Electro Ball';
    
    control.appendChild(thunderJoltBtn);
    control.appendChild(electroBallBtn);
    
    return {
        thunderJoltBtn,
        electroBallBtn
    };
}

// Функція для генерації випадкового числа
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функція для зміни HP
function changeHP(damage, person) {
    if (person.damageHP < damage) {
        person.damageHP = 0;
        alert(`${person.name} програв бій!`);
        disableButtons();
    } else {
        person.damageHP -= damage;
    }
    
    renderHP(person);
}

// Функція для рендерингу HP
function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

// Функція для рендерингу життів
function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

// Функція для рендерингу прогресбару
function renderProgressbarHP(person) {
    person.elProgressbar.style.width = person.damageHP + '%';
    
    // Зміна кольору прогресбару в залежності від кількості HP
    if (person.damageHP < 25) {
        person.elProgressbar.classList.add('critical');
        person.elProgressbar.classList.remove('low');
    } else if (person.damageHP < 50) {
        person.elProgressbar.classList.add('low');
        person.elProgressbar.classList.remove('critical');
    } else {
        person.elProgressbar.classList.remove('low', 'critical');
    }
}

// Функція атаки
function attack(attackType) {
    const characterDamage = 
        attackType === 'thunder' ? character.attacks.thunderJolt : character.attacks.electroBall;
    
    // Наносимо шкоду противнику
    changeHP(random(characterDamage - 5, characterDamage + 5), enemy);
    
    // Противник атакує у відповідь
    if (enemy.damageHP > 0) {
        const enemyAttack = Math.random() < 0.5 ? enemy.attacks.fireBall : enemy.attacks.flameCharge;
        changeHP(random(enemyAttack - 5, enemyAttack + 5), character);
    }
}

// Функція для відключення кнопок
function disableButtons() {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(btn => btn.disabled = true);
}

// Ініціалізація гри
function init() {
    console.log('Game Start!');
    
    const buttons = createButtons();
    
    buttons.thunderJoltBtn.addEventListener('click', () => attack('thunder'));
    buttons.electroBallBtn.addEventListener('click', () => attack('electro'));
    
    renderHP(character);
    renderHP(enemy);
}

init();