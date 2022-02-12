import AvatarPartMesh from "./AvatarPartMesh";

export default class AvatarPartsModel {
    static init() {
        if (this.didInit)
            return;

        this.headTops = {};
        this.registerHeadTops();
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

    static registerHeadTops() {
        const headTopIds = ["BedHead", "Bob", "DoubleTrouble", "Emo", "HalfShaved", "Heartbreak", "Hippie", "LongBangs",
            "Loose", "Magician", "Nanny", "Normie", "OnFire", "PoloCap", "PonyTail", "Punk", "Scifi", "Sultan",
            "SweatBand", "Untidy", "WetHair", "WindSwept", "WinterHat", "Wizard"];

        headTopIds.forEach(headTopId => {
            this.headTops[headTopId] = new AvatarPartMesh(headTopId, `HeadTop/${headTopId}_01.obj`);
        });
    }

    static registerHands() {
        this.hands["BareHands"] = new AvatarPartMesh("BareHands", "Hands/MeshHand01.obj");
        this.hands["HandGloves"] = new AvatarPartMesh("HandGloves", "Hands/MeshHandGloves01_v02.obj");
    }

    static registerClothes() {
        // TODO Verify what these are actually called internally because the mesh names are all over the place
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