let container;
let camera; 
let renderer; 
let scene;
let obj;

function init(){
    container = document.getElementById('scene');

    // create scene, add to container
    scene = new THREE.Scene();

    // create camera, set perspective and field of view
    const fov = 35;
    const aspect = container.clientWidth / container.clientHeight;

    // clipping = if outside of specified zone in meters, object is not visible
    const near = 0.1;
    const far = 500;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

    // default camera position in X, Y, Z
    camera.position.set(-8, 4, 50);

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    let loader = new THREE.GLTFLoader()
    loader.load('./models/house/scene.gltf', function(gltf){
        // gltf is a large object with things like the attached scene, position, etc.
        scene.add(gltf.scene);
        renderer.render(scene, camera)
    })
}

init()