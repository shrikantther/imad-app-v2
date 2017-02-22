var express = require('express');
var morgan = require('morgan');
var path = require('path');
//var Pool=require("pg").Pool;
//var config={
  //  user:'shrikantther',
   // database: 'shrikantther',
    //host:'db.imad.hasura-app.io',
    //port:'5432',
//password:process.env.DB_PASSWORD
    
//};
var app = express();
app.use(morgan('combined'));



/*var articles={
 'article-one' : {
    title:'article one',
    heading:"article-one",
    date:"5 sept",
 content:`
     <p>
     welcome welcome welcome welcome welcome welcome welcome 
     </p>
     <p>
     welcome welcome welcome welcome welcome welcome welcome welcome 
     </p>
  `    
 }
};



function createtemplate(data){
    var date=data.date;
    var title=data.title;
    var heading=data.heading;
    var content=data.content;

var htmltemplate=`
<html>
<head> <title>
${title}
</title>
<style>
    .container{
         max-width: 800px;
    margin: auto;
    color: gray;
    font-family: sans-serif;
    padding-left: 20px;
    padding-right: 20px;
    }
    
</style>

</head>

<body>
    
    <div class="container">
    <div>
        <a href="/">Home</a>
    </div>
    </hr>
    <h3>
        ${heading}${date}
    </h3>
    
    <div>${content}</div>
    </div>
</body>
</html>

`;
return htmltemplate;
}*/


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});
//var pool = new Pool(config)
//app.get('/test-db',function(req,res){
  //  pool.query('SELECT * FROM test',function(err,result){
    //   if(err)
      // {
        //   res.statues(500).send(err.toString());
           
    //   }else{
      //     res.send(JSON.stringify(result));
       //}
    //});
});

//app.get('/articleName',function(req,res){
// app.get('/article-one',function(req,res){
  //  res.send(article(article-one)); 
//});
app.get('/article-two',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html')); 
});
app.get('/article-three',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
var names=[];
app.get('/submit-name',function(req,res){
   var name=req.query.name;
   
   names.push(name);
   
   res.send(JSON.stringify(names));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
