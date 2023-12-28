import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

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

const textureLoader = new THREE.TextureLoader();
const particleMap = textureLoader.load("./textures/particles/1.png");

/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

const parameters = {
  count: 100000,
  size: 0.01,
  radius: 5,
  radiusPower: 1,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: "#ff6030",
  outsideColor: "#1b3084",
};

const galaxy = new THREE.Group();

let galaxyGeometry: THREE.BufferGeometry = null;
let material: THREE.Material = null;
let points: THREE.Points = null;

const colorInside = new THREE.Color(parameters.insideColor);
const colorOutside = new THREE.Color(parameters.outsideColor);

const generateGalaxy = () => {
  if (points !== null) {
    galaxyGeometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  galaxyGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;
    const particleRadius =
      Math.pow(Math.random(), parameters.radiusPower) * parameters.radius;

    const angleIncrement = (Math.PI * 2) / parameters.branches;
    const particleAngle = angleIncrement * i;

    const spinAngle = particleRadius * parameters.spin;

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1);

    positions[i3 + 0] =
      Math.cos(particleAngle + spinAngle) * particleRadius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] =
      Math.sin(particleAngle + spinAngle) * particleRadius + randomZ;

    // colors

    const mixedColor: THREE.Color = colorInside.clone();
    mixedColor.lerp(colorOutside, particleRadius / parameters.radius);

    colors[i3 + 0] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  galaxyGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  galaxyGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  /**
   * Material
   */

  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    map: particleMap,
    alphaMap: particleMap,
    transparent: true,
  });
  points = new THREE.Points(galaxyGeometry, material);
  scene.add(points);
};

generateGalaxy();

gui
  .add(parameters, "count", 10, 100000)
  .step(100)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "size", 0.001, 0.1)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui.add(parameters, "radius", 0.01, 20).onFinishChange(generateGalaxy);
gui.add(parameters, "radiusPower", 1, 20).onFinishChange(generateGalaxy);
gui.add(parameters, "branches", 2, 20).step(1).onFinishChange(generateGalaxy);
gui.add(parameters, "spin", -5, 5).step(0.01).onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomness", 0, 5)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui.add(parameters, "randomnessPower", 1, 10).onFinishChange(generateGalaxy);
gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

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
camera.position.x = 3;
camera.position.y = 3;
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
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // points.rotateY(elapsedTime / 10000);
  // @ts-ignore
  points.rotation.y = 0.01 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
