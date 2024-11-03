import { Pokemon } from './pokemon.js';
import { ButtonManager } from './button-manager.js';
import { POKEMON_CONFIG, ATTACK_TYPES } from './constants.js';

export class Game {
    constructor() {
        this.character = null;
        this.enemy = null;
        this.buttonManager = null;
    }

    init() {
        console.log('Game Start!');
        
        this.character = new Pokemon({
            ...POKEMON_CONFIG.PIKACHU,
            elHP: document.getElementById('health-character'),
            elProgressbar: document.getElementById('progressbar-character')
        });

        this.enemy = new Pokemon({
            ...POKEMON_CONFIG.CHARMANDER,
            elHP: document.getElementById('health-enemy'),
            elProgressbar: document.getElementById('progressbar-enemy')
        });

        this.buttonManager = new ButtonManager(document.querySelector('.control'), 7);
        
        this.createButtons();
        this.renderInitialHP();
    }

    createButtons() {
        this.buttonManager.createButton('Thunder Jolt', () => this.performAttack(ATTACK_TYPES.THUNDER_JOLT));
        this.buttonManager.createButton('Electro Ball', () => this.performAttack(ATTACK_TYPES.ELECTRO_BALL));
    }

    performAttack(attackType) {
        const damage = this.character.attack(attackType);
        const isGameOver = this.enemy.changeHP(damage, this.character);
        
        if (!isGameOver) {
            this.performEnemyAttack();
        }
    }

    performEnemyAttack() {
        const enemyAttackType = Math.random() < 0.5 ? ATTACK_TYPES.FIRE_BALL : ATTACK_TYPES.FLAME_CHARGE;
        const enemyDamage = this.enemy.attack(enemyAttackType);
        this.character.changeHP(enemyDamage, this.enemy);
    }

    renderInitialHP() {
        this.character.renderHP();
        this.enemy.renderHP();
    }
}