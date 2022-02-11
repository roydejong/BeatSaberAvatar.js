import * as THREE from 'three';
import AvatarPartMesh from "./AvatarPartMesh";
import AvatarPartsModel from "./AvatarPartsModel";
import AvatarEyes from "./AvatarEyes";

export default class AvatarObject {
    constructor() {
        this.sceneGroup = new THREE.Group();
        this.loadedObjects = { };

        this.headMesh = new AvatarPartMesh("head", "AvatarHead.obj");
        this.headTopMesh = AvatarPartsModel.headTops["BedHead"];
        this.eyes = new AvatarEyes("test");
    }

    load(loadingManager, assetsBaseDir) {
        this.handlePartLoaded("headMesh", null);
        this.handlePartLoaded("headTopMesh", null);

        if (this.headMesh) {
            this.headMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                this.handlePartLoaded("headMesh", meshObj);
                this.setPartColors("headMesh", "#ff0000");
                meshObj.position.z = .125;
            });
        }

        if (this.headTopMesh) {
            this.headTopMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                // TODO Position / rotation
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

    setAvatarData(avatarData) {
        // TODO
    }
}