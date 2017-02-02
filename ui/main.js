//counter code here
var button=document.getElementById('counter');
var counter=0;

button.onclick =function(){
    //request
    var request=new XMLHttpRequest();
    
    //response
    request.onreadystatechange=function(){
       if(request.readyState===XMLHttpRequest.DONE) {
           if(request.statues==200)
           {
               var counter=request.responseText;
               var span=document.getElementById('count');
               span.innerHTML=counter.toString();
           }
           
       }
    };
    //render of variable in span
//make request
request.open('GET','http://shrikantther.imad.hasura-app.io/counter',true);
request.send(null);
    
};