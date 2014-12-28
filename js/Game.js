// Class definition / constructor
var Game = function Game() {
  this.grid_size;
  this.current_color;
  this.mad_color;
  this.level;
  this.canvas;
  this.ctx;
  this.grid = new Array();
}

// Instance methods
Game.prototype = {
  init: function(canvas, grid_size) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.initCanvas();
    this.setGridSize(grid_size);
    this.newColor();
    this.level = 5;

    this.createGrid();
    this.canvas.addEventListener("click", game.testBoxes, false);
  },
  initCanvas: function(canvas){
    this.canvas.width = this.canvas.height = (window.innerWidth > window.innerHeight)?window.innerHeight - 20:window.innerWidth - 20;
  },
  cleanCanvas: function(){ this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); },
  setGridSize: function(new_val){ this.grid_size = new_val; },
  newColor: function(){
    this.current_color = Please.make_color();
    this.coinflip = Math.floor(Math.random()*2)
    this.mad_color = this.coinflip==0?tinycolor(this.current_color).brighten(this.level).toString():tinycolor(this.current_color).darken(this.level).toString();
  },
  testBoxes: function(evt){
    limits = game.canvas.getBoundingClientRect();
    game.grid.forEach(function(element, index, array){
      if(element.hitTest({x: evt.pageX - limits.left, y: evt.pageY - limits.top})){
        if(element.testColor(game.mad_color)){
          game.cleanCanvas();
          game.newColor();
          game.createGrid();
          //console.log('gg');
        }
        else{
          //console.log("tu pus");
        }
      }
    });
  },
  createGrid: function(){
    var size_box = this.canvas.width / this.grid_size - 10;
    var the_box = [getRandomMinMax(0, this.grid_size), getRandomMinMax(0, this.grid_size)];
    for (var i = 0; i < this.grid_size; i++){
      for(var j = 0; j < this.grid_size; j++){
        var temp_box = new Box(i, j, size_box, (the_box[0] == i && the_box[1] == j)?this.mad_color:this.current_color, this.ctx);
        this.grid.push(temp_box);
      }
    }
  }
}
