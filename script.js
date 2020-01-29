let container;
let camera; 
let renderer; 
let scene;
let obj;

function init(){
    container = document.querySelector('.scene');

    // create scene, add to container
    scene = new THREE.Scene();

    // create camera, set perspective and field of view
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;

    // clipping = if outside of specified zone in meters, object is not visible
    const near = 0.1;
    const far = 500;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    const ambient = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambient);

    // default camera position in X, Y, Z
    camera.position.set(-4, 3, 20);

    const light = new THREE.DirectionalLight(0xFFFFFF, 2);
    light.position.set(2, 2, 2);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    let loader = new THREE.GLTFLoader()
    loader.load('./models/house/scene.gltf', function(gltf){
        // gltf is a large object with things like the attached scene, position, etc.
        scene.add(gltf.scene);
        obj = gltf.scene.children[0];
        animate()
    })
}

function animate() {
    requestAnimationFrame(animate)
    obj.rotation.z += 0.005;
    renderer.render(scene, camera)
}

function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    if (container.clientWidth < 780) {
        camera.position.set(0, 3, 20);
    } else if (container.clientWidth > 780) {
        camera.position.set(-4, 3, 20);
    }

    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

init()

window.addEventListener('resize', onWindowResize)