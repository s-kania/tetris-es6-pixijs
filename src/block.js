import GAME_DATA from "data/gameData";
import * as PIXI from "pixi.js";
import Loader from "utils/loader";

class Block {
    constructor(column, row, textureId) {
        this._sprite = new PIXI.Sprite(
            Loader.getTexture(textureId)
        );
        this._sprite.x = column * GAME_DATA.BLOCK_SIZE;
        this._sprite.y = row * GAME_DATA.BLOCK_SIZE;
    }

    get sprite() {
        return this._sprite;
    }

    get column() {
        return this._sprite.x / GAME_DATA.BLOCK_SIZE;
    }

    get row() {
        return this._sprite.y / GAME_DATA.BLOCK_SIZE;
    }

    getFurtherCoordinatesMovedBy({X, Y}) {
        return {
            column: this.column + X,
            row: this.row + Y
        };  
    }

    getCoordinates() {
        return {
            column: this.column,
            row: this.row
        };  
    }

    moveTo(column, row) {
        this._sprite.x = column * GAME_DATA.BLOCK_SIZE;
        this._sprite.y = row * GAME_DATA.BLOCK_SIZE;
    }

    moveBy({X, Y}) {
        this.moveTo(this.column + X, this.row + Y);
    }
}

export default Block;