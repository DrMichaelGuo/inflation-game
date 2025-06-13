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
