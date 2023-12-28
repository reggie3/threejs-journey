import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const cubeGroup = new THREE.Group();
/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);

for (let i = 0; i < 3; i++) {
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(`hsl(${((i + 1) / 3) * 100}, 100%, 50%)`),
  });

  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(i * 2, 0, 0);
  console.log((1 * i) / 3);

  cubeGroup.add(mesh);
}

cubeGroup.position.x = -2;
cubeGroup.position.y = 0;
cubeGroup.rotateZ(Math.PI);

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
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
