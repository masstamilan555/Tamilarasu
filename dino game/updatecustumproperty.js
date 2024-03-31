export function getCustumProperty(elem,prop){
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0

}
export function setCustumProperty(elem,prop,value){
    elem.style.setProperty(prop,value)
}
export function incrementCustumProperty(elem,prop,inc){
    setCustumProperty(elem,prop,getCustumProperty(elem,prop) + inc)
}


