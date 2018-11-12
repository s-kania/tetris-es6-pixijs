import Board from "./board";

class PreviewBoard extends Board {
    constructor(stage) {
        super(stage);
    }

    addTetromino(tetromino) {
        super.addTetromino(tetromino);
        super.deconstructTetromino();
    }
}

export default PreviewBoard;