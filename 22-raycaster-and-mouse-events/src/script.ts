import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Models
const gltfLoader = new GLTFLoader();

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2.1);
directionalLight.position.set(1, 2, 3);

scene.add(directionalLight);

let gltf = null;

gltfLoader.load("/models/Duck/glTF-Binary/Duck.glb", (loadedGltf) => {
  gltf = loadedGltf;

  loadedGltf.scene.position.y = -1.2;
  scene.add(loadedGltf.scene);
});

/**
 * Objects
 */
const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object1.position.x = -2;
object1.name = "object1";

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object2.name = "object2";

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);

object3.position.x = 2;
object3.name = "object3";

scene.add(object1, object2, object3);

/**
 * Raycaster
 */

const raycaster = new THREE.Raycaster();

// const rayOrigin = new THREE.Vector3(-3, 0, 0);
// const rayDirection = new THREE.Vector3(10, 0, 0);
// rayDirection.normalize();

// raycaster.set(rayOrigin, rayDirection);

// object1.updateMatrixWorld();
// object2.updateMatrixWorld();
// object3.updateMatrixWorld();

// const intersect = raycaster.intersectObject(object2);
// console.log({ intersect });

// const intersects = raycaster.intersectObjects([object1, object2, object3]);
// console.log({ intersects });

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

const mouse = new THREE.Vector2(-2, -2);

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -1 * (event.clientY / sizes.height) * 2 + 1;
});

window.addEventListener("click", () => {
  if (currentIntersect) {
    console.log("clicked on", currentIntersect.object.name);
  }
});

/**
 * Mouse
 */

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
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

let currentIntersect = null;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // animate spheres
  object1.position.y = Math.sin(elapsedTime);
  object2.position.y = Math.cos(elapsedTime);
  object3.position.y = Math.sin(elapsedTime * 0.3);

  // cast a ray
  raycaster.setFromCamera(mouse, camera);
  const objectsToTest = [object1, object2, object3];
  const intersects = raycaster.intersectObjects(objectsToTest);

  objectsToTest.forEach((object) => {
    object.material.color.set("#ff0000");
  });

  intersects.forEach((intersections) => {
    intersections.object.material.color.set("#00bbff");
  });

  // model intersection
  if (gltf) {
    gltf.scene.rotation.y += 0.1;
    const modelIntersects = raycaster.intersectObject(gltf.scene);
    if (modelIntersects.length) {
      gltf.scene.scale.set(1.2, 1.2, 1.2);
    } else {
      gltf.scene.scale.set(1, 1, 1);
    }
  }

  // mouse enter
  if (intersects.length) {
    if (!currentIntersect) {
      currentIntersect = intersects[0];
    }
  }
  // mouse leave
  else {
    if (currentIntersect) {
      console.log("mouse leave");
      currentIntersect = null;
    }
  }

  // const rayOrigin = new THREE.Vector3(-3, 0, 0);
  // const rayDirection = new THREE.Vector3(10, 0, 0);

  // raycaster.set(rayOrigin, rayDirection.normalize());

  // const objectsToTest = [object1, object2, object3];
  // objectsToTest.forEach((object) => {
  //   object.material.color.set("#ff0000");
  // });

  // const intersects = raycaster.intersectObjects(objectsToTest);

  // intersects.forEach((intersections) => {
  //   intersections.object.material.color.set("#00bbff");
  // });

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
