class Coinbar extends DrawableObject {
    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ];


    percentage = 0;

    /**
    * Initializes the coin bar with default settings.
    */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 0;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
    * Sets the percentage and updates the displayed image.
    * @param {number} percentage - The new percentage value.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImage()];
        this.img = this.imageCache[path];
    }

    /**
    * Increases the percentage by 20 if below 100.
    */
    increasePercentage() {
        if (this.percentage < 100) {
            this.setPercentage(this.percentage + 20); 
        } 
    }

    /**
    * Resolves the image index based on the current percentage.
    * @returns {number} The index of the image to use.
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
}

