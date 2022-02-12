import AvatarPartsModel from "./AvatarPartsModel";
import AvatarRenderer from './AvatarRenderer';
import AvatarData from "./AvatarData";

/**
 * Public API for BeatSaberAvatar.js.
 *
 * @package BeatSaberAvatar.js
 * @type {Window.BeatSaberAvatar}
 * @link https://github.com/roydejong/BeatSaberAvatar.js
 */
window.BeatSaberAvatar = class {
    /**
     * Creates a new avatar renderer in a specified DOM element.
     *
     * @param {Element} domElement The DOM element to create the renderer canvas in.
     * @param {BeatSaberAvatarData|AvatarData|null} avatarData The avatar data to present.
     * @returns {AvatarRenderer}
     */
    static setup(domElement, avatarData = null) {
        if (!domElement) {
            throw new Error("setup(): first arg must be valid DOM element")
        }

        // Init avatar part library
        AvatarPartsModel.init();

        // Create and return renderer instance
        let renderInstance = new AvatarRenderer();
        renderInstance.init(domElement);
        renderInstance.setAvatarData(avatarData || null);
        return renderInstance;
    }
};

window.BeatSaberAvatarData = AvatarData;