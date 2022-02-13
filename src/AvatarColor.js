export default class AvatarColor {
    constructor(id, color) {
        this.id = id;
        this.color = color;
    }

    static getRandomColorValue() {
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    }
}