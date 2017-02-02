//counter code here
var button=document.getElementById('counter');
//var counter=0;
//submit name
var nameInput=document.getElementById('name');
var name=nameInput.value;
var submit=document.getElementById('submit_btn');
 
button.onclick =function(){
    
    //request
    var request=new XMLHttpRequest();
    
    //response
    request.onreadystatechange=function(){
       if(request.readyState===XMLHttpRequest.DONE) {
           if(request.status === 200)
           {
              // var names=['name1','name2','name3','name4'];
              var names=request.responseText;
              names=JSON.parse(names);
    var list='';
    for(i=0;i<names.length;i++){
        list+='<li>'+ names[i] +'</li>';
    }
       var ul=document.getElementById('namelist');
    ul.innerHTML=list;
  
               //var counter=request.responseText;
            //   var span=document.getElementById('count');
             //  span.innerHTML=counter.toString();
           }
           
       }
    };
    //render of variable in span
//make request
request.open('GET','http://shrikantther.imad.hasura-app.io/submit-name?name='+name,true);
request.send(null);
};


 
 
   
};


