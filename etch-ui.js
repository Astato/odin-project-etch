const BODY = document.querySelector("body");
const HTML = document.querySelector("html");

const canvas = document.createElement("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.backgroundColor = "rgba(255, 255, 255, 0.7)";

const containergrid = document.createElement("div");
containergrid.setAttribute("class","containergrid");
BODY.appendChild(containergrid);


const gridDraw = {
    name : "a",
    
    add(){
        this.name = document.createElement("div");
        this.name.setAttribute("class","divstyle");
        containergrid.append(this.name);
    },

    remove(){
    BODY.removeChild(containergrid);
    },
    
}    


function numOfGrid(num){
    if(containergrid.childElementCount > num*num){
        return num = 0;
    }
    for(let i = 0; i<=num*num;i++){
        gridDraw.add();

}}

const divSize = document.getElementsByClassName("divstyle");

function divGridSize(num) {
    let divWidth = BODY.offsetWidth/num;
    let divHeight = BODY.offsetHeight/num;
    let widthAtt = "width:"+divWidth.toString()+"px";
    let heightAtt = "height:"+divHeight.toString()+"px";
    let result = widthAtt+"; "+heightAtt;

    for(let i = 0; i<num*num;i++){
        divSize[i].setAttribute("style",result);

    }
}

function gridSize(size){
    let rowTemplate = "grid-template-rows:repeat";
    let columnTemplate = "grid-template-columns:repeat";

    let gridRowTemplate = rowTemplate+"("+size.toString()+",auto)";
    let gridColumnTemplate = columnTemplate+"("+size.toString()+",auto)";
    let result = gridRowTemplate +";"+ gridColumnTemplate;

    if(size === 16 || size ===64 || size === 32 || size=== 0){
        containergrid.setAttribute("style",result);
    }

} 

const containercanvas = document.createElement("div");
BODY.appendChild(containercanvas);

containercanvas.appendChild(canvas);
const context = canvas.getContext("2d");
let pos = {x:0 , y:0};

document.addEventListener("pointerdown", function(event){
    if(event.buttons === 1){ 
        startDraw(event);
        }
});

document.addEventListener("pointerup",stopDraw);

function position(evt){
    pos.x= evt.clientX - canvas.offsetLeft;
    pos.y = evt.clientY - canvas.offsetTop;

}

let x = 9;
let y = 9;


function startDraw(event){
    document.addEventListener("mousemove", draw);
    position(event);
    
}

function stopDraw(){
    document.removeEventListener("mousemove",draw);
}


function draw(event){
    context.beginPath();
    context.lineWidth = x;
    context.lineCap = "round";
    context.strokeStyle = COLORPICKER.value;
    context.moveTo(pos.x, pos.y);
    position(event);
    context.lineTo(pos.x, pos.y);
    context.stroke();
}



const SIDENAV = document.createElement("nav");
SIDENAV.setAttribute("class","sidenav");

BODY.appendChild(SIDENAV);


const COLORPICKER = document.createElement("input");
COLORPICKER.setAttribute("style","border-radius:15%");
COLORPICKER.setAttribute("type","color");

const RESET= document.createElement("button");
RESET.setAttribute("style","border-radius:10%;font-weight:900 ;");
RESET.textContent ="RESET";

const increasePixel = document.createElement("button");
increasePixel.textContent= "+";
increasePixel.setAttribute("style","border-radius:10%;font-weight:900 ;");

const decreasePixel = document.createElement("button");
decreasePixel.textContent ="-";
decreasePixel.setAttribute("style","border-radius:10%;font-weight:900 ;");

const showsize = document.createElement("label");
showsize.textContent = " Size: "+x;

const CANVASBG = document.createElement("button");
CANVASBG.textContent="BG: W/B";
CANVASBG.setAttribute("style","border-radius:10%;font-weight:900 ;");


SIDENAV.append(COLORPICKER, increasePixel, decreasePixel,showsize, CANVASBG, RESET);


RESET.addEventListener("click",function(){
 
    context.clearRect(0,0,canvas.width,canvas.height);

});


increasePixel.addEventListener("click",()=>{
    x +=1;
    y +=1;
    showsize.textContent = " Size: "+x;
    return;
});

decreasePixel.addEventListener("click",() =>{
    x-=1;
    y-=1;
    showsize.textContent =" Size: "+x
    if(x < 1 || y < 1){
        return x=1, y=1, showsize.textContent =" Size: "+x;
    }
})


CANVASBG.addEventListener("click",() =>{
    let background = canvas.style.backgroundColor;

    switch(background){
        case "": 
        case "rgba(255, 255, 255, 0.7)":canvas.setAttribute("style","background-color:rgba(0, 0, 0, 0.9)");showsize.setAttribute("style","color:white");break;
        case "rgba(0, 0, 0, 0.9)":canvas.setAttribute("style","background-color:rgba(255, 255, 255, 0.7)");showsize.setAttribute("style","color:black");break;

    }

})


const SELECT = document.createElement("select");

const OPTGROUP = document.createElement("optgroup");
OPTGROUP.setAttribute("label","Grid");

SIDENAV.appendChild(SELECT);
SELECT.appendChild(OPTGROUP);


const NOGRIDOPT = document.createElement("option");
NOGRIDOPT.textContent = "No Grid";

const GRID16X16 = document.createElement("option");
GRID16X16.textContent = "16x16";

const GRID32X32 = document.createElement("option");
GRID32X32.textContent = "32x32";

const GRID64X64 = document.createElement("option");
GRID64X64.textContent = "64x64";

OPTGROUP.append(NOGRIDOPT,GRID16X16,GRID32X32,GRID64X64);


window.addEventListener("resize",function(event){
    const evt = new Event("click");
    SELECT.dispatchEvent(evt);

});


SELECT.addEventListener("click", function(event){
    BODY.appendChild(containergrid);

    if(this.value === "16x16"){
           
        return numOfGrid(16), divGridSize(16), gridSize(16);
        }
    else if(this.value === "64x64"){
     
        return numOfGrid(64), divGridSize(64), gridSize(64);
        }
    else if(this.value === "32x32"){
        return numOfGrid(32), divGridSize(32), gridSize(32);
        }

    else{
        
        gridDraw.remove();
        }
});







