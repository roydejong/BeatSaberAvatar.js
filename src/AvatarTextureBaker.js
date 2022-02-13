import * as THREE from 'three';

export default class AvatarTextureBaker {
    static bake(primaryColor, secondaryColor = null, detailColor = null) {
        if (!secondaryColor)
            secondaryColor = primaryColor;
        if (!detailColor)
            detailColor = secondaryColor;

        const width = 16;
        const height = 16;

        const pixelCount = width * height;
        const data = new Uint8Array(4 * pixelCount);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const pixelIndex = ((y * width) + x) * 4;

                let targetColor = detailColor;

                if (y >= 1) {
                    if (x <= 1)
                        targetColor = primaryColor;
                    else if (x <= 3)
                        targetColor = secondaryColor;
                }

                const r = Math.floor(targetColor.r * 255);
                const g = Math.floor(targetColor.g * 255);
                const b = Math.floor(targetColor.b * 255);

                let byteIdx = pixelIndex;
                data[byteIdx++] = r;
                data[byteIdx++] = g;
                data[byteIdx++] = b;
                data[byteIdx++] = 255; // alpha
            }
        }

        const texture = new THREE.DataTexture(data, width, height);
        texture.needsUpdate = true;
        return texture;
    }
}