console.log('Loaded');
// change element of html

var element=document.getElementById('hell');
element.innerHTML='Hello, I am Minion';

// move image

var img=document.getElementById('madi');
 img.onclick= function(){
   img.style.marginLeft= '100px';  
 };