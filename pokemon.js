import { random, createElement } from './utils.js';
import { COLORS } from './constants.js';

export class Pokemon {
    constructor({ name, defaultHP, attacks, elHP, elProgressbar }) {
        this.name = name;
        this.defaultHP = defaultHP;
        this.damageHP = defaultHP;
        this.attacks = attacks;
        this.elHP = elHP;
        this.elProgressbar = elProgressbar;
    }

    generateLog(attacker, defender, damage) {
        const logs = [
            `${attacker.name} вспомнил что-то важное, но неожиданно ${defender.name} нанес удар в ${damage} урона! (Осталось ${defender.damageHP} HP)`,
            `${attacker.name} поперхнулся, и за это ${defender.name} с испугу нанес удар в ${damage} урона! (Осталось ${defender.damageHP} HP)`,
            `${attacker.name} забылся, но в это время наглый ${defender.name} нанес удар в ${damage} урона! (Осталось ${defender.damageHP} HP)`,
            `${attacker.name} пришел в себя, но неожиданно ${defender.name} нанес удар в ${damage} урона! (Осталось ${defender.damageHP} HP)`,
            `${attacker.name} поперхнулся, но в это время ${defender.name} нанес удар в ${damage} урона! (Осталось ${defender.damageHP} HP)`,
            `${attacker.name} удивился, а ${defender.name} пошатнувшись нанес удар в ${damage} урона! (Осталось ${defender.damageHP} HP)`,
            `${attacker.name} высморкался, но неожиданно ${defender.name} провел удар в ${damage} урона! (Осталось ${defender.damageHP} HP)`,
            `${attacker.name} пошатнулся, и внезапно наглый ${defender.name} нанес удар в ${damage} урона! (Осталось ${defender.damageHP} HP)`,
            `${attacker.name} расстроился, как вдруг, неожиданно ${defender.name} нанес удар в ${damage} урона! (Осталось ${defender.damageHP} HP)`,
            `${attacker.name} пытался что-то сказать, но вдруг, неожиданно ${defender.name} нанес удар в ${damage} урона! (Осталось ${defender.damageHP} HP)`
        ];
        
        return logs[random(0, logs.length - 1)];
    }

    changeHP(damage, enemy) {
        this.damageHP = Math.max(0, this.damageHP - damage);
        
        this.renderHP();
        this.logBattle(enemy, damage);
        
        if (this.damageHP === 0) {
            this.onDefeat();
            return true;
        }
        return false;
    }

    logBattle(enemy, damage) {
        const log = this.generateLog(enemy, this, damage);
        const logEl = createElement('p');
        logEl.innerText = log;
        
        logEl.style.color = damage >= 35 ? COLORS.CRITICAL : 
                           damage >= 20 ? COLORS.MEDIUM : COLORS.LOW;
        
        const logsContainer = document.querySelector('#logs');
        logsContainer.insertBefore(logEl, logsContainer.firstChild);
    }

    onDefeat() {
        alert(`${this.name} проиграл бой!`);
        this.disableAllButtons();
    }

    disableAllButtons() {
        document.querySelectorAll('.button').forEach(btn => btn.disabled = true);
    }

    renderHP() {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife() {
        this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
    }

    renderProgressbarHP() {
        const percentage = (this.damageHP / this.defaultHP) * 100;
        this.elProgressbar.style.width = `${percentage}%`;
        
        const { classList } = this.elProgressbar;
        
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
        const baseDamage = this.attacks[attackType];
        return random(baseDamage - 5, baseDamage + 5);
    }
}