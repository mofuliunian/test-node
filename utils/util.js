exports.rnd = function rnd(n, m){
  var random = Math.floor(Math.random()*(m-n+1)+n);
  return random;
}
