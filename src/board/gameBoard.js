import GAME_DATA from "../data/gameData";
import BackgroundFactory from "../factories/backgroundFactory";
import Board from "./board";

class GameBoard extends Board {
    constructor(stage) {
        super(stage);
        this.addToStage(BackgroundFactory.getInstanceForGameBoard());
    }

    shouldDeconstructTetromino() {
        return !this.canMoveTetrominoBy(GAME_DATA.MOVE.DOWN);
    }

    canMoveOn(coordinates) {
        return !coordinates.some(({column, row}) => {
            if(column < 0 || column >= GAME_DATA.WIDTH || row < 0 || row >= GAME_DATA.HEIGHT) return true;

            return this._blocks.some(block => {
                if(block.column === column && block.row === row) return true;
            });
        });
    }

    canRotateTetromino() {
        const coordinates = this._tetromino.getFurtherRotationCoordinates();
        return this.canMoveOn(coordinates);
    }

    canMoveTetrominoBy(move) {
        const coordinates = this._tetromino.getFurtherCoordinatesForTetrominoMovedBy(move);
        return this.canMoveOn(coordinates);
    }

    canAddTetromino(tetromino) {
        const coordinates = tetromino.getCoordinates();        
        return this.canMoveOn(coordinates);
    }

    moveTetrominoBy(move) {
        if (this.canMoveTetrominoBy(move)) this._tetromino.moveBy(move);
    }

    rotateTetromino() {
        if (this.canRotateTetromino()) this._tetromino.rotate();
    }

    moveBlocksDownFrom(row) {
        this._blocks.filter(block => block.row < row).forEach(block => block.moveBy(GAME_DATA.MOVE.DOWN));
    }

    clearFullRows(addPointsCallback) {
        let rowToCheck = GAME_DATA.HEIGHT - 1;
        while (rowToCheck > 0) {
            const blocksToCheck = this._blocks.filter(block => block.row === rowToCheck);
            if(blocksToCheck.length === GAME_DATA.WIDTH) {
                this._blocks = this._blocks.filter(block => block.row != rowToCheck);
                blocksToCheck.forEach(block => this.removeFromStage(block.sprite));
                this.moveBlocksDownFrom(rowToCheck);
                addPointsCallback();
            } else {
                rowToCheck--;
            }          
        }
    }

    clear() {
        if(this._tetromino) this.deconstructTetromino();
        super.clear();
    }
}

export default GameBoard;