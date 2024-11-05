class World {
    character = new Character();
    level = level1;
    boss = new Boss();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthbar = new Healthbar();
    coinbar = new Coinbar();
    bottlebar = new Bottlebar();
    isGameOver = false;
    isWin = false;
    throwableObject = [];

    /**
    * Initializes the world with the canvas and starts the game loop.
    * @param {HTMLCanvasElement} canvas - The canvas to draw on.
    */
    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
    * Links the character to the world instance.
    */
    setWorld() {
        this.character.world = this;
    }

    /**
    * Starts the game loop, checking collisions and handling actions.
    */
    run() {
        setStopInterval(() => {
            this.checkCollisions();
            this.throw();
        }, 100);
    }

    /**
    * Handles the throwing of bottles by the character.
    */
    throw() {
        if (this.keyboard.D && this.character.collectedBottles.length > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObject.push(bottle);
            this.character.collectedBottles.splice(-1, 1);
            this.bottlebar.setPercentage(this.character.collectedBottles.length * 20);
            this.keyboard.D = false;
        }
    }

    /**
    * Checks all collision types within the game world.
    */
    checkCollisions() {
        this.checkCharacterHitCollision();
        this.checkCollectablesCollision();
        this.checkJumpOnEnemyCollisions();
        this.checkThrowableObjectCollision();
    }

    /**
    * Checks if the character collides with any enemies.
    */
    checkCharacterHitCollision() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                if (enemy instanceof Boss || !this.character.isJumpingOn(enemy)) {
                    this.character.hit();
                    this.healthbar.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
    * Checks for collisions between the character and collectable items.
    */
    checkCollectablesCollision() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoin(coin, this.level.coins);
                this.coinbar.increasePercentage(this.character.coins);
            }
        });
        this.level.bottle.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottle(bottle, this.level.bottle);
                this.bottlebar.increasePercentage(this.character.bottles);
            }
        });
    }

    /**
    * Checks if the character jumps on any enemies.
    */
    checkJumpOnEnemyCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isJumpingOn(enemy)) {
                if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                    enemy.hit();
                }
            }
        });
    }

    /**
    * Checks if throwable objects collide with any enemies.
    */
    checkThrowableObjectCollision() {
        this.level.enemies.forEach(enemy => {
            this.throwableObject.forEach((bottle, index) => {
                if (bottle.isColliding(enemy)) {
                    enemy.hit();
                    bottle.stopFalling();
                    bottle.splashBottle();
                    
                    setTimeout(() => {
                        this.throwableObject.splice(index, 1);
                    }, 300);
                }
            });
        });
    }
    
    /**
    * Draws all elements of the game world on the canvas.
    */
    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);

        this.drawStatusBar();
        this.ctx.translate(this.camera_x, 0);
        
        this.drawLevelObjects();
        this.ctx.translate(-this.camera_x, 0);

        this.drawGameOver();
        this.drawWin();

        this.selfDraw();
    }

    /**
    * Draws the status bars (health, coins, bottles).
    */
    drawStatusBar() {
        this.addToMap(this.healthbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
    }

    /**
    * Draws all objects in the level.
    */
    drawLevelObjects() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObject);
    }

    /**
    * Recursively draws the game elements, using requestAnimationFrame.
    */
    selfDraw() {
        self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    /**
    * Draws the game over screen if the game is over.
    */
    drawGameOver() {
        if (this.isGameOver) {
            this.addObjectsToMap(this.level.gameOver);;
        }
    }

    /**
    * Checks if the character is dead to determine if the game is over.
    * @param {Character} character - The character to check.
    */
    checkCharacterStatus(character) {
        if (character.isDead()) {
            this.isGameOver = true;
        }
    }

    /**
    * Draws the win screen if the player wins.
    */
    drawWin() {
        if (this.isWin) {
            this.addObjectsToMap(this.level.win);
        } 
    }

    /**
    * Checks if the boss is dead to determine if the player wins.
    * @param {Boss} boss - The boss to check.
    */
    checkBossStatus(boss) {
        
        if (boss.isDead()) {
            
            this.isWin = true;
        }
    }

    /**
    * Adds an array of objects to the canvas.
    * @param {DrawableObject[]} objects - The objects to add to the map.
    */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
    * Adds a single object to the canvas, with optional flipping.
    * @param {DrawableObject} mo - The object to draw.
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        //mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }  

    /**
    * Flips an image horizontally before drawing it.
    * @param {DrawableObject} mo - The object to flip.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    * Restores the original orientation after flipping the image.
    * @param {DrawableObject} mo - The object to flip back.
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}