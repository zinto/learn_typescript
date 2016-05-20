function area(shape:string, witdth: number, height: number) {
    var area = witdth * height;
    
    return "I am a " + shape + " with an area of " + area + "cm squared";
    
}

document.body.innerHTML = area("retangle", 30,15);