var reverse = function(expr) {
  var type = expr.tag;
  if(type == 'note') {
    return expr;
    n  } 
  if(type == 'seq') {
    var left = reverse(expr.right);
    var right = reverse(expr.left);
    return {tag: 'seq',
            left: left,
            right: right};
  }
};

var endTime = function (time, expr) {
  var t = expr.tag;
  if(t == 'note') {
    return time + expr.dur;
  }
  if(t == 'seq') {
    return endTime(time, expr.left) + endTime(time, expr.right);
  }
};


var generateSeq = function(soFar, expr, prev, spent) {

  var t = expr.tag;

  if(t == 'note') {
    var timeSoFar = soFar.reduce(function(sf, next) {
      return sf + next.dur;
    }, 0);
    expr.start = timeSoFar;
    soFar.push(expr);
  }
  if(t == 'seq') {
    generateSeq(soFar, expr.left);
    generateSeq(soFar, expr.right);
  }
  if(t === 'par') {
    generateSeq(soFar, expr.left);
    generateSeq(soFar, expr.right);
  }
  return soFar;  
};

var compile = function(musexpr) {
  return generateSeq([], musexpr);
};

//TODO: fix to handle pars
var testCase = {  tag: 'seq',
                  left: { tag: 'node', pitch: 'c3', dur: 400},
                  right: 
                  { tag: 'par',
                    left: { tag: 'note', pitch: 'c4', dur: 250 },
                    right:
                    { tag: 'par',
                      left: { tag: 'note', pitch: 'e4', dur: 250 },
                      right: { tag: 'note', pitch: 'g4', dur: 250 } 
                    } 
                  }
               };

console.log(compile(testCase));


