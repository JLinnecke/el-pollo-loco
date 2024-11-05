class Bottle extends MovableObject {
    y = 350;
    x = 220;
    width = 80;
    height = 80;

    /**
    * Initializes the bottle with a random x-coordinate and the specified image.
    * @param {string} imagePath - The path to the bottle's image.
    */
    constructor(imagePath) {
        super().loadImage(imagePath);
        this.offset = {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10
        };
        this.x = Math.random() * 2000;
    }    
}
