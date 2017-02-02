var express = require('express');
var morgan = require('morgan');
var path = require('path');

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

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
