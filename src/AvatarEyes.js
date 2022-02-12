import * as THREE from 'three';

export default class AvatarEyes {
    constructor(id) {
        this.id = id;
        this.texturePath = `Eyes/${id}.png`
    }

    load(loadingManager, assetsBaseDir, callback) {
        this.loadTexture(loadingManager, assetsBaseDir, (texture) => {
            const planeWidth = .3;
            const planeHeight = .15;
            const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
            const material = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: texture,
                side: THREE.FrontSide,
                transparent: true
            });
            callback(new THREE.Mesh(geometry, material));
        });
    }

    loadTexture(loadingManager, assetsBaseDir, callback) {
        if (this.loadedTexture) {
            callback(this.loadedTexture);
            return;
        }

        try {
            const loader = new THREE.TextureLoader(loadingManager);
            loader.load(assetsBaseDir + this.texturePath, (texture) => {
                console.debug('[AvatarEyes]', 'Loaded texture:', this.texturePath, texture);
                this.loadedTexture = texture;
                callback(texture);
            });
        } catch (e) {
            console.error('[AvatarEyes]', 'Texture load error:', e);
            callback(null);
        }
    }
}