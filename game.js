let scene;
let camera;
let renderer;

let player;
let cars = [];
let npcs = [];

const clock = new THREE.Clock();

function initGame() {

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x87ceeb);

    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    document
        .getElementById("game")
        .appendChild(renderer.domElement);

    // Lighting
    const sunlight = new THREE.DirectionalLight(
        0xffffff,
        2
    );

    sunlight.position.set(100, 200, 100);

    scene.add(sunlight);

    const ambient = new THREE.AmbientLight(
        0xffffff,
        0.5
    );

    scene.add(ambient);

    createCity();

    player = new Player(scene);

    createCars();
    createNPCs();

    window.addEventListener(
        "resize",
        resizeGame
    );

    animate();
}

function createCity() {

    const groundGeometry =
        new THREE.PlaneGeometry(
            1000,
            1000
        );

    const groundMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x444444
        });

    const ground =
        new THREE.Mesh(
            groundGeometry,
            groundMaterial
        );

    ground.rotation.x = -Math.PI / 2;

    scene.add(ground);

    // Roads
    for (let x = -400; x <= 400; x += 80) {

        const road =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    30,
                    0.1,
                    1000
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x222222
                })
            );

        road.position.x = x;

        scene.add(road);
    }

    for (let z = -400; z <= 400; z += 80) {

        const road =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    1000,
                    0.1,
                    30
                ),
                new THREE.MeshStandardMaterial({
                    color: 0x222222
                })
            );

        road.position.z = z;

        scene.add(road);
    }

    // Buildings
    for (let i = 0; i < 100; i++) {

        const height =
            20 + Math.random() * 80;

        const building =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    30,
                    height,
                    30
                ),
                new THREE.MeshStandardMaterial({
                    color:
                        new THREE.Color(
                            Math.random(),
                            Math.random(),
                            Math.random()
                        )
                })
            );

        building.position.x =
            (Math.floor(Math.random() * 20) - 10) * 50;

        building.position.z =
            (Math.floor(Math.random() * 20) - 10) * 50;

        building.position.y =
            height / 2;

        scene.add(building);
    }
}

function createCars() {

    for (let i = 0; i < 10; i++) {

        const car = new Car(scene);

        car.mesh.position.set(
            Math.random() * 500 - 250,
            1,
            Math.random() * 500 - 250
        );

        cars.push(car);
    }
}

function createNPCs() {

    for (let i = 0; i < 30; i++) {

        const npc = new NPC(scene);

        npc.mesh.position.set(
            Math.random() * 500 - 250,
            1,
            Math.random() * 500 - 250
        );

        npcs.push(npc);
    }
}

function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (player) {
        player.update(delta);
    }

    cars.forEach(car => {
        car.update(delta);
    });

    npcs.forEach(npc => {
        npc.update(delta);
    });

    if (player) {

        camera.position.x =
            player.mesh.position.x + 10;

        camera.position.y =
            player.mesh.position.y + 8;

        camera.position.z =
            player.mesh.position.z + 12;

        camera.lookAt(
            player.mesh.position
        );
    }

    renderer.render(
        scene,
        camera
    );
}

function resizeGame() {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
}

initGame();
