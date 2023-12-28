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

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// scene.add(ambientLight)

// const pointLight = new THREE.PointLight(0xffffff, 0.5)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

const ambientLight = new THREE.AmbientLight("indigo", 0.15);
gui.add(ambientLight, "intensity", 0, 1, 0.001).name("ambient intensity");

const directionalLight = new THREE.DirectionalLight("cyan", 0.5);
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight
);

directionalLight.position.set(4, 0.25, 0);
gui
  .add(directionalLight, "intensity", 0, 1, 0.001)
  .name("directional intensity");
gui
  .add(directionalLight.position, "x", -1, 1, 0.01)
  .name("directional position x");
gui
  .add(directionalLight.position, "y", -1, 1, 0.01)
  .name("directional position y");
gui
  .add(directionalLight.position, "z", -1, 1, 0.01)
  .name("directional position z");

const hemisphereLight = new THREE.HemisphereLight("yellow", "purple", 0.5);
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight);

const pointLight = new THREE.PointLight("white", 0.75, 10, 2);
pointLight.position.set(0, 0, 0);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
gui.add(pointLight, "distance", 0, 50, 0.1).name("pointLight distance");
gui.add(pointLight, "decay", 0, 20, 0.1).name("pointLight decay");

const rectAreaLight = new THREE.RectAreaLight("indigo", 2, 5, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());

gui.add(rectAreaLight, "intensity", 0, 5, 0.01).name("rectAreaLight intensity");
gui.add(rectAreaLight.position, "z", -5, 5, 0.01).name("rectAreaLight z");

const spotLight = new THREE.SpotLight(0x78ff00, 1, 10, Math.PI * 0.1, 0.25, 1);

spotLight.position.set(0, 2, 3);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);

scene.add(ambientLight);
scene.add(directionalLight, directionalLightHelper);
scene.add(hemisphereLight, hemisphereLightHelper);
scene.add(pointLight, pointLightHelper);

scene.add(rectAreaLight);
scene.add(spotLight);
scene.add(spotLightHelper);
/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

spotLight.target = torus;

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
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
