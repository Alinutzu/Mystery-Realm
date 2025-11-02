// ==================== SOUND SYSTEM ====================

class SoundManager {
    constructor() {
        this.enabled = true;
        this.volume = 0.5;
        this.sounds = {};
        this.musicEnabled = true;
        this.musicVolume = 0.3;
        this.currentMusic = null;
        
        this.initializeSounds();
    }

    initializeSounds() {
        // Folosim Web Audio API pentru a genera sunete sintetice
        // (nu necesită fișiere externe!)
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        console.log('🔊 Sound System initialized');
    }

    // ==================== SOUND GENERATORS ====================
    
    playClick() {
        if (!this.enabled) return;
        this.playTone(800, 0.05, 'sine', 0.1);
    }

    playHover() {
        if (!this.enabled) return;
        this.playTone(600, 0.03, 'sine', 0.05);
    }

    playPurchase() {
        if (!this.enabled) return;
        // Chord progressiv pentru purchase
        this.playTone(523, 0.1, 'sine', 0.15); // C
        setTimeout(() => this.playTone(659, 0.1, 'sine', 0.15), 50); // E
        setTimeout(() => this.playTone(784, 0.15, 'sine', 0.2), 100); // G
    }

    playError() {
        if (!this.enabled) return;
        this.playTone(200, 0.2, 'sawtooth', 0.15);
    }

