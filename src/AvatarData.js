export default class AvatarData {
    constructor() {
        /**
         * A custom skin color, overrides normally available skin color choices. This is not possible in game.
         */
        this.skinColorOverride = null;
        this.skinColorId = null;

        this.headTopId = null;
        this.headTopPrimaryColor = null;
        this.headTopSecondaryColor = null;

        this.eyesId = null;

        this.clothesId = null;
        this.clothesPrimaryColor = null;
        this.clothesSecondaryColor = null;
        this.clothesDetailColor = null;

        this.handsId = null;
        this.handsColor = null;

        this.glassesId = null;
        this.glassesColor = null;

        this.facialHairId = null;
        this.facialHairColor = null;
    }
}