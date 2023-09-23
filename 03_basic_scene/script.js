const sizes={
    width:800,
    height: 600
}

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 'red'})
const redCube = new THREE.Mesh(geometry,material)

scene.add(redCube)

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height)
console.log(camera)
camera.position.z = 3

scene.add(camera)

const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
