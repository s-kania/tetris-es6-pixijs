import * as PIXI from "pixi.js";
import GAME_DATA from "../data/gameData";
import Loader from "../utils/loader";

class BackgroundFactory {
    static getInstanceForGameBoard() {
        return new PIXI.extras.TilingSprite(
            Loader.getTexture("background"),
            GAME_DATA.WIDTH * GAME_DATA.BLOCK_SIZE,
            GAME_DATA.HEIGHT * GAME_DATA.BLOCK_SIZE
        );
    }
}

export default BackgroundFactory;