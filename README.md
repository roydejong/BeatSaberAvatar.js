# BeatSaberAvatar.js

**3D web viewer for Beat Saber multiplayer avatars (Three.js / WebGL).**

👀 **[Check out the Demo page](https://roydejong.github.io/BeatSaberAvatar.js/demo.html)**

<a href="https://roydejong.github.io/BeatSaberAvatar.js/demo.html">
    <img src="https://user-images.githubusercontent.com/6772638/153788471-e9bfd46d-40ec-4af8-8a41-80241b9a1a7e.png" alt="BeatSaberAvatar.js"/>
</a>

## Installation

### Prebuilt

✅ You can download prebuilt releases from
the [GitHub releases page](https://github.com/roydejong/BeatSaberAvatar.js/releases/latest) ready for web use.

You'll need to host the `assets` folder in a publicly accessible location.

### Building from source

💀 You can build BeatSaberAvatar.js from source if you prefer.

Prerequisites: Node.js (v16 or newer).

1. Check out the source code
2. Install dependencies with `npm install`
3. Build using `npm run build`

For development, you can use `npm run watch` to get automatic builds on file changes.

## Usage

### Basic setup

Set up a target element on your page, and include the script. You can now use the `BeatSaberAvatar` global to access the
script's API and get started.

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

Because the script with Three.js is quite large, it's recommended to load it with `async` and `defer`. By then listening
to the `window.load` event you can be sure the script is ready to go.

### Setting avatar data

You can define avatar data by creating an instance of `BeatSaberAvatarData`.

You can pass this as the second argument of the `setup()` call, or later by calling `setAvatarData()` on the renderer
instance.

```js
// Example of complete avatar data
let avatarData = {
    "headTopId": "OnFire",
    "headTopPrimaryColor": "#a7966dff",
    "headTopSecondaryColor": "#900277ff",
    "glassesId": "Glasses01",
    "glassesColor": "#a7796dff",
    "facialHairId": "Moustache02",
    "facialHairColor": "#a7796dff",
    "handsId": "BareHands",
    "handsColor": "#a7796dff",
    "clothesId": "Hoodie",
    "clothesPrimaryColor": "#cf3384ff",
    "clothesSecondaryColor": "#4b2da5ff",
    "clothesDetailColor": "#000000ff",
    "skinColorId": "Default",
    "eyesId": "Eyes6",
    "mouthId": "Mouth12"
};

let instance = BeatSaberAvatar.setup(renderTarget, avatarData);

// Or, later:
instance.setAvatarData(avatarData);
```

If you don't provide avatar data or pass `null`, a random avatar will be presented instead.

### Advanced options

You can provide advanced options as the third parameter in the `setup` call:

```js
const options = {
    assetsBaseDir: "/static/avatar_assets/",
    enableControls: false,
    rotateAnimation: true
};
BeatSaberAvatar.setup(renderTarget, avatarData, options);
```

Here's an overview of the supported options:

| Key                | Default    | Description                                                                                                     |
|--------------------|------------|-----------------------------------------------------------------------------------------------------------------|
| `assetsBaseDir`    | `assets/`  | Base directory from which model and texture assets are loaded.                                                  |
| `enableControls`   | `true`     | Enable orbit camera controls.                                                                                   |
| `rotateAnimation`  | `true`     | If true, the avatar will slowly rotate from side to side.                                                       |
| `allowRandomize`   | `true`     | If true, missing or invalid parts will be randomized. If false, missing or invalid parts will not be rendered.  | 
| `enableGlasses`    | `false`    | If true, render glasses from avatar data (unused assets).                                                       |
| `enableFacialHair` | `false`    | If true, render facial hair from avatar data (unused assets).                                                   |
| `initialZoomLevel` | `1.5`      | Sets the initial zoom level of the camera (z-depth).                                                            | 

## License

This is a fan project for non-commercial purposes. Assets used in this project are unlicensed and are the property of
Beat Games.

The code in this repository is available under the MIT license.

For details, see [LICENSE](./LICENSE.md).
