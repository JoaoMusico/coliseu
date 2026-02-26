const { Engine, Render, Runner, Bodies, Composite, Events, Vector, Body } = Matter;

const physics = {
    engine: null,
    render: null,
    runner: null,
    world: null,
    canvas: null,

    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.engine = Engine.create();
        this.world = this.engine.world;

        this.render = Render.create({
            canvas: this.canvas,
            engine: this.engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: 'transparent'
            }
        });

        Render.run(this.render);
        this.runner = Runner.create();
        Runner.run(this.runner, this.engine);

        window.addEventListener('resize', () => this.handleResize());
    },

    handleResize() {
        this.render.canvas.width = window.innerWidth;
        this.render.canvas.height = window.innerHeight;
        this.render.options.width = window.innerWidth;
        this.render.options.height = window.innerHeight;
    },

    createArena() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.4;

        // Circular Arena (Ground)
        // Matter does not have a "circular boundary" easily, so we use a large circle for visual/sensor
        // and check distance from center manually in the update loop or use many small boxes.
        // For simplicity and "sticky" massinha feel, we'll use distance check for the "water" death.
        
        return { centerX, centerY, radius };
    }
};
