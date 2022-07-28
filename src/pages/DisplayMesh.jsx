import { useEffect } from 'react';

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry';

import SceneInit from '../components/SceneInit';

function DisplayMesh() {
  useEffect(() => {
    const render = new SceneInit('myRenderCanvas');
    render.initialize();
    render.animate();
    
    //A Normal Box
    // const boxGeometry = new THREE.BoxGeometry(10, 10, 10, 1, 1, 3);
    // const boxMaterial = new THREE.MeshNormalMaterial({wireframe: true });
    // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // boxMesh.position.x = -10;
    // render.scene.add(boxMesh);

    //A Rounded Box
    const roundedBoxGeometry = new RoundedBoxGeometry(1, 1, 1, 4, 0.1);
    const roundedBoxMaterial = new THREE.MeshNormalMaterial({wireframe: true });
    const roundedBoxMesh = new THREE.Mesh(roundedBoxGeometry, roundedBoxMaterial);
    roundedBoxMesh.position.x = -1;
    render.scene.add(roundedBoxMesh);

    const teapotGeometry = new TeapotGeometry(0.5, 8);
    const teapotMaterial = new THREE.MeshNormalMaterial({ wireframe: true });
    const teapotMesh = new THREE.Mesh(teapotGeometry, teapotMaterial);
    teapotMesh.position.x = 1;
    render.scene.add(teapotMesh);
  }, []);

  return (
    <div>
      <canvas id="myRenderCanvas"/>
    </div>
  )
}

export default DisplayMesh
