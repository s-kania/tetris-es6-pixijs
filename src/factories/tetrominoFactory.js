import GAME_DATA from "../data/gameData";
import MovingTetromino from "../tetromino/movingTetromino";
import PreviewTetromino from "../tetromino/previewTetromino";

class TetrominoFactory {
    constructor() {
        this._tetrominoNamePool = [];
        this.generateTetrominoNamePool();
        this._nextTetrominoName = this.getRandomTetrominoName();        
    }

    generateTetrominoNamePool() {
        this._tetrominoNamePool = GAME_DATA.TETROMINO_DATA.reduce((accumulator, tetrominoData) => {
            return [...accumulator, ...Array(4).fill(tetrominoData.name)];
        }, []);
    }

    getRandomTetrominoName() {
        if(!this._tetrominoNamePool.length) this.generateTetrominoNamePool();

        const randomIndex = Math.floor(Math.random() * this._tetrominoNamePool.length);
        return this._tetrominoNamePool.splice(randomIndex, 1)[0];
    }

    reset() {
        this.generateTetrominoNamePool();
    }

    getTetrominoData() {
        return GAME_DATA.TETROMINO_DATA.find((data) => data.name === this._nextTetrominoName);
    }

    getMovingTetrominoInstance() {
        const movingTetromino = new MovingTetromino(this.getTetrominoData());
        this._nextTetrominoName = this.getRandomTetrominoName();
        return movingTetromino;
    }

    getPreviewTetrominoInstance() {
        return new PreviewTetromino(this.getTetrominoData());
    }
}

export default TetrominoFactory;