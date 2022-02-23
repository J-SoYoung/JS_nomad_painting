const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName('jsColor');
const ctx = canvas.getContext("2d");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
    painting = false;
    }

function startPainting() {
    painting = true;
    }

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        // console.log('create Path', x, y)
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        // console.log('create line', x, y)
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    // console.log(event.target.style)
    const color = event.target.style.backgroundColor
    // console.log(color) 타켓이 된 색상으로 바뀜
    ctx.strokeStyle = color;
}


if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

// console.log(Array.from(colors))
Array.from(colors).forEach(color=> color.addEventListener('click', handleColorClick))