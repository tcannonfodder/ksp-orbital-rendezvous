// var OrbitalMap = Class.create({
//   initalize: function(container){
//     debugger
    
//     debugger
//     this.paper = Raphael(container, 320, 200);

//     // Creates circle at x = 50, y = 40, with radius 10
//     var circle = paper.circle(50, 40, 10);
//     // Sets the fill attribute of the circle to red (#f00)
//     circle.attr("fill", "#f00");

//     // Sets the stroke attribute of the circle to white
//     circle.attr("stroke", "#fff");
//   }
// });

var OrbitalMap = Class.create({
  initialize: function(container) {
    this.container = $(container)
    this.paper = Raphael(container, 320, 200);
    // Creates circle at x = 50, y = 40, with radius 10
    var circle = this.paper.circle(50, 40, 100);
    // Sets the fill attribute of the circle to red (#f00)
    circle.attr("fill", "#f00");
    // Sets the stroke attribute of the circle to white
    circle.attr("stroke", "#fff");
  }
});