export default class AvatarColor {
    constructor(id, color) {
        this.id = id;
        this.color = color;
    }

    static getRandomColorValue() {
        return '#' + (Math.floor(Math.random()*16777215).toString(16));
    }
}