var game;
document.addEventListener('DOMContentLoaded', function(){
  var world = document.querySelector('#game');
  game = new Game();
  game.init(world, 4);
});

function getRandomMinMax(min, max) {
  return Math.floor(Math.random()*(max-(min+1))+(min+1));
}
