let canvas;
let world;
let startscreen;
let keyboard = new Keyboard();
let intervalIds = [];
let timeoutIds = [];
let bossAlert;

/**
 * Starts the game by initializing the canvas, game world, and UI settings.
 * Adjusts display based on device type.
 */
function startGame() {
    checkMobileDevice();
    disableHeadFootMenu();
    hideRestartButton();

    canvas = document.getElementById('canvas');
    canvas.style.display = 'block';
    
    initLevel();
    world = new World(canvas, keyboard);

    hidePlayAndPauseButton();
    showMuteAndFullscreenButton();
    window.pauseSounds('menu_Audio');
    unMuteAudio();
    playAudioGame();
    checkStartWithMobileDevice();
}

/**
 * Checks if the game is started on a mobile device and enables fullscreen mode if true.
 */
function checkStartWithMobileDevice() {
    if(isMobileDevice()) {
        fullscreen();
        hideFullscreenButtons();
    }
}

/**
 * Enables fullscreen mode for the game canvas.
 */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
    canvas.style.width = '100%';
    canvas.style.height = '100vh';
    document.getElementById('enterFullscreenButton').style.display = 'none';
    document.getElementById('exitFullscreenButton').style.display = 'flex';
}

/**
 * Exits fullscreen mode and resets canvas size.
 */
function removeFullscreen() {
    exitFullscreen();
    document.getElementById('enterFullscreenButton').style.display = 'flex';
    document.getElementById('exitFullscreenButton').style.display = 'none';
    canvas.style.width = '720px';
    canvas.style.height = '480px';
}

/**
 * Requests fullscreen mode for the given element.
 * @param {HTMLElement} element - The element to enter fullscreen.
 */
function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
      canvas.style.width = '100%';
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
}

/**
 * Hides fullscreen toggle buttons.
 */
function hideFullscreenButtons() {
    document.getElementById('enterFullscreenButton').style.display = 'none';
    document.getElementById('exitFullscreenButton').style.display = 'none';
}


/**
 * Toggles the display of the introduction screen.
 */
function showIntroductions() {
    document.getElementById('introductions').classList.toggle('show');
    document.getElementById('menu').style.display = 'none';
    document.getElementById('headline').style.marginBottom = '0';
}

/**
 * Returns to the main menu from the introduction screen.
 */
function goBack() {
    document.getElementById('introductions').classList.remove('show');
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('headline').style.marginBottom = '64px';
}


/**
 * Hides the mute button.
 */
function hideMuteAndFullscreenButton() {
    document.getElementById('muteButton').style.display = 'none';
    document.getElementById('enterFullscreenButton').style.display = 'none';
    document.getElementById('exitFullscreenButton').style.display = 'none';
}

/**
 * Shows the mute and fullscreen button.
 */
function showMuteAndFullscreenButton() {
    document.getElementById('muteButton').style.display = 'flex';
    document.getElementById('enterFullscreenButton').style.display = 'flex';
}

/**
 * Hides the play button.
 */
function hidePlayAndPauseButton() {
    document.getElementById('audioPlay').style.display = 'none';
    document.getElementById('audioPause').style.display = 'none';
}

/**
 * Sets an interval and stores its ID.
 * @param {Function} fn - The function to execute at each interval.
 * @param {number} time - The time in milliseconds between executions.
 * @returns {number} The interval ID.
 */
function setStopInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
    return id;
}

function setStopTimeout(fn, time) {
    let id = setTimeout(fn, time);
    timeoutIds.push(id);
    return id;
}

/**
 * Stops all game intervals, timeouts, music, and shows the restart button.
 */
function stopGame() {
    intervalIds.forEach(clearInterval);
    timeoutIds.forEach(clearTimeout);
    window.pauseSounds('game_Audio');
    window.pauseSounds('boss_fight_Audio');
    showRestartButton();
}

/**
 * Hides the header, footer, and menu elements.
 */
function disableHeadFootMenu() {
    document.getElementById('headline').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('introductions').style.display = 'none';
}

/**
 * Shows the restart button.
 */
function showRestartButton() {
    document.getElementById('restartButton').classList.add('show');
    document.getElementById('goBackButton').classList.add('show');
}

/**
 * Hides the restart button.
 */
function hideRestartButton() {
    document.getElementById('restartButton').classList.remove('show');
    document.getElementById('goBackButton').classList.remove('show');
}


function goBackHome() {
    window.location.href = 'index.html';
}


/**
 * Checks if the device is mobile.
 * @returns {boolean} True if the device is mobile, false otherwise.
 */
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Displays mobile controls if the device is mobile.
 */
function checkMobileDevice() {
    if (isMobileDevice()) {
        document.getElementById('mobileControls').style.display = 'flex';
    } else {
        document.getElementById('mobileControls').style.display = 'none';
    }
}

/**
 * Checks the device orientation and displays a warning if in portrait mode.
 */
function checkOrientation() {
    if (isMobileDevice()) {
        if (window.innerHeight > window.innerWidth) {
            document.querySelector('.portrait-warning').style.display = 'flex';
        } else {
            document.querySelector('.portrait-warning').style.display = 'none';
        }
    } else {
        document.querySelector('.portrait-warning').style.display = 'none';
    }
}

/**
 * Adds touch event listeners to a button.
 * @param {string} buttonId - The ID of the button element.
 * @param {string} key - The key to control in the keyboard object.
 */
function addTouchEventListener(buttonId, key) {
    document.getElementById(buttonId).addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard[key] = true;
    });
    document.getElementById(buttonId).addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard[key] = false;
    });
}

/**
 * Initializes touch event listeners for mobile buttons.
 */
function mobileButtonsPressEvent() {
    addTouchEventListener('buttonLeft', 'LEFT');
    addTouchEventListener('buttonRight', 'RIGHT');
    addTouchEventListener('buttonJump', 'SPACE');
    addTouchEventListener('buttonThrow', 'D');
}


window.addEventListener('load', checkOrientation);


window.addEventListener('resize', checkOrientation);


window.addEventListener('load', () => {
    mobileButtonsPressEvent();
});

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});


window.addEventListener("keyup", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});