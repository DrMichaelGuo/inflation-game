// 🚀 INSANE BACKGROUND ANIMATION SYSTEM
class EpicBackgroundAnimator {
    constructor() {
        this.particles = [];
        this.matrixChars = [];
        this.init();
    }
    
    init() {
        this.createParticleSystem();
        this.createMatrixRain();
        this.addMouseInteraction();
        this.startAnimationLoop();
        console.log('🎨 Epic background animations initialized!');
    }
    
    // 💫 PARTICLE SYSTEM
    createParticleSystem() {
        const container = document.querySelector('.particles-container');
        if (!container) return;
        
        // Create initial particles
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }
        
        // Continuously spawn new particles
        setInterval(() => {
            if (this.particles.length < 100) {
                this.createParticle();
            }
        }, 200);
    }
    
    createParticle() {
        const container = document.querySelector('.particles-container');
        if (!container) return;
        
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '-10px';
        
        // Random color from palette
        const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 8 + 5) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(particle);
        this.particles.push(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
                this.particles = this.particles.filter(p => p !== particle);
            }
        }, 15000);
    }
    
    // 🔢 MATRIX RAIN EFFECT
    createMatrixRain() {
        const container = document.getElementById('matrix-rain');
        if (!container) return;
        
        const chars = '01$£€¥₿₹₽₩₪₦₡₨₱₲₴₵₶₷₸₹₺₻₼₽₾₿';
        
        // Create matrix columns
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createMatrixColumn(chars, i * 50);
            }, i * 100);
        }
        
        // Continuously spawn matrix characters
        setInterval(() => {
            if (Math.random() < 0.3) {
                this.createMatrixColumn(chars, Math.random() * window.innerWidth);
            }
        }, 500);
    }
    
    createMatrixColumn(chars, x) {
        const container = document.getElementById('matrix-rain');
        if (!container) return;
        
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = x + 'px';
        char.style.top = '-20px';
        char.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        // Random green tint
        const opacity = Math.random() * 0.8 + 0.2;
        char.style.color = `rgba(0, 255, 65, ${opacity})`;
        
        container.appendChild(char);
        this.matrixChars.push(char);
        
        // Remove character after animation
        setTimeout(() => {
            if (char.parentNode) {
                char.parentNode.removeChild(char);
                this.matrixChars = this.matrixChars.filter(c => c !== char);
            }
        }, 6000);
    }
    
    // 🖱️ MOUSE INTERACTION EFFECTS
    addMouseInteraction() {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Create particle burst on mouse movement
            if (Math.random() < 0.1) {
                this.createMouseParticle(mouseX, mouseY);
            }
            
            // Move orbs towards mouse
            this.updateOrbsWithMouse(mouseX, mouseY);
        });
        
        // Create explosion on click
        document.addEventListener('click', (e) => {
            this.createClickExplosion(e.clientX, e.clientY);
        });
    }
    
    createMouseParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #f59e0b;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            animation: mouseParticle 1s ease-out forwards;
            box-shadow: 0 0 10px #f59e0b;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
    
    createClickExplosion(x, y) {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                const angle = (i / 15) * Math.PI * 2;
                const velocity = Math.random() * 100 + 50;
                const size = Math.random() * 6 + 2;
                
                particle.style.cssText = `
                    position: fixed;
                    width: ${size}px;
                    height: ${size}px;
                    background: hsl(${Math.random() * 360}, 70%, 60%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    left: ${x}px;
                    top: ${y}px;
                    animation: explode 1.5s ease-out forwards;
                    box-shadow: 0 0 10px currentColor;
                `;
                
                // Set explosion direction
                particle.style.setProperty('--dx', Math.cos(angle) * velocity + 'px');
                particle.style.setProperty('--dy', Math.sin(angle) * velocity + 'px');
                
                document.body.appendChild(particle);
                
                setTimeout(() => particle.remove(), 1500);
            }, i * 20);
        }
    }
    
    updateOrbsWithMouse(mouseX, mouseY) {
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            const rect = orb.getBoundingClientRect();
            const orbX = rect.left + rect.width / 2;
            const orbY = rect.top + rect.height / 2;
            
            const dx = mouseX - orbX;
            const dy = mouseY - orbY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const force = (200 - distance) / 200;
                const moveX = dx * force * 0.1;
                const moveY = dy * force * 0.1;
                
                orb.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.2})`;
                orb.style.filter = `blur(${1 - force}px) brightness(${1 + force * 0.5})`;
            }
        });
    }
    
    // 🔄 ANIMATION LOOP
    startAnimationLoop() {
        const animate = () => {
            // Randomly change particle colors
            this.particles.forEach(particle => {
                if (Math.random() < 0.001) {
                    const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'];
                    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                }
            });
            
            // Randomly adjust geometric shapes
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach(shape => {
                if (Math.random() < 0.001) {
                    shape.style.filter = `drop-shadow(0 0 ${Math.random() * 30 + 10}px currentColor) hue-rotate(${Math.random() * 360}deg)`;
                }
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Add explosion animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes mouseParticle {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0) translateY(-30px);
            opacity: 0;
        }
    }
    
    @keyframes explode {
        0% {
            transform: scale(1) translate(0, 0);
            opacity: 1;
        }
        100% {
            transform: scale(0) translate(var(--dx), var(--dy));
            opacity: 0;
        }
    }
`;
document.head.appendChild(animationStyles);

