import AvatarPartMesh from "./AvatarPartMesh";

export default class AvatarPartsModel {
    static init() {
        this.headTops = { };
        this.registerHeadTops();
    }

    static registerHeadTops() {
        const headTopIds = ["BedHead", "Bob", "DoubleTrouble", "Emo", "HalfShaved", "Heartbreak", "Hippie", "LongBangs",
            "Loose", "Magician", "Nanny", "Normie", "OnFire", "PoloCap", "PonyTail", "Punk", "Scifi", "Sultan",
            "SweatBand", "Untidy", "WetHair", "WindSwept", "WinterHat", "Wizard"];

        headTopIds.forEach(headTopId => {
            let headTopMesh = new AvatarPartMesh(headTopId, `HeadTop/${headTopId}_01.obj`);
            this.headTops[headTopId] = headTopMesh;
            console.log('[registerHeadTops]', headTopMesh.id, '->', headTopMesh.meshPath)
        });
    }
}