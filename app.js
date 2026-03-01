// Horror Website JavaScript
class HorrorWebsite {
    constructor() {
        this.isBloodTrailActive = false;
        this.heartbeatInterval = null;
        this.audioContext = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startCountdown();
        this.initAudioContext();
    }

    initAudioContext() {
        // Initialize Web Audio API for sound effects
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    setupEventListeners() {
        // Warning modal - Fixed the context issue
        const enterButton = document.getElementById('enterButton');
        const warningModal = document.getElementById('warningModal');
        const mainContent = document.getElementById('mainContent');

        enterButton.addEventListener('click', () => {
            warningModal.classList.add('hidden');
            mainContent.classList.remove('hidden');
            this.startAmbientEffects();
            
            // Resume audio context on user interaction
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
        });

        // Prank buttons
        const prankButtons = document.querySelectorAll('.prank-btn');
        prankButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const effect = e.currentTarget.dataset.effect;
                this.triggerEffect(effect);
                this.playClickSound();
            });
        });

        // Blood trail mouse tracking
        document.addEventListener('mousemove', (e) => {
            if (this.isBloodTrailActive) {
                this.createBloodDot(e.clientX, e.clientY);
            }
        });
    }

    triggerEffect(effect) {
        switch (effect) {
            case 'ghost':
                this.ghostJumpScare();
                break;
            case 'whispers':
                this.playWhispers();
                break;
            case 'blood':
                this.bloodDripEffect();
                break;
            case 'glitch':
                this.glitchEffect();
                break;
            case 'shadow':
                this.shadowWalker();
                break;
            case 'eyes':
                this.demonEyes();
                break;
            case 'shatter':
                this.shatterScreen();
                break;
            case 'void':
                this.enterVoid();
                break;
            case 'cursor':
                this.activateBloodTrail();
                break;
            case 'heartbeat':
                this.heartbeatEffect();
                break;
        }
    }

    ghostJumpScare() {
        const overlay = document.getElementById('ghostOverlay');
        overlay.classList.remove('hidden');
        
        // Screen shake
        document.body.classList.add('screen-shake');
        
        // Play scream sound
        this.playScreamSound();
        
        setTimeout(() => {
            overlay.classList.add('hidden');
            document.body.classList.remove('screen-shake');
        }, 2000);
    }

    playWhispers() {
        const whisperContainer = document.getElementById('whisperText');
        whisperContainer.classList.remove('hidden');
        
        // Play whisper sound
        this.playWhisperSound();
        
        setTimeout(() => {
            whisperContainer.classList.add('hidden');
        }, 8000);
    }

    bloodDripEffect() {
        const overlay = document.getElementById('bloodOverlay');
        overlay.classList.remove('hidden');
        
        // Play dripping sound
        this.playDripSound();
        
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 4000);
    }

    glitchEffect() {
        const overlay = document.getElementById('glitchOverlay');
        overlay.classList.remove('hidden');
        
        // Add glitch to body
        document.body.style.filter = 'hue-rotate(180deg) contrast(200%)';
        
        // Play static sound
        this.playStaticSound();
        
        setTimeout(() => {
            overlay.classList.add('hidden');
            document.body.style.filter = 'none';
        }, 2000);
    }

    shadowWalker() {
        const overlay = document.getElementById('shadowOverlay');
        overlay.classList.remove('hidden');
        
        // Play footstep sound
        this.playFootstepSound();
        
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 4000);
    }

    demonEyes() {
        const eyesContainer = document.getElementById('eyesContainer');
        eyesContainer.classList.remove('hidden');
        
        // Play evil sound
        this.playEvilSound();
        
        setTimeout(() => {
            eyesContainer.classList.add('hidden');
        }, 6000);
    }

    shatterScreen() {
        const overlay = document.getElementById('crackOverlay');
        overlay.classList.remove('hidden');
        
        // Screen shake
        document.body.classList.add('screen-shake');
        
        // Play glass breaking sound
        this.playGlassBreakSound();
        
        setTimeout(() => {
            overlay.classList.add('hidden');
            document.body.classList.remove('screen-shake');
        }, 3000);
    }

    enterVoid() {
        const overlay = document.getElementById('voidOverlay');
        overlay.classList.remove('hidden');
        
        // Play void sound
        this.playVoidSound();
        
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 5000);
    }

    activateBloodTrail() {
        this.isBloodTrailActive = !this.isBloodTrailActive;
        
        if (this.isBloodTrailActive) {
            document.body.style.cursor = 'none';
            setTimeout(() => {
                this.isBloodTrailActive = false;
                document.body.style.cursor = '';
            }, 10000);
        }
    }

    createBloodDot(x, y) {
        const bloodContainer = document.getElementById('bloodTrail');
        const dot = document.createElement('div');
        dot.className = 'blood-dot';
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';
        bloodContainer.appendChild(dot);

        setTimeout(() => {
            if (dot.parentNode) {
                dot.parentNode.removeChild(dot);
            }
        }, 2000);
    }

    heartbeatEffect() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
            this.removeHeartbeatBg();
            return;
        }

        let speed = 1000;
        this.playHeartbeatSound();
        this.addHeartbeatBg();
        
        this.heartbeatInterval = setInterval(() => {
            speed = Math.max(200, speed - 50);
            this.playHeartbeatSound();
        }, speed);

        setTimeout(() => {
            if (this.heartbeatInterval) {
                clearInterval(this.heartbeatInterval);
                this.heartbeatInterval = null;
                this.removeHeartbeatBg();
            }
        }, 10000);
    }

    addHeartbeatBg() {
        const bg = document.createElement('div');
        bg.className = 'heartbeat-bg';
        bg.id = 'heartbeatBg';
        document.body.appendChild(bg);
    }

    removeHeartbeatBg() {
        const bg = document.getElementById('heartbeatBg');
        if (bg) {
            bg.remove();
        }
    }

    startCountdown() {
        const countdownElement = document.getElementById('countdown');
        let hours = 6;
        let minutes = 0;
        let seconds = 0;

        const updateCountdown = () => {
            if (seconds > 0) {
                seconds--;
            } else if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else if (hours > 0) {
                hours--;
                minutes = 59;
                seconds = 59;
            } else {
                // Reset to 6 hours
                hours = 6;
                minutes = 0;
                seconds = 0;
            }

            const timeString = 
                `${hours.toString().padStart(2, '0')}:` +
                `${minutes.toString().padStart(2, '0')}:` +
                `${seconds.toString().padStart(2, '0')}`;
            
            countdownElement.textContent = timeString;
        };

        setInterval(updateCountdown, 1000);
    }

    startAmbientEffects() {
        // Random lightning flashes
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every 5 seconds
                this.lightningFlash();
            }
        }, 5000);

        // Random eye blinks
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.randomEyeBlink();
            }
        }, 3000);
    }

    lightningFlash() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.3);
            z-index: 9998;
            pointer-events: none;
            animation: lightningFlash 0.2s ease-out;
        `;
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.remove();
        }, 200);
        
        this.playThunderSound();
    }

    randomEyeBlink() {
        const eyes = document.querySelectorAll('.eye');
        eyes.forEach(eye => {
            eye.style.animation = 'eyeBlink 0.5s ease-in-out';
            setTimeout(() => {
                eye.style.animation = 'eyeBlink 4s ease-in-out infinite';
            }, 500);
        });
    }

    // Sound generation using Web Audio API
    playClickSound() {
        this.generateSound(800, 0.1, 'sawtooth');
    }

    playScreamSound() {
        // Generate a scream-like sound
        this.generateNoise(0.3, 1.5);
    }

    playWhisperSound() {
        this.generateSound(200, 0.05, 'sine', 3);
    }

    playDripSound() {
        this.generateSound(400, 0.2, 'sine');
        setTimeout(() => this.generateSound(350, 0.2, 'sine'), 500);
        setTimeout(() => this.generateSound(300, 0.2, 'sine'), 1000);
    }

    playStaticSound() {
        this.generateNoise(0.2, 2);
    }

    playFootstepSound() {
        for (let i = 0; i < 4; i++) {
            setTimeout(() => {
                this.generateSound(100, 0.1, 'sawtooth');
            }, i * 800);
        }
    }

    playEvilSound() {
        this.generateSound(150, 0.3, 'sawtooth', 2);
    }

    playGlassBreakSound() {
        // Simulate glass breaking with multiple high-frequency sounds
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.generateSound(2000 + Math.random() * 1000, 0.1, 'square');
            }, i * 100);
        }
    }

    playVoidSound() {
        this.generateSound(50, 0.4, 'sine', 3);
    }

    playHeartbeatSound() {
        this.generateSound(80, 0.2, 'sine');
        setTimeout(() => {
            this.generateSound(120, 0.15, 'sine');
        }, 100);
    }

    playThunderSound() {
        this.generateNoise(0.4, 2);
    }

    generateSound(frequency, duration, type = 'sine', fadeTime = 0.1) {
        if (!this.audioContext) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.type = type;
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + fadeTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (e) {
            console.log('Error generating sound:', e);
        }
    }

    generateNoise(volume, duration) {
        if (!this.audioContext) return;

        try {
            const bufferSize = this.audioContext.sampleRate * duration;
            const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
            const data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * volume;
            }

            const source = this.audioContext.createBufferSource();
            const gainNode = this.audioContext.createGain();

            source.buffer = buffer;
            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

            source.start(this.audioContext.currentTime);
        } catch (e) {
            console.log('Error generating noise:', e);
        }
    }
}

// Global instance
let horrorSite;

// Typewriter effect for profile name
function typewriterEffect() {
    const element = document.getElementById('creatorName');
    if (!element) return;
    
    const originalText = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const speed = 100;
    
    function typeChar() {
        if (i < originalText.length) {
            element.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    }
    
    setTimeout(typeChar, 1000);
}

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes lightningFlash {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
        
        @keyframes redFlash {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global instance
    horrorSite = new HorrorWebsite();
    addDynamicStyles();
    
    // Start typewriter effect when main content is shown
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (!mainContent.classList.contains('hidden')) {
                        setTimeout(typewriterEffect, 2000);
                        observer.disconnect();
                    }
                }
            });
        });
        observer.observe(mainContent, { attributes: true });
    }
});

// Add some additional horror interactions
document.addEventListener('keydown', (e) => {
    // Easter eggs for specific key presses
    if (e.key === 'Escape') {
        // Flash screen red
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 0, 0, 0.5);
            z-index: 9999;
            pointer-events: none;
            animation: redFlash 0.3s ease-out;
        `;
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 300);
    }
});

// Random spooky events
setInterval(() => {
    if (Math.random() < 0.05) {
        const mainContent = document.getElementById('mainContent');
        if (mainContent && !mainContent.classList.contains('hidden')) {
            // 5% chance every 30 seconds to shake the screen briefly
            document.body.classList.add('screen-shake');
            setTimeout(() => {
                document.body.classList.remove('screen-shake');
            }, 500);
        }
    }
}, 30000);