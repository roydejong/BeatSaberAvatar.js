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

        this.glasses = {};
        this.registerGlasses();

        this.facialHair = {};
        this.registerFacialHair();

        this.didInit = true;
    }

    static tryGetPart(collectionName, preferredPart = null, allowRandomize = false) {
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

        if (allowRandomize) {
            return this.getRandomPart(collectionName);
        }

        return null;
    }

    static getRandomPart(collectionName) {
        if (typeof this[collectionName] !== "object") {
            throw new Error(`Invalid collection name: ${collectionName}`);
        }

        const collection = this[collectionName];
        const keys = Object.keys(collection).filter(key => key !== "QuestionMark");
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
            "SweatBand", "Untidy", "WetHair", "Windswept", "WinterHat", "Wizard"];

        headTopIds.forEach(headTopId => {
            this.headTops[headTopId] = new AvatarPartMesh(headTopId, `HeadTop/${headTopId}_01.obj`);
        });

        this.headTops["None"] = null;
    }

    static registerEyes() {
        // so the eyeIds do NOT line up with their sprite names...
        this.eyes["Eyes1"] = new AvatarEyes("Eyes1", "Eyes/Eyes3.png");
        this.eyes["Eyes2"] = new AvatarEyes("Eyes2", "Eyes/Eyes1.png");
        this.eyes["Eyes3"] = new AvatarEyes("Eyes3", "Eyes/Eyes7.png");
        this.eyes["Eyes4"] = new AvatarEyes("Eyes4", "Eyes/Eyes8.png");
        this.eyes["Eyes5"] = new AvatarEyes("Eyes5", "Eyes/Eyes11.png");
        this.eyes["Eyes6"] = new AvatarEyes("Eyes6", "Eyes/Eyes10.png");
        this.eyes["Eyes7"] = new AvatarEyes("Eyes7", "Eyes/Eyes2.png");
        this.eyes["Eyes8"] = new AvatarEyes("Eyes8", "Eyes/Eyes5.png");
        this.eyes["Eyes9"] = new AvatarEyes("Eyes9", "Eyes/Eyes6.png");
        this.eyes["Eyes10"] = new AvatarEyes("Eyes10", "Eyes/Eyes9.png");
        this.eyes["Eyes11"] = new AvatarEyes("Eyes11", "Eyes/Eyes4.png");
        // Extra additions
        this.eyes["QuestionMark"] = new AvatarEyes("QuestionMark", "Eyes/QuestionMark.png");
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

    static registerGlasses() {
        this.glasses["None"] = null;
        this.glasses["Glasses01"] = new AvatarPartMesh("Glasses01", "Glasses/MesGlasses01.001.obj");
        this.glasses["Glasses02"] = new AvatarPartMesh("Glasses02", "Glasses/MeshSunglasses01.001.obj");
    }

    static registerFacialHair() {
        this.facialHair["None"] = null;
        this.facialHair["Beard01"] = new AvatarPartMesh("Beard01", "FacialHair/MeshBeard01.obj");
        this.facialHair["Moustache01"] = new AvatarPartMesh("Moustache01", "FacialHair/MeshMoustache01.obj");
        this.facialHair["Moustache02"] = new AvatarPartMesh("Moustache02", "FacialHair/MeshMoustache02.obj");
    }
}