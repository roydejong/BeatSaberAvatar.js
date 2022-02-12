import * as THREE from 'three';

const TextureAtlasPath = "Eyes/AvatarEyes.png";

export default class AvatarEyes {
    constructor(id) {
        this.id = id;
    }

    load(loadingManager, assetsBaseDir, callback) {
        this.loadSharedTexture(loadingManager, assetsBaseDir, (texture) => {
            texture.offset.set(0, .25); // TODO eye-to-offset mapping

            const planeWidth = .25;
            const planeHeight = .15;

            const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
            texture.repeat.set(planeWidth, planeHeight);
            const material = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: texture,
                side: THREE.FrontSide,
                transparent: true
            });
            const plane = new THREE.Mesh(geometry, material);

            // TODO Sprite atlas slice
            callback(plane);
        });
    }

    loadSharedTexture(loadingManager, assetsBaseDir, callback) {
        if (AvatarEyes.sharedTexture) {
            callback(AvatarEyes.sharedTexture);
            return;
        }

        try {
            const loader = new THREE.TextureLoader(loadingManager);
            loader.load(assetsBaseDir + TextureAtlasPath, (texture) => {
                console.debug('[AvatarEyes]', 'Loaded shared texture:', TextureAtlasPath, texture);
                AvatarEyes.sharedTexture = texture;
                callback(texture);
            });
        } catch (e) {
            console.error('[AvatarEyes]', 'Load error:', e);
            callback(null);
        }
    }
}