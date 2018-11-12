import * as PIXI from "pixi.js";

class Board {
    constructor(stage) {
        this._stage = stage;
        this._blocks = [];
        this._tetromino = undefined;
    }

    addToStage(child) {
        this._stage.addChild(child);
    }

    removeFromStage(child) {
        this._stage.removeChild(child);
    }
    
    addTetromino(tetromino) {
        this._tetromino = tetromino;
        this._tetromino.blocks.forEach(block => this.addToStage(block.sprite));
    }

    deconstructTetromino() {
        this._blocks = [...this._blocks, ...this._tetromino.blocks];
        this._tetromino = undefined;
    }

    setBlackAndWhiteEffect() {
        const filter = new PIXI.filters.ColorMatrixFilter();
        this._stage.filters = [filter];
        filter.blackAndWhite();
    }

    clear() {
        this._stage.filters = [];
        this._blocks.forEach(block => this.removeFromStage(block.sprite));
        this._blocks = [];
    }
}

export default Board;