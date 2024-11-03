export const ATTACK_TYPES = {
    THUNDER_JOLT: 'thunderJolt',
    ELECTRO_BALL: 'electroBall',
    FIRE_BALL: 'fireBall',
    FLAME_CHARGE: 'flameCharge'
};

export const POKEMON_CONFIG = {
    PIKACHU: {
        name: "Pikachu",
        defaultHP: 100,
        attacks: {
            [ATTACK_TYPES.THUNDER_JOLT]: 20,
            [ATTACK_TYPES.ELECTRO_BALL]: 35
        }
    },
    CHARMANDER: {
        name: "Charmander",
        defaultHP: 100,
        attacks: {
            [ATTACK_TYPES.FIRE_BALL]: 25,
            [ATTACK_TYPES.FLAME_CHARGE]: 30
        }
    }
};

export const COLORS = {
    CRITICAL: '#d20000',
    MEDIUM: '#f1c40f',
    LOW: '#2ecc71'
};