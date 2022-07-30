import { useEffect } from 'react';

import * as THREE from 'three';
import { GUI } from 'dat.gui';

import SceneInit from './components/SceneInit';

function App() {
  useEffect(() => {
    const render = new SceneInit('myRenderCanvas');
    render.initialize();
    render.animate();
    
    //The Models
    const boxGeometry1 = new THREE.BoxGeometry(9, 9, 9);
    const boxMaterial1 = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const boxMesh1 = new THREE.Mesh(boxGeometry1, boxMaterial1);
    boxMesh1.position.x = -15;
    render.scene.add(boxMesh1);

    const boxGeometry2 = new THREE.BoxGeometry(9, 9, 9);
    const boxMaterial2 = new THREE.MeshPhongMaterial({ color: 0x8e2669 });
    const boxMesh2 = new THREE.Mesh(boxGeometry2, boxMaterial2);
    boxMesh2.position.x = 0;
    render.scene.add(boxMesh2);

    const boxGeometry3 = new THREE.BoxGeometry(9, 9, 9);
    const boxMaterial3 = new THREE.MeshPhongMaterial({ color: 0xd95610 });
    const boxMesh3 = new THREE.Mesh(boxGeometry3, boxMaterial3);
    boxMesh3.position.x = 15;
    render.scene.add(boxMesh3);

    const groundGeometry = new THREE.BoxGeometry(70, 3, 70);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x505050 });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.position.y = -10;
    render.scene.add(groundMesh);

    const gui = new GUI();

    //Adding Light and its controls
    //Ambient Light (Lights the scene uniformly)
    const al = new THREE.AmbientLight(0xffffff, 0.5);
    render.scene.add(al);

    const alFolder = gui.addFolder('Ambient Light');
    const alSettings = { color: al.color.getHex() };
    alFolder.add(al, 'visible');
    alFolder.add(al, 'intensity', 0.1, 2, 0.25);
    alFolder
      .addColor(alSettings, 'color')
      .onChange((value) => al.color.set(value));
    alFolder.open();

    //Directional Light (Lights the scene like the Sun)
    const dl = new THREE.DirectionalLight(0xffffff, 0.5);
    dl.position.set(0, 12, 0);
    const dlHelper = new THREE.DirectionalLightHelper(dl, 3);
    render.scene.add(dl, dlHelper);

    const dlFolder = gui.addFolder('Directional Light');
    const dlSettings = { 
      visible: true,
      color: dl.color.getHex() 
    };
    dlFolder.add(dlSettings, 'visible').onChange((value) => {
      dl.visible = value;
      dlHelper.visible = value;
    });
    dlFolder.add(dl, 'intensity', 0.1, 2, 0.25);
    dlFolder
      .addColor(dlSettings, 'color')
      .onChange((value) => dl.color.set(value));
    dlFolder.open();


    //Spot Light (Focuses on a specific area)
    const sl = new THREE.SpotLight(0x00ff00, 1, 8, Math.PI / 8, 0);
    sl.position.set(0, 12, 12);
    const slHelper = new THREE.SpotLightHelper(sl, 2);
    render.scene.add(sl, slHelper);

    const slFolder = gui.addFolder('Spot Light');
    const slSettings = { 
      visible: true,
      color: sl.color.getHex() 
    };
    slFolder.add(slSettings, 'visible').onChange((value) => {
      sl.visible = value;
      slHelper.visible = value;
    });
    slFolder.add(sl, 'intensity', 0, 4, 0.25);
    slFolder.add(sl, 'castShadow');
    slFolder.add(sl, 'angle', Math.PI / 16, Math.PI / 2, Math.PI / 16);
    slFolder
      .addColor(slSettings, 'color')
      .onChange((value) => sl.color.set(value));
    slFolder.open();


    //Point Light (Illuminates light from a certain point)
    const pl = new THREE.PointLight(0x00ff00, 1, 8, 2);
    pl.position.set(12, 12, 12);
    const plHelper = new THREE.PointLightHelper(pl, 2);
    render.scene.add(pl, plHelper);

    const plFolder = gui.addFolder('Point Light');
    const plSettings = { 
      visible: true,
      color: pl.color.getHex() 
    };
    plFolder.add(plSettings, 'visible').onChange((value) => {
      pl.visible = value;
      plHelper.visible = value;
    });
    plFolder.add(pl, 'intensity', 0, 4, 0.25);
    plFolder.add(pl, 'castShadow');
    plFolder.add(pl, 'angle', Math.PI / 16, Math.PI / 2, Math.PI / 16);
    plFolder
      .addColor(plSettings, 'color')
      .onChange((value) => pl.color.set(value));
    plFolder.open();
    
    
  }, []);

  return (
    <div>
      <canvas id="myRenderCanvas"/>
    </div>
  )
}

export default App;
