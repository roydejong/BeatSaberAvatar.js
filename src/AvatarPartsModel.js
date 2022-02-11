import AvatarPartMesh from "./AvatarPartMesh";

export default class AvatarPartsModel {
    static init() {
        this.headTops = { };
        this.registerHeadTops();
        this.hands = { };
        this.registerHands();
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
}