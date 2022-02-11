import * as THREE from 'three';
import AvatarPartMesh from "./AvatarPartMesh";
import AvatarPartsModel from "./AvatarPartsModel";
import AvatarEyes from "./AvatarEyes";

export default class AvatarObject {
    constructor() {
        this.sceneGroup = new THREE.Group();

        this.bodyGroup = new THREE.Group();
        this.sceneGroup.add(this.bodyGroup);

        this.handsGroup = new THREE.Group();
        this.sceneGroup.add(this.handsGroup);

        this.loadedObjects = { };

        this.headMesh = new AvatarPartMesh("head", "AvatarHead.obj");
        this.headTopMesh = AvatarPartsModel.headTops["PoloCap"];
        this.eyes = new AvatarEyes("test");
        this.handsMesh = AvatarPartsModel.hands["Hand"];
    }

    load(loadingManager, assetsBaseDir) {
        this.handlePartLoaded("headMesh", null, this.sceneGroup);
        this.handlePartLoaded("headTopMesh", null, this.sceneGroup);
        this.handlePartLoaded("eyes", null, this.sceneGroup);
        this.handlePartLoaded("handLeft", null, this.handsGroup);
        this.handlePartLoaded("handRight", null, this.handsGroup);

        if (this.headMesh) {
            this.headMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                this.handlePartLoaded("headMesh", meshObj, this.sceneGroup);
                this.setPartColors("headMesh", "#ff0000");
                meshObj.position.z = .125;
            });
        }

        if (this.headTopMesh) {
            this.headTopMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                // TODO Position / rotation
                this.handlePartLoaded("headTopMesh", meshObj, this.sceneGroup);
                this.setPartColors("headTopMesh", "#0000ff");
            });
        }

        if (this.eyes) {
            this.eyes.load(loadingManager, assetsBaseDir, (planeObj) => {
                this.handlePartLoaded("eyes", planeObj, this.sceneGroup);
                planeObj.position.z = .153;
                planeObj.position.y = .025;
            });
        }

        if (this.handsMesh) {
            this.handsMesh.load(loadingManager, assetsBaseDir, (meshObj) => {

                let handLeft = meshObj.clone();
                handLeft.scale.set(1, 1, 1);
                handLeft.position.set(-0.333, -.333, .1);

                let handRight = meshObj.clone();
                handRight.scale.set(-1, 1, 1);
                handRight.position.set(.333, -.333, .1);

                this.handlePartLoaded("handLeft", handLeft, this.handsGroup);
                this.handlePartLoaded("handRight", handRight, this.handsGroup);
                this.setPartColors("handLeft", "#ff0000");
                this.setPartColors("handRight", "#ff0000");
            });
        }
    }

    handlePartLoaded(key, gameObject, group) {
        if (this.loadedObjects[key]) {
            group.remove(this.loadedObjects[key]);
        }
        if (gameObject) {
            group.add(gameObject);
            this.loadedObjects[key] = gameObject;
        }
    }

    setPartColors(key, primaryColor = null, secondaryColor = null, tertiaryColor = null) {
        let obj = this.loadedObjects[key];

        if (!obj) {
            return;
        }

        // This is just temporary...
        // TODO Proper color-to-UV mapping for parts

        obj.traverse(function (childObj) {
            if (childObj instanceof THREE.Mesh) {
                childObj.material.color.set(primaryColor);

                if (childObj.name === "FacialHair") {
                    // Goatee removal from avatar head (maybe for future use?)
                    childObj.visible = false;
                }
            }
        });
    }

    setAvatarData(avatarData) {
        // TODO
    }
}