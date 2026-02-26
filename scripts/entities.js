class Entity {
    constructor(x, y, radius, color, label) {
        this.body = Bodies.circle(x, y, radius, {
            friction: 0.5,
            restitution: 0.4,
            density: 0.002,
            render: {
                fillStyle: color,
                strokeStyle: '#ffffff',
                lineWidth: 2
            },
            label: label
        });
        Composite.add(physics.world, this.body);
        this.radius = radius;
        this.color = color;
        this.isAlive = true;
    }

    applyForce(force) {
        Body.applyForce(this.body, this.body.position, force);
    }

    jump() {
        // Since it's top-down but physics is 2D sideways by default, 
        // we'll treat Y as vertical in a top-down sense or just use Y as jumping.
        // Actually, for a top-down arena, "jump" can be a quick burst or a visual scale change.
        // Let's use a quick impulse for now.
        Body.applyForce(this.body, this.body.position, { x: 0, y: -0.05 });
    }
}

class Player extends Entity {
    constructor(x, y, color, id) {
        super(x, y, 25, color, `player${id}`);
        this.id = id;
        this.score = 0;
        this.weapon = 'mace'; // hand-to-hand/mace by default
    }

    update(keys) {
        if (!this.isAlive) return;

        const force = 0.005;
        let move = { x: 0, y: 0 };

        if (this.id === 1) {
            if (keys['KeyW']) move.y -= force;
            if (keys['KeyS']) move.y += force;
            if (keys['KeyA']) move.x -= force;
            if (keys['KeyD']) move.x += force;
        } else {
            if (keys['ArrowUp']) move.y -= force;
            if (keys['ArrowDown']) move.y += force;
            if (keys['ArrowLeft']) move.x -= force;
            if (keys['ArrowRight']) move.x += force;
        }

        this.applyForce(move);
    }
}

class Enemy extends Entity {
    constructor(x, y, type) {
        let options = {
            radius: 20,
            color: '#ff4444',
            label: 'enemy'
        };

        if (type === 'marshmallow') {
            options = { radius: 15, color: '#ffccf2', label: 'marshmallow' };
        } else if (type === 'giant') {
            options = { radius: 40, color: '#f2f2f2', label: 'giant' };
        } else if (type === 'zombie') {
            options = { radius: 25, color: '#a3e635', label: 'zombie' };
        }

        super(x, y, options.radius, options.color, options.label);
        this.type = type;
    }

    aiUpdate(targets) {
        if (!this.isAlive || targets.length === 0) return;

        // Simple follow logic
        const target = targets[0]; // Target P1 for now
        const forceDir = Vector.normalise(Vector.sub(target.body.position, this.body.position));
        const speed = this.type === 'marshmallow' ? 0.003 : 0.001;

        this.applyForce(Vector.mult(forceDir, speed));
    }
}
