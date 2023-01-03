import {
  ScrollRise,
  TimeFrame,
  StickyPlatformScene,
  RefActor,
  Motion,
  Util, Value,
} from "../../../lib/index";
import {Scene} from "../../../lib/scenes/scene";
// @ts-ignore
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
// @ts-ignore
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js';

// world mesh
let world: any;

// Initialize three
initializeThree();

const earth = new RefActor(document.getElementById('earth')!);

const sceneFn: { height: Value } = {
  height: (w, h) => h,
};

const scene = new StickyPlatformScene(
  document.getElementById('scene')!,
  (w, h) => h * 2,
  {
    // offset,
    stickyPlatformHeight: sceneFn.height,
  }
);

scene.add(earth);

class EarthMotion extends Motion {
  name = 'EarthMotion';

  start;
  end;

  constructor(data: { start: Value, end: Value }) {
    super();

    this.start = data.start;
    this.end = data.end;
  }

  make(
    scrollPosForFrame: number,
    frame: TimeFrame,
    element: HTMLElement,
    scene: Scene<any>,
  ) {
    if (scrollPosForFrame > 0) {
      const motionL = this.end(Util.clientWidth(), Util.clientHeight()) - this.start(Util.clientWidth(), Util.clientHeight());
      const d = motionL/frame.length();
      const angle = this.start(Util.clientWidth(), Util.clientHeight()) + d * (scrollPosForFrame - frame.getStartPos());
      world.rotation.y = angle;
    }
  }
}

earth.addFrames([
  new TimeFrame(new EarthMotion({
    start: () => 0,
    end: () => Math.PI * 2,
  }), () => 0, sceneFn.height),
]);

const sr = new ScrollRise(scene);

function getEarthRadius() {
  return window.innerWidth < 600 ? 0.5 : 1;
}

function initializeThree() {

  // Base
  // ----------

  // Initialize scene
  const scene = new THREE.Scene()

  // Initialize camera
  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 60)

  // Reposition camera
  camera.position.set(6, 0, 0)

  // Initialize renderer
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  })

  // Set renderer size
  renderer.setSize(window.innerWidth, window.innerHeight)

  // Append renderer to body
  document.getElementById('earth')!.appendChild(renderer.domElement)

  // Initialize controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enableRotate = false;

  // World
  // ----------

  // Load world texture
  const worldTexture = new THREE.TextureLoader().load("assets/earth/small-world.jpeg")

  // Initialize world geometry
  const worldGeometry = new THREE.SphereGeometry(getEarthRadius(), 40, 40)

  // Initialize world material
  const worldMaterial = new THREE.MeshBasicMaterial({
    map: worldTexture
  })

  // Initialize world
  world = new THREE.Mesh(worldGeometry, worldMaterial)

  // Add earth to scene
  scene.add(world)

  // Clouds
  // ----------

  // Load clouds texture
  const cloudTexture = new THREE.TextureLoader().load("assets/earth/small-world-clouds.png")

  // Initialize clouds geometry
  const cloudGeometry = new THREE.SphereGeometry(getEarthRadius() + 0.01, 40, 40)

  // Initialize clouds material
  const cloudMaterial = new THREE.MeshBasicMaterial({
    map: cloudTexture,
    transparent: true
  })

  // Initialize clouds
  const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial)

  // Add clouds to scene
  scene.add(clouds)

  // Animation
  // ----------

  // Prepare animation loop
  function animate() {
    // Request animation frame
    requestAnimationFrame(animate)

    // Rotate world
    // world.rotation.y += 0.0005

    // Rotate clouds
    clouds.rotation.y -= 0.001

    // Render scene
    renderer.render(scene, camera)

  }

  // Animate
  animate()

  // Resize
  // ----------

  // Listen for window resizing
  window.addEventListener('resize', () => {
    // Update camera aspect
    camera.aspect = window.innerWidth / window.innerHeight

    // Update camera projection matrix
    camera.updateProjectionMatrix()

    // Resize renderer
    renderer.setSize(window.innerWidth, window.innerHeight)

  })

}