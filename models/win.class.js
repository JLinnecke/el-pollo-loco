class Win extends MovableObject {
    width = 720;
    height = 480;
    winner_audio = new Audio('audio/win_audio.mp3');

    /**
    * Creates a win screen.
    * @param {string} imagePath - Path to the win screen image.
    * @param {number} x - The x position of the win screen.
    */
    constructor(imagePath, x) {
        super().loadImage(imagePath); 
        this.x = x; 
        this.y = 480 - this.height; 
    }

    /**
    * Plays the win audio.
    */
    playWinGAmeAudio() {
        this.winner_audio.play();
    }
}