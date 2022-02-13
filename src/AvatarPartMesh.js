import * as THREE from 'three';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';

export default class AvatarPartMesh {
    constructor(id, meshPath) {
        this.id = id;
        this.meshPath = meshPath;
        this.loadedObj = null;
    }

    load(loadingManager, assetsBaseDir, callback) {
        try {
            if (this.loadedObj) {
                callback(this.loadedObj);
                return;
            }
            const loader = new OBJLoader(loadingManager);
            loader.load(assetsBaseDir + this.meshPath, (obj) => {
                console.debug('[AvatarPartMesh]', 'Loaded obj:', this.meshPath, obj);

                // Apply physically based material, which should give a more Unity-like look
                let preferredMaterial = new THREE.MeshStandardMaterial({color: 0x444444});
                obj.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {
                        child.material = preferredMaterial;
                    }
                });

                this.loadedObj = obj;
                callback(obj);
            });
        } catch (e) {
            console.error('[AvatarPartMesh]', 'Load error:', e);
            callback(null);
        }
    }
}