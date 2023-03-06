import { generateCanvas, makeAudioManager } from "./helpers.js";

const audioManager = makeAudioManager();
const [ctx, canvasWidth, canvasHeight, canvasElem] = generateCanvas({
    width: window.innerWidth,
    height: window.innerHeight,
    attachNode: ".game"
});

const board = new Image();
board.src = "assets/board9.jpg";
var boardScale = 0;

board.onload = () => {
    boardScale = canvasHeight / board.height;
    console.log(boardScale);
    var imgW = canvasHeight - 15;
    var imgH = canvasHeight - 25;
    ctx.drawImage(board, (canvasWidth / 2) - (imgW / 2), 0, imgW, imgH);
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
    audioManager.playPiece();
    const {x, y} = getMousePos(canvasElem, e);
    const scale = boardScale * 1.7;
    const w = pieceW.width * scale;
    const h = pieceW.height * scale;
    const p = black ? pieceB : pieceW;
    black = !black;
    ctx.drawImage(p, x - (w/2), y - (h / 2), w, h);
});