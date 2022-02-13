import * as THREE from 'three';
import AvatarPartMesh from "./AvatarPartMesh";
import AvatarPartsModel from "./AvatarPartsModel";
import AvatarData from "./AvatarData";
import AvatarColor from "./AvatarColor";

export default class AvatarObject {
    constructor() {
        this.sceneGroup = new THREE.Group();
        this.sceneGroup.position.set(0, .15, 0);

        this.loadedObjects = { };

        this.headMesh = new AvatarPartMesh("head", "AvatarHead.obj");
    }

    setAvatarData(avatarData, enableGlasses = false, enableFacialHair = false) {
        this.avatarData = avatarData;

        /**
         * @type {AvatarColor}
         */
        this.skinColor = AvatarPartsModel.tryGetPart("skinColors", avatarData?.skinColorId);

        this.headTopMesh = AvatarPartsModel.tryGetPart("headTops", avatarData?.headTopId);
        this.headTopPrimaryColor = new AvatarColor("headTopPrimaryColor", avatarData?.headTopPrimaryColor
            || AvatarColor.getRandomColorValue());

        this.eyes = AvatarPartsModel.tryGetPart("eyes", avatarData?.eyesId);

        this.handsMesh = AvatarPartsModel.tryGetPart("hands", avatarData?.handsId);
        this.handsColor = new AvatarColor("handsColor", avatarData?.handsColor
            || AvatarColor.getRandomColorValue());

        this.clothesMesh = AvatarPartsModel.tryGetPart("clothes", avatarData?.clothesId);
        this.clothesPrimaryColor = new AvatarColor("clothesPrimaryColor", avatarData?.clothesPrimaryColor
            || AvatarColor.getRandomColorValue());

        if (enableGlasses) {
            this.glassesMesh = AvatarPartsModel.tryGetPart("glasses", avatarData?.glassesId);
            this.glassesColor = new AvatarColor("glassesColor", avatarData?.glassesColor
                || AvatarColor.getRandomColorValue());
        } else {
            this.glassesMesh = null;
            this.glassesColor = null;
        }

        if (enableFacialHair) {
            this.facialHairMesh = AvatarPartsModel.tryGetPart("facialHair", avatarData?.facialHairId);
            this.facialHairColor = new AvatarColor("facialHairColor", avatarData?.facialHairColor
                || AvatarColor.getRandomColorValue());
        } else {
            this.facialHairMesh = null;
            this.facialHairColor = null;
        }

        if (!this.avatarData) {
            // Store randomized results for use in load callback (mostly for colors)
            this.avatarData = new AvatarData();
            this.avatarData.skinColorId = this.skinColor.color;
            this.avatarData.headTopId = this.headTopMesh?.id || "None";
            this.avatarData.headTopPrimaryColor = this.headTopPrimaryColor.color;
            this.avatarData.eyesId = this.eyes.id;
            this.avatarData.handsId = this.handsMesh.id;
            this.avatarData.clothesId = this.clothesMesh.id;
            this.avatarData.clothesPrimaryColor = this.clothesPrimaryColor.color;
            if (enableGlasses) {
                this.avatarData.glassesId = this.glassesMesh?.id || "None";
                this.avatarData.glassesColor = this.glassesColor.color;
            }
            if (enableFacialHair) {
                this.avatarData.facialHairId = this.facialHairMesh?.id || "None";
                this.avatarData.facialHairColor = this.facialHairColor.color;
            }
        }
    }

    load(loadingManager, assetsBaseDir) {
        this.handlePartLoaded("headMesh", null);
        this.handlePartLoaded("headTopMesh", null);
        this.handlePartLoaded("eyes", null);
        this.handlePartLoaded("handLeft", null);
        this.handlePartLoaded("handRight", null);
        this.handlePartLoaded("glasses", null);
        this.handlePartLoaded("facialHair", null);

        if (this.headMesh) {
            this.headMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                this.handlePartLoaded("headMesh", meshObj);
                if (this.skinColor) {
                    this.setPartColors("headMesh", this.skinColor.color);
                }
                meshObj.position.z = .125;
            });
        }

        if (this.headTopMesh) {
            this.headTopMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                this.handlePartLoaded("headTopMesh", meshObj);

                if (this.headTopPrimaryColor) {
                    // TODO Hair secondary color
                    this.setPartColors("headTopMesh", this.headTopPrimaryColor.color);
                }
            });
        }

        if (this.eyes) {
            this.eyes.load(loadingManager, assetsBaseDir, (planeObj) => {
                this.handlePartLoaded("eyes", planeObj);
                planeObj.position.z = .153;
                planeObj.position.y = .02;
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

                if (this.skinColor) {
                    // TODO Fingerless secondary color (handColor)
                    this.setPartColors("handLeft", this.skinColor.color);
                    this.setPartColors("handRight", this.skinColor.color);
                }
            });
        }

        if (this.clothesMesh) {
            this.clothesMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                this.handlePartLoaded("clothesMesh", meshObj);
                meshObj.position.set(0, -.25, 0);

                if (this.clothesPrimaryColor) {
                    // TODO Clothes secondary color
                    // TODO Clothes tertiary/detail color
                    this.setPartColors("clothesMesh", this.clothesPrimaryColor.color);
                }
            });
        }

        if (this.glassesMesh) {
            this.glassesMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                this.handlePartLoaded("glassesMesh", meshObj);
                meshObj.position.set(0, 0, 0);

                if (this.glassesColor) {
                    this.setPartColors("glassesMesh", this.glassesColor.color);
                }
            });
        }

        if (this.facialHairMesh) {
            this.facialHairMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                this.handlePartLoaded("facialHairMesh", meshObj);
                meshObj.position.set(0, 0, 0); // this actually lines up with the built-in beard on the head model

                if (this.facialHairColor) {
                    this.setPartColors("facialHairMesh", this.facialHairColor.color);
                }
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
                // TODO Tweak material
                childObj.material.color.set(primaryColor);

                if (childObj.name === "FacialHair") {
                    // Baked-in beard removal from avatar head
                    childObj.visible = false;
                }
            }
        });
    }
}