class UI {
    constructor() {
        this._startButton = document.getElementById("start-button");
        this._loading = document.getElementById("loading");
        this._gameContainer = document.getElementById("game-container");
        this._score = document.getElementById("score");
        this._level = document.getElementById("level");
        this._blockPreview = document.getElementById("tetromino-preview");
        this._mainGame = document.getElementById("main-game");
        this._gameTitle = document.getElementById("game-title");
        this._gameOver = document.getElementById("game-over");
        this._playAgainButton = document.getElementById("play-again-btn");
        this._tetrominoPreview = document.getElementById("tetromino-preview");
    }

    get startButton() {
        return this._startButton;
    }

    get playAgainButton() {
        return this._playAgainButton;
    }

    show(element) {
        element.classList.remove("hide");
    }

    hide(element) {
        element.classList.add("hide");
    }

    showGame() {
        this.show(this._gameContainer);
    }

    showLoading() {
        this.show(this._loading);
    }

    hideLoading() {
        this.hide(this._loading);
    }

    showStartButton() {
        this.show(this._startButton);
    }

    hideStartButton() {
        this.hide(this._startButton);
    }

    showGameTitle() {
        this.show(this._gameTitle);
    }

    hideGameTitle() {
        this.hide(this._gameTitle);
    }

    showGameOver() {
        this.show(this._gameOver);
    }

    hideGameOver() {
        this.hide(this._gameOver);
    }

    setPoints(points) {
        this._score.innerText = points;
    }

    setLevel(level) {
        this._level.innerText = level;
    }

    insertPixiView(view) {
        this._mainGame.appendChild(view);        
    }

    insertPreviewBoardView(view) {
        this._tetrominoPreview.appendChild(view);
    }
}

export default UI;