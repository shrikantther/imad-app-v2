console.log('Loaded!');
var element=document.getElementById("main-text");

element.innerHTML="New Value";

var img=document.getElementById("madi");
var marginLeft=0;
function moveRight(){
    marginLeft=marginLeft+10;
    img.style.marginLeft=marginLeft+'px';
}

img.onClick=function(){
    var interval=setInterval(moveLeft,100);
  img.style.marginLeft="100px";  
    
};