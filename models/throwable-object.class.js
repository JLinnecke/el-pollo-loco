class ThrowableObject extends MovableObject {
    isFalling = true;
    
    
    IMAGE_SPIN_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGE_SPLASH_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Creates a new throwable object.
     * @param {number} x - The initial x position.
     * @param {number} y - The initial y position.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGE_SPIN_BOTTLE);
        this.loadImages(this.IMAGE_SPLASH_BOTTLE);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 60;
        this.offset = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 20
        };
        this.throw();
    }

    /**
     * Starts the throwing animation and movement.
     */
    throw() {
        this.speedY = 30;
        this.playThrowAudio();
        this.applyGravity();
        this.moveInterval = setStopInterval(() => {
            this.x += 10;
        }, 50);
        this.animationInterval = setStopInterval(() => {
            this.playAnimation(this.IMAGE_SPIN_BOTTLE);
        }, 80);
    }

    /**
    * Plays the splash animation.
    */
    splashBottle() {
        this.playBottleCrackAudio();
        setStopInterval(() => {
            this.playAnimation(this.IMAGE_SPLASH_BOTTLE);
        }, 250);
    }

    /**
    * Stops the falling and clears intervals.
    */
    stopFalling() {
        setTimeout(() => {
            this.isFalling = false;
            this.speedY = 0;
            this.acceleration = 0;
        
            clearInterval(this.moveInterval);
            clearInterval(this.animationInterval);   
        }, 50);
        
    }
    
    /**
     * Plays the bottle crack audio.
     */
    playBottleCrackAudio() {
        window.playSounds('bottle_Crack_Audio');
    }

    /**
     * Plays the throw audio.
     */
    playThrowAudio() {
        window.playSounds('throw_Audio');
    }
}