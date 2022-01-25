import './style.css'

import * as THREE from 'three' ;

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// Creating new scene, camera and renderer

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#background'),
})


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);


// creating geometry and adding to scene
const geometry = new THREE.IcosahedronGeometry(1, 0);
const material = new THREE.MeshStandardMaterial( {color: 0x4682b4});
const ico = new THREE.Mesh(geometry, material);

ico.scale.x = 5;
ico.scale.y = 5;
ico.scale.z = 5;
scene.add(ico);


// Experimenting with lights
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(pointLight);
scene.add(ambientLight);
scene.add(lightHelper, gridHelper);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);


// Random generate stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(100).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);



// Object animation
function animate() {
  requestAnimationFrame(animate);
  
  ico.rotation.x += 0.01;
  ico.rotation.y += 0.01;
  ico.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();


// Making a moon
const moonTexture = new THREE.TextureLoader().load('2k_moon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({map: moonTexture})
);

moon.position.set(30, 30, 30);

// animating moon
function moonAnimate() {
  requestAnimationFrame(animate);
  
  moon.rotation.x += 0.01;
  moon.rotation.y += 0.01;
  moon.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}


scene.add(moon);
moonAnimate();


