const express =require('express');
var app =express();
const hbs = require('hbs');
const fs =require('fs');

hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine','hbs');


app.set('port', process.env.PORT || 3000); // set the port no:

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
 // console.log(`${now}: ${req.method} ${req.url}`);
 fs.appendFile('server.log', log + '\n', (err) => {
     if(err){
         console.log('Unable to append to server.log');
     }
 });
 console.log(log);
  next();
});


// app.use((req, res, next) => {                    //app.use is to get connected with the middleware:
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname+ '/public'));

hbs.registerHelper('getcurrentYear', () => {
   return new Date().getFullYear()
});

 hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
 });

app.get('/', (req, res) => {
    // res.send('<h1>Hello Express !</h1>');
    // res.send({
    //     name :'sachin',
    //     likes : [
    //        'cricket',
    //        'movies'
    //     ]
    // });
    res.render('login.hbs', {
        pagetitle :'About Page',
        welcomeMessage: 'welcome to my website'
       
    })
});

app.get('/about', (req, res) => {
    // res.send('<h1>Hello Express !</h1>');
//res.send( 'how r u ?');
res.render('about.hbs', {
    pagetitle :'About Page',
    // welcomeMessage: 'welcome to my website'
    
});
});

app.get('/bad', (req, res) => {
    // res.send('<h1>Hello Express !</h1>');
    res.send({
        errorMessage :'unable to handle the error.'
    });
});
app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
    app.get('port') );
   });