    playSuccess() {
        if (!this.enabled) return;
        // Arpegiu ascendent
        const notes = [523, 659, 784, 1047]; // C E G C
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.1, 'sine', 0.15), i * 80);
        });
    }

    playNotification() {
        if (!this.enabled) return;
        this.playTone(1000, 0.1, 'sine', 0.2);
        setTimeout(() => this.playTone(1200, 0.15, 'sine', 0.2), 100);
    }

    playReward() {
        if (!this.enabled) return;
        // Fanfare pentru rewards
        const notes = [392, 523, 659, 784, 1047]; // G C E G C
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 0.12, 'triangle', 0.18), i * 60);
        });
    }

    playLevelUp() {
        if (!this.enabled) return;
        // Sweep ascendent dramatic
        this.playSweep(400, 1200, 0.3, 'triangle', 0.25);
    }

    playGuardianSummon(rarity) {
        if (!this.enabled) return;
        
        switch(rarity) {
            case 'common':
                this.playTone(440, 0.2, 'sine', 0.15);
                break;
            case 'rare':
                this.playTone(440, 0.15, 'sine', 0.18);
                setTimeout(() => this.playTone(554, 0.2, 'sine', 0.18), 100);
                break;
            case 'epic':
                this.playReward();
                break;
            case 'legendary':
                this.playFanfare();
                break;
        }
    }

    playFanfare() {
        if (!this.enabled) return;
        // Epic fanfare pentru evenimente majore
        const melody = [
            {freq: 523, dur: 0.15}, // C
            {freq: 659, dur: 0.15}, // E
            {freq: 784, dur: 0.15}, // G
            {freq: 1047, dur: 0.3}, // C high
            {freq: 784, dur: 0.15}, // G
            {freq: 1047, dur: 0.4}  // C high final
        ];
        
        let time = 0;
        melody.forEach(note => {
            setTimeout(() => this.playTone(note.freq, note.dur, 'triangle', 0.25), time);
            time += note.dur * 1000;
        });
    }

    playBossDefeat() {
        if (!this.enabled) return;
        // Epic victory theme
        this.playFanfare();
        setTimeout(() => {
            this.playSweep(200, 800, 0.5, 'sawtooth', 0.2);
        }, 800);
    }

    playPuzzleMatch() {
        if (!this.enabled) return;
        this.playTone(800 + Math.random() * 400, 0.08, 'sine', 0.12);
    }

    playPuzzleCombo(comboLevel) {
        if (!this.enabled) return;
        const baseFreq = 600;
        const freq = baseFreq + (comboLevel * 100);
        this.playTone(freq, 0.1, 'triangle', 0.15 + (comboLevel * 0.05));
    }

    playAscension() {
        if (!this.enabled) return;
        // Dramatic ascension sound
        this.playSweep(200, 2000, 1.0, 'sine', 0.3);
        setTimeout(() => {
            this.playFanfare();
        }, 500);
    }

    playQuestComplete() {
        if (!this.enabled) return;
        this.playSuccess();
    }

    playAchievementUnlock() {
        if (!this.enabled) return;
        this.playFanfare();
    }

    playShopOpen() {
        if (!this.enabled) return;
        this.playTone(1000, 0.1, 'sine', 0.15);
    }

    playCoins() {
        if (!this.enabled) return;
        // Sunet de monede
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.playTone(800 + Math.random() * 400, 0.05, 'square', 0.1);
            }, i * 30);
        }
    }

    // ==================== CORE AUDIO FUNCTIONS ====================

    playTone(frequency, duration, type = 'sine', volumeOverride = null) {
        if (!this.enabled) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type; // 'sine', 'square', 'sawtooth', 'triangle'

            const vol = volumeOverride !== null ? volumeOverride : this.volume;
            gainNode.gain.setValueAtTime(vol, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (e) {
            console.warn('Audio playback failed:', e);
        }
    }

    playSweep(startFreq, endFreq, duration, type = 'sine', volumeOverride = null) {
        if (!this.enabled) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.type = type;
            oscillator.frequency.setValueAtTime(startFreq, this.audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(endFreq, this.audioContext.currentTime + duration);

            const vol = volumeOverride !== null ? volumeOverride : this.volume;
            gainNode.gain.setValueAtTime(vol, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (e) {
            console.warn('Audio sweep failed:', e);
        }
    }

    // ==================== BACKGROUND MUSIC ====================

    startBackgroundMusic() {
        if (!this.musicEnabled || this.currentMusic) return;

        try {
            // Ambient background music - repetitive calming tones
            this.playAmbientLoop();
            
            // Repeat every 8 seconds
            this.musicInterval = setInterval(() => {
                if (this.musicEnabled) {
                    this.playAmbientLoop();
                }
            }, 8000);

            this.currentMusic = 'ambient';
            console.log('🎵 Background music started');
        } catch (e) {
            console.warn('Background music failed:', e);
        }
    }

    playAmbientLoop() {
        if (!this.musicEnabled) return;

        // Calm ambient chord progression
        const chords = [
            [261.63, 329.63, 392.00], // C major
            [293.66, 369.99, 440.00], // D minor
            [329.63, 415.30, 493.88], // E minor
            [349.23, 440.00, 523.25]  // F major
        ];

        chords.forEach((chord, i) => {
            setTimeout(() => {
                if (!this.musicEnabled) return;
                chord.forEach(freq => {
                    this.playTone(freq, 2.0, 'sine', this.musicVolume * 0.15);
                });
            }, i * 2000);
        });
    }

    stopBackgroundMusic() {
        if (this.musicInterval) {
            clearInterval(this.musicInterval);
            this.musicInterval = null;
        }
        this.currentMusic = null;
        console.log('🎵 Background music stopped');
    }

    // ==================== SETTINGS ====================

    toggleSound() {
        this.enabled = !this.enabled;
        this.saveSettings();
        
        if (this.enabled) {
            this.playSuccess();
        }
        
        return this.enabled;
    }

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        this.saveSettings();

        if (this.musicEnabled) {
            this.startBackgroundMusic();
        } else {
            this.stopBackgroundMusic();
        }

        return this.musicEnabled;
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        this.saveSettings();
    }

    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        this.saveSettings();
    }

    saveSettings() {
        const settings = {
            enabled: this.enabled,
            volume: this.volume,
            musicEnabled: this.musicEnabled,
            musicVolume: this.musicVolume
        };
        localStorage.setItem('soundSettings', JSON.stringify(settings));
    }

    loadSettings() {
        const saved = localStorage.getItem('soundSettings');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                this.enabled = settings.enabled ?? true;
                this.volume = settings.volume ?? 0.5;
                this.musicEnabled = settings.musicEnabled ?? true;
                this.musicVolume = settings.musicVolume ?? 0.3;
            } catch (e) {
                console.warn('Failed to load sound settings:', e);
            }
        }
    }

    // ==================== PRESETS ====================

    playUISound(action) {
        const sounds = {
            'click': () => this.playClick(),
            'hover': () => this.playHover(),
            'purchase': () => this.playPurchase(),
            'error': () => this.playError(),
            'success': () => this.playSuccess(),
            'notification': () => this.playNotification(),
            'reward': () => this.playReward(),
            'levelup': () => this.playLevelUp(),
            'coins': () => this.playCoins()
        };

        if (sounds[action]) {
            sounds[action]();
        }
    }
}

// Global sound manager instance
const soundManager = new SoundManager();

// Auto-start music after first user interaction (browser requirement)
let musicStarted = false;
document.addEventListener('click', () => {
    if (!musicStarted && soundManager.musicEnabled) {
        soundManager.startBackgroundMusic();
        musicStarted = true;
    }
}, { once: true });

console.log('🎵 Sound System Ready!');