import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import loadingManager from "./loadingManager";

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

// Fog
const fog = new THREE.Fog("#262837", 1, 15);
scene.fog = fog;

const axesHelper = new THREE.AxesHelper(6);
scene.add(axesHelper);

/**
 * Textures
 */
//Door
const textureLoader = new THREE.TextureLoader(loadingManager);
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// Bricks
const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);

// Grass
const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);
grassColorTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

/**
 * House
 */
// Temporary sphere
// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(1, 32, 32),
//   new THREE.MeshStandardMaterial({ roughness: 0.7 })
// );
// sphere.position.y = 1;
// scene.add(sphere);

const house = new THREE.Group();
scene.add(house);

// Walls
const WALL_HEIGHT = 2.5;
const WALL_WIDTH = 4;
const WALL_DEPTH = WALL_WIDTH;
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(WALL_WIDTH, WALL_HEIGHT, WALL_DEPTH),
  new THREE.MeshStandardMaterial({
    color: "#ac8e82",
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    roughnessMap: bricksRoughnessTexture,
    normalMap: bricksNormalTexture,
  })
);
walls.position.y = WALL_HEIGHT / 2;
house.add(walls);

// Roof
const ROOF_HEIGHT = 1;
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(4, ROOF_HEIGHT, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.rotation.y = Math.PI / 4;
roof.position.y = WALL_HEIGHT + ROOF_HEIGHT / 2;
house.add(roof);

// Door
const DOOR_HEIGHT = 2.2;
const DOOR_WIDTH = 2.2;
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(DOOR_WIDTH, DOOR_HEIGHT, 100, 100),
  new THREE.MeshStandardMaterial({ color: "#aa7b7b" })
);
door.material.map = doorColorTexture;
door.material.alphaMap = doorAlphaTexture;
door.material.transparent = true;
door.material.normalMap = doorNormalTexture;
door.material.ao = doorAmbientOcclusionTexture;
door.material.roughnessMap = doorRoughnessTexture;
door.material.metalnessMap = doorMetalnessTexture;
door.material.displacementMap = doorHeightTexture;
door.material.displacementScale = 0.1;

door.position.z = WALL_WIDTH / 2 + 0.01;
door.position.y = DOOR_HEIGHT / 2 - 0.2;
house.add(door);

// Bushes
const BUSH_RADIUS = 0.5;

const bushGeometry = new THREE.SphereGeometry(BUSH_RADIUS);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);

bush1.position.set((WALL_WIDTH / 2) * 0.9, 0.1, WALL_WIDTH / 2 + 0.5);
bush1.scale.set(0.5, 0.5, 0.5);
bush4.position.set((WALL_WIDTH / 3.75) * 0.9, 0.2, WALL_WIDTH / 2 + 0.5);
bush4.scale.set(1.25, 1.25, 1.25);

bush2.position.set((WALL_WIDTH / -4) * 0.9, 0.3, WALL_WIDTH / 2 + 0.5);
bush1.scale.set(0.75, 0.75, 0.75);
bush3.position.set((WALL_WIDTH / -2.5) * 0.9, 0.1, WALL_WIDTH / 2 + 0.75);
bush3.scale.set(0.5, 0.5, 0.5);

house.add(bush1, bush2, bush3, bush4);

// Graves

const GRAVE_WIDTH = 0.6;
const GRAVE_HEIGHT = 0.8;
const GRAVE_DEPTH = 0.2;
const graveGeometry = new THREE.BoxGeometry(
  GRAVE_WIDTH,
  GRAVE_HEIGHT,
  GRAVE_DEPTH
);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });
const graves = new THREE.Group();

for (let i = 0; i < 50; i++) {
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  const angle = Math.random() * Math.PI * 2;
  const radius = 3.5 + Math.random() * 6;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  grave.position.x = x;
  grave.position.z = z;
  grave.position.y = GRAVE_HEIGHT * 0.45 - Math.random() * 0.2;

  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;

  grave.castShadow = true;
  graves.add(grave);
}

scene.add(graves);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    color: "#a9c388",
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughness: grassRoughnessTexture,
  })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

// Door Light
const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(door.position.x, DOOR_HEIGHT, door.position.z + 1);

house.add(doorLight);

/**
 * Ghosts
 */

const ghost1 = new THREE.PointLight("#ff00ff", 2, 3);
scene.add(ghost1);
const ghost2 = new THREE.PointLight("#0000ff", 2, 3);
scene.add(ghost2);
const ghost3 = new THREE.PointLight("#00ffff", 2, 3);
scene.add(ghost3);

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
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
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
renderer.setClearColor("#262837");
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Shadows
 */

renderer.shadowMap.enabled = true;
moonLight.castShadow = true;
floor.receiveShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
walls.castShadow = true;
walls.receiveShadow = true;
roof.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;
bush1.receiveShadow = true;
bush2.receiveShadow = true;
bush3.receiveShadow = true;
bush4.receiveShadow = true;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 5;
  ghost1.position.y = Math.sin(ghost1Angle) * 5;
  ghost1.position.z = Math.sin(elapsedTime * 3);

  const ghost2Angle = -elapsedTime * 0.32;
  ghost2.position.x = Math.cos(ghost2Angle) * 6;
  ghost2.position.y = Math.sin(ghost2Angle) * 6;
  ghost2.position.z = Math.sin(elapsedTime * 3) + Math.cos(elapsedTime * 25);

  const ghost3Angle = -elapsedTime * 0.18;
  ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.3));
  ghost3.position.y = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
  ghost3.position.z = Math.sin(elapsedTime * 4);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
