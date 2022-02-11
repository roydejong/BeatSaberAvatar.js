import AvatarPartMesh from "./AvatarPartMesh";

export default class AvatarPartsModel {
    static init() {
        this.headTops = { };
        this.registerHeadTops();
        this.hands = { };
        this.registerHands();
        this.clothes = { };
        this.registerClothes();
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
        this.hands["Hand"] = new AvatarPartMesh("Hand", "Hands/MeshHand01.obj");
        this.hands["HandGloves"] = new AvatarPartMesh("HandGloves", "Hands/MeshHandGloves01_v02.obj");
    }

    static registerClothes() {
        // TODO Verify what these are actually called internally because the mesh names are all over the place
        this.hands["Basket"] = new AvatarPartMesh("Basket", "Clothes/MeshBasket02_v04.obj");
        this.hands["Dress"] = new AvatarPartMesh("Dress", "Clothes/MeshDress01_v07.obj");
        this.hands["Hoodie"] = new AvatarPartMesh("Hoodie", "Clothes/MeshHoody01_v02.obj");
        this.hands["Jacket"] = new AvatarPartMesh("Jacket", "Clothes/MeshJacket03_v02.obj");
        this.hands["Jumpsuit"] = new AvatarPartMesh("Jumpsuit", "Clothes/MeshJumpsuit02_v02.obj");
        this.hands["Rock"] = new AvatarPartMesh("Rock", "Clothes/MeshRockMale02_v03.obj");
        this.hands["Tracksuit"] = new AvatarPartMesh("Tracksuit", "Clothes/MeshTrasksuit01_v02.obj");
        this.hands["Vest"] = new AvatarPartMesh("Vest", "Clothes/MeshVest02_v03.obj");
    }
}