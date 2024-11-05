class Boss extends MovableObject {

    height = 460;
    width = 360;
    y = 0;
    energy = 160;

    IMAGES_SPAWNING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'

    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_DIE = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    hadFirstContact = false;
    
    /**
     * Initializes the boss, loads images, and starts animations.
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_SPAWNING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DIE);
        bossAlert = this.bossAlert;
        this.speed = 13.15;
        this.x = 2155;
        this.offset = {
            top: 80,
            bottom: 80,
            left: 50,
            right: 10
        };

        this.animate();
    }

    /**
     * Manages the boss's animations and movement.
     */
    animate() {
        let i = 0;
    
        this.walkingInterval = setStopInterval(() => {
            this.handleFirstContact();
            if (this.hadFirstContact) {
                if (i < this.IMAGES_SPAWNING.length) {
                    this.handleSpawningAnimation();
                    i++;
                } else {
                    this.handleWalkingAnimation();
                    this.moveLeft();
                }
            }
        }, 250);
        this.handleHurtAnimation();
        this.handleDeadAnimation();
    }
    
    /**
     * Checks if the boss has made first contact with the player.
     */
    handleFirstContact() {
        if (world.character.x > 1550 && !this.hadFirstContact) { 
            this.hadFirstContact = true;
            
            window.pauseSounds('game_Audio');
            this.playBossAlert();
            playBossFightMusic();
        }
    }
    
    /**
     * Plays the walking animation.
     */
    handleWalkingAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
    }
    
    /**
     * Plays the spawning animation.
     */
    handleSpawningAnimation() {
        this.playAnimation(this.IMAGES_SPAWNING);
    }

    /**
     * Plays the hurt animation when the boss is injured.
     */
    handleHurtAnimation() {
        setStopInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 100);
    }

    /**
     * Plays the death animation and stops the game when the boss dies.
     */
    
    handleDeadAnimation() {
        setStopInterval(() => {
            if (this.isDead()) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_DIE);
                this.gravityDie();
                world.checkBossStatus(this);
                world.drawWin();
                
                if (world.character) {
                    world.character.stopAllSounds();
                    world.character.stopAllIntervalsAndTimeouts();
                }

                setStopTimeout(() => {
                    this.resetCharacterAnimationSoundTimeoutsAndInterval();
                    stopGame();
                }, 1500);
            }
        }, 1000);
    }

    /**
    * Resets all sounds, intervals, and timeouts for the character.
    */
    resetCharacterAnimationSoundTimeoutsAndInterval() {
        world.character.stopAllSounds();
        world.character.stopAllIntervalsAndTimeouts();
    }

    /**
    * Plays the boss alert sound.
    */
    playBossAlert() {
        window.playSounds('boss_Alert');
    }
}