const sounds = {
    boss_Alert : new Audio('audio/boss_alert.mp3'),
    coin_collect_Audio : new Audio('audio/coin.mp3'),
    bottle_collect_Audio : new Audio('audio/bottle_collect.mp3'),
    walking_Audio : new Audio('audio/walk.mp3'),
    character_die_Audio : new Audio('audio/character_die.mp3'),
    character_longidle_audio : new Audio('audio/long_idle.mp3'),
    character_hurt_Audio : new Audio('audio/character_hurt.mp3'),
    chicken_die_Audio : new Audio('audio/enemie_die.mp3'),
    smallChicken_die_Audio : new Audio('audio/enemie_die.mp3'),
    throw_Audio : new Audio('audio/throw.mp3'),
    bottle_Crack_Audio : new Audio('audio/bottle_crack.mp3'),
    gameOver_audio: new Audio('audio/game_over.mp3'),
    game_Audio: new Audio('audio/game_music.mp3'),
    menu_Audio: new Audio('audio/menu_audio.mp3'),
    boss_fight_Audio: new Audio('audio/boss_fight.mp3')
};

let isMuted = false;
let globalVolume = 0.01;

/**
 * Sets the volume for all game audio.
 */
function setGlobalVolume(volume) {
    globalVolume = volume;
    for (let sound in sounds) {
        sounds[sound].volume = globalVolume;
    }
}

/**
 * Mutes all game audio.
 */
function muteAudio() {
    isMuted = true;
    for (let sound in sounds) {
        sounds[sound].muted = true;
    }
    document.getElementById('muteButton').style.display = 'none';
    document.getElementById('unmuteButton').style.display = 'inline-block';
}

/**
 * Unmutes all game audio.
 */
function unMuteAudio() {
    isMuted = false;
    for (let sound in sounds) {
        sounds[sound].muted = false;
    }
    document.getElementById('muteButton').style.display = 'inline-block';
    document.getElementById('unmuteButton').style.display = 'none';
}

/**
 * Plays a specific sound by name and set the global volume.
 * @param {string} soundName - Name of the sound to play.
 */
function playSounds(soundName) {
    if (!isMuted && sounds[soundName]) {
        setGlobalVolume(globalVolume);
        sounds[soundName].play();
    }
}

/**
 * Pauses a specific sound by name.
 * @param {string} soundName - Name of the sound to pause.
 */
function pauseSounds(soundName) {
    if (sounds[soundName]) {
        sounds[soundName].pause();
        sounds[soundName].currentTime = 0;
    }
}

/**
 * Plays the main game music.
 */
function playAudioGame() {
    setGlobalVolume(globalVolume);
    sounds.game_Audio.play();
}

/**
 * Plays the boss fight music.
 */
function playBossFightMusic() {
    sounds.boss_fight_Audio.play();
}

/**
 * Plays the menu audio.
 */
function playAudioMenu() {
    setGlobalVolume(globalVolume);
    sounds.menu_Audio.play();
    document.getElementById('audioPlay').style.display = 'none';
    document.getElementById('audioPause').style.display = 'flex';
}

/**
 * Pauses the menu audio.
 */
function pauseAudioMenu() {
    sounds.menu_Audio.pause();
    document.getElementById('audioPlay').style.display = 'flex';
    document.getElementById('audioPause').style.display = 'none';
}


window.playSounds = playSounds;
window.pauseSounds = pauseSounds;
window.muteAudio = muteAudio;
window.unMuteAudio = unMuteAudio;
window.playAudioGame = playAudioGame;
window.playBossFightMusic = playBossFightMusic;
window.playAudioMenu = playAudioMenu;
window.pauseAudioMenu = pauseAudioMenu;