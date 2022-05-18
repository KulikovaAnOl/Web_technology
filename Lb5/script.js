jQuery(function(){
 $ = $ || jQuery;
    var a = $(".game .item");
    var fields; 
    var firstStep;
    var countW=0;
    var countL=0;
 $("#game-krestiki-noliki div .close,#game-krestiki-noliki div .next").on("click",function (e){
     a.off("click",clickGamer);
  e.preventDefault();
  $(this).parents(".window").hide();
  init();
    $("#game-krestiki-noliki .win").hide();
    $("#game-krestiki-noliki .lost").hide();
 });


function init(){
 fields = [0,0,0,0,0,0,0,0,0];
 firstStep = rand(0,fields.length-1);
 
 fields[firstStep] = 1;
 a.on("click",clickGamer);

 a.each(function(i,e){
 $(e).html( symbol(fields[i]) );
 });
 $("#countW").html(countW);
 $("#countL").html(countL);
}

function clickGamer(e){
 var self = this, num;
 e.preventDefault();

 $(this).off("click",clickGamer);
 $(this).html(symbol(2));
 a.each(function(i,e){
  if( self == e ) {
   num = i;
   fields[i] = 2;
  }
 });
clickComp(fields);
if ( checkWin(fields,2) ) {
  $("#game-krestiki-noliki .win").show();
  countW = countW+1;
} else
if ( checkWin(fields,1) ) {
  $("#game-krestiki-noliki .lost").show();
  countL = countL+1;
} else if ( checkFullStep(fields) == 0 )
  init();
}

function clickComp(fields){
 var steps = getStep(fields);
 var step = steps[rand(0, steps.length-1)];
 console.log("Шаг компа: "+step);
 fields[step] = 1;
 a.each(function(i,e){
 if( i == step ) {
  $(e).off("click",clickGamer);
  $(e).html(symbol(1));
 }
});
}

function checkWin(fields, sym){
 var flag = true, tmp = [], sum = 0;
 for(var i = 0; i < 3; i++){
  tmp[i] = [];
  for(var j = 0; j < 3; j++){
   tmp[i][j] = fields[i*3+j];
  }
 }
 for(var i = 0; i < 3; i++){
  flag = true;
   for(var j = 0; j < 3; j++){
    if( tmp[i][j] != sym )
     flag = false;
   }
  if( flag ) return true;
}

for(var i = 0; i < 3; i++){
 flag = true;
 for(var j = 0; j < 3; j++){
  if( tmp[j][i] != sym )
   flag = false;
  }
 if( flag ) return true;
}

if(
 tmp[0][0] == sym &&
 tmp[1][1] == sym &&
 tmp[2][2] == sym ||
 tmp[0][2] == sym &&
 tmp[1][1] == sym &&
 tmp[2][0] == sym
) return true;
}

function checkFullStep(arr){
 return arr.join("").split(0).length - 1;
}

init();

});

function rand(n,m){
 return Math.round(Math.random()*(m-n)+n);
}

function symbol(input){
 switch( input ){
  case 0: return "";
  case 1: return "×";
  case 2: return "o";
 }
}

function getStep(arr){
 var tmp = [],p;
 for( p in arr ){
  if ( !arr[p] )
  tmp.push(p);
 }
return tmp;
}

function arrayClone(arr){
 var tmp = [];
 for(var p in arr)
  tmp[p] = arr[p];
  return tmp;
 }