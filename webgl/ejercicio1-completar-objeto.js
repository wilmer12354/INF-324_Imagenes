var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();
var ambientLight, light;
var miobjeto;

function init() {
    var canvasWidth = window.innerWidth * 1;
    var canvasHeight = window.innerHeight * 1;

    // CAMERA
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 80000);
    camera.position.set(-1, 1, 3);
    camera.lookAt(0, 0, 0);

    // LIGHTS
    light = new THREE.DirectionalLight(0xFFFFFF, 0.7);
    light.position.set(1, 1, 1);
    light.target.position.set(0, 0, 0);
    light.target.updateMatrixWorld()

    var ambientLight = new THREE.AmbientLight(0x111111);

    // RENDERER
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x40c11a, 1.0);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    // Add to DOM
    var container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    // CONTROLS
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    cameraControls.target.set(0, 0, 0);

    // OBJECT
    var migeometria = new THREE.Geometry();
    
    // Vértices
    migeometria.vertices.push(new THREE.Vector3(0.0, 0.0, 0.0));  // 0
    migeometria.vertices.push(new THREE.Vector3(0.3, 0.0, 0.0));  // 1
    migeometria.vertices.push(new THREE.Vector3(0.3, 0.3, 0.0));  // 2
    migeometria.vertices.push(new THREE.Vector3(0.0, 0.0, -0.3)); // 3
    migeometria.vertices.push(new THREE.Vector3(0.0, 0.3, -0.3)); // 4
    migeometria.vertices.push(new THREE.Vector3(0.0, 0.3, 0.0));  // 5
    migeometria.vertices.push(new THREE.Vector3(0.3, 0.0, -0.3)); // 6
    migeometria.vertices.push(new THREE.Vector3(0.3, 0.3, -0.3)); // 7 

    // Caras frontales
    migeometria.faces.push(new THREE.Face3(0, 1, 2)); 
    migeometria.faces.push(new THREE.Face3(2, 5, 0)); 

    // Caras traseras
    migeometria.faces.push(new THREE.Face3(3, 6, 4)); 
    migeometria.faces.push(new THREE.Face3(6, 7, 4)); 

    // Caras laterales
    migeometria.faces.push(new THREE.Face3(0, 3, 6)); 
    migeometria.faces.push(new THREE.Face3(0, 6, 1)); 
    migeometria.faces.push(new THREE.Face3(5, 4, 0)); 
    migeometria.faces.push(new THREE.Face3(0, 4, 3)); 

    // Caras superior e inferior
    migeometria.faces.push(new THREE.Face3(2, 7, 5)); 
    migeometria.faces.push(new THREE.Face3(5, 7, 4)); 
    migeometria.faces.push(new THREE.Face3(1, 6, 2)); 
    migeometria.faces.push(new THREE.Face3(2, 6, 7));

    // Calcular normales para mejor iluminación
    migeometria.computeFaceNormals();
    
    var material = new THREE.MeshPhongMaterial({ 
        color: 0xFF0000,
        specular: 0x444444,
        shininess: 30,
        side: THREE.DoubleSide
    });
    
    miobjeto = new THREE.Mesh(migeometria, material);

    // SCENE
    scene = new THREE.Scene();
    scene.add(light);
    scene.add(ambientLight);
    scene.add(miobjeto);
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}

function render() {
    var delta = clock.getDelta();
    cameraControls.update(delta);

    miobjeto.rotation.x += 0.01;
    miobjeto.rotation.y += 0.01;

    renderer.render(scene, camera);
}


try {
    init();
    animate();
} catch(e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    $('#container').append(errorReport+e);
}