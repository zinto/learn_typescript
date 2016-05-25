function area(shape) {
    var area = shape.width * shape.height;
    return "I am a " + shape.name + " with area " + area + " cm squared";
}
console.log(area({ name: "retangle", width: 30, height: 15 }));
console.log(area({ name: "square", width: 30, height: 15, color: "blue" }));
console.log(area({ width: 30, height: 15 }));
var shape = {
    name: "retangle",
    popup: function () {
        var _this = this;
        console.log('This inside popup()' + this.name);
        setTimeout(function () {
            console.log('This is inside setTimeout():' + _this.name);
            console.log("I'm a " + _this.name);
        }, 3000);
    }
};
shape.popup();
