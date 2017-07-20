const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

//middleware is executed in the order of app.use

// app.use((req,res,next)=>{
// 	res.render('maintance.hbs');
// });


app.use((req, res, next)=>{
	var now= new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+'\n',(err)=>{
		if(err){
			console.log('Unable to append to server.log');
		}
	});
	next();
});//use: how we use midware

 //dirname stores the path to the project directory
app.use(express.static(__dirname+'/public'));



hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});

app.get('/',(req,res)=>{
	//res.send('<h1>Hello Express!</h1>')//respond to request by sending some data back
	// res.send({
	// 	name: 'john',
	// 	like:[
	// 		'biking','cities'
	// 	]
	// });

	res.render('home.hbs',{
		pageTitle: 'Home Page',
		welcomeMessage:'Welcome to our home page'
	})
}); //set up handler for http request


app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle: 'About Page'
	});//allow you to render any template
});

app.get('/bad',(req,res)=>{
	res.send({
		error:'error while handling request' 
	});
}); 

app.get('/projects',(req,res)=>{
	res.render('projects.hbs',{
		pageTitle: 'Projects Page'
	});
});

app.listen(port,()=>{
	console.log(`server is up on port ${port}`);
}); //bind app to a port on the local machine(port 3000)
