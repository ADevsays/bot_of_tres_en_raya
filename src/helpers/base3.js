export function base3(number){
    if(number % 3 === 0){
      return 3;      
    }
    return number % 3;
}