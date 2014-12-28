// Class definition / constructor
var Box = function Box(x, y, size, color, ctx) {
  this.size = size;
  this.color = color;
  ctx.fillStyle = this.color;
  this.x = x * size + x * 5;
  this.y = y * size + y * 5;
  this.drawPolygon(ctx, [[this.x, this.y], [this.x + this.size, this.y], [this.x + this.size, this.y + this.size], [this.x, this.y + this.size]], 5);
  ctx.fill();
}

// Instance methods
Box.prototype = {
  hitTest: function(source) { return (source.x < this.x + this.size && source.x > this.x && source.y < this.y + this.size && source.y > this.y); },
  testColor: function(mad_color) { return (this.color == mad_color); },
  drawPolygon: function(ctx, pts, radius) {
    if (radius > 0) {
      pts = this.getRoundedPoints(pts, radius);
    }
    var i, pt, len = pts.length;
    ctx.beginPath();
    for (i = 0; i < len; i++) {
      pt = pts[i];
      if (i == 0) {
        ctx.moveTo(pt[0], pt[1]);
      } else {
        ctx.lineTo(pt[0], pt[1]);
      }
      if (radius > 0) {
        ctx.quadraticCurveTo(pt[2], pt[3], pt[4], pt[5]);
      }
    }
    ctx.closePath();
  },
  getRoundedPoints: function(pts, radius) {
    var i1, i2, i3, p1, p2, p3, prevPt, nextPt,
    len = pts.length,
    res = new Array(len);
    for (i2 = 0; i2 < len; i2++) {
      i1 = i2-1;
      i3 = i2+1;
      if (i1 < 0) {
        i1 = len - 1;
      }
      if (i3 == len) {
        i3 = 0;
      }
      p1 = pts[i1];
      p2 = pts[i2];
      p3 = pts[i3];
      prevPt = this.getRoundedPoint(p1[0], p1[1], p2[0], p2[1], radius, false);
      nextPt = this.getRoundedPoint(p2[0], p2[1], p3[0], p3[1], radius, true);
      res[i2] = [prevPt[0], prevPt[1], p2[0], p2[1], nextPt[0], nextPt[1]];
    }
    return res;
  },
  getRoundedPoint: function(x1, y1, x2, y2, radius, first) {
    var total = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
    idx = first ? radius / total : (total - radius) / total;
    return [x1 + (idx * (x2 - x1)), y1 + (idx * (y2 - y1))];
  }
}
