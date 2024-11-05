class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    y = 230;
    speedY = 0;
    acceleration = 2.5; 
    energy = 100;
    lastHit = 0;
    coins = 0;
    bottles = 0;
    collectedBottles = [];
    offset = {
       top: 0,
       bottom: 0,
       left: 0,
       right: 0
    };

    /**
    * Applies gravity to the object.
    */
    applyGravity() {
        setStopInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } 
        }, 1000/25);
    }

    /**
    * Applies gravity after the object dies.
    */
    gravityDie() {
        this.speedY = 0;
        setStopInterval(() => {
            this.y += this.speedY;
            this.speedY += this.acceleration * 0.5;
        }, 1000 / 25);
    }

    /**
    * Checks if the object is above ground.
    * @returns {boolean} True if above ground, false otherwise.
    */
    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return  true;
        } else {
            return this.y < 230;
        }
    }

    /**
    * Checks if the object is colliding with another object.
    * @param {MovableObject} mo - The object to check collision with.
    * @returns {boolean} True if colliding, false otherwise.
    */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    /**
    * Reduces the object's energy when hit.
    */
    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        
    }

    /**
    * Removes the object from the game.
    */
    removeFromGame() {
        const index = world.level.enemies.indexOf(this);
        if (index > -1) {
            world.level.enemies.splice(index, 1);
        }
    }

    /**
    * Checks if the object is currently hurt.
    * @returns {boolean} True if hurt, false otherwise.
    */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
    * Checks if the object is dead.
    * @returns {boolean} True if dead, false otherwise.
    */
    isDead() {
        return this.energy == 0;
    }

    /**
    * Collects a coin and plays a sound.
    * @param {Object} coin - The coin to collect.
    * @param {Array} coinsArray - The array of coins.
    */
    collectCoin(coin, coinsArray) {
        this.coins += 1;
        this.collectCoinAudio();

        this.isCoinCollected(coin, coinsArray);
    }

    /**
    * Removes the collected coin from the array.
    * @param {Object} coin - The collected coin.
    * @param {Array} coinsArray - The array of coins.
    */
    isCoinCollected(coin, coinsArray) {
        const index = coinsArray.indexOf(coin);
        if (index > -1) {
            coinsArray.splice(index, 1);
        }
    }

    /**
    * Collects a bottle.
    * @param {Object} bottle - The bottle to collect.
    * @param {Array} bottlesArray - The array of bottles.
    */
    collectBottle(bottle, bottlesArray) {
        if (this.collectedBottles.length < 5) {
            this.collectBottleAudio();
            this.collectedBottles.push(bottle);
            this.isBottleCollected(bottle, bottlesArray);
        }
    }

    /**
    * Removes the collected bottle from the array.
    * @param {Object} bottle - The collected bottle.
    * @param {Array} bottlesArray - The array of bottles.
    */
    isBottleCollected(bottle, bottlesArray) {
        const index = bottlesArray.indexOf(bottle);
            if (index > -1) {
                bottlesArray.splice(index, 1);
            }
    }

    /**
    * Gets the number of collected bottles.
    * @returns {number} The count of collected bottles.
    */
    getCollectedBottlesCount() {
        return this.collectedBottles.length;
    }

    /**
    * Plays an animation using a sequence of images.
    * @param {string[]} images - The image paths for the animation.
    */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
    * Moves the object to the right.
    */
    moveRight() {
        this.x += this.speed;
    }

    /**
    * Moves the object to the left.
    */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
    * Makes the object jump.
    */
    jump() {
        this.speedY = 25;
    }

    /**
    * plays sound if coin collected.
    */
    collectCoinAudio() {
        window.playSounds('coin_collect_Audio');
    }

    /**
    * plays sound if bottle collected.
    */
    collectBottleAudio() {
        window.playSounds('bottle_collect_Audio');
    }
}