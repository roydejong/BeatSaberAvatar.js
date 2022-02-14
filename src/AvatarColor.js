import * as THREE from 'three';

export default class AvatarColor {
    constructor(id, color) {
        this.id = id;

        if (typeof color === 'string' && color.startsWith('#')) {
            // Cut off alpha component for colors, Three.js doesn't support or understand it
            color = color.substring(0, 7);
        }

        this.color = new THREE.Color(color);
    }

    static getRandomColorValue() {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    }
}