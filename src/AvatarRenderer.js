import * as THREE from 'three';
import AvatarObject from "./AvatarObject";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const lightDebugOn = false;

export default class AvatarRenderer {
    // -----------------------------------------------------------------------------------------------------------------
    // Setup

    init(domElement, options) {
        if (this.didInit) {
            throw new Error("Already initialized!");
        }

        if (!options) {
            options = {};
        }

        this.domElement = domElement;
        this.options = Object.assign({ }, AvatarRenderer.defaultOptions, options);

        // Create scene
        this.scene = new THREE.Scene();

        // Create renderer
        this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Create camera
        window.addEventListener( 'resize', this._initCamera.bind(this), false);
        this._initCamera();

        // Add renderer to DOM, replacing its contents
        domElement.innerHTML = "";
        domElement.appendChild(this.renderer.domElement);

        // Set up mouse/keyboard controls
        if (this.options.enableControls) {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.minDistance = .5;
            this.controls.maxDistance = 8;
            this.controls.zoomSpeed = 2;
            this.controls.rotateSpeed = 3;
            this.controls.enablePan = false;
            this.controls.enableDamping = true;
            this.controls.target.set(0, 0, 0);
        }

        // Start render loop
        this._spawnDirectionalLight();

        console.log('[BeatSaberAvatar.js]', 'Created avatar renderer', this.renderer, this.options);
        this.didInit = true;

        this._renderLoop();
    }

    _initCamera() {
        const aspectRatio = this.domElement.clientWidth / this.domElement.clientHeight;

        if (!this.camera) {
            this.camera = new THREE.PerspectiveCamera(60, aspectRatio, 0.1, 10);
        } else {
            this.camera.aspect = aspectRatio;
        }

        this.camera.position.set(0, 0, this.options.initialZoomLevel);
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
        if (this.controls) {
            this.controls.update();
        }

        this.light.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);

        if (this.avatarObject) {
            if (this.options.rotateAnimation) {
                const swingSpeed = .0025;
                const swingLimit = .5;

                if (this.rotateBack) {
                    this.avatarObject.sceneGroup.rotation.y -= swingSpeed;

                    if (this.avatarObject.sceneGroup.rotation.y <= -swingLimit) {
                        this.rotateBack = false;
                    }
                } else {
                    this.avatarObject.sceneGroup.rotation.y += swingSpeed;

                    if (this.avatarObject.sceneGroup.rotation.y >= swingLimit) {
                        this.rotateBack = true;
                    }
                }
            }
        }
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

        this.avatarObject.setAvatarData(avatarData, this.options.enableGlasses, this.options.enableFacialHair,
          this.options.allowRandomize);
        this.avatarObject.load(THREE.DefaultLoadingManager, this.options.assetsBaseDir, this.options.debugUv);
    }
}

AvatarRenderer.defaultOptions = {
    assetsBaseDir: "assets/",
    enableControls: true,
    rotateAnimation: true,
    allowRandomize: true,
    enableGlasses: false,
    enableFacialHair: false,
    debugUv: false,
    initialZoomLevel: 1.5
};