import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class SceneInit{
    constructor(canvasId){
        this.fov = 45;
        this.canvasId = canvasId;

        this.scene = undefined;
        this.clock = undefined;
        this.stats = undefined;
        this.camera = undefined;
        this.controls = undefined;
        this.renderer = undefined;
    }

    initialize(){
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 96;

        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();

        const canvas = document.getElementById(this.canvasId);
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.stats = Stats();
        document.body.appendChild(this.stats.dom);

        let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        ambientLight.castShadow = true;
        this.scene.add(ambientLight);

        let spotLight = new THREE.SpotLight(0xffffff, 1);
        spotLight.castShadow = true;
        spotLight.position.set(0, 64, 32);
        this.scene.add(spotLight);

        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    animate(){
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
        this.stats.update();
        this.controls.update();
        
    }

    render(){
        this.renderer.render(this.scene, this.camera);
    }
}