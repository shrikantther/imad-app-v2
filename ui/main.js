var button=document.getElementById('counter');

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
             
  console.log("user logged in");
  alert("logged in successfully");
           }else if(request.status===403){
              alert("username/password is incorrect") ;
           }else if(request.status===500){
               alert("Something went wrong on the server");
           }
           
       }
    };
var username=document.getElementById('username').value;
var password=document.getElementById('password').value;
console.log(username);
console.log(password);
request.open('POST','http://shrikantther.imad.hasura-app.io/login',true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({username: username,password}));
};


