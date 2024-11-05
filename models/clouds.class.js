class Cloud extends MovableObject {
    y = 10;
    width = 400;
    height = 250;
    speed = 0.10;
    
    /**
    * Initializes the cloud with a random x-coordinate and starts animation.
    */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;
        this.animate();  
    }

    /**
    * Starts the cloud's animation.
    */
    animate() {
        this.moveLeft();
    }

    /**
    * Moves the cloud left at a constant speed.
    */
    moveLeft() {
        setStopInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}