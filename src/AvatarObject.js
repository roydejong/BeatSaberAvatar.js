import * as THREE from 'three';
import AvatarPartMesh from "./AvatarPartMesh";
import AvatarPartsModel from "./AvatarPartsModel";
import AvatarEyes from "./AvatarEyes";
import AvatarData from "./AvatarData";

export default class AvatarObject {
    constructor() {
        this.sceneGroup = new THREE.Group();
        this.sceneGroup.position.set(0, .15, 0);

        this.loadedObjects = { };

        this.headMesh = new AvatarPartMesh("head", "AvatarHead.obj");
    }

    setAvatarData(avatarData) {
        this.avatarData = avatarData;

        this.headTopMesh = AvatarPartsModel.tryGetPart("headTops", avatarData?.headTopId);
        this.eyes = new AvatarEyes(avatarData?.eye);
        this.handsMesh = AvatarPartsModel.tryGetPart("hands", avatarData?.handsId);
        this.clothesMesh = AvatarPartsModel.tryGetPart("clothes", avatarData?.clothesId);

        if (!this.avatarData) {
            // Store randomized results for use in load callback (mostly for colors)
            this.avatarData = new AvatarData();
            this.avatarData.headTopId = this.headTopMesh?.id || "None";
            this.avatarData.eyesId = this.eyes.id;
            this.avatarData.handsId = this.handsMesh.id;
            this.avatarData.clothesId = this.clothesMesh.id;
        }
    }

    load(loadingManager, assetsBaseDir) {
        this.handlePartLoaded("headMesh", null);
        this.handlePartLoaded("headTopMesh", null);
        this.handlePartLoaded("eyes", null);
        this.handlePartLoaded("handLeft", null);
        this.handlePartLoaded("handRight", null);

        if (this.headMesh) {
            this.headMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                this.handlePartLoaded("headMesh", meshObj);
                this.setPartColors("headMesh", "#ff0000", "#ff00ff");
                meshObj.position.z = .125;
            });
        }

        if (this.headTopMesh) {
            this.headTopMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                this.handlePartLoaded("headTopMesh", meshObj);
                this.setPartColors("headTopMesh", "#0000ff");
            });
        }

        if (this.eyes) {
            this.eyes.load(loadingManager, assetsBaseDir, (planeObj) => {
                this.handlePartLoaded("eyes", planeObj);
                planeObj.position.z = .153;
                planeObj.position.y = .025;
            });
        }

        if (this.handsMesh) {
            this.handsMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                let handLeft = meshObj.clone();
                handLeft.scale.set(1, 1, 1);
                handLeft.position.set(-0.25, -.6, .05);

                let handRight = meshObj.clone();
                handRight.scale.set(-1, 1, 1);
                handRight.position.set(.25, -.6, .05);

                this.handlePartLoaded("handLeft", handLeft);
                this.handlePartLoaded("handRight", handRight);
                this.setPartColors("handLeft", "#ff0000");
                this.setPartColors("handRight", "#ff0000");
            });
        }

        if (this.clothesMesh) {
            this.clothesMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                this.handlePartLoaded("clothesMesh", meshObj);
                this.setPartColors("clothesMesh", "#00ff00");
                meshObj.position.set(0, -.25, 0);
            });
        }
    }

    handlePartLoaded(key, gameObject) {
        if (this.loadedObjects[key]) {
            this.sceneGroup.remove(this.loadedObjects[key]);
        }
        if (gameObject) {
            this.sceneGroup.add(gameObject);
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
}