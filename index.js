import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const computer = new THREE.Mesh( geometry, material );
scene.add( computer );

computer.position.z = -10;

const computerFinalPosition = {
    rotationX: 0,
    rotationY: -1.4,
    rotationZ: 0,
    positionX: 3,
    positionY: 0,
    positionZ: -5
}
const speed = 0.02

// computer.position.z = computerFinalPosition.positionZ;
// computer.position.x = computerFinalPosition.positionX;
// computer.rotation.y = computerFinalPosition.rotationY;

function animate() {
	requestAnimationFrame( animate );

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	// cube.rotation.z += 0.01;
    if (computer.position.x < computerFinalPosition.positionX) {
        const difference = Math.abs(computer.position.x - computerFinalPosition.positionX);
        computer.position.x += difference * speed;
    }
    if (computer.position.z < computerFinalPosition.positionZ) {
        const difference = Math.abs(computer.position.z - computerFinalPosition.positionZ);
        computer.position.z += difference * speed;
    }
    if (computer.rotation.y > computerFinalPosition.rotationY) {
        const difference = Math.abs(computer.rotation.y - computerFinalPosition.rotationY);
        computer.rotation.y -= difference * speed;
    }

	renderer.render( scene, camera );
}

animate();