import * as PIXI from "pixi.js";
import TEXTURES from "data/textures";

class Loader {
    static loadAllTextures(callback) {
        TEXTURES.forEach((texture) => {
            PIXI.loader.add(texture.id, texture.path);
        });
        PIXI.loader.load(() => {
            callback();
        });
    }

    static getTexture(id) {
        return PIXI.loader.resources[id].texture;
    }
}

export default Loader;