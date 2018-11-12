import GAME_DATA from "../data/gameData";
import Block from "../block";

class Tetromino {
    constructor(data) {
        this._data = data;
        this._rotationIndex = 0;
        this._startColumn = 0;
        this._startRow = 0;
        this._blocks = [];
    }

    get blocks() {
        return this._blocks;
    }
    
    getBlocksCoordinates(rotationIndex = this._rotationIndex) {
        const rotation = this._data.rotations[rotationIndex];
        const coordinates = [];
        let column = this._startColumn, row = this._startRow, bit;

        for (let i = GAME_DATA.BLOCK_SIZE - 1; i >= 0; i--) {
            bit = rotation & (1 << i);
            bit && coordinates.push({column, row});
            if(column >= this._startColumn + 3) {
                column = this._startColumn;
                row++;
            } else {
                column++;
            }
        }

        return coordinates;
    }

    generateBlocks() {
        this.getBlocksCoordinates().forEach(({column, row}) => {
            this._blocks.push(new Block(column, row, this._data.textureId));
        });
    }
}

export default Tetromino;