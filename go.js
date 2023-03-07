import { generateCanvas, makeAudioManager } from "./helpers.js";

const audioManager = makeAudioManager();
const [ctx, canvasWidth, canvasHeight, canvasElem] = generateCanvas({
    width: window.innerWidth,
    height: window.innerHeight,
    attachNode: ".game"
});
const wide = canvasWidth > canvasHeight;
var gameBoard = new Array(9);

const board = new Image();
board.src = "assets/board9.jpg";
var boardScale = 0;
var boardOffX = 0;
var boardOffY = 0;
var boardStepX = 0;
var boardStepY = 0;

board.onload = () => {
    var dimen = wide ? canvasHeight : canvasWidth;
    boardScale = wide ? canvasHeight / board.height : canvasWidth / board.width;
    console.log(boardScale);
    var imgW = dimen - 15;
    var imgH = dimen - 25;
    var x = wide ? (canvasWidth / 2) - (imgW / 2) : 0;
    var y = !wide ? (canvasHeight / 2) - (imgH / 2) : 0;
    ctx.drawImage(board, x, y, imgW, imgH);

    ctx.beginPath();
    boardOffX = x + (295 * boardScale);
    boardOffY = y + (248 * boardScale);
    boardStepX = 181 * boardScale;
    boardStepY = 190 * boardScale;
    for (let i = 0; i < 9; i++) {
        gameBoard[i] = new Array(9);
        for (let j = 0; j < 9; j++) {
            gameBoard[i][j] = 0;
        }
    }
    ctx.stroke();
}

const pieceB = new Image();
pieceB.src = "assets/pieceB.png";
const pieceW = new Image();
pieceW.src = "assets/pieceW.png";
var black = true;

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

document.addEventListener("mousedown", function(e) {
    const {x, y} = getMousePos(canvasElem, e);

    var ix = Math.floor((x - boardOffX - 31) / boardStepX) + 1;
    var iy = Math.floor((y - boardOffY - 31) / boardStepY) + 1;

    if (gameBoard[iy][ix] != 0) {
        return;
    }

    const scale = boardScale * 1.7;
    const w = pieceW.width * scale;
    const h = pieceW.height * scale;
    const p = black ? pieceB : pieceW;
    const px = boardOffX + (boardStepX * ix) - ix - 31;
    const py = boardOffY + (boardStepY * iy) - iy - 31;
    gameBoard[iy][ix] = black ? 1 : 2;
    black = !black;
    ctx.drawImage(p, px, py, w, h);
    audioManager.playPiece();
});