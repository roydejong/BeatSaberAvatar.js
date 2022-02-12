# BeatSaberAvatar.js

**3D web viewer for Beat Saber Multiplayer avatars (Three.js / WebGL).**

## Installation

### Prebuilt

✅ You can download prebuilt releases from
the [GitHub releases page](https://github.com/roydejong/BeatSaberAvatar.js/releases/latest) ready for web use.

### Building from source

💀 You can build BeatSaberAvatar.js from source if you prefer.

Prerequisites: Node.js (v16 or newer).

1. Check out the source code
2. Install dependencies with `npm install`
3. Build using `npm run build`

For development, you can use `npm run watch` to get automatic builds on file changes.

## Usage

### Basic setup
Set up a target element on your page, and include the script. You can now use the `BeatSaberAvatar` global to access the script's API and get started.

Here's a quick example that will present a random avatar:
 
```html
<div id="render-target">Placeholder content while loading</div>

<script src="BeatSaberAvatar.js" async defer></script>

<script>
window.addEventListener('load', function () {
    const renderTarget = document.getElementById('render-target');
    BeatSaberAvatar.setup(renderTarget); // returns renderer instance
});
</script>
```

Because the script with Three.js is quite large, it's recommended to load it with `async` and `defer`. By then listening to the `window.load` event you can be sure the script is ready to go.

### Setting avatar data
You can define avatar data by creating an instance of `BeatSaberAvatarData`.

You can pass this as the second argument of the `setup()` call, or later by calling `setAvatarData()` on the renderer instance.

```js
let avatarData = new BeatSaberAvatarData();
avatarData.headTopId = "OnFire";
avatarData.handsId = "BareHands";
avatarData.clothesId = "Hoodie";
avatarData.skinColorId = "Default";
avatarData.eyesId = "Eyes6";

let instance = BeatSaberAvatar.setup(renderTarget, avatarData);

// Or, later:
instance.setAvatarData(avatarData);
```

If you don't provide avatar data, a random avatar will be presented instead.

## License

This is a fan project for non-commercial purposes. Assets used in this project are unlicensed and are the property of
Beat Games.

The code in this repository is available under the MIT license.

For details, see [LICENSE](./LICENSE.md).