import { setupGround, updateGround } from "./Ground.js"
import { setupDino,updateDino,getDinoRect,setDinolose } from "./Dino.js"
import { setupCactus,updateCactus,getCactusRects } from "./Cactus.js"

const WORLDWIDTH =100
const WORLDHEIGHT =30
const speed_scaleincrease =0.00001

const worldElement = document.querySelector('[data-world]')
const scoreElem = document.querySelector('[data-score]')
const startScreenElem = document.querySelector('[data-start-screen]')


setupGround()

setPIxeltoWorldscale()
window.addEventListener('resize',setPIxeltoWorldscale)
document.addEventListener("keydown",handleStart,{once:true})


function checkLose(){
    const dinorect = getDinoRect()
    return getCactusRects().some (rect => isCollision(rect,dinorect))
}

function isCollision(rect1 ,rect2){
    return(
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
        )


}

function handleStart(){
    lasttime=null
    score=0
    speedscale=1
    setupGround()
    setupDino()
    setupCactus()
    startScreenElem.classList.add('hide')
    window.requestAnimationFrame(update)
}

function updatescore(delta){
    score += delta * .01
    scoreElem.textContent =Math.floor(score)
}


function setPIxeltoWorldscale(){
    let worldtopixelsize
    if(window.innerWidth/window.innerHeight < WORLDWIDTH / WORLDHEIGHT){
        worldtopixelsize =window.innerWidth / WORLDWIDTH


    }else{
        worldtopixelsize =window.innerHeight /WORLDHEIGHT
    }
    worldElement.computedStyleMap.width = `${WORLDWIDTH * worldtopixelsize}px`
    worldElement.computedStyleMap.height = `${WORLDHEIGHT * worldtopixelsize}px`

}

function updatespeedscale(delta){
    speedscale+=delta * speed_scaleincrease
}

let lasttime
let speedscale
let score 
function update(time){
    if(lasttime==null){
        lasttime=time
        window.requestAnimationFrame(update)
        return
    }
    const delta = time -lasttime
    updateGround(delta,speedscale)
    updateCactus(delta,speedscale)
    
    updateDino(delta,speedscale)
    updatespeedscale(delta)
    updatescore(delta)
    if(checkLose()) return handleLose()
    lasttime=time
    window.requestAnimationFrame(update)
}


function handleLose(){
    setDinolose()
    setTimeout(() => {
        document.addEventListener("keydown",handleStart,{once:true})
        startScreenElem.classList.remove('hide')
    }, 100);
}