import './style.css'

import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


// SetUp
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);



// Geometry

const geometry = new THREE.TorusKnotGeometry( 14, 2, 300, 15, 1, 3 );
const material = new THREE.MeshStandardMaterial( { color: 0xB7950B} );
const torusKnot = new THREE.Mesh( geometry, material );

scene.add( torusKnot );
torusKnot.position.set(2,1,-5);


//Avatar

const yaroslavTexture = new THREE.TextureLoader().load('yaroslav.jpg');

const yaroslav = new THREE.Mesh(
new THREE.BoxGeometry( 2.5, 2.5, 2.5 ),
new THREE.MeshBasicMaterial( {map: yaroslavTexture} ), // replacing texture of the geometri with the photo we loaded for texture
);
scene.add(yaroslav);


//const lizaTexture = new THREE.TextureLoader().load('liza.jpg');
//
//const liza = new THREE.Mesh(
//new THREE.BoxGeometry( 5, 7, 5 ),
//new THREE.MeshBasicMaterial( {map: lizaTexture} ),
//);
//scene.add(liza);
//liza.position.x=2;
//yaroslav.position.x=-2;

//Moon

const moonTexture = new THREE.TextureLoader().load('2k_moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);




//Earth

const earthTexture = new THREE.TextureLoader().load('2k_earth_daymap.jpg');
const normaEarthTexture = new THREE.TextureLoader().load('2k_earth_normal_map.tif');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(8,32,32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: normaEarthTexture,
  })
);

//Jupiter

const jupiterTexture = new THREE.TextureLoader().load('2k_jupiter.jpg');
const normaJupiterTexture = new THREE.TextureLoader().load('normal.jpg');
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(12, 32, 32),
  new THREE.MeshStandardMaterial({
  map: jupiterTexture,
  normalMap: normaJupiterTexture,
  })
);


const parent = new THREE.Object3D();
const parent2 = new THREE.Object3D();
const parent3 = new THREE.Object3D();


scene.add(earth);
scene.add(jupiter);
parent.add(moon);
earth.add(parent);
parent2.add(earth);
parent3.add(jupiter);

scene.add(parent2, parent3);


earth.position.set(40, 40, -40);
moon.position.set(10, 10, -10);
jupiter.position.set(-100, 40, -40);
yaroslav.position.set(2,1,-5);




// make a moon rotate around the earth;
function animate() {
  requestAnimationFrame(animate);
  parent.rotateY(0.005);
  renderer.render(scene, camera);

}
function animateEA(){
  requestAnimationFrame(animateEA);
  parent2.rotateY(0.002);
  renderer.render(scene, camera);
}
function animateJP(){
  requestAnimationFrame(animateJP);
  parent3.rotateY(-0.001);
  renderer.render(scene, camera);
}


//Light


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(30,30,30)

const ambientlight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientlight)

//Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

//Controls

//const controls = new OrbitControls(camera, renderer.domElement);



// function to always show our geometry
function animateGEO(){
requestAnimationFrame(animateGEO)

torusKnot.rotation.x +=0.005;
torusKnot.rotation.y +=0.005;
torusKnot.rotation.z +=0.005;

controls.update();

renderer.render( scene, camera);
}



//function to generate random stars

function addStar(){
const geometry = new THREE.SphereGeometry( 0.25, 24, 4, 0 );
const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const star = new THREE.Mesh( geometry, material );

const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));
star.position.set(x,y,z);

scene.add( star );
}

// function to move camera

function moveCamera(){

  const t = document.body.getBoundingClientRect().top;
//moon.rotation.x += 0.25;
//moon.rotation.y += 0.075;
//moon.rotation.z += 0.05;

yaroslav.rotation.y += 0.01;
//yaroslav.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;


}

document.body.onscroll = moveCamera;


// adding picture for BG

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

Array(500).fill().forEach(addStar);

animate()
animateEA()
animateJP()
animateGEO()
moveCamera()


