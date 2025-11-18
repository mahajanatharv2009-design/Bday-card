// LONGER HAPPY BIRTHDAY SONG USING PURE JAVASCRIPT

let hasPlayed = false;

function playTone(freq, duration, startTime, audioCtx) {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.frequency.value = freq;
    oscillator.type = "sine";  // smoother sound

    // Fade out
    gainNode.gain.setValueAtTime(0.25, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
}

function playHappyBirthday() {
    if (hasPlayed) return;
    hasPlayed = true;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    // NOTES (Hz)
    const C4 = 261.63;
    const D4 = 293.66;
    const E4 = 329.63;
    const F4 = 349.23;
    const G4 = 392.00;
    const A4 = 440.00;
    const B4 = 493.88;
    const C5 = 523.25;

    // FULL SONG (played twice)
    let melody = [
        // "Happy birthday to you"
        [G4, 0.5], [G4, 0.5], [A4, 0.6], [G4, 0.6], [C5, 0.6], [B4, 1.0],

        // "Happy birthday to you"
        [G4, 0.5], [G4, 0.5], [A4, 0.6], [G4, 0.6], [D4, 0.6], [C4, 1.0],

        // "Happy birthday dear Maya"
        [G4, 0.5], [G4, 0.5], [G4, 0.6], [E4, 0.6], [C4, 0.6], [B4, 0.6], [A4, 1.0],

        // "Happy birthday to you"
        [F4, 0.5], [F4, 0.5], [E4, 0.6], [C4, 0.6], [D4, 0.6], [C4, 1.4]
    ];

    // repeat song to make it longer
    let longMelody = melody.concat(melody);

    let currentTime = audioCtx.currentTime;

    longMelody.forEach(note => {
        playTone(note[0], note[1], currentTime, audioCtx);
        currentTime += note[1] + 0.05; // tiny gap to make it smoother
    });

    // BIG ENDING NOTE 🎵
    playTone(C5, 2.0, currentTime + 0.2, audioCtx);
}

// Play when the user clicks ONCE
document.addEventListener("click", playHappyBirthday);
