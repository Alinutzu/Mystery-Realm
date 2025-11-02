// ====================================
// PARTICLE SYSTEM
// ====================================

class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.maxParticles = 500;
        this.init();
    }
    
    
    
    init() {
        // Create canvas overlay
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
        
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticle(x, y, options = {}) {

        // ⭐ VERIFICĂ limită
    if (this.particles.length >= this.maxParticles) {
        this.particles.shift(); // Remove oldest
    }

        const defaults = {
            emoji: '✨',
            color: '#fbbf24',
            size: 20,
            speedX: (Math.random() - 0.5) * 4,
            speedY: -Math.random() * 3 - 2,
            gravity: 0.1,
            life: 1,
            decay: 0.015,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.2
        };
        
        const particle = { ...defaults, ...options, x, y };
        this.particles.push(particle);
    }
    
    burst(x, y, count = 10, emoji = '✨') {
        for (let i = 0; i < count; i++) {
            this.createParticle(x, y, {
                emoji: emoji,
                speedX: (Math.random() - 0.5) * 8,
                speedY: -Math.random() * 6 - 3,
                size: Math.random() * 15 + 15
            });
        }
    }
    
    floatingNumber(x, y, text, color = '#10b981') {
        this.createParticle(x, y, {
            text: text,
            color: color,
            speedX: 0,
            speedY: -2,
            gravity: 0,
            size: 24,
            decay: 0.02
        });
    }
    
    trail(x, y, emoji = '⭐') {
        this.createParticle(x, y, {
            emoji: emoji,
            speedX: 0,
            speedY: 0,
            gravity: 0,
            size: 12,
            decay: 0.05
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            // Update
            p.speedY += p.gravity;
            p.x += p.speedX;
            p.y += p.speedY;
            p.life -= p.decay;
            p.rotation += p.rotationSpeed;
            
            // Remove dead particles
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            // Draw
            this.ctx.save();
            this.ctx.globalAlpha = p.life;
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            
            if (p.text) {
                this.ctx.font = `bold ${p.size}px Arial`;
                this.ctx.fillStyle = p.color;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(p.text, 0, 0);
            } else if (p.emoji) {
                this.ctx.font = `${p.size}px Arial`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(p.emoji, 0, 0);
            } else {
                this.ctx.fillStyle = p.color;
                this.ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            }
            
            this.ctx.restore();
        }
        
        requestAnimationFrame(() => this.animate());
    }
    
    screenShake(duration = 500, intensity = 10) {
        const container = document.getElementById('game-container');
        const startTime = Date.now();
        
        const shake = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                const currentIntensity = intensity * (1 - progress);
                const x = (Math.random() - 0.5) * currentIntensity;
                const y = (Math.random() - 0.5) * currentIntensity;
                
                container.style.transform = `translate(${x}px, ${y}px)`;
                requestAnimationFrame(shake);
            } else {
                container.style.transform = '';
            }
        };
        
        shake();
    }
}

// Global instance
let particleSystem;

// Auto-init when DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        particleSystem = new ParticleSystem();
    });
} else {
    particleSystem = new ParticleSystem();
}

// Cursor trail effect
let lastCursorTime = 0;

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    
    // Throttle to every 50ms
    if (now - lastCursorTime > 50) {
        lastCursorTime = now;
        
        // Only in puzzle area
        const puzzleBoard = document.getElementById('puzzle-board');
        if (puzzleBoard) {
            const rect = puzzleBoard.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                particleSystem.trail(e.clientX, e.clientY, '✨');
            }
        }
    }
});