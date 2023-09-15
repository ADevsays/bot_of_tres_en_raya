export function setLocalS(name, item){
    localStorage.setItem(name, item);
    return true;
}

export function getLocalS(name){
    const item = localStorage.getItem(name);
    if(item == 'false' || item == 'true'){
        return item == 'true'
    }
}