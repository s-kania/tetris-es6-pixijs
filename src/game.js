import * as PIXI from "pixi.js";
import GAME_DATA from "data/gameData";
import TetrominoFactory from "factories/tetrominoFactory";
import UI from "./UI";
import Loader from "utils/loader";
import GameBoard from "./board/gameBoard";
import PreviewBoard from "./board/previewBoard";

class Game {
    constructor() {
        this._pixiApp = new PIXI.Application(
            {
                width: GAME_DATA.BLOCK_SIZE * GAME_DATA.WIDTH, 
                height: GAME_DATA.BLOCK_SIZE * GAME_DATA.HEIGHT
            }
        );
        this._previewNextBlockPixiApp = new PIXI.Application(
            {
                width: GAME_DATA.BLOCK_SIZE * GAME_DATA.PREVIEW_BOARD_WIDTH, 
                height: GAME_DATA.BLOCK_SIZE * GAME_DATA.PREVIEW_BOARD_HEIGHT
            }
        );
        this._tetrominoFactory = new TetrominoFactory();
        this._UI = new UI();  
        this._gameBoard = undefined;
        this._previewBoard = undefined;
        this._gameState = GAME_DATA.STATES.LOADING;        
        this._detlaTime = 0;
        this._blockFallTime = GAME_DATA.INIT_BLOCK_FALL_TIME;
        this._points = 0;
        this._level = 1;

        this.addListeners();
    }

    addListeners() {
        this._UI.startButton.addEventListener("click", () => {
            this.load();
        });
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        this._UI.playAgainButton.addEventListener("click", this.restart.bind(this));
    }

    load() {
        this._UI.hideStartButton();
        this._UI.showLoading();

        Loader.loadAllTextures(() => {
            this.start();
            this._UI.hideLoading();
            this._UI.showGame();
        });
    }

    addTetrominosToBoards() {
        const tetromino = this._tetrominoFactory.getMovingTetrominoInstance();
        const nextTetromino = this._tetrominoFactory.getPreviewTetrominoInstance();
        this._gameBoard.addTetromino(tetromino);
        this._previewBoard.addTetromino(nextTetromino);
    }

    start() {
        this._gameBoard = new GameBoard(this._pixiApp.stage);
        this._previewBoard = new PreviewBoard(this._previewNextBlockPixiApp.stage);
        this._detlaTime = new Date();

        this.addTetrominosToBoards();

        this._UI.insertPixiView(this._pixiApp.view);
        this._UI.insertPreviewBoardView(this._previewNextBlockPixiApp.view);
        
        this._gameState = GAME_DATA.STATES.PLAYING;   
        requestAnimationFrame(this.update.bind(this));
    }

    gameOver() {
        this._gameBoard.setBlackAndWhiteEffect();
        this._previewBoard.setBlackAndWhiteEffect();
        this._UI.hideGameTitle();
        this._UI.showGameOver();
    }

    restart() {
        if(this._gameState != GAME_DATA.STATES.GAME_OVER) return;

        this._UI.hideGameOver();        
        this._UI.showGameTitle();

        this._detlaTime = new Date();
        this._level = 1;
        this._score = 0;
        this._blockFallTime = GAME_DATA.INIT_BLOCK_FALL_TIME;

        this._tetrominoFactory.reset();
        this._gameBoard.clear();
        this._previewBoard.clear();    
        this.addTetrominosToBoards();

        this._gameState = GAME_DATA.STATES.PLAYING;        
        requestAnimationFrame(this.update.bind(this));    
    }

    getMoveForTetromino(key) {
        let move = false;
        switch(key) {
        case 38:
            move = GAME_DATA.MOVE.UP;
            break;
        case 40:
            move = GAME_DATA.MOVE.DOWN;
            break;
        case 37:
            move = GAME_DATA.MOVE.LEFT;
            break;
        case 39:
            move = GAME_DATA.MOVE.RIGHT;
            break;
        }
        return move;
    }

    onKeyDown(key) {
        if(this._gameState != GAME_DATA.STATES.PLAYING) return;

        const move = this.getMoveForTetromino(key.keyCode);
        if(!move) return;
        if(move.DIRECTION === "ROTATE") {
            this._gameBoard.rotateTetromino();
        } else {
            this._gameBoard.moveTetrominoBy(move);
        }
    }

    levelUp() {
        this._level++;
        const newBlockFallTime = GAME_DATA.INIT_BLOCK_FALL_TIME - 50 * this._level;
        this._blockFallTime = newBlockFallTime < 100 ? 100 : newBlockFallTime;
        this._UI.setLevel(this._level);
    }

    addPoints(points) {
        this._points += points;
        if(this._points > 500 * this._level) {
            this.levelUp();
        }
        this._UI.setPoints(this._points);
    }

    addTetromino() {
        const newTetromino = this._tetrominoFactory.getMovingTetrominoInstance();
        const nextTetromino = this._tetrominoFactory.getPreviewTetrominoInstance();
        if(this._gameBoard.canAddTetromino(newTetromino)) {
            this._gameBoard.addTetromino(newTetromino);
            this._previewBoard.clear();
            this._previewBoard.addTetromino(nextTetromino);
        } else {
            this._gameState = GAME_DATA.STATES.GAME_OVER;
        }
    }

    deconstructTetromino() {
        this._gameBoard.deconstructTetromino();
        this._gameBoard.clearFullRows(() => this.addPoints(100));
    }
 
    updatePlaying() {
        if(new Date() - this._detlaTime >  this._blockFallTime) {
            if(this._gameBoard.shouldDeconstructTetromino()) {
                this.deconstructTetromino();
                this.addTetromino();
            } else {
                this._gameBoard.moveTetrominoBy(GAME_DATA.MOVE.DOWN);
            }
            this._detlaTime = new Date();            
        }
        requestAnimationFrame(this.update.bind(this));        
    }

    update() {
        if(this._gameState === GAME_DATA.STATES.PLAYING) {
            this.updatePlaying();
        } else if (this._gameState === GAME_DATA.STATES.GAME_OVER) {
            this.gameOver();
        }
    }

}

export default Game;