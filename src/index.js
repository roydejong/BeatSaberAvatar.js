import AvatarPartsModel from "./AvatarPartsModel";
import AvatarRenderer from './AvatarRenderer';

// --

console.log('bsavatar test renderer');

// --

AvatarPartsModel.init();

// --

const avatarRenderer = new AvatarRenderer();

avatarRenderer.init();
avatarRenderer.spawnDirectionalLight();
avatarRenderer.spawnAvatarObject();

avatarRenderer.renderLoop();