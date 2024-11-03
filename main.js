class Pokemon {
    constructor({ name, defaultHP, attacks, elHP, elProgressbar }) {
        Object.assign(this, { name, defaultHP, attacks, elHP, elProgressbar });
        this.damageHP = defaultHP;
    }

    generateLog(attacker, defender, damage) {
        const { name: attackerName } = attacker;
        const { name: defenderName, damageHP } = defender;
        
        const logs = [
            `${attackerName} вспомнил что-то важное, но неожиданно ${defenderName} нанес удар в ${damage} урона! (Осталось ${damageHP} HP)`,
            `${attackerName} поперхнулся, и за это ${defenderName} с испугу нанес удар в ${damage} урона! (Осталось ${damageHP} HP)`,
            `${attackerName} забылся, но в это время наглый ${defenderName} нанес удар в ${damage} урона! (Осталось ${damageHP} HP)`,
            `${attackerName} пришел в себя, но неожиданно ${defenderName} нанес удар в ${damage} урона! (Осталось ${damageHP} HP)`,
            `${attackerName} поперхнулся, но в это время ${defenderName} нанес удар в ${damage} урона! (Осталось ${damageHP} HP)`,
            `${attackerName} удивился, а ${defenderName} пошатнувшись нанес удар в ${damage} урона! (Осталось ${damageHP} HP)`,
            `${attackerName} высморкался, но неожиданно ${defenderName} провел удар в ${damage} урона! (Осталось ${damageHP} HP)`,
            `${attackerName} пошатнулся, и внезапно наглый ${defenderName} нанес удар в ${damage} урона! (Осталось ${damageHP} HP)`,
            `${attackerName} расстроился, как вдруг, неожиданно ${defenderName} нанес удар в ${damage} урона! (Осталось ${damageHP} HP)`,
            `${attackerName} пытался что-то сказать, но вдруг, неожиданно ${defenderName} нанес удар в ${damage} урона! (Осталось ${damageHP} HP)`
        ];
        
        const [min, max] = [0, logs.length - 1];
        return logs[random(min, max)];
    }

    changeHP(damage, enemy) {
        this.damageHP = this.damageHP < damage ? 0 : this.damageHP - damage;
        
        const log = this.generateLog(enemy, this, damage);
        const logEl = document.createElement('p');
        logEl.innerText = log;
        
        // Використовуємо деструктуризацію для кольорів
        const { critical = '#d20000', medium = '#f1c40f', low = '#2ecc71' } = {};
        
        logEl.style.color = damage >= 35 ? critical : 
                           damage >= 20 ? medium : low;
        
        const { firstChild } = document.querySelector('#logs');
        document.querySelector('#logs').insertBefore(logEl, firstChild);
        
        this.renderHP();
        
        if (this.damageHP === 0) {
            alert(`${this.name} проиграл бой!`);
            disableButtons();
        }
    }

    renderHP() {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife() {
        const { damageHP, defaultHP, elHP } = this;
        elHP.innerText = `${damageHP} / ${defaultHP}`;
    }

    renderProgressbarHP() {
        const { damageHP, defaultHP, elProgressbar } = this;
        const percentage = (damageHP / defaultHP) * 100;
        
        elProgressbar.style.width = `${percentage}%`;
        
        const { classList } = elProgressbar;
        
        if (percentage < 25) {
            classList.add('critical');
            classList.remove('low');
        } else if (percentage < 50) {
            classList.add('low');
            classList.remove('critical');
        } else {
            classList.remove('low', 'critical');
        }
    }

    attack(attackType) {
        const { [attackType]: damage } = this.attacks;
        return random(damage - 5, damage + 5);
    }
}

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createButtons = () => {
    const control = document.querySelector('.control');
    control.innerHTML = '';

    const buttons = {
        thunderJoltBtn: {
            class: 'button',
            text: 'Thunder Jolt'
        },
        electroBallBtn: {
            class: 'button',
            text: 'Electro Ball'
        }
    };

    return Object.entries(buttons).reduce((acc, [key, { class: className, text }]) => {
        const button = document.createElement('button');
        button.classList.add(className);
        button.innerText = text;
        control.appendChild(button);
        acc[key] = button;
        return acc;
    }, {});
};

const disableButtons = () => {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(btn => btn.disabled = true);
};

const character = new Pokemon({
    name: "Pikachu",
    defaultHP: 100,
    attacks: {
        thunderJolt: 20,
        electroBall: 35
    },
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character')
});

const enemy = new Pokemon({
    name: "Charmander",
    defaultHP: 100,
    attacks: {
        fireBall: 25,
        flameCharge: 30
    },
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy')
});

const performAttack = (attackType) => {
    const damage = character.attack(attackType);
    enemy.changeHP(damage, character);
    
    if (enemy.damageHP > 0) {
        const { fireBall, flameCharge } = enemy.attacks;
        const enemyAttackType = Math.random() < 0.5 ? 'fireBall' : 'flameCharge';
        const enemyDamage = enemy.attack(enemyAttackType);
        character.changeHP(enemyDamage, enemy);
    }
};

const init = () => {
    console.log('Game Start!');
    
    const { thunderJoltBtn, electroBallBtn } = createButtons();
    
    thunderJoltBtn.addEventListener('click', () => performAttack('thunderJolt'));
    electroBallBtn.addEventListener('click', () => performAttack('electroBall'));
    
    character.renderHP();
    enemy.renderHP();
};

init();