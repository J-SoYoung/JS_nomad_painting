const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName('jsColor');
const range= document.getElementById('jsRange')
const mode = document.getElementById('jsMode')
const saveBtn = document.getElementById('jsSave')
const eraseAll = document.getElementById('jsAllErase')
const erasePart = document.getElementById('jsPartErase')
let text = document.getElementById('jsText')
const textBtn = document.getElementById('jsTextBtn')

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0,0,canvas.width ,canvas.height )
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false; 


// ctx.font = 'bold 48px serif';
// ctx.strokeText('Hello world', 50, 100);
// text사용 . 근데 괄호 안에 써넣어야함? ㅇㅅㅇ 어... 아닐수도
// hello world 변수에 넣고, input에 넣은거 값 가져와! 헐 대박ㅋ
// 일단 기다려봐

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
    // 객체 안에 어떤 내용들이 있나 확인해봄
    const color = event.target.style.backgroundColor
    // console.log(color) 타켓이 된 색상으로 바뀜
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleRangeChange(event){
    // console.log(event.target.value)
    const size = event.target.value
    ctx.lineWidth = size;
}
function handleModeClick(event){
    if (filling === true){
        filling = false
        mode.innerText = "fill"
    }else{
        filling = true;
        mode.innerText = "paint"
    }
}
function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width ,canvas.height )
    }
}
function handleCM(event){
    // console.log(event)
    event.preventDefault()
}
function handleSave(){
    //canvas 데이터를 그림으로 받기
    const image = canvas.toDataURL("image/png")
    // console.log(image)
    const link = document.createElement('a')
    link.href = image;
    link.download = "paintJS[🎨]";
    // console.log(link)    
    link.click()
}
function handleEraseAll(){
    // 전체지우기! confirm 결과에 따라 지우기, 취소가능
    if (window.confirm('canvas를 지울까요?')){
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,canvas.width ,canvas.height )
    }
}
function handlePartErase(e){
    console.log(e)
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';
    onMouseMove(e)
    startPainting(e)
    stopPainting(e)
}

let count = 1
function inputCanvasText(e){
    // console.log(e.path[1].childNodes[1].value)
    const inputText = e.path[1].childNodes[1].value;
    count++
    ctx.font = '25px serif';
    ctx.strokeText(inputText, 30, 50*count);
    text.value = ""
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    // 오른쪽버튼 저장하기 X 
    canvas.addEventListener("contextmenu", handleCM);
}

// console.log(Array.from(colors))
Array.from(colors).forEach(color=> color.addEventListener('click', handleColorClick))

if(range){
    range.addEventListener('input', handleRangeChange)
}
if(mode){
    mode.addEventListener('click',handleModeClick)
}
if(saveBtn){
    saveBtn.addEventListener('click',handleSave)
}
if(eraseAll){
    eraseAll.addEventListener("click", handleEraseAll);
}
if (erasePart){
    erasePart.addEventListener("click", handlePartErase);
    erasePart.addEventListener("mousemove", onMouseMove);
    erasePart.addEventListener("mousedown", startPainting);
    erasePart.addEventListener("mouseup", stopPainting);
    erasePart.addEventListener("mouseleave", stopPainting);
}
textBtn.addEventListener('click', inputCanvasText)
