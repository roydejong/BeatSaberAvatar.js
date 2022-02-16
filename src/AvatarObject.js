import * as THREE from 'three';
import AvatarPartMesh from "./AvatarPartMesh";
import AvatarPartsModel from "./AvatarPartsModel";
import AvatarColor from "./AvatarColor";
import AvatarTextureBaker from "./AvatarTextureBaker";

export default class AvatarObject {
    constructor() {
        this.sceneGroup = new THREE.Group();
        this.sceneGroup.position.set(0, .15, 0);

        this.loadedObjects = { };

        this.headMesh = new AvatarPartMesh("head", "AvatarHead.obj");
    }

    setAvatarData(avatarData, enableGlasses = false, enableFacialHair = false) {
        this.avatarData = avatarData;

        if (avatarData?.skinColorOverride) {
            this.skinColor = new AvatarColor("customSkinColor", avatarData?.skinColorOverride);
        } else {
            /**
             * @type {AvatarColor}
             */
            this.skinColor = AvatarPartsModel.tryGetPart("skinColors", avatarData?.skinColorId);
        }

        this.headTopMesh = AvatarPartsModel.tryGetPart("headTops", avatarData?.headTopId);
        this.headTopPrimaryColor = new AvatarColor("headTopPrimaryColor", avatarData?.headTopPrimaryColor
            || AvatarColor.getRandomColorValue());
        this.headTopSecondaryColor = new AvatarColor("headTopSecondaryColor", avatarData?.headTopSecondaryColor
            || AvatarColor.getRandomColorValue());

        this.eyes = AvatarPartsModel.tryGetPart("eyes", avatarData?.eyesId);

        this.handsMesh = AvatarPartsModel.tryGetPart("hands", avatarData?.handsId);
        this.handsColor = new AvatarColor("handsColor", avatarData?.handsColor
            || AvatarColor.getRandomColorValue());

        this.clothesMesh = AvatarPartsModel.tryGetPart("clothes", avatarData?.clothesId);
        this.clothesPrimaryColor = new AvatarColor("clothesPrimaryColor", avatarData?.clothesPrimaryColor
            || AvatarColor.getRandomColorValue());
        this.clothesSecondaryColor = new AvatarColor("clothesSecondaryColor", avatarData?.clothesSecondaryColor
            || AvatarColor.getRandomColorValue());
        this.clothesDetailColor = new AvatarColor("clothesDetailColor", avatarData?.clothesDetailColor
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
    }

    load(loadingManager, assetsBaseDir, debugUv = false) {
        if (debugUv) {
            this.debugUv = true;
            if (!this.debugUvTexture) {
                const textureLoader = new THREE.TextureLoader(loadingManager);
                textureLoader.load(assetsBaseDir + "uvcheck.png", (texture) => {
                    this.debugUvTexture = texture;
                    this.load(loadingManager, assetsBaseDir, true);
                });
                return;
            }
        } else {
            this.debugUv = false;
        }

        this.handlePartLoaded("headMesh", null);
        this.handlePartLoaded("headTopMesh", null);
        this.handlePartLoaded("eyes", null);
        this.handlePartLoaded("handLeft", null);
        this.handlePartLoaded("handRight", null);
        this.handlePartLoaded("glassesMesh", null);
        this.handlePartLoaded("facialHairMesh", null);

        if (this.headMesh) {
            this.headMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                this.handlePartLoaded("headMesh", meshObj);
                if (this.skinColor) {
                    this.setPartColors("headMesh", this.skinColor.color);
                }
                meshObj.position.z = .125;
            }, false);
        }

        if (this.headTopMesh) {
            this.headTopMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                this.handlePartLoaded("headTopMesh", meshObj);

                if (this.headTopPrimaryColor) {
                    this.setPartColors("headTopMesh", this.headTopPrimaryColor.color,
                        this.headTopSecondaryColor.color);
                }
            });
        }

        if (this.eyes) {
            this.eyes.load(loadingManager, assetsBaseDir, (planeObj) => {
                this.handlePartLoaded("eyes", planeObj);
                planeObj.position.set(0, 0, .153);
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
                    this.setPartColors("handLeft", this.skinColor.color, this.handsColor.color);
                    this.setPartColors("handRight", this.skinColor.color, this.handsColor.color);
                }
            });
        }

        if (this.clothesMesh) {
            this.clothesMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                this.handlePartLoaded("clothesMesh", meshObj);
                meshObj.position.set(0, -.25, 0);

                if (this.clothesPrimaryColor) {
                    this.setPartColors("clothesMesh", this.clothesPrimaryColor.color,
                        this.clothesSecondaryColor.color, this.clothesDetailColor.color);
                }
            });
        }

        if (this.glassesMesh) {
            this.glassesMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                this.handlePartLoaded("glassesMesh", meshObj);

                if (this.glassesColor) {
                    this.setPartColors("glassesMesh", this.glassesColor.color);
                }
            });
        }

        if (this.facialHairMesh) {
            this.facialHairMesh.load(loadingManager, assetsBaseDir, (meshObj) => {
                this.handlePartLoaded("facialHairMesh", meshObj);

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

    setPartColors(key, primaryColor = null, secondaryColor = null, detailColor = null) {
        let obj = this.loadedObjects[key];

        if (!obj) {
            return;
        }

        const needsBake = primaryColor && (secondaryColor || detailColor);

        let preferredMaterial = null;
        if (needsBake) {
            // Bake texture for UV wrapping with multi colors
            const bakedTexture = (this.debugUv && this.debugUvTexture) ||
                AvatarTextureBaker.bake(primaryColor, secondaryColor, detailColor);
            preferredMaterial = new THREE.MeshStandardMaterial({color: 0xffffff, map: bakedTexture});
        } else {
            // Set simple primary color
            preferredMaterial = new THREE.MeshStandardMaterial({color: primaryColor, map: null});
        }

        obj.traverse(function (childObj) {
            if (childObj instanceof THREE.Mesh) {
                if (childObj.name === "FacialHair") {
                    // Baked-in beard removal from avatar head
                    childObj.visible = false;
                    return;
                }
                childObj.material = preferredMaterial;
            }
        });
    }
}