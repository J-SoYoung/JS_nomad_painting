const ctx = canvas.getContext("2d");
// 캔버스의 드로잉 컨텍스트를 반환 
// const ctx = canvas.getContext(contextType);
// contextType : 캔버스에 연관된 드로잉 컨텍스트를 정의하는 컨텍스트 식별자를 갖는 DOMString입니다.
// "2d" : 2차원 렌더링 컨텍스트를 나타내는 CanvasRenderingContext2D (en-US) 객체를 생성하게 합니다.


ctx.fillStyle = 'white';
ctx.fillRect(0,0,canvas.width ,canvas.height )
// ctx.fillRect(x, y, width, height);
// CanvasRenderingContext2D.fillRect() 메서드는 현재 fillStyle에 따라 채워지는(색칠된) 사각형을 그립니다.
// fillRect() 메서드는 시작점이 (x, y)이고 크기가 너비와 높이로 지정되는 채워진 사각형을 그립니다. 채우기 스타일은 현재 fillStyle 속성에 의해 결정됩니다.

ctx.strokeStyle = INITIAL_COLOR;
// 기본 테두리 색 설정해놓고, 컬러바 선택할 때 바꾸려고
// strokeStyle 및 기타 컨텍스트 설정에 따라 스트로크(윤곽선)된 사각형을 그립니다.

ctx.fillStyle = INITIAL_COLOR;
// 기본 배경 설정해놓고, 컬러바 선택할 때 바꿈 

ctx.lineWidth = 2.5;
// 선 두께 기본 설정값

let painting = false;
let filling = false; 
// 캔버스 위에서 선 그릴거냐 T/F, fill전체 칠할건지 T/F 
// 마우스 클릭, 버튼 클릭 이벤트로 T/F 변경 

function stopPainting() {
    painting = false;
    }

function startPainting() {
    painting = true;
    }

function onMouseMove(event) {
    // mousemove event에서 offset은 선택영역 안에서의 위치
    // screenXY = 스크린 전체 영역에서의 위치
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        // console.log('create Path', x, y) path는 측정하나 그리지는 않는 상태
        ctx.beginPath();
        // 하위 경로 목록을 비워 새 경로를 시작합니다. 새로운 경로를 생성하고자 할 때
        ctx.moveTo(x, y);
        //  (x, y) 좌표로 지정된 지점에서 새 하위 경로를 시작합니다.
    } else {
        // console.log('create line', x, y)
        ctx.lineTo(x, y);
        // lineTo()는 하위 경로의 마지막 지점을 지정된 (x, y) 좌표에 연결하여 현재 하위 경로에 직선을 추가합니다.
        ctx.stroke();
        // 현재 획 스타일로 주어진 경로를 그립니다.
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
function handleModeClick(){
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
    const image = canvas.toDataURL("image/png")
    // HTMLCanvasElement.toDataURL() 메서드는 type 매개변수에 지정된 형식으로 이미지 표현을 포함하는 데이터 URI를 반환합니다.
    // canvas 데이터를 image/png 형식으로 이미지 url받기
    // 원하는 파일 형식과 이미지 품질을 지정할 수 있습니다. 파일 형식이 지정되지 않았거나 지정된 형식이 지원되지 않는 경우 데이터는 이미지/png로 내보내집니다. 
    // console.log(image)
    const link = document.createElement('a')
    link.href = image;
    // a태그의 href속성을 사용해 image파일의 링크로 이동!
    link.download = "paintJS[🎨]";
    //<canvas> 요소의 내용을 이미지로 저장하려면 다운로드 속성이 있는 링크(link.href)를 만들고 캔버스 데이터를 데이터(link.download= "저장할이름")로 만들 수 있습니다. 
    // console.log(link)    
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#using_the_download_attribute_to_save_a_canvas_as_a_png
    link.click()
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

// console.log(Array.from(colors))
// 객체를 배열로 바꿈/ forEach: 배열 각각에 함수실행 
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

// clearRect() 메서드는 직사각형 영역의 픽셀을 투명 검정(rgba(0,0,0,0))으로 설정합니다. 사각형의 모서리는 (x, y)에 있으며 크기는 너비와 높이로 지정됩니다.

// 지우기 할때 쓰려고 했는데, 굳이 안써도 될듯ㅋ
