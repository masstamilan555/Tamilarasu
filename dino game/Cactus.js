import { getCustumProperty, incrementCustumProperty, setCustumProperty } from "./updatecustumproperty.js"


const SPEED = .045
const CACTUS_INTERVAL_MIN =500
const CACTUS_INTERVAL_MAX =2000
const worldElement =document.querySelector('[data-world]')


let nextCactusTime


export function getCactusRects(){
    return [...document.querySelectorAll("[data-cactus]")].map(cactus =>{

        return cactus.getBoundingClientRect()
    })
}

export function setupCactus(){
    nextCactusTime =CACTUS_INTERVAL_MIN
    document.querySelectorAll('[data-cactus]').forEach(cactus =>{
        cactus.remove()
    })
}

export function updateCactus(delta,speedscale){
    document.querySelectorAll('[data-cactus]').forEach(cactus =>{
        incrementCustumProperty(cactus,"--left",delta * speedscale * SPEED * -1)
        if(getCustumProperty(cactus,"--left")<=-100){
            cactus.remove()
        }
    })
    if (nextCactusTime <= 0){
        createCactus()
        nextCactusTime =randomNUmberBetween(CACTUS_INTERVAL_MIN,CACTUS_INTERVAL_MAX) / speedscale
    }
    nextCactusTime -= delta
}

function createCactus(){
    const cactus =document.createElement('img')
    cactus.classList.add('cactus')
    cactus.dataset.cactus =true
    cactus.src ="cactus.png"
    setCustumProperty(cactus,"--left",100)
    worldElement.append(cactus)

}


function randomNUmberBetween(min,max){
    return Math.floor(Math.random()*(max- min + 1)+ min)
}