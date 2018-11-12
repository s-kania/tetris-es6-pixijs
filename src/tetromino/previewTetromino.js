import Tetromino from "./tetromino";

class PreviewTetromino extends Tetromino {
    constructor(data) {
        super(data);
        this._startColumn = 0;
        this._startRow = 0;
        this.generateBlocks();
    }
}

export default PreviewTetromino;