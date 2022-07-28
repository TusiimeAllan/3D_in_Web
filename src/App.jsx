import { useEffect } from 'react';

import * as THREE from 'three';
import { GUI } from 'dat.gui';

import SceneInit from './components/SceneInit';

function App() {
  useEffect(() => {
    const render = new SceneInit('myRenderCanvas');
    render.initialize();
    render.animate();
    
    const boxGeometry = new THREE.BoxGeometry(14, 14, 14);
    const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    render.scene.add(boxMesh);

    const gui = new GUI();

    //Structuring the controls in folder for better organization
    const geometryFolder = gui.addFolder('Mesh Transformation');
    geometryFolder.open();
    
    //Translate Controls
    // const translateFolder = geometryFolder.addFolder('Translate');
    // translateFolder.add(boxMesh.position, 'x', -10, 10).name('Translate X');

    //Rotation Controls
    const rotationFolder = geometryFolder.addFolder('Rotation');
    rotationFolder.add(boxMesh.rotation, 'x', 0, Math.PI).name('Rotate X');
    rotationFolder.add(boxMesh.rotation, 'y', 0, Math.PI).name('Rotate Y');
    rotationFolder.add(boxMesh.rotation, 'z', 0, Math.PI).name('Rotate Z');

    //Scaling Controls
    const scaleFolder = geometryFolder.addFolder('Scale');
    scaleFolder.add(boxMesh.scale, 'x', 0.1, 2).name('Scale X Axis');
    scaleFolder.add(boxMesh.scale, 'y', 0.1, 2).name('Scale Y Axis');
    scaleFolder.add(boxMesh.scale, 'z', 0.1, 2).name('Scale Z Axis');

    //Material Controls
    const materialFolder = gui.addFolder('Mesh Material');
    const materialParams = { boxMeshColor: boxMesh.material.color.getHex() };

    materialFolder.add(boxMesh.material, 'wireframe');

    materialFolder
      .addColor(materialParams, 'boxMeshColor')
      .onChange((value) => boxMesh.material.color.set(value));
  }, []);

  return (
    <div>
      <canvas id="myRenderCanvas"/>
    </div>
  )
}

export default App
