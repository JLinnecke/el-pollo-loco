class GameOver extends MovableObject {
    width = 720;
    height = 480;

    /**
    * Initializes the game over screen.
    */
    constructor() {
        super().loadImage('img/9_intro_outro_screens/game_over/game over.png'); 
        this.x = 0;
        this.y = 480 - this.height; 
    }

    /**
    * Plays the game over audio.
    */
    playGameOverAudio() {
        window.playSounds('gameOver_audio');
    }

    /**
    * Stops and resets the game over audio.
    */
    stopGameOverAudio() {
        window.pauseSounds('gameOver_audio');
    }
}