import * as THREE from 'three';
import AvatarPartMesh from "./AvatarPartMesh";
import AvatarPartsModel from "./AvatarPartsModel";

export default class AvatarObject {
    constructor() {
        this.sceneGroup = new THREE.Group();
        this.loadedObjects = { };

        this.headMesh = new AvatarPartMesh("head", "AvatarHead.obj");
        this.headTopMesh = AvatarPartsModel.headTops["LongBangs"];
    }

    load(loadingManager, assetsBaseDir) {
        this.handleMeshLoaded("headMesh", null);
        this.handleMeshLoaded("headTopMesh", null);

        if (this.headMesh) {
            this.headMesh.load(loadingManager, assetsBaseDir, (obj) => {
                this.handleMeshLoaded("headMesh", obj);
                obj.position.z = .125;
            });
        }

        if (this.headTopMesh) {
            this.headTopMesh.load(loadingManager, assetsBaseDir, (obj) => {
                // TODO Position / rotation
                this.handleMeshLoaded("headTopMesh", obj);
            });
        }
    }

    handleMeshLoaded(key, obj) {
        if (this.loadedObjects[key]) {
            this.sceneGroup.remove(this.loadedObjects[key]);
        }
        if (obj) {
            this.sceneGroup.add(obj);
            this.loadedObjects[key] = obj;
        }
    }

    setAvatarData(avatarData) {
        // TODO
    }
}