import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const NUM_CUBES = 6;
const CUBE_SIZE = 1;
const GAP_SIZE = 0.5; // Half a cube size for the gap
const cubeGroup = new THREE.Group();

// Calculate total width of all cubes including gaps
const totalWidth = NUM_CUBES * (CUBE_SIZE + GAP_SIZE) - GAP_SIZE;

// Loop to create and add box geometries to the cubeGroup
for (let i = 0; i < NUM_CUBES; i++) {
  const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);

  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(`hsl(${((i + 1) / 3) * 100}, 100%, 50%)`),
  });

  const cube = new THREE.Mesh(geometry, material);

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
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 1, 5);
scene.add(camera);

/**
 * Animate
 */
const clock = new THREE.Clock();

gsap.to(cubeGroup.position, { duration: 1, delay: 1, x: 2 });

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.render(scene, camera);

  cubeGroup.position.x = Math.cos(elapsedTime);
  // cubeGroup.position.y = Math.sin(elapsedTime);

  window.requestAnimationFrame(animate);
};

animate();
