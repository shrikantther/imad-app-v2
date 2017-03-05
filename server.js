var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require("pg").Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var config={
    user:'shrikantther',
    database: 'shrikantther',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');

    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}
 app.get('/hash/:input',function(req,res){
     var hashedString=hash(req.params.input,'this-is-some-random-string');
     res.send(hashedString);
     
 });
app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            res.send('user created: '+ username);
        
        }
    });
});
app.post('/login',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    pool.query('SELECT * FROM "user" username=$1',[username],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.length===0){
                res.send(403).send("username Password invalid");
            }else
            {
                
            var dbString=result.rows[0].passwor;
           var salt= dbString.split('$')[2];
           var hashedPassword=hash(password,salt);
            if(hashedPassword===dbString){
                
            res.send('correct data');
            }
            else{
                  res.send(403).send("username Password invalid");
            }
            }
        }
    });
});
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
*/


function createtemplate(data){
    var date=data.date;
    var title=data.title;
    var heading=data.heading;
    var content=data.content;

var htmlTemplate=`
<html>
<head> 
<title>
${title}
</title>
//<meta name="viewport" content="width-device-width, initial-scale=1"/>
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
//<link href="/ui/style.css" rel="stylesheet"/>

</head>

<body>
    
    <div class="container">
    <div>
        <a href="/">Home</a>
    </div>
    </hr>
    <h3>
        ${heading}
    </h3>
    <div> ${date.toDateString()} </div>
    <div>${content}</div>
    </div>
</body>
</html>

`;
return htmltemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});
var pool = new Pool(config)
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test',function(err,result){
       if(err)
       {
           res.statues(500).send(err.toString());
           
       }else{
           if(result.rows.length===0){
               res.status(404).send('article not found');
           }
           else
           {
              var articleData=result.Rows[0];
              res.send(createTemplate(articleData));

           }
       }
    });
               res.send(createTemplate(articleData));

});

app.get('/articles/:articleName',function(req,res){
// app.get('/article-one',function(req,res){
  //  var articleName=req.params.articleName;
   // var articleData=
   pool.query("SELECT * FROM article where title='"+req.params.articleName+"'",function(err,result){
      if(err)
      {
          req.status(500).send(err.toString());
      }else{
          if(result.rows.length===0){
              res.status(404).send('article not found');
          }else{
              var articleData=result.rows[0];
              res.send(createTemplate(articleData));
          }
      }
   });
  //  res.send(createTemplate(articleData)); 
});


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
