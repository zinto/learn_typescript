function area(shape, witdth, height) {
    var area = witdth * height;
    return "I am a " + shape + " with an area of " + area + "cm squared";
}
document.body.innerHTML = area("retangle", 30, 15);
