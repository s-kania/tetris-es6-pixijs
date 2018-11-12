import GAME_DATA from "../data/gameData";
import Tetromino from "./tetromino";

class MovingTetromino extends Tetromino {
    constructor(data) {
        super(data);
        this._startColumn = GAME_DATA.MOVING_TETROMINO_GENERATE_COORDINATES.COLUMN;
        this._startRow = GAME_DATA.MOVING_TETROMINO_GENERATE_COORDINATES.ROW;
        this.generateBlocks();
    }

    getCoordinates() {
        return this._blocks.map(block => block.getCoordinates());
    }

    getNextRotation() {
        return this._rotationIndex + 1 > 3 ? 0 : this._rotationIndex + 1;
    }

    getFurtherRotationCoordinates() {
        return this.getBlocksCoordinates(this.getNextRotation());
    }

    getFurtherCoordinatesForTetrominoMovedBy(move) {
        return this._blocks.map(block => block.getFurtherCoordinatesMovedBy(move));
    }

    rotate() {
        this._rotationIndex = this.getNextRotation();

        this.getBlocksCoordinates().reduce((blockToMoveIndex, {column, row}) => {
            this._blocks[blockToMoveIndex].moveTo(column, row);
            return ++blockToMoveIndex;
        }, 0);
    }

    moveBy({X, Y}) {
        this._startColumn = this._startColumn + X;
        this._startRow = this._startRow + Y;
        this._blocks.forEach(block => block.moveBy({X, Y}));
    }
}

export default MovingTetromino;