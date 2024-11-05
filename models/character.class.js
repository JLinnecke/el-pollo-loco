class Character extends MovableObject {
    x = 0;
    height = 200;
    width = 100;
    y = 230;
    speed = 2.5;
    world;
    idleTimeout = 0;
    longIdleTimeout = 0;
    longIdle = false;
    longIdleInterval = 0;
    isJumnping = false;
    
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
   
    IMAGES_JUMPING_UP = [
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
    ];
    IMAGES_JUMPING_DOWN = [
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ];
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    /**
     * Creates an instance of the Character class and initializes images and animations.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING_UP);
        this.loadImages(this.IMAGES_JUMPING_DOWN);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        
        this.gameOver = new GameOver();
        this.offset = {
            top: 80,
            bottom: 0,
            left: 10,
            right: 30
        };

        this.applyGravity();
        
        this.animate();
    }

    /**
     * Checks if the character is jumping on a movable object.
     * @param {MovableObject} mo - The movable object to check against.
     * @returns {boolean} - True if the character is jumping on the object.
     */
    isJumpingOn(mo) {
        return (
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.height - this.offset.bottom < mo.y + mo.offset.top + mo.height &&
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right
        );
    }

    /**
     * Handles character animation by triggering appropriate animations based on the state.
     */
    animate() {
        this.idleAnimation();
        this.handleMovement();
        this.handleWalkingAnimation();
        this.handleIsDeadAnimation();
        this.handleIsHurtAnimation();
        this.handleIsJumpingAnimation();
    }

    /**
     * Handles the character's movement and adjusts the camera position.
     */
    handleMovement() {
        setStopInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                if (!this.isJumping && !this.isAboveGround()) {
                    this.playWalkingAudio();
                }
            } 
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                if (!this.isJumping && !this.isAboveGround()) {
                    this.playWalkingAudio();
                }
            } 
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            this.world.camera_x = -this.x + 100;            
        }, 1000 / 60);
    }

    /**
     * Handles the character's death animation and triggers the game over sequence.
     */
    handleIsDeadAnimation() {
        setStopInterval(() => {
            if (this.isDead()) {
                this.playDeathEffects();
                this.endGame();
            }
        }, 250);
    }
    
    /**
     * Plays the character's death animation and audio.
     */
    playDeathEffects() {
        setTimeout(() => {
            this.gameOver.stopGameOverAudio();
        }, 2000);
        this.gameOver.playGameOverAudio();
        this.playAnimation(this.IMAGES_DEAD);
        this.playCharacterDieAudio();
        this.offset = {
            top: 0,
            bottom: -300,
            left: 0,
            right: 0
        };
        this.gravityDie();
    }
    
    /**
     * Ends the game and triggers the game over sequence.
     */
    endGame() {
        setTimeout(() => {
            this.world.isGameOver = true;
            this.stopAllSounds();
            this.stopAllIntervalsAndTimeouts();
            stopGame();
        }, 1500);
    }

    /**
     * Handles the character's hurt animation when damaged.
     */
    handleIsHurtAnimation() {
        setStopInterval(() => {
            if (this.isHurt()) {
                this.playCharacterHurtAudio();
                this.playAnimation(this.IMAGES_HURT);
            }
        }, 250);
    }

    /**
     * Handles the character's jumping animation when in the air.
     */
    handleIsJumpingAnimation() {
        setStopInterval(() => {
            if (this.isAboveGround()) {
                if (!this.isJumping) {
                    this.isJumping = true;
                }
                if (this.speedY > 0) {
                    this.playAnimation(this.IMAGES_JUMPING_UP);
                } else {
                    this.playAnimation(this.IMAGES_JUMPING_DOWN);
                }
            } else {
                this.isJumping = false;
            }
        }, 1000 / 10);
    }

    /**
     * Handles the character's walking animation when moving left or right.
     */
    handleWalkingAnimation() {
        setStopInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.resetTimeout();
            }
        }, 1000 / 10);
    }

   /**
     * Handles the character's idle animation when not moving.
     */
   handleIdleAnimation() {
    if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
        if (!this.idleTimeout) {
            this.idleTimeout = setTimeout(() => {
                if (!this.isLongIdle) {
                    this.playAnimation(this.IMAGES_IDLE);
                }
                this.idleTimeout = null;
            }, 500);
        }
    } else {
        this.resetTimeout();
        this.isLongIdle = false;
        }
    }

    /**
    * Handles the character's long idle animation when idle for an extended time.
    */
    handleLongIdleAnimation() {
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
            if (!this.longIdleTimeout) {
                this.longIdleTimeout = setTimeout(() => {
                    if (!this.world.isGameOver) {
                        this.longIdleAnimation();
                        this.playLongIdleAudio();
                        this.longIdleTimeout = null;
                        this.isLongIdle = true;
                    }
                }, 5000);
            }
        }
    }

    /**
     * Manages the idle and long idle animations.
     */
    idleAnimation() {
        setStopInterval(() => {
            this.handleIdleAnimation();
            this.handleLongIdleAnimation();
        }, 1000 / 10);
    }
    
    /**
     * Manages the long idle animation when the character remains idle for an extended time.
     */
    longIdleAnimation() {
        if (this.longIdleInterval) {
            clearInterval(this.longIdleInterval);
        }
        this.longIdleInterval = setStopInterval(() => {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        }, 1000 / 10);
    }

    /**
     * Resets the idle and long idle timeouts.
     */
    resetTimeout() {
        if (this.idleTimeout) {
            clearTimeout(this.idleTimeout);
            this.idleTimeout = null;
        }
        if (this.longIdleTimeout) {
            clearTimeout(this.longIdleTimeout);
            this.longIdleTimeout = null;
        }
        if (this.character_longidle) {
            window.pauseSounds('character_longidle_audio'); 
            this.character_longidle.currentTime = 0; 
        }
        if (this.longIdleInterval) {
            clearInterval(this.longIdleInterval);
            this.longIdleInterval = null;
        }
    }

    /**
     * Stops all sounds.
     */
    stopAllSounds() {
        window.pauseSounds('character_longidle_audio');
        window.pauseSounds('walking_Audio'); 
        window.pauseSounds('character_die_Audio'); 
        window.pauseSounds('character_hurt_Audio'); 
    }

    /**
     * Stops all timeouts related to the character.
     */
    stopAllIntervalsAndTimeouts() {
        this.resetTimeout();
    }

    /**
    * Plays walking sound.
    */
    playWalkingAudio() {
        window.playSounds('walking_Audio');
    }

    /**
    * Plays character death sound.
    */
    playCharacterDieAudio() {
        window.playSounds('character_die_Audio');
    }

    /**
    * Plays character hurt sound.
    */
    playCharacterHurtAudio() {
        window.playSounds('character_hurt_Audio');
    }

    /**
    * Plays long idle sound.
    */
    playLongIdleAudio() {
        window.playSounds('character_longidle_audio');
    }
}