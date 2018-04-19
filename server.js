var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool= require('pg').pool;

var config={
    user: 'vineetasuthar2000',
    database: 'vineetasuthar2000',
    host: 'db.imad.hasura-app.io',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var obj={
    'about': {
                  title: 'About Section',
                  heading: 'Movies of Minion',
                  content: `<ol>
                               <li>Despicabel ME 1 2010 </li>
                               <li>Despicabel ME 2 2013</li>
                               <li>Despicabel ME 3 2017</li>
                               <li>Minions 2015 </li>
                           </ol>`
               },
    'minion':{
                  title: 'Minion Section',
                  heading: 'Welcome to the World  of Minion',
                  content: `<ol>
                               <li>Bob </li>
                               <li>Kevin </li>
                               <li>Staurt</li>
                           </ol>`  
               },
    'agnes':{
                  title: 'Agnes Section',
                  heading: 'family of Agnes',
                  content: `<ol>
                               <li>Dad: Gru </li>
                               <li>Mom: Lucy</li>
                               <li>Sister: Margo</li>
                               <li>Sister: Edith</li>
                           </ol>`  
              }
};

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


/*var ab=new pool(config);
app.get('/test-db',function(req,res){
    ab.query('SELECT * FROM test', function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else{
           res.send(JSON.stringify(result));
       }
        
    });   
});*/

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

app.get('/:name', function(req,res){
    var name=req.params.name;
    res.send(createTemplate(obj[name]));
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
