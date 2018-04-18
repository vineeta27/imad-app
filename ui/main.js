console.log('Loaded');
// change element of html

var element=document.getElementById('hell');
element.innerHTML='Hello, I am Minion';

// move image

var img=document.getElementById('minion');
var marginLeft=0;
function moveRight(){
    marginLeft=marginLeft + 10;
    img.style.marginLeft= marginLeft + 'px';
}
 img.onclick= function(){
   var interval=setInterval(moveRight,100);
 };