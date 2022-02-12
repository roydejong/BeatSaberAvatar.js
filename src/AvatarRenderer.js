import * as THREE from 'three';
import AvatarObject from "./AvatarObject";
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js';

const lightDebugOn = false;

export default class AvatarRenderer {
    // -----------------------------------------------------------------------------------------------------------------
    // Setup

    init(domElement, assetsBaseDir = "/assets/") {
        if (this.didInit) {
            throw new Error("Already initialized!");
        }

        this.domElement = domElement;
        this.assetsBaseDir = assetsBaseDir;

        // Create scene
        this.scene = new THREE.Scene();

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Create camera
        window.addEventListener( 'resize', this._updateCamera.bind(this), false);
        this._updateCamera();

        // Add renderer to DOM, replacing its contents
        domElement.innerHTML = "";
        domElement.appendChild(this.renderer.domElement);

        // Set up mouse/keyboard controls
        this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 10;
        this.controls.noPan = true;
        this.controls.target.set(0, 0, 0);

        // Start render loop
        this._spawnDirectionalLight();

        console.log('[BeatSaberAvatar.js]', 'Created avatar renderer', this.renderer);
        this.didInit = true;

        this._renderLoop();
    }

    _updateCamera() {
        const aspectRatio = this.domElement.clientWidth / this.domElement.clientHeight;

        if (!this.camera) {
            this.camera = new THREE.PerspectiveCamera(60, aspectRatio, 0.1, 10);
        } else {
            this.camera.aspect = aspectRatio;
        }

        this.camera.position.set(0, 0, 1.5);
        this.camera.rotation.set(0, 0, 0);

        if (this.renderer) {
            this.renderer.setSize(this.domElement.clientWidth, this.domElement.clientHeight);
        }

        this.camera.updateProjectionMatrix();
    }

    _spawnDirectionalLight() {
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

    // -----------------------------------------------------------------------------------------------------------------
    // Render loop

    _renderLoop() {
        requestAnimationFrame(this._renderLoop.bind(this));

        this._update();
        this._render();
    }

    _update() {
        this.controls.update();
        this.light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
    }

    _render() {
        this.renderer.render(this.scene, this.camera);
    }

    // -----------------------------------------------------------------------------------------------------------------
    // Public API

    setRandomAvatar() {
        this.setAvatarData(null);
    }

    setAvatarData(avatarData) {
        console.log('[BeatSaberAvatar.js]', 'Set avatar data:', avatarData || "Random!");

        if (this.avatarObject == null) {
            this.avatarObject = new AvatarObject();
            this.scene.add(this.avatarObject.sceneGroup);
        }

        this.avatarObject.setAvatarData(avatarData);
        this.avatarObject.load(THREE.DefaultLoadingManager, this.assetsBaseDir);
    }
}