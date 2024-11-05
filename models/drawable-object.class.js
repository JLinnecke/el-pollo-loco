class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 180;
    height = 150;
    width = 80;

    /**
    * Loads an image from the given path.
    * @param {string} path - The path to the image.
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
    * Draws the image on the canvas.
    * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
    */
    draw(ctx) {
        try {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.warn('Error loading image', e);
            console.log('could not load image', this.img.src);
        }
    }

    /**
    * Draws a frame around the object for debugging.
    * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
    */
    //drawFrame(ctx) {
    //    if (this instanceof Character || this instanceof Chicken || this instanceof Coins || this instanceof Bottle || this instanceof Boss || this instanceof ThrowableObject || this instanceof SmallChicken) {
    //        const offsetX = this.offset.left;
    //        const offsetY = this.offset.top;
    //        const offsetWidth = this.width - this.offset.left - this.offset.right;
    //        const offsetHeight = this.height - this.offset.top - this.offset.bottom;
    //        ctx.beginPath();
    //        ctx.lineWidth = '2';
    //        ctx.strokeStyle = 'red';
    //        ctx.rect(this.x + offsetX, this.y + offsetY, offsetWidth, offsetHeight);
    //        ctx.stroke();
    //    }
    //}

    /**
    * Loads multiple images and caches them.
    * @param {string[]} arr - Array of image paths.
    */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}