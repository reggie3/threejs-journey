import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import getRandomPointOnSphere from "./getRandomPointOnSphere";
import getRandomColor from "./getRandomColor";
THREE.ColorManagement.enabled = false;

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleMap = textureLoader.load("./textures/particles/2.png");

/**
 * Particles
 */

// Geometry

const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);

// Material
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
});

// Points

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
// scene.add(particles);

/**
 * Custom Geometry
 */
const customGeometry = new THREE.BufferGeometry();

const NUM_POINTS = 500000;
const vertices = new Float32Array(NUM_POINTS * 3 * 3);

for (let i = 0; i < NUM_POINTS * 3 * 3; i++) {
  vertices[i] = (Math.random() - 0.5) * 3;
}

const positionsAttribute = new THREE.BufferAttribute(vertices, 3);

customGeometry.setAttribute("position", positionsAttribute);
const customParticles = new THREE.Points(customGeometry, particlesMaterial);

// scene.add(customParticles);

/**
 * Custom Sphere Geometry
 */

const SPHERE_MAX_RADIUS = 6;
const customSphereGeometry = new THREE.BufferGeometry();

const customSphereVertices = new Float32Array(NUM_POINTS * 3 * 3);
const customSphereParticleColors = new Float32Array(NUM_POINTS * 3 * 3);

for (let i = 0; i < NUM_POINTS * 3 * 3; i++) {
  const point = getRandomPointOnSphere(Math.random() * SPHERE_MAX_RADIUS);
  customSphereVertices[i * 3] = point[0];
  customSphereVertices[i * 3 + 1] = point[1];
  customSphereVertices[i * 3 + 2] = point[2];

  const { ints } = getRandomColor();

  customSphereParticleColors[i * 3] = ints[0];
  customSphereParticleColors[i * 3 + 1] = ints[1];
  customSphereParticleColors[i * 3 + 2] = ints[2];
}

const spherePositionsAttribute = new THREE.BufferAttribute(
  customSphereVertices,
  3
);
customSphereGeometry.setAttribute("position", spherePositionsAttribute);

const sphereParticlesColorsAttributes = new THREE.BufferAttribute(
  customSphereParticleColors,
  3
);

console.log(sphereParticlesColorsAttributes);
customSphereGeometry.setAttribute("color", sphereParticlesColorsAttributes);

const customSphereMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  // color: 0xff00f0,
  map: particleMap,
  alphaMap: particleMap,
  transparent: true,
  // alphaTest: 0.001,
  // depthTest: false,
  depthWrite: false,
  vertexColors: true,
});

console.log(customSphereGeometry);
const customSphereParticles = new THREE.Points(
  customSphereGeometry,
  customSphereMaterial
);
scene.add(customSphereParticles);

/**
 * Test cube
 */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial()
);
scene.add(cube);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * AxesHelper
 */
scene.add(new THREE.AxesHelper());

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update Particles
  // customSphereParticles.rotation.y = elapsedTime * 0.02;

  for (let i = 0; i < NUM_POINTS * 3 * 3; i++) {
    const x = customSphereGeometry.attributes.position.array[i];
    customSphereGeometry.attributes.position.array[i * 3 + 1] = Math.sin(
      elapsedTime + x
    );
  }

  customSphereGeometry.attributes.position.needsUpdate = true;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
