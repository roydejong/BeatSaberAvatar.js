import * as THREE from 'three';
import AvatarObject from "./AvatarObject";
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js';

const lightDebugOn = false;

export default class AvatarRenderer {
    init(assetsBaseDir = "/assets/") {
        this.assetsBaseDir = assetsBaseDir;

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10);
        this.camera.position.set(0, 0, 1);
        this.camera.rotation.set(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        document.body.appendChild(this.renderer.domElement);

        this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 10;
        this.controls.noPan = true;
        this.controls.target.set(0, 0, 0);
    }

    renderLoop() {
        requestAnimationFrame(this.renderLoop.bind(this));
        this.update();
        this.render();
    }

    update() {
        this.controls.update();
        this.light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    spawnDirectionalLight() {
        this.light = new THREE.DirectionalLight(0xffffff, 1);
        this.light.castShadow = true;
        this.scene.add(this.light);

        this.light.shadow.mapSize.width = 512;
        this.light.shadow.mapSize.height = 512;
        this.light.shadow.camera.near = 0.1;
        this.light.shadow.camera.far = 10;

        if (lightDebugOn) {
            const helper = new THREE.CameraHelper(this.light.shadow.camera);
            this.scene.add(helper);
        }
    }

    spawnAvatarObject() {
        this.avatarObject = new AvatarObject();
        this.avatarObject.load(THREE.DefaultLoadingManager, this.assetsBaseDir);
        this.scene.add(this.avatarObject.sceneGroup);
    }
}