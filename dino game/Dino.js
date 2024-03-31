import { incrementCustumProperty,getCustumProperty, setCustumProperty } from "./updatecustumproperty.js"


const dinoElem =document.querySelector('[data-dino]')
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAMECOUNT =2
const FRAME_TIME =100
   
let isJumping
let dinoFrme
let currentFrameTime
let yvelocity

export function setDinolose(){
    dinoElem.src ="cactus.png"
}
export function getDinoRect(){
    return dinoElem.getBoundingClientRect()
}

export function updateDino(delta,speedscale){

    handleRun(delta,speedscale)
    handleJump(delta)
}

export function setupDino(){
    isJumping=false
    dinoFrme=0
    yvelocity=0
    setCustumProperty(dinoElem,"--bottom",0)
    currentFrameTime=0
    document.removeEventListener("keydown",onJump)
    document.addEventListener("keydown",onJump)
}

function handleJump(delta){
    if(!isJumping) return
    incrementCustumProperty(dinoElem,"--bottom",yvelocity * delta)
    
    if(getCustumProperty(dinoElem,"--bottom")<=0){
        setCustumProperty(dinoElem,"--bottom",0)
        isJumping = false
    }
    yvelocity -= GRAVITY * delta
}


function handleRun(delta,speedscale){
    if(isJumping){
        dinoElem.src ='dino-stationary.png'
        return
    }
    if (currentFrameTime >=FRAME_TIME){
        dinoFrme =(dinoFrme + 1) % DINO_FRAMECOUNT
        dinoElem.src =`dino-run-${dinoFrme}.png`
        currentFrameTime -=FRAME_TIME
    }
    currentFrameTime += delta * speedscale
}

function onJump(e){
    if(isJumping || e.code !=="Space" ) return 
    yvelocity =JUMP_SPEED
    isJumping=true
}
