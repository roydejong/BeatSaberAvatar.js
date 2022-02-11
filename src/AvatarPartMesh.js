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
                console.info('[AvatarPartMesh]', 'Loaded obj:', this.meshPath, obj);
                this.loadedObj = obj;
                callback(obj);
            });
        } catch (e) {
            console.error('[AvatarPartMesh]', 'Load error:', e);
            callback(null);
        }
    }
}