function findBorder(arrayDirection, sqr){
    return arrayDirection.some(e => e == sqr);
}

export function limitBorder(sqr){
    let borderLimit = '';
    if(findBorder([1,2,3], sqr)){
        borderLimit =  'border-t-0';
    } else if(findBorder([7,8,9], sqr)){
        borderLimit =  'border-b-0';
    }
    if(findBorder([7,9], sqr)){
        borderLimit =  sqr == 7 ? 'border-b-0 border-l-0' : 'border-b-0 border-r-0';
    } else if(findBorder ([1,3], sqr)){
        borderLimit =  sqr == 1 ? 'border-t-0 border-l-0' : 'border-t-0 border-r-0';
    }
    if(findBorder([4,6], sqr)){
        borderLimit =  sqr == 4 ? 'border-l-0' : 'border-r-0';
    }
    return borderLimit;
}