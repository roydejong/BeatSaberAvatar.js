import AvatarPartMesh from "./AvatarPartMesh";
import AvatarColor from "./AvatarColor";
import AvatarEyes from "./AvatarEyes";

export default class AvatarPartsModel {
    static init() {
        if (this.didInit)
            return;

        this.skinColors = {};
        this.registerSkinColors();

        this.headTops = {};
        this.registerHeadTops();

        this.eyes = {};
        this.registerEyes();

        this.hands = {};
        this.registerHands();

        this.clothes = {};
        this.registerClothes();

        this.didInit = true;
    }

    static tryGetPart(collectionName, preferredPart = null) {
        if (typeof this[collectionName] !== "object") {
            throw new Error(`Invalid collection name: ${collectionName}`);
        }

        if (preferredPart) {
            if (preferredPart === "None") {
                return null;
            }

            if (typeof this[collectionName][preferredPart] !== "undefined") {
                return this[collectionName][preferredPart];
            }

            console.warn('[AvatarPartsModel]', 'Part not found:', collectionName, preferredPart);
        }

        return this.getRandomPart(collectionName);
    }

    static getRandomPart(collectionName) {
        if (typeof this[collectionName] !== "object") {
            throw new Error(`Invalid collection name: ${collectionName}`);
        }

        const collection = this[collectionName];
        const keys = Object.keys(collection);
        return collection[keys[keys.length * Math.random() << 0]];
    }

    static registerSkinColors() {
        this.skinColors["Default"] = new AvatarColor("Default", "#E5A9A9");
        this.skinColors["Light"] = new AvatarColor("Light", "#EBD6C7");
        this.skinColors["Mid"] = new AvatarColor("Mid", "#D9B9A3");
        this.skinColors["Brown"] = new AvatarColor("Brown", "#806753");
        this.skinColors["DarkBrown"] = new AvatarColor("DarkBrown", "#593D2D");
        this.skinColors["Black"] = new AvatarColor("Black", "#402A21");
        this.skinColors["Alien"] = new AvatarColor("Alien", "#2FBC2F");
        this.skinColors["Smurf"] = new AvatarColor("Smurf", "#1A8AE0");
        this.skinColors["Zombie"] = new AvatarColor("Zombie", "#FFFFFF");
        this.skinColors["Purple"] = new AvatarColor("Purple", "#AB36A7");
    }

    static registerHeadTops() {
        const headTopIds = ["BedHead", "Bob", "DoubleTrouble", "Emo", "HalfShaved", "Heartbreak", "Hippie", "LongBangs",
            "Loose", "Magician", "Nanny", "Normie", "OnFire", "PoloCap", "Ponytail", "Punk", "Scifi", "Sultan",
            "SweatBand", "Untidy", "WetHair", "WindSwept", "WinterHat", "Wizard"];

        headTopIds.forEach(headTopId => {
            this.headTops[headTopId] = new AvatarPartMesh(headTopId, `HeadTop/${headTopId}_01.obj`);
        });

        this.headTops["None"] = null;
    }

    static registerEyes() {
        for (let i = 1; i <= 11; i++) {
            const eyesId = `Eyes${i}`;
            this.eyes[eyesId] = new AvatarEyes(eyesId);
        }
    }

    static registerHands() {
        this.hands["BareHands"] = new AvatarPartMesh("BareHands", "Hands/MeshHand01.obj");
        this.hands["Fingerless"] = new AvatarPartMesh("Fingerless", "Hands/MeshHandGloves01_v02.obj");
    }

    static registerClothes() {
        this.clothes["Basket"] = new AvatarPartMesh("Basket", "Clothes/MeshBasket02_v04.obj");
        this.clothes["Dress"] = new AvatarPartMesh("Dress", "Clothes/MeshDress01_v07.obj");
        this.clothes["Hoodie"] = new AvatarPartMesh("Hoodie", "Clothes/MeshHoody01_v02.obj");
        this.clothes["Jacket"] = new AvatarPartMesh("Jacket", "Clothes/MeshJacket03_v02.obj");
        this.clothes["Jumpsuit"] = new AvatarPartMesh("Jumpsuit", "Clothes/MeshJumpsuit02_v02.obj");
        this.clothes["Rock"] = new AvatarPartMesh("Rock", "Clothes/MeshRockMale02_v03.obj");
        this.clothes["Tracksuit"] = new AvatarPartMesh("Tracksuit", "Clothes/MeshTrasksuit01_v02.obj");
        this.clothes["Vest"] = new AvatarPartMesh("Vest", "Clothes/MeshVest02_v03.obj");
    }
}