// Game Data Structure
const gameData = {
    1: [
        { term: "Inflation", definition: "A sustained increase in the general price level" },
        { term: "Deflation", definition: "A sustained decrease in the general price level" }
    ],
    2: [
        { term: "CPI", definition: "A measure of average price changes in a basket of goods and services" },
        { term: "RPI", definition: "A measure of inflation that includes goods, services, and housing costs" },
        { term: "Purchasing Power", definition: "The quantity of goods and services a unit of currency can buy" }
    ],
    3: [
        { term: "Cost-push Inflation", definition: "Inflation caused by rising production costs" },
        { term: "Demand-pull Inflation", definition: "Inflation caused by excess demand" },
        { term: "Disinflation", definition: "A decrease in the rate of inflation" },
        { term: "Hyperinflation", definition: "A rapid and sustained increase in prices" }
    ],
    4: [
        { term: "Monetary Policy", definition: "Central bank control of money supply and interest rates to manage inflation" },
        { term: "Interest Rate", definition: "The cost of borrowing or the return on savings" }
    ]
};

// Game State
class InflationMemoryGame {
    constructor() {
        this.currentLevel = 1;
        this.score = 0;
        this.moves = 0;
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.gameActive = false;
        this.cards = [];
        
        this.initializeEventListeners();
        this.updateStats();
    }
    
