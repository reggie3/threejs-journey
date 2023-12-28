import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

const gui = new GUI();

THREE.ColorManagement.enabled = false;
const manager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(manager);

const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg"
);
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg"
);
const gradientTexture = textureLoader.load("./textures/gradients/5.jpg");
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false; // can be deactivated if using magFilter

const cubeTextureLoader = new THREE.CubeTextureLoader(manager);
const environmentMapTexture = cubeTextureLoader.load([
  "./textures/environmentMaps/1/px.jpg",
  "./textures/environmentMaps/1/nx.jpg",
  "./textures/environmentMaps/1/py.jpg",
  "./textures/environmentMaps/1/ny.jpg",
  "./textures/environmentMaps/1/pz.jpg",
  "./textures/environmentMaps/1/nz.jpg",
]);

const matcapTexture = textureLoader.load("./textures/matcaps/7.png");

manager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log(
    "Loading file: " +
      url +
      ".\nLoaded " +
      itemsLoaded +
      " of " +
      itemsTotal +
      " files."
  );
};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// const material = new THREE.MeshNormalMaterial();
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.Color("green");
// material.color.set("orange");

// const material = new THREE.MeshDepthMaterial();
// const material = new THREE.MeshMatcapMaterial();
// const material = new THREE.MeshLambertMaterial();
// const material = new THREE.MeshPhongMaterial();
// const material = new THREE.MeshToonMaterial();

const material = new THREE.MeshStandardMaterial();
// const material = new THREE.MeshPhysicalMaterial();

material.metalness = 0.75;
material.roughness = 0.65;
material.envMap = environmentMapTexture;

// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 5;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;
// material.clearcoat = 10;

gui.add(material, "metalness", 0, 1).step(0.0001);
gui.add(material, "roughness", 0, 1).step(0.0001);
// gui.add(material, "displacementScale", -1, 1).step(0.0001);
// gui.add(material, "aoMapIntensity", 0, 10).step(0.0001);

// material.gradientMap = gradientTexture;

// material.shininess = 10;
// material.specular = new THREE.Color("red");
// material.matcap = matcapTexture;

// material.wireframe = true;

// material.transparent = true;
material.side = THREE.DoubleSide;
// material.wireframe = true;
// material.flatShading = true;
// material.opacity = 0.5;

// material.alphaMap = doorAlphaTexture;

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.5, 0.2, 64, 128),
  material
);
sphere.position.x = -2;
torus.position.x = 2;

scene.add(sphere, plane, torus);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

scene.add(ambientLight, pointLight);

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

  sphere.rotation.x = 0.1 * elapsedTime;
  plane.rotation.x = 0.1 * elapsedTime;
  torus.rotation.x = 0.1 * elapsedTime;

  sphere.rotation.y = 0.15 * elapsedTime;
  plane.rotation.y = 0.15 * elapsedTime;
  torus.rotation.y = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
