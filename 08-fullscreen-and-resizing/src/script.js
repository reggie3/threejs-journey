import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const NUM_CUBES = 6;
const CUBE_SIZE = 1;
const GAP_SIZE = 0.5; // Half a cube size for the gap
const cubeGroup = new THREE.Group();
const cubeMeshes = [];

// Calculate total width of all cubes including gaps
const totalWidth = NUM_CUBES * (CUBE_SIZE + GAP_SIZE) - GAP_SIZE;

// Loop to create and add box geometries to the cubeGroup
for (let i = 0; i < NUM_CUBES; i++) {
  const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);

  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(`hsl(${((i + 1) / 3) * 100}, 100%, 50%)`),
  });

  const cube = new THREE.Mesh(geometry, material);
  cube.userData = { cubeNumber: i };
  cubeMeshes.push(cube);

  // Calculate the position to center the cubes at the origin with gaps
  const xOffset = i * (CUBE_SIZE + GAP_SIZE) - totalWidth / 2 + CUBE_SIZE / 2;

  cube.position.set(xOffset, 0, 0); // Set position of each cube
  cubeGroup.add(cube); // Add the cube to the group
}

// Now cubeGroup is centered at the origin with 1x1x1 size cubes and gaps between them

scene.add(cubeGroup);
const axesHelper = new THREE.AxesHelper(4);
scene.add(axesHelper);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);

camera.position.set(0, 1, 5);
// camera.lookAt(cubeMeshes[2].position);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.add(camera);

// Cursor
const cursor = {
  x: 0,
  y: 0,
};

// Cursor
// window.addEventListener("mousemove", (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = -(event.clientY / sizes.height - 0.5);

//   console.log(cursor.x, cursor.y);
// });

/**
 * Animate
 */
const clock = new THREE.Clock();

let renderer;
const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);

  cubeGroup.position.x = Math.cos(elapsedTime);
  cubeGroup.position.y = Math.sin(elapsedTime);

  // Update camera
  // camera.position.x = cursor.x * 5;
  // camera.position.y = cursor.y * 5;

  // move the camera in a circle
  // camera.position.x = Math.sin(elapsedTime) * 10;
  // camera.position.z = Math.cos(elapsedTime) * 10;

  // move the camera like a orbit control
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 10;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 10;
  // camera.position.y = cursor.y * 3;

  // camera.lookAt(cubeMeshes[2].position);
  // controls.target = cubeMeshes[0].position;
  controls.update();

  window.requestAnimationFrame(animate);
};

animate();

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;

  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
