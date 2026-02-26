const game = {
    players: [],
    enemies: [],
    round: 1,
    arena: null,
    keys: {},
    isGameOver: false,
    arenaImg: null,

    init() {
        physics.init('gameCanvas');
        this.arena = physics.createArena();

        // Load Assets
        this.arenaImg = new Image();
        this.arenaImg.src = 'assets/arena.png';

        // Create Players
        this.players.push(new Player(this.arena.centerX - 100, this.arena.centerY, '#fbbf24', 1));
        this.players.push(new Player(this.arena.centerX + 100, this.arena.centerY, '#38bdf8', 2));

        this.setupEvents();
        this.startRound();
        this.loop();
    },

    setupEvents() {
        window.addEventListener('keydown', (e) => this.keys[e.code] = true);
        window.addEventListener('keyup', (e) => this.keys[e.code] = false);

        // Action Keys
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') this.players[0].jump();
            if (e.code === 'KeyJ') this.players[1].jump();

            // Attack demo
            if (e.code === 'KeyQ') this.attack(this.players[0]);
            if (e.code === 'KeyL') this.attack(this.players[1]);
        });
    },

    attack(player) {
        // Simple radial push for attack demo
        this.enemies.forEach(enemy => {
            const dist = Vector.magnitude(Vector.sub(enemy.body.position, player.body.position));
            if (dist < 100) {
                const pushDir = Vector.normalise(Vector.sub(enemy.body.position, player.body.position));
                Body.applyForce(enemy.body, enemy.body.position, Vector.mult(pushDir, 0.05));
            }
        });
    },

    startRound() {
        document.getElementById('round-number').innerText = this.round;
        document.getElementById('status-message').innerText = `Round ${this.round} Começou!`;

        setTimeout(() => {
            document.getElementById('status-message').innerText = "";
            this.spawnWave();
        }, 2000);
    },

    spawnWave() {
        const count = this.round * 2 + 1;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = this.arena.radius * 0.8;
            const x = this.arena.centerX + Math.cos(angle) * dist;
            const y = this.arena.centerY + Math.sin(angle) * dist;

            const types = ['marshmallow', 'giant', 'zombie'];
            const type = types[Math.floor(Math.random() * types.length)];
            this.enemies.push(new Enemy(x, y, type));
        }
    },

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    },

    update() {
        this.players.forEach(p => p.update(this.keys));
        this.enemies.forEach(e => e.aiUpdate(this.players.filter(p => p.isAlive)));

        // Boundary Check (Water / Shark Zone)
        const allEntities = [...this.players, ...this.enemies];
        allEntities.forEach(ent => {
            if (!ent.isAlive) return;

            const distFromCenter = Vector.magnitude({
                x: ent.body.position.x - this.arena.centerX,
                y: ent.body.position.y - this.arena.centerY
            });

            if (distFromCenter > this.arena.radius) {
                this.killEntity(ent);
            }
        });

        // Check if all enemies dead
        if (this.enemies.length > 0 && this.enemies.every(e => !e.isAlive)) {
            this.enemies = [];
            this.round++;
            this.startRound();
        }
    },

    killEntity(ent) {
        ent.isAlive = false;
        Composite.remove(physics.world, ent.body);

        if (ent instanceof Player) {
            document.getElementById('status-message').innerText = `Jogador ${ent.id} caiu na água!`;
            // Check if both dead
            if (this.players.every(p => !p.isAlive)) {
                document.getElementById('status-message').innerText = "GAME OVER - Todos foram devorados!";
                this.isGameOver = true;
            }
        }
    },

    draw() {
        const ctx = physics.render.context;
        const { centerX, centerY, radius } = this.arena;

        // Draw Water
        ctx.fillStyle = '#0369a1';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        // Draw Arena Image (if loaded)
        if (this.arenaImg && this.arenaImg.complete) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(this.arenaImg, centerX - radius, centerY - radius, radius * 2, radius * 2);
            ctx.restore();
        } else {
            // Fallback
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = '#334155';
            ctx.fill();
        }

        // Arena Border
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 10;
        ctx.stroke();
        ctx.closePath();
    }
};

window.onload = () => game.init();
