// Базовий клас для покемона
class Pokemon {
    constructor(name, defaultHP, attacks, elHP, elProgressbar) {
        this.name = name;
        this.defaultHP = defaultHP;
        this.damageHP = defaultHP;
        this.elHP = elHP;
        this.elProgressbar = elProgressbar;
        this.attacks = attacks;
    }

    // Метод для зміни HP
    changeHP(damage) {
        if (this.damageHP < damage) {
            this.damageHP = 0;
            alert(`${this.name} програв бій!`);
            disableButtons();
        } else {
            this.damageHP -= damage;
        }
        
        this.renderHP();
    }

    // Метод для рендерингу HP
    renderHP() {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    // Метод для рендерингу життів
    renderHPLife() {
        this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    }

    // Метод для рендерингу прогресбару
    renderProgressbarHP() {
        this.elProgressbar.style.width = this.damageHP + '%';
        
        // Зміна кольору прогресбару в залежності від кількості HP
        if (this.damageHP < 25) {
            this.elProgressbar.classList.add('critical');
            this.elProgressbar.classList.remove('low');
        } else if (this.damageHP < 50) {
            this.elProgressbar.classList.add('low');
            this.elProgressbar.classList.remove('critical');
        } else {
            this.elProgressbar.classList.remove('low', 'critical');
        }
    }

    // Метод для атаки
    attack(attackType) {
        const damage = this.attacks[attackType];
        return random(damage - 5, damage + 5);
    }
}

// Функція для генерації випадкового числа
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

// Функція для відключення кнопок
function disableButtons() {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(btn => btn.disabled = true);
}

// Створюємо екземпляри покемонів
const character = new Pokemon(
    "Pikachu",
    100,
    {
        thunderJolt: 20,
        electroBall: 35
    },
    document.getElementById('health-character'),
    document.getElementById('progressbar-character')
);

const enemy = new Pokemon(
    "Charmander",
    100,
    {
        fireBall: 25,
        flameCharge: 30
    },
    document.getElementById('health-enemy'),
    document.getElementById('progressbar-enemy')
);

// Функція атаки
function performAttack(attackType) {
    // Атака персонажа
    const damage = character.attack(attackType);
    enemy.changeHP(damage);
    
    // Атака противника у відповідь
    if (enemy.damageHP > 0) {
        const enemyAttackType = Math.random() < 0.5 ? 'fireBall' : 'flameCharge';
        const enemyDamage = enemy.attack(enemyAttackType);
        character.changeHP(enemyDamage);
    }
}

// Ініціалізація гри
function init() {
    console.log('Game Start!');
    
    const buttons = createButtons();
    
    buttons.thunderJoltBtn.addEventListener('click', () => performAttack('thunderJolt'));
    buttons.electroBallBtn.addEventListener('click', () => performAttack('electroBall'));
    
    character.renderHP();
    enemy.renderHP();
}

init();