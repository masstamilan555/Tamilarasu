import { getCustumProperty, incrementCustumProperty, setCustumProperty } from "./updatecustumproperty.js"

const grounElems =document.querySelectorAll('[data-ground]')

export function setupGround(){
    setCustumProperty(grounElems[0],"--left",0)
    setCustumProperty(grounElems[1],"--left",300)

}


const SPEED =0.045
export function updateGround(delta,speedscale){
    grounElems.forEach(ground =>{
        incrementCustumProperty(ground,'--left',delta *speedscale* SPEED * -1)
        if(getCustumProperty(ground,"--left")<=-300){
            incrementCustumProperty(ground,"--left",600)
        }
    })
}