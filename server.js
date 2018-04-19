var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');

var config={
    user: 'vineetasuthar2000',
    database: 'vineetasuthar2000',
    host: 'db.imad.hasura-app.io',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var content=data.content;
    var htmlTemplate=
    `<html>
           <head>
               <title>${title}</title>
               <meta name='viewport' content='width-device-width, initial-scale-1'/>
                <link href="/ui/style.css" rel="stylesheet" />
           </head>
           <body>
               <div>
                   <a href='/'>Home</a>
               </div>
               <div>
                   <h1>${heading}</h1>
               </div>
               <div>
                   ${content}
               </div>
           </body>
     </html>
 `;
 return htmlTemplate;
}


function hash (input,salt){
    
    var hashed= crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ['pbkdf', '10000', salt, hashed.toString('hex')].join('$');
    
}

app.get('/hash/:input',function(req,res){
   
   var hashedString=hash(req.params.input,'i am minion');
   res.send(hashedString);
    
});

app.post('/create-user',function(req,res){
     var username=req.body.username;
     var password=req.body.password;
     
   var salt=crypto.randomBytes(128).toString('hex');
   var dbString=hash(password,salt);
   pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
       if(err){
           res.status(500).send(err.toString('hex'));
       }
       else
       {
           res.send('user succesfully created' + username);
       }
   })
    
});

app.post('/login',function(req,res){
     var username=req.body.username;
     var password=req.body.password;
     
   pool.query('SELECT * FROM "user" WHERE username= $1',[username],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else
       {
           if(result.rows.length===0)
           {
               res.status(403).send('username/password is invalid');
           }
           else
           {
               var dbString=result.rows[0].password;
               var salt=dbString.split('$')[2];
               var hashedPassword= hash(password,salt);
               
               if(hashedPassword===dbString)
               {
                   res.send('credentials correct');
               }
               else{
                   res.status(403).send('username/password is invalid');
               }
           }
       }
   });
    
});



var pool=new Pool(config);
app.get('/test-db',function(req,res){
    pool.query('SELECT * FROM test', function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else{
           res.send(JSON.stringify(result.rows));
       }
        
    });   
});

var counter = 0;
app.get('/counter', function(req,res){
   counter=counter+1;
   res.send(counter.toString());
});

var names=[];
app.get('/submit-name', function(req,res){
   var name=req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
    
});

app.get('/obj/:name', function(req,res){
    pool.query("SELECT * FROM obj where title=$1", [req.params.name], function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }
        else{
            if(result.rows.lenght===0){
                res.status(404).send('not found');
              }
              else{
                  var objData=result.rows[0];
                   res.send(createTemplate(objData));
              }
        }
        
    });
    
});




app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/minions.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'minions.jpg'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
