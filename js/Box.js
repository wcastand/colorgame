// Class definition / constructor
var Box = function Box(x, y, size, color, ctx) {
  this.size = size;
  this.color = color;
  ctx.fillStyle = this.color;
  this.x = x * size;
  this.y = y * size;
  ctx.fillRect(x * size, y * size, size, size);
}

// Instance methods
Box.prototype = {
  hitTest: function(source) { return (source.x < this.x + this.size && source.x > this.x && source.y < this.y + this.size && source.y > this.y); },
  testColor: function(mad_color) { return (this.color == mad_color); }
}
