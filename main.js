import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { throttle } from 'lodash-es';
import setCanvasDimensions from './setCanvasDimensions';
import { HemisphereLight } from 'three';

//setup
const resizeUpdateInterval = 500;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})
const controls = new OrbitControls( camera, renderer.domElement );

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

controls.update();
renderer.render(scene, camera);

//resize window
window.addEventListener(
  'resize',
  throttle(
    () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      setCanvasDimensions(renderer.domElement, width, height);
    },
    resizeUpdateInterval,
    { trailing: true }
  )
);

//define shapes
const octahedronShape1 = new THREE.OctahedronGeometry(6.5,0);
const octahedronMaterial1 = new THREE.MeshStandardMaterial({color: 0xAE2D66, metalness: 0.5, roughness: 0.3});
const octahedron1 = new THREE.Mesh(octahedronShape1, octahedronMaterial1);
octahedron1.position.setX(31);

const octahedronShape2 = new THREE.OctahedronGeometry(6,0);
const octahedronMaterial2 = new THREE.MeshStandardMaterial({color: 0xAE2D66, metalness: 0.5, roughness: 0.3});
const octahedron2 = new THREE.Mesh(octahedronShape2, octahedronMaterial2);
octahedron2.position.setX(-27);
octahedron2.position.setY(35);
octahedron2.position.setZ(-20);

const icosahedronShape1 = new THREE.IcosahedronGeometry(10,0);
const icosahedronMaterial1 = new THREE.MeshStandardMaterial({color: 0x1974D3, metalness: 0.5, roughness: 0.3});
const icosahedron1 = new THREE.Mesh(icosahedronShape1, icosahedronMaterial1);
icosahedron1.position.setY(17);
icosahedron1.position.setZ(-3);

const icosahedronShape2 = new THREE.IcosahedronGeometry(4,0);
const icosahedronMaterial2 = new THREE.MeshStandardMaterial({color: 0x1974D3, metalness: 0.5, roughness: 0.3});
const icosahedron2 = new THREE.Mesh(icosahedronShape2, icosahedronMaterial2);
icosahedron2.position.setY(-28);
icosahedron2.position.setX(35);
icosahedron2.position.setZ(-15);

const sphereShape1 = new THREE.SphereGeometry(5, 32, 16);
const sphereMaterial1 = new THREE.MeshStandardMaterial({color: 0xF54952, metalness: 0.5, roughness: 0.3});
const sphere1 = new THREE.Mesh(sphereShape1, sphereMaterial1);
sphere1.position.setY(-10);
sphere1.position.setX(15);
sphere1.position.setZ(-6);

const sphereShape2 = new THREE.SphereGeometry(2, 32, 16);
const sphereMaterial2 = new THREE.MeshStandardMaterial({color: 0xF54952, metalness: 0.5, roughness: 0.3});
const sphere2 = new THREE.Mesh(sphereShape2, sphereMaterial2);
sphere2.position.setY(33);
sphere2.position.setX(45);
sphere2.position.setZ(-20);

scene.add(octahedron1, octahedron2, icosahedron1, icosahedron2, sphere1, sphere2);

//add lights
const light = new THREE.PointLight(0xFFFFFF, 0.5);
const hemLight = new THREE.HemisphereLight(0x579FE0, 0xB541D7, 1.0);
const ambient = new THREE.AmbientLight(0xFFFFFF, 0.2);
light.position.set(25,25,10);
scene.add(light, hemLight, ambient);

//particles
const loader = new THREE.TextureLoader();
const particleTexture = loader.load('particle.png');
const particleShape = new THREE.BufferGeometry;
const particleCount = 100;
const posArray = new Float32Array(particleCount * 3);

for(let i = 0; i < particleCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 100;
}

particleShape.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particleMaterial = new THREE.PointsMaterial({ size: 0.3, map: particleTexture, transparent: true});
const particleMesh = new THREE.Points(particleShape, particleMaterial)
scene.add(particleMesh)

//background
scene.background = new THREE.Color(0x200c54);

var dxPerFrame = 1;

//render loop
//var count = 0;
//var sin = 0;
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();


  octahedron1.rotation.x += -0.001;
  octahedron2.rotation.x += 0.001;
  icosahedron1.rotation.x += -0.001;
  icosahedron2.rotation.x += 0.001;
  sphere1.rotation.x += -0.001;
  sphere2.rotation.x += 0.001;
  octahedron1.rotation.y += -0.001;
  octahedron2.rotation.y += 0.001;
  icosahedron1.rotation.y += -0.001;
  icosahedron2.rotation.y += 0.001;
  sphere1.rotation.y += -0.001;
  sphere2.rotation.y += 0.001;

  /*
  count += count + 0.001;
  sin = Math.sin(count);
  octahedron1.position.x += 1/50*(sin);
  */

  particleMesh.rotation.x += -0.002;
  particleMesh.rotation.y += -0.002;
  particleMesh.rotation.z += -0.002;

}

animate();