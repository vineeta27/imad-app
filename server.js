var express = require('express');
var morgan = require('morgan');
var path = require('path');

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

app.get('/ui/minion.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'minion.jpg'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
