class Bottlebar extends DrawableObject {
    
    percentage = 0;
    maxBottle = 5;

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];

    /**
    * Initializes the bottle bar and sets the initial percentage.
    */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 0;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
    * Sets the bottle bar's fill percentage.
    * @param {number} percentage - New percentage to set.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImage()];
        this.img = this.imageCache[path];
    }

    /**
    * Increases the bottle bar's fill percentage if possible.
    */
    increasePercentage() {
        if (this.canAddBottle()) {
            this.setPercentage(this.percentage + 20); 
        }
    }

    /**
    * Resolves the correct image index based on the current percentage.
    * @returns {number} The index of the image to display.
    */
    resolveImage() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
    * Adds a bottle to the bar if there's space.
    */
    addBottle() {
        if (this.percentage < 100) {
            this.percentage += 20;
        }
    }

    /**
    * Checks if a bottle can be added.
    * @returns {boolean} True if a bottle can be added.
    */
    canAddBottle() {
        return this.percentage < 100;
    }

    /**
    * Updates the bottle bar's image based on the current percentage.
    * @returns {number} The index of the image to display.
    */
    updateBottleBar() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}