    initializeEventListeners() {
        // Level selection
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const level = parseInt(e.currentTarget.dataset.level);
                this.startLevel(level);
            });
        });
        
        // Control buttons
        document.getElementById('back-btn').addEventListener('click', () => {
            this.showLevelSelector();
        });
        
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restartLevel();
        });
        
        // Modal buttons
        document.getElementById('back-to-levels').addEventListener('click', () => {
            this.hideModal();
            this.showLevelSelector();
        });
        
        document.getElementById('next-level').addEventListener('click', () => {
            this.hideModal();
            if (this.currentLevel < 4) {
                this.startLevel(this.currentLevel + 1);
            } else {
                this.showLevelSelector();
            }
        });
    }
    
    startLevel(level) {
        this.currentLevel = level;
        this.score = 0;
        this.moves = 0;
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.gameActive = true;
        
        this.generateCards(level);
        this.renderCards();
        this.showGameBoard();
        this.updateStats();
    }
    
    generateCards(level) {
        this.cards = [];
        let pairs = [];
        
        if (level === 4) {
            // Final level: 2 new pairs + 3 random pairs from previous levels
            pairs = [...gameData[4]];
            
            // Get random pairs from previous levels
            const previousPairs = [];
            for (let i = 1; i <= 3; i++) {
                previousPairs.push(...gameData[i]);
            }
            
            // Shuffle and pick 3 random pairs
            const shuffledPrevious = this.shuffleArray([...previousPairs]);
            pairs.push(...shuffledPrevious.slice(0, 3));
        } else {
            pairs = [...gameData[level]];
        }
        
        // Create card pairs
        pairs.forEach((pair, index) => {
            const cardId = `pair-${index}`;
            this.cards.push({
                id: `${cardId}-term`,
                content: pair.term,
                type: 'term',
                pairId: cardId,
                matched: false,
                flipped: false
            });
            this.cards.push({
                id: `${cardId}-definition`,
                content: pair.definition,
                type: 'definition',
                pairId: cardId,
                matched: false,
                flipped: false
            });
        });
        
        // Shuffle cards
        this.cards = this.shuffleArray(this.cards);
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    renderCards() {
        const container = document.getElementById('cards-container');
        container.innerHTML = '';
        container.className = `cards-container level-${this.currentLevel}`;
        
        this.cards.forEach(card => {
            const cardElement = this.createCardElement(card);
            container.appendChild(cardElement);
        });
    }
    
    createCardElement(card) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'memory-card';
        cardDiv.dataset.cardId = card.id;
        
        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    💡
                </div>
                <div class="card-back">
                    ${card.content}
                </div>
            </div>
        `;
        
        cardDiv.addEventListener('click', () => this.handleCardClick(card.id));
        
        return cardDiv;
    }
    
    handleCardClick(cardId) {
        if (!this.gameActive) return;
        
        const card = this.cards.find(c => c.id === cardId);
        const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
        
        if (card.flipped || card.matched || this.flippedCards.length >= 2) return;
        
        // Flip the card
        card.flipped = true;
        cardElement.classList.add('flipped');
        this.flippedCards.push(card);
        
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.updateStats();
            
            setTimeout(() => {
                this.checkForMatch();
            }, 600);
        }
    }
    
    checkForMatch() {
        const [card1, card2] = this.flippedCards;
        
        if (card1.pairId === card2.pairId) {
            // Match found
            this.handleMatch(card1, card2);
        } else {
            // No match
            this.handleNoMatch(card1, card2);
        }
        
        this.flippedCards = [];
    }
    
    handleMatch(card1, card2) {
        card1.matched = true;
        card2.matched = true;
        
        const element1 = document.querySelector(`[data-card-id="${card1.id}"]`);
        const element2 = document.querySelector(`[data-card-id="${card2.id}"]`);
        
        element1.classList.add('matched');
        element2.classList.add('matched');
        
        this.matchedPairs++;
        this.score += 100;
        this.updateStats();
        
        // Check if level is complete
        if (this.matchedPairs === this.cards.length / 2) {
            setTimeout(() => {
                this.completeLevel();
            }, 800);
        }
    }
    
    handleNoMatch(card1, card2) {
        card1.flipped = false;
        card2.flipped = false;
        
        const element1 = document.querySelector(`[data-card-id="${card1.id}"]`);
        const element2 = document.querySelector(`[data-card-id="${card2.id}"]`);
        
        element1.classList.remove('flipped');
        element2.classList.remove('flipped');
    }
    
    completeLevel() {
        this.gameActive = false;
        
        // Calculate bonus score based on efficiency
        const perfectMoves = this.cards.length / 2;
        const efficiency = Math.max(0, perfectMoves / this.moves);
        const bonusScore = Math.round(efficiency * 200);
        this.score += bonusScore;
        
        this.updateStats();
        this.showSuccessModal();
    }
    
    restartLevel() {
        this.startLevel(this.currentLevel);
    }
    
    showLevelSelector() {
        document.getElementById('level-selector').style.display = 'block';
        document.getElementById('game-board').classList.remove('active');
    }
    
    showGameBoard() {
        document.getElementById('level-selector').style.display = 'none';
        document.getElementById('game-board').classList.add('active');
    }
    
    showSuccessModal() {
        const modal = document.getElementById('success-modal');
        document.getElementById('modal-moves').textContent = this.moves;
        document.getElementById('modal-score').textContent = this.score;
        
        // Show/hide next level button
        const nextBtn = document.getElementById('next-level');
        if (this.currentLevel >= 4) {
            nextBtn.style.display = 'none';
        } else {
            nextBtn.style.display = 'inline-flex';
        }
        
        modal.classList.add('active');
    }
    
    hideModal() {
        document.getElementById('success-modal').classList.remove('active');
    }
    
    updateStats() {
        document.getElementById('current-level').textContent = this.currentLevel;
        document.getElementById('score').textContent = this.score;
        document.getElementById('moves').textContent = this.moves;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InflationMemoryGame();
    
    // Add some visual flourishes
    addParticleEffect();
});

// Add subtle particle effect to header
function addParticleEffect() {
    const header = document.querySelector('.header');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(0, 122, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        header.appendChild(particle);
    }
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
        }
    `;
    document.head.appendChild(style);
}

// Add smooth scrolling and accessibility features
document.addEventListener('keydown', (e) => {
    // ESC key to close modal
    if (e.key === 'Escape') {
        const modal = document.getElementById('success-modal');
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    }
});

// Add focus management for accessibility
document.querySelectorAll('button, .memory-card').forEach(element => {
    element.addEventListener('focus', (e) => {
        e.target.style.outline = '2px solid var(--primary-color)';
        e.target.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', (e) => {
        e.target.style.outline = 'none';
    });
